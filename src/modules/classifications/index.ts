import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";
import { Classification } from "../../model/Classification";
import { ClassificationDownloadPermissions } from "../../model/ClassificationDownloadPermissions";
import { ClassificationPermissions } from "../../model/ClassificationPermissions";
import { ClassificationUserGroupDownloadPermission } from "../../model/ClassificationUserGroupDownloadPermission";
import { ClassificationUserGroupPermission } from "../../model/ClassificationUserGroupPermission";
import { ClassificationUserPermissions } from "../../model/ClassificationUserPermissions";
import { SetActions } from "../../model/SetActions";
import { Field } from "../../model/Field";
import { Label } from "../../model/Label";
import { ApiResult } from "../../client";
import { CreateFrom } from "../../model/CreateFrom";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Expander } from "../../expander";

export interface ClassificationSearchRequest {
  expression: string;
  languages?: string[];
}

/**
 * Properties on a `*FieldValue` that are populated server-side and must NOT
 * be sent on write.
 */
type ServerManagedFieldValueProps = "aiInfluenced" | "modifiedOn" | "readOnly";

/**
 * Derive the write shape for one variant of the {@link Field} discriminated
 * union: keep `id` and `localizedValues`, but strip server-managed metadata
 * off each localized value entry. Distributes over the union so each variant
 * ends up with only its native value shape (`value` for scalars, `values` for
 * list types).
 */
type FieldUpdateFor<F> = F extends {
  id: string;
  localizedValues: Array<infer V>;
}
  ? {
      /** Field definition id. */
      id: string;
      /** Localized values to write; shape varies by field data type. */
      localizedValues?: Array<Omit<V, ServerManagedFieldValueProps>>;
    }
  : never;

/**
 * Payload for writing a single field value on a classification via
 * `CreateClassificationRequest.fields` / `UpdateClassificationRequest.fields`.
 *
 * NOTE: classifications identify the target field via `id` here, NOT
 * `fieldId` as records do.
 */
export type ClassificationFieldUpdate = FieldUpdateFor<Field>;

export type CreateClassificationRequest = Omit<
  CreateFrom<Classification>,
  | "registeredFields"
  | "registeredFieldGroups"
  | "followerclassifications"
  | "slaveclassifications"
> & {
  registeredFields?: SetActions<string>;
  registeredFieldGroups?: SetActions<string>;
  followerclassifications?: SetActions<string>;
  slaveclassifications?: SetActions<string>;
  labels?: Label[];
  /**
   * Set values for fields registered on this classification. See
   * {@link ClassificationFieldUpdate}.
   */
  fields?: SetActions<ClassificationFieldUpdate>;
};

export type UpdateClassificationRequest = Partial<
  Omit<
    CreateClassificationRequest,
    "namePath" | "labelPath" | "parentId" | "isRoot"
  >
>;

export interface CreateClassificationResponse {
  id: string;
}

export interface UpdateClassificationPermissionsRequest {
  breakInheritance: boolean;
  permissions: SetActions<ClassificationUserGroupPermission>;
}

export interface UpdateClassificationDownloadPermissionsRequest {
  breakInheritance: boolean;
  permissions: SetActions<ClassificationUserGroupDownloadPermission>;
}

export const classifications = (client: HttpClient) => ({
  /**
   * Fetch a single page of classifications. Returns one page; use `getPaged`
   * for full traversal, or `getById` for a single item.
   *
   * @param params - Pagination/sort options.
   * @param expander - Optional `Expander` chain.
   * @param languages - Language ids to include, or `"*"` for all.
   *
   * @example
   * ```ts
   * const res = await aprimo.classifications.get({ pageSize: 100 });
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<PagedCollection<Classification>>> => {
    const headers = buildHeaders(params, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get("/api/core/classifications", headers);
  },

  /**
   * Fetch a single classification by id. Failure (e.g., not found) surfaces
   * as `ok: false` with the HTTP status on `ApiResult`.
   *
   * @example
   * ```ts
   * const res = await aprimo.classifications.getById("<id>");
   * ```
   */
  getById: async (
    id: string,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<Classification>> => {
    const headers = buildHeaders(undefined, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get(`/api/core/classification/${id}`, headers);
  },

  /**
   * Async generator yielding pages of classifications until exhausted.
   * Wraps `get` and follows `_links.next` automatically.
   * Use for full-tree traversal or audits.
   *
   * @example
   * ```ts
   * const all: Classification[] = [];
   *
   * for await (const pageResult of aprimo.classifications.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Classification count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
    languages?: "*" | string[],
  ): AsyncGenerator<ApiResult<PagedCollection<Classification>>, void, unknown> {
    let currentPage = params.page ?? 1;
    const pageSize = params.pageSize ?? 100;

    while (true) {
      const result = await this.get(
        { ...params, page: currentPage, pageSize },
        expander,
        languages,
      );

      yield result;

      if (!result.ok || !result.data?._links?.next) break;

      currentPage++;
    }
  },

  /**
   * Create a new classification.
   *
   * @param request - Classification payload. See `CreateClassificationRequest`.
   * @param immediateSearchIndexUpdate - When `true`, sets the
   *   `set-immediateSearchIndexUpdate` header so the new classification is
   *   immediately searchable.
   * @returns `ApiResult` whose `data.id` is the new classification's id.
   *
   * @example
   * ```ts
   * const res = await aprimo.classifications.create({
   *   labels: [{ languageId: "<lang-id>", value: "Campaigns" }],
   * });
   * ```
   */
  create: async (
    request: CreateClassificationRequest,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<CreateClassificationResponse>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.post("/api/core/classifications", request, headers);
  },

  /**
   * Update an existing classification. Only include fields you want to change.
   *
   * @param id - Classification id.
   * @param request - Partial update.
   * @param immediateSearchIndexUpdate - When `true`, sets the
   *   `set-immediateSearchIndexUpdate` header so the change is reflected in
   *   search right away. Use sparingly — it's heavier on the server.
   *
   * @example Rename:
   * ```ts
   * await aprimo.classifications.update(id, {
   *   labels: [{ languageId: "<lang-id>", value: "Renamed" }],
   * });
   * ```
   *
   * @example Write a value to a field registered on this classification.
   * Note `id` (NOT `fieldId`) is used to identify the target field — this
   * differs from `records.update`.
   * ```ts
   * await aprimo.classifications.update(id, {
   *   fields: {
   *     addOrUpdate: [
   *       {
   *         id: "<field-definition-id>",
   *         localizedValues: [{ languageId: "<lang-id>", value: "EMEA" }],
   *       },
   *     ],
   *   },
   * });
   * ```
   */
  update: async (
    id: string,
    request: UpdateClassificationRequest,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<void>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return await client.put(`/api/core/classification/${id}`, request, headers);
  },

  /**
   * Permanently delete a classification.
   *
   * @param id - Classification id.
   * @param immediateSearchIndexUpdate - When `true`, forces an immediate
   *   reindex via the `set-immediateSearchIndexUpdate` header so the deletion
   *   is reflected in search right away.
   *
   * @example
   * ```ts
   * await aprimo.classifications.delete(id);
   * ```
   */
  delete: async (
    id: string,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<void>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.delete(`/api/core/classification/${id}`, headers);
  },

  /**
   * Read the effective tree permissions on a classification for the current user.
   *
   * @example
   * ```ts
   * const res = await aprimo.classifications.getTreePermission(id);
   * ```
   */
  getTreePermission: async (
    id: string,
  ): Promise<ApiResult<ClassificationUserPermissions>> => {
    return client.get(`/api/core/classification/${id}/classificationtreepermission`);
  },

  /**
   * Replace the user-group permissions on a classification subtree.
   *
   * @param id - Classification id.
   * @param request - `breakInheritance` controls whether the subtree inherits
   *   from its parent; `permissions` is a `SetActions` of user-group entries.
   *
   * @example
   * ```ts
   * await aprimo.classifications.updateTreePermissions(id, {
   *   breakInheritance: true,
   *   permissions: { addOrUpdate: [{ userGroupId, canRead: true }] },
   * });
   * ```
   */
  updateTreePermissions: async (
    id: string,
    request: UpdateClassificationPermissionsRequest,
  ): Promise<ApiResult<ClassificationPermissions>> => {
    return client.put(
      `/api/core/classification/${id}/classificationtreepermissions`,
      request,
    );
  },

  /**
   * Replace the per-record permissions assigned to records in this classification.
   *
   * @example
   * ```ts
   * await aprimo.classifications.updateRecordPermissions(id, {
   *   breakInheritance: false,
   *   permissions: { addOrUpdate: [...] },
   * });
   * ```
   */
  updateRecordPermissions: async (
    id: string,
    request: UpdateClassificationPermissionsRequest,
  ): Promise<ApiResult<ClassificationPermissions>> => {
    return client.put(
      `/api/core/classification/${id}/recordpermissions`,
      request,
    );
  },

  /**
   * Replace the download permissions for records in this classification.
   *
   * @example
   * ```ts
   * await aprimo.classifications.updateDownloadPermissions(id, {
   *   breakInheritance: false,
   *   permissions: { addOrUpdate: [...] },
   * });
   * ```
   */
  updateDownloadPermissions: async (
    id: string,
    request: UpdateClassificationDownloadPermissionsRequest,
  ): Promise<ApiResult<ClassificationDownloadPermissions>> => {
    return client.put(
      `/api/core/classification/${id}/downloadpermissions`,
      request,
    );
  },
});

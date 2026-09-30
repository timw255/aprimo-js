import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";
import { Classification } from "../../model/Classification";
import { ClassificationDownloadPermissions } from "../../model/ClassificationDownloadPermissions";
import { ClassificationPermissions } from "../../model/ClassificationPermissions";
import { ClassificationRecordPermissions } from "../../model/ClassificationRecordPermissions";
import { ClassificationUserGroupDownloadPermission } from "../../model/ClassificationUserGroupDownloadPermission";
import {
  ClassificationUserGroupPermission,
  ClassificationUserGroupRecordPermission,
} from "../../model/ClassificationUserGroupPermission";
import { ClassificationUserPermissions } from "../../model/ClassificationUserPermissions";
import { SetActions } from "../../model/SetActions";
import { Field } from "../../model/Field";
import { Label } from "../../model/Label";
import { ApiResult } from "../../client";
import { CreateFrom } from "../../model/CreateFrom";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { HeaderSource } from "../../select";

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

/**
 * Where a new classification is attached. The API requires exactly one of
 * these — omitting all three fails with "When creating a classification, you
 * need to specify at least a parentId, parentNamePath or isRoot property".
 */
export type ClassificationParent =
  | { isRoot: true; parentId?: never; parentNamePath?: never }
  | { parentId: string; isRoot?: never; parentNamePath?: never }
  | {
      /** Slash-separated internal name path of the parent, e.g. `"Brands/EMEA"`. */
      parentNamePath: string;
      isRoot?: never;
      parentId?: never;
    };

type CreateClassificationFields = Omit<
  CreateFrom<Classification>,
  | "registeredFields"
  | "registeredFieldGroups"
  | "followerclassifications"
  | "slaveclassifications"
  | "isRoot"
  | "parentId"
  | "name"
> & {
  /** Internal (non-localized) name. Required — the API rejects a create without it. */
  name: string;
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

export type CreateClassificationRequest = CreateClassificationFields &
  ClassificationParent;

export type UpdateClassificationRequest = Partial<
  Omit<CreateClassificationFields, "namePath" | "labelPath">
>;

export interface CreateClassificationResponse {
  id: string;
}

/**
 * Add/remove envelope for permission entries. Unlike the general
 * {@link SetActions}, `remove` takes only the `userGroupId` — the API does not
 * need (or look at) an `accessRight` to drop an entry.
 */
export interface ClassificationPermissionActions<T> {
  /** Entries to assign or overwrite. */
  addOrUpdate?: T[];
  /** Groups whose explicit entry should be removed. */
  remove?: { userGroupId: string }[];
}

/** Payload for `updateTreePermissions`. */
export interface UpdateClassificationTreePermissionsRequest {
  breakInheritance: boolean;
  permissions: ClassificationPermissionActions<ClassificationUserGroupPermission>;
}

/**
 * Payload for `updateRecordPermissions`. Record rights exclude a bare
 * `Classify` — see {@link ClassificationRecordAccessRight}.
 */
export interface UpdateClassificationRecordPermissionsRequest {
  breakInheritance: boolean;
  permissions: ClassificationPermissionActions<ClassificationUserGroupRecordPermission>;
}

export interface UpdateClassificationDownloadPermissionsRequest {
  breakInheritance: boolean;
  permissions: ClassificationPermissionActions<ClassificationUserGroupDownloadPermission>;
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
    expander?: HeaderSource | HeaderSource[],
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
    expander?: HeaderSource | HeaderSource[],
    languages?: "*" | string[],
  ): Promise<ApiResult<Classification>> => {
    const headers = buildHeaders(undefined, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get(`/api/core/classification/${id}`, headers);
  },

  /**
   * Fetch a single classification by its slash-separated internal name path,
   * e.g. `"/ReviewStatus/approved"`.
   *
   * `namePath` is opt-in on list responses — request it with a
   * `select-classification: NamePath` header (or an `Expander`) if you need to
   * discover paths first.
   *
   * @example
   * ```ts
   * const res = await aprimo.classifications.getByNamePath("/ReviewStatus/approved");
   * ```
   */
  getByNamePath: async (
    namePath: string,
    expander?: HeaderSource | HeaderSource[],
    languages?: "*" | string[],
  ): Promise<ApiResult<Classification>> => {
    const headers = buildHeaders(undefined, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get(
      `/api/core/classification?namePath=${encodeURIComponent(namePath)}`,
      headers,
    );
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
    expander?: HeaderSource | HeaderSource[],
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
   * Read the user-group permissions assigned on a classification subtree —
   * the read counterpart of `updateTreePermissions`.
   *
   * Distinct from `getTreePermission` (singular), which reports what the
   * *current user* may do rather than listing the assigned user-group entries.
   *
   * Returns 404 when the classification does not exist, or 200 with an empty
   * `permissions` array when it exists but has no explicit entries. Expanding
   * `classificationtreepermissions` instead reports both cases identically, as
   * a missing `_embedded` key on a 200.
   *
   * @example
   * ```ts
   * const res = await aprimo.classifications.getTreePermissions(id);
   * res.data?.permissions.forEach((p) => console.log(p.userGroupId, p.accessRight));
   * ```
   */
  getTreePermissions: async (
    id: string,
  ): Promise<ApiResult<ClassificationPermissions>> => {
    return client.get(
      `/api/core/classification/${id}/classificationtreepermissions`,
    );
  },

  /**
   * Read the per-record permissions assigned to records in this classification —
   * the read counterpart of `updateRecordPermissions`.
   *
   * Returns 404 when the classification does not exist, or 200 with an empty
   * `permissions` array when it has no explicit entries.
   *
   * @example
   * ```ts
   * const res = await aprimo.classifications.getRecordPermissions(id);
   * ```
   */
  getRecordPermissions: async (
    id: string,
  ): Promise<ApiResult<ClassificationRecordPermissions>> => {
    return client.get(`/api/core/classification/${id}/recordpermissions`);
  },

  /**
   * Read the download permissions for records in this classification — the
   * read counterpart of `updateDownloadPermissions`.
   *
   * @example
   * ```ts
   * const res = await aprimo.classifications.getDownloadPermissions(id);
   * ```
   */
  getDownloadPermissions: async (
    id: string,
  ): Promise<ApiResult<ClassificationDownloadPermissions>> => {
    return client.get(`/api/core/classification/${id}/downloadpermissions`);
  },

  /**
   * Replace the user-group permissions on a classification subtree.
   *
   * @param id - Classification id.
   * @param request - `breakInheritance` controls whether the subtree inherits
   *   from its parent; `permissions` is a `SetActions` of user-group entries.
   *
   * Returns 204 with no body.
   *
   * @remarks
   * - Writes are eventually consistent. A read issued immediately after this
   *   call can return the previous set; allow a few seconds or poll.
   * - `breakInheritance: true` also adds an `Administrators: FullControl`
   *   entry. Setting it back to `false` removes that entry.
   * - `accessRight: "Inherit"` deletes the group's entry rather than storing a
   *   state; the group is absent from later reads. Equivalent to `remove`.
   *
   * @example
   * ```ts
   * await aprimo.classifications.updateTreePermissions(id, {
   *   breakInheritance: true,
   *   permissions: { addOrUpdate: [{ userGroupId, accessRight: "Read" }] },
   * });
   * ```
   *
   * @example Drop a group's explicit entry:
   * ```ts
   * await aprimo.classifications.updateTreePermissions(id, {
   *   breakInheritance: true,
   *   permissions: { remove: [{ userGroupId }] },
   * });
   * ```
   */
  updateTreePermissions: async (
    id: string,
    request: UpdateClassificationTreePermissionsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(
      `/api/core/classification/${id}/classificationtreepermissions`,
      request,
    );
  },

  /**
   * Replace the per-record permissions assigned to records in this classification.
   *
   * Returns 204 with no body. Record rights exclude a bare `Classify`. The
   * eventual-consistency, `breakInheritance` and `Inherit` behaviour described
   * on `updateTreePermissions` applies here too.
   *
   * @example
   * ```ts
   * await aprimo.classifications.updateRecordPermissions(id, {
   *   breakInheritance: false,
   *   permissions: { addOrUpdate: [{ userGroupId, accessRight: "Read" }] },
   * });
   * ```
   */
  updateRecordPermissions: async (
    id: string,
    request: UpdateClassificationRecordPermissionsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(
      `/api/core/classification/${id}/recordpermissions`,
      request,
    );
  },

  /**
   * Replace the download permissions for records in this classification.
   *
   * Returns 204 with no body. Download rights are a separate set; record and
   * tree rights are rejected here. The eventual-consistency,
   * `breakInheritance` and `Inherit` behaviour described on
   * `updateTreePermissions` applies here too.
   *
   * @example
   * ```ts
   * await aprimo.classifications.updateDownloadPermissions(id, {
   *   breakInheritance: false,
   *   permissions: { addOrUpdate: [{ userGroupId, accessRight: "Allow" }] },
   * });
   * ```
   */
  updateDownloadPermissions: async (
    id: string,
    request: UpdateClassificationDownloadPermissionsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(
      `/api/core/classification/${id}/downloadpermissions`,
      request,
    );
  },
});

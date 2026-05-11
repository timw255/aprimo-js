import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { Record } from "../../model/Record";
import { Expander } from "../../expander";
import { SetActions } from "../../model/SetActions";
import { Field } from "../../model/Field";
import { buildHeaders } from "../../utils";

/**
 * Payload for creating a new record.
 *
 * To attach a file, first call `aprimo.uploader.uploadFile(...)` and reuse the
 * returned `token` for both `files.master` and as the `id` in `versions.addOrUpdate`.
 * That same token doubles as the master-file pointer and the version reference;
 * this is the canonical "upload, then create" flow shown in the README.
 */
export interface CreateRecordRequest {
  /** Lifecycle status the record is created in. Defaults to API tenant default. */
  status?: "draft" | "released" | "archived";
  /** Field values keyed by field id. Use `computeSetActions` to generate this. */
  fields?: SetActions<Field>;
  /** Classifications to attach by id. */
  classifications?: {
    addOrUpdate: { id: string }[];
  };
  /**
   * File attachments. `master` is the upload token returned by `uploader.uploadFile`;
   * the same token is reused as the version `id` so the master file and its first
   * version reference the same upload.
   */
  files?: {
    master: string;
    addOrUpdate?: {
      versions: {
        addOrUpdate: {
          id: string;
          fileName: string;
          versionLabel?: string;
          comment?: string;
        }[];
      };
    }[];
  };
}

/**
 * Payload for updating an existing record. Every property is optional —
 * include only the fields you want to change.
 *
 * Field updates use the `addOrUpdate`/`remove` action pattern (see `SetActions`):
 * provide a `fieldId` plus localized values to upsert, or include a `remove`
 * array to clear specific values.
 */
export interface UpdateRecordRequest {
  /** New lifecycle status, if changing. */
  status?: "draft" | "released" | "archived";
  fields?: SetActions<Field>;
  classifications?: {
    addOrUpdate: { id: string }[];
    remove?: { id: string }[];
  };
  files?: {
    master?: string;
    addOrUpdate?: {
      id: string;
      versions?: {
        addOrUpdate?: {
          id: string;
          fileName?: string;
          versionLabel?: string;
          comment?: string;
          additionalFiles?: {
            addOrUpdate?: {
              id: string;
              label?: string;
              filename?: string;
              type?: string;
            }[];
            remove?: {
              id: string;
            }[];
          };
        }[];
        remove?: {
          id: string;
        }[];
      };
    }[];
    remove?: {
      id: string;
    }[];
  };
}

export interface CreateRecordResponse {
  id: string;
}

export const records = (client: HttpClient) => ({
  /**
   * Fetch a single page of records.
   *
   * For larger result sets prefer `getPaged`, which yields pages in sequence.
   *
   * @param params - Pagination/sort options. Defaults to the API's page 1.
   * @param expander - Optional `Expander` chain to embed related resources
   *   (master file, fields, file versions, etc.).
   * @param languages - Limit returned localized values to specific language ids,
   *   or pass `"*"` to receive all languages.
   *
   * @example
   * ```ts
   * const res = await aprimo.records.get({ pageSize: 50 });
   * if (res.ok) console.log(res.data?.items?.length);
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<PagedCollection<Record>>> => {
    const headers = buildHeaders(params, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get("/api/core/records", headers);
  },

  /**
   * Async generator that yields pages of records and follows the `next` link
   * until the server stops returning one. Use this for exports, audits, or
   * any traversal of more than a single page.
   *
   * @param params - Initial pagination/sort options. `page` is treated as the
   *   starting page; `pageSize` defaults to 100.
   * @param expander - Optional `Expander` chain (applied to every page).
   * @param languages - Optional language ids or `"*"` for all.
   *
   * @example
   * ```ts
   * const all: Record[] = [];
   *
   * for await (const pageResult of aprimo.records.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Record count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
    languages?: "*" | string[],
  ): AsyncGenerator<ApiResult<PagedCollection<Record>>, void, unknown> {
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
   * Fetch a single record by id.
   *
   * @param id - Record id (32-char hex).
   * @param expander - Optional `Expander` chain. To pull master file + fields:
   *   `Expander.create().for<Record>("Record").expand("masterfile", "fields")`.
   * @param languages - Limit returned localized values to specific language ids,
   *   or pass `"*"` to receive all languages.
   *
   * @example
   * ```ts
   * const res = await aprimo.records.getById("00000000000000000000000000000000");
   * if (res.ok) console.log(res.data?.id);
   * ```
   */
  getById: async (
    id: string,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<Record>> => {
    const headers = buildHeaders(undefined, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get(`/api/core/record/${id}`, headers);
  },

  /**
   * Create a new record.
   *
   * To attach a file, upload it first with `aprimo.uploader.uploadFile(...)` and
   * pass the returned `token` as both `request.files.master` and the version `id`.
   *
   * @param request - Record payload. See `CreateRecordRequest` for the full shape.
   * @param immediateSearchIndexUpdate - When `true`, sets the
   *   `set-immediateSearchIndexUpdate` header so the new record is searchable
   *   without waiting for the next index pass. Use sparingly — it's heavier
   *   on the server.
   * @returns `ApiResult` whose `data.id` is the new record's id.
   *
   * @example
   * ```ts
   * const file = new File([new Blob(["hello"])], "example.txt");
   * const upload = await aprimo.uploader.uploadFile(file);
   * const token = upload.data!.token;
   *
   * const res = await aprimo.records.create({
   *   status: "draft",
   *   files: {
   *     master: token,
   *     addOrUpdate: [{
   *       versions: { addOrUpdate: [{ id: token, fileName: file.name }] },
   *     }],
   *   },
   * });
   * ```
   */
  create: async (
    request: CreateRecordRequest,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<CreateRecordResponse>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.post("/api/core/records", request, headers);
  },

  /**
   * Update an existing record. Only include fields you want to change —
   * unspecified fields are left untouched.
   *
   * @param id - Record id.
   * @param request - Partial update. See `UpdateRecordRequest`.
   * @param immediateSearchIndexUpdate - When `true`, forces an immediate
   *   reindex via the `set-immediateSearchIndexUpdate` header.
   *
   * @example
   * ```ts
   * await aprimo.records.update(id, {
   *   fields: {
   *     addOrUpdate: [{
   *       fieldId: "<field-id>",
   *       localizedValues: [{ languageId: "<lang-id>", value: "New value" }],
   *     }],
   *   },
   * });
   * ```
   */
  update: async (
    id: string,
    request: UpdateRecordRequest,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<void>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.put(`/api/core/record/${id}`, request, headers);
  },

  /**
   * Permanently delete a record. This cannot be undone.
   *
   * @param id - Record id.
   * @param immediateSearchIndexUpdate - When `true`, forces an immediate
   *   reindex so the deletion is reflected in search right away.
   *
   * @example
   * ```ts
   * await aprimo.records.delete(id);
   * ```
   */
  delete: async (
    id: string,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<void>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.delete(`/api/core/record/${id}`, headers);
  },
});

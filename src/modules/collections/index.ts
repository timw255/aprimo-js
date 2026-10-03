import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";
import { Collection } from "../../model/Collection";
import { CollectionCommentsStatus } from "../../model/CollectionCommentsStatus";
import { CollectionContentPermission } from "../../model/CollectionContentPermission";
import { CollectionGroupPermission } from "../../model/CollectionGroupPermission";
import { CollectionPermissions } from "../../model/CollectionPermissions";
import { CollectionUserPermission } from "../../model/CollectionUserPermission";
import { Comment } from "../../model/Comment";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { RecordCollection } from "../../model/RecordCollection";
import { HeaderSource } from "../../select";
import { SearchExpression } from "../search";
import { SetActions } from "../../model";

export interface CreateStaticCollectionRequest {
  name: string;
  description: string;
  type?: "static";
  tag?: string;
}

export interface CreateDynamicCollectionRequest {
  name: string;
  type?: "dynamic";
  searchExpression: SearchExpression;
  tag?: string;
}

export interface CreateDynamicCollectionWithSubExpressionsRequest {
  name: string;
  type?: "dynamic";
  /**
   * Outer expression. Leave `expression` unset here — the API rejects a
   * search expression that carries both an `expression` and `subExpressions`.
   */
  searchExpression: Omit<SearchExpression, "subExpressions">;
  /** Clauses joined by `searchExpression.defaultLogicalOperator`. */
  subExpressions: SearchExpression[];
  tag?: string;
}

export interface CreateCollectionResponse {
  id: string;
}

export interface UpdateStaticCollectionRecordsRequest {
  records: SetActions<string>;
}

/**
 * Add/remove envelope for collection permission entries. `remove` takes only
 * the identifier — the API does not need the permission level to drop an entry.
 *
 * Note this is an object, not an array: passing a bare array for
 * `permissions` / `groupsPermissions` fails with
 * "Unable to cast object of type 'JArray' to type 'JObject'".
 */
export interface CollectionPermissionActions<T, K> {
  /** Entries to assign or overwrite. */
  addOrUpdate?: T[];
  /** Identifiers whose entry should be removed. */
  remove?: K[];
}

/**
 * Payload for `updatePermissions`. Every property is optional — include only
 * the facet you want to change.
 */
export interface UpdateCollectionPermissionsRequest {
  /** Per-user permission entries. */
  permissions?: CollectionPermissionActions<
    CollectionUserPermission,
    { userId: string }
  >;
  /** Per-user-group permission entries. */
  groupsPermissions?: CollectionPermissionActions<
    CollectionGroupPermission,
    { groupId: string }
  >;
  /** Public access level. `Modify` is not supported for public access. */
  publicPermission?: "None" | "Read";
  /** Content sharing settings. */
  contentPermission?: CollectionContentPermission;
}

/** Payload for `createComment`. */
export interface CreateCollectionCommentRequest {
  message: string;
}

/**
 * Payload for `updateComment`.
 *
 * Note the field is `content`, not `message` — the API reads the new text from
 * `content` on edit even though it returns it as `message` on read. Sending
 * `message` fails with "An invalid value was specified for Message."
 */
export interface UpdateCollectionCommentRequest {
  content: string;
}

/** Payload for `markCommentsAsRead`. */
export interface MarkCollectionCommentsReadRequest {
  /** Id of the most recently read comment. */
  id: string;
  /** Timestamp to record as the read watermark, as an ISO-8601 UTC string. */
  lastReadCommentDate: string;
}

export interface CreateCollectionCommentResponse {
  id: string;
}

/**
 * Payload for updating a collection. Every property is optional — include only
 * what you want to change. `searchExpression` applies to dynamic collections.
 */
export interface UpdateCollectionRequest {
  name?: string;
  description?: string;
  status?: "Active" | "Archived" | "Deleted";
  tag?: string;
  searchAllLanguages?: boolean;
  searchExpression?: SearchExpression;
  allowAutoAccess?: boolean;
}

export const collections = (client: HttpClient) => ({
  /**
   * List collections (curated sets of records). Returns one page; use
   * `getPaged` for full traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.get({ pageSize: 50 });
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<PagedCollection<Collection>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/collections", headers);
  },

  /**
   * Fetch a single collection by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.getById(collectionId);
   * ```
   */
  getById: async (
    id: string,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<Collection>> => {
    const headers = buildHeaders(undefined, expander);
    return client.get(`/api/core/collection/${id}`, headers);
  },

  /**
   * Async generator yielding pages of collections. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: Collection[] = [];
   *
   * for await (const pageResult of aprimo.collections.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Collection count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: HeaderSource | HeaderSource[],
  ): AsyncGenerator<ApiResult<PagedCollection<Collection>>, void, unknown> {
    let currentPage = params.page ?? 1;
    const pageSize = params.pageSize ?? 100;

    while (true) {
      const result = await this.get(
        { ...params, page: currentPage, pageSize },
        expander,
      );

      yield result;

      if (!result.ok || !result.data?._links?.next) break;

      currentPage++;
    }
  },

  /**
   * Create a static collection (manually-curated record set).
   *
   * Use `updateRecords` afterwards to add records to the collection.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.createStatic({
   *   name: "Q3 launch assets",
   *   description: "Hero images for the Q3 launch",
   * });
   * ```
   */
  createStatic: async (
    request: CreateStaticCollectionRequest,
  ): Promise<ApiResult<CreateCollectionResponse>> => {
    return client.post("/api/core/collections", {
      ...request,
      type: "static",
    });
  },

  /**
   * Create a dynamic collection driven by a search expression. Membership is
   * recomputed automatically as records change.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.createDynamic({
   *   name: "All published videos",
   *   searchExpression: { expression: "ContentType = 'Video'", languages: ["en-US"] },
   * });
   * ```
   */
  createDynamic: async (
    request: CreateDynamicCollectionRequest,
  ): Promise<ApiResult<CreateCollectionResponse>> => {
    return client.post("/api/core/collections", {
      ...request,
      type: "dynamic",
    });
  },

  /**
   * Create a dynamic collection with both a top-level expression and
   * sub-expressions (typically used for grouped/faceted dynamic sets).
   */
  createDynamicWithSubExpressions: async (
    request: CreateDynamicCollectionWithSubExpressionsRequest,
  ): Promise<ApiResult<CreateCollectionResponse>> => {
    const { subExpressions, searchExpression, ...rest } = request;

    // `subExpressions` belong inside the search expression; sent alongside it
    // they are accepted and silently discarded.
    return client.post("/api/core/collections", {
      ...rest,
      searchExpression: { ...searchExpression, subExpressions },
      type: "dynamic",
    });
  },

  /**
   * Update a collection. Include only the fields you want to change.
   *
   * @example
   * ```ts
   * await aprimo.collections.update(collectionId, { name: "Renamed" });
   * ```
   */
  update: async (
    id: string,
    request: UpdateCollectionRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/collection/${id}`, request);
  },

  /**
   * List the records belonging to a collection.
   *
   * Supported for **static** collections only — the API returns HTTP 500 for a
   * dynamic collection. Query a dynamic collection's membership with
   * `aprimo.search.records(...)` using its search expression instead.
   *
   * @param id - Collection id.
   * @param expander - Optional `Expander` chain applied to each record.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.getRecords(collectionId);
   * console.log(res.data?.items?.length);
   * ```
   */
  getRecords: async (
    id: string,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<RecordCollection>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/collection/${id}/records`, headers);
  },

  /**
   * Permanently delete a collection.
   *
   * @example
   * ```ts
   * await aprimo.collections.delete(collectionId);
   * ```
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/collection/${id}`);
  },

  /**
   * Add or remove record memberships on a static collection.
   *
   * @example
   * ```ts
   * await aprimo.collections.updateRecords(collectionId, {
   *   records: { addOrUpdate: [recordId1, recordId2] },
   * });
   * ```
   */
  updateRecords: async (
    id: string,
    request: UpdateStaticCollectionRecordsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/collection/${id}/records`, request);
  },

  /**
   * Read the permissions on a collection — per-user and per-group entries,
   * public access level, content sharing settings, and what the current user
   * may do (`canRead` / `canModify`).
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.getPermissions(collectionId);
   * console.log(res.data?.publicPermission, res.data?.groupsPermissions);
   * ```
   */
  getPermissions: async (
    id: string,
  ): Promise<ApiResult<CollectionPermissions>> => {
    return client.get(`/api/core/collection/${id}/permissions`);
  },

  /**
   * Update the permissions on a collection. Returns 204 with no body.
   *
   * @remarks
   * Writes are eventually consistent — a read issued immediately after this
   * call can return the previous state; allow a few seconds or poll.
   *
   * @example
   * ```ts
   * await aprimo.collections.updatePermissions(collectionId, {
   *   groupsPermissions: { addOrUpdate: [{ groupId, permission: "Read" }] },
   *   publicPermission: "None",
   * });
   * ```
   *
   * @example Remove a group's entry:
   * ```ts
   * await aprimo.collections.updatePermissions(collectionId, {
   *   groupsPermissions: { remove: [{ groupId }] },
   * });
   * ```
   */
  updatePermissions: async (
    id: string,
    request: UpdateCollectionPermissionsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/collection/${id}/permissions`, request);
  },

  /**
   * List the comments on a collection.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.getComments(collectionId);
   * ```
   */
  getComments: async (
    id: string,
    params?: QueryParams,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<PagedCollection<Comment>>> => {
    const headers = buildHeaders(params, expander);

    return client.get(`/api/core/collection/${id}/comments`, headers);
  },

  /**
   * Fetch a single comment on a collection.
   */
  getCommentById: async (
    id: string,
    commentId: string,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<Comment>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(
      `/api/core/collection/${id}/comment/${commentId}`,
      headers,
    );
  },

  /**
   * Post a comment on a collection.
   *
   * @returns `ApiResult` whose `data.id` is the new comment's id.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.createComment(collectionId, {
   *   message: "Approved for launch",
   * });
   * ```
   */
  createComment: async (
    id: string,
    request: CreateCollectionCommentRequest,
  ): Promise<ApiResult<CreateCollectionCommentResponse>> => {
    return client.post(`/api/core/collection/${id}/comments`, request);
  },

  /**
   * Edit the text of a comment. Returns 204 with no body.
   *
   * @example
   * ```ts
   * await aprimo.collections.updateComment(collectionId, commentId, {
   *   content: "Approved for launch (revised)",
   * });
   * ```
   */
  updateComment: async (
    id: string,
    commentId: string,
    request: UpdateCollectionCommentRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(
      `/api/core/collection/${id}/comment/${commentId}`,
      request,
    );
  },

  /**
   * Delete a comment from a collection.
   */
  deleteComment: async (
    id: string,
    commentId: string,
  ): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/collection/${id}/comment/${commentId}`);
  },

  /**
   * Read the comment read-status for a collection — how many comments the
   * current user has not read.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.getCommentsStatus(collectionId);
   * if (res.data?.unreadComments) { /* ... *\/ }
   * ```
   */
  getCommentsStatus: async (
    id: string,
  ): Promise<ApiResult<CollectionCommentsStatus>> => {
    return client.get(`/api/core/collection/${id}/comments/status`);
  },

  /**
   * Move the current user's read watermark on a collection's comments.
   *
   * @returns The refreshed unread count.
   *
   * @example
   * ```ts
   * await aprimo.collections.markCommentsAsRead(collectionId, {
   *   id: latestCommentId,
   *   lastReadCommentDate: new Date().toISOString(),
   * });
   * ```
   */
  markCommentsAsRead: async (
    id: string,
    request: MarkCollectionCommentsReadRequest,
  ): Promise<ApiResult<CollectionCommentsStatus>> => {
    return client.put(`/api/core/collection/${id}/comments/status`, request);
  },
});

export type { SearchExpression };

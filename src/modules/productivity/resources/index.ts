import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Resource } from "../../../model/productivity/Resource";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";

/** Payload for `resources.query`. */
export interface ResourceQueryRequest {
  /** Free-form query string (server-side fuzzy match). */
  query: string;
}

/** Response from `resources.query`. */
export interface ResourceQueryResponse {
  /** Matching localized resource entries. */
  resources: { id: string; value: string }[];
}

/**
 * Localized UI resources / strings exposed by the PM API — labels for
 * picklists, control strings, and similar i18n payloads. Useful when
 * building UIs that need to mirror PM's translated text without
 * shipping a parallel string bundle.
 */
export const resources = (client: HttpClient) => ({
  /** Fetch a single resource entry by id (typically a dotted key). */
  getById: async (id: string): Promise<ApiResult<Resource>> => {
    return client.get(`/api/resources/${id}`);
  },

  /** Return the bundle of static (always-cached) resources. */
  getStatic: async (): Promise<
    ApiResult<PmPagedCollection<Resource, "resources" | "resource">>
  > => {
    return client.get("/api/resources/static");
  },

  /**
   * Free-form lookup against the resource catalog.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.resources.query({ query: "campaign" });
   * ```
   */
  query: async (
    request: ResourceQueryRequest,
  ): Promise<ApiResult<ResourceQueryResponse>> => {
    return client.post("/api/resources/query", request);
  },
});

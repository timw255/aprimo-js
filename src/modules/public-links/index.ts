import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PublicLink } from "../../model/PublicLink";

/**
 * Payload for creating a public link to a record, file version, additional
 * file, or rendition.
 *
 * **Target selection**: set exactly one of `recordId`, `fileVersionId`, or
 * `additionalFileId` — that field determines what the link points at. Setting
 * more than one (or none) is invalid.
 */
export interface CreatePublicLinkRequest {
  /** Rendition name to link to. Only meaningful when targeting a file version's rendition. */
  renditionName?: string;
  /** Absolute public URL where the asset is hosted (e.g., on a CDN). */
  uri: string;
  /** Free-form name of the CDN/service hosting the asset (e.g., `"Cloudinary"`). */
  provider: string;
  /** Set when linking a record (mutually exclusive with the other target ids). */
  recordId?: string;
  /** File size in bytes, if known. */
  fileSize?: number;
  /** Set when linking a file version (mutually exclusive with the other target ids). */
  fileVersionId?: string;
  /** Set when linking an additional file (mutually exclusive with the other target ids). */
  additionalFileId?: string;
}

/**
 * Payload for updating a public link. Target ids cannot be changed after
 * creation — only the URL and metadata fields are updatable.
 */
export interface UpdatePublicLinkRequest {
  renditionName?: string;
  uri?: string;
  provider?: string;
  fileSize?: number;
}

export const publicLinks = (client: HttpClient) => ({
  /**
   * Create a public link to a record, file version, or rendition.
   *
   * @example
   * ```ts
   * const res = await aprimo.publicLinks.create({
   *   recordId,
   *   uri: "https://cdn.example.com/asset.jpg",
   *   provider: "ExampleCDN",
   * });
   * ```
   */
  create: async (
    request: CreatePublicLinkRequest,
  ): Promise<ApiResult<PublicLink>> => {
    return client.post("/api/core/publiclinks", request);
  },

  /**
   * Fetch a public link by id.
   */
  getById: async (id: string): Promise<ApiResult<PublicLink>> => {
    return client.get(`/api/core/publiclink/${id}`);
  },

  /**
   * Update a public link.
   */
  update: async (
    id: string,
    request: UpdatePublicLinkRequest,
  ): Promise<ApiResult<PublicLink>> => {
    return client.put(`/api/core/publiclink/${id}`, request);
  },

  /**
   * Permanently delete a public link.
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/publiclink/${id}`);
  },
});

import { ApiResult } from "../../client";
import { HeaderSource } from "../../select";
import { FileVersion } from "../../model/FileVersion";
import { HttpClient } from "../../http";
import { PublicLinkCollection } from "../../model/PublicLinkCollection";
import { PublicUriCollection } from "../../model/PublicUriCollection";
import { QueryParams } from "../../model/QueryParams";
import { RenditionCollection } from "../../model/RenditionCollection";
import { buildHeaders } from "../../utils";

export const fileVersions = (client: HttpClient) => ({
  /**
   * Fetch a single file version by id.
   *
   * Use this when you have a file-version id from an `Expander` chain
   * (e.g., `Record -> masterfile -> fileversions`) and need the full payload.
   *
   * @example
   * ```ts
   * const res = await aprimo.fileVersions.getById(fileVersionId);
   * ```
   */
  getById: async (
    id: string,
    params?: QueryParams,
  ): Promise<ApiResult<FileVersion>> => {
    const headers = buildHeaders(params);
    return client.get(`/api/core/fileversion/${id}`, headers);
  },

  /**
   * List the renditions generated for a file version.
   *
   * @example
   * ```ts
   * const res = await aprimo.fileVersions.getRenditions(fileVersionId);
   * ```
   */
  getRenditions: async (
    id: string,
    params?: QueryParams,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<RenditionCollection>> => {
    const headers = buildHeaders(params, expander);

    return client.get(`/api/core/fileversion/${id}/renditions`, headers);
  },

  /**
   * List the public URIs published for a file version.
   *
   * @example
   * ```ts
   * const res = await aprimo.fileVersions.getPublicUris(fileVersionId);
   * ```
   */
  getPublicUris: async (
    id: string,
    params?: QueryParams,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<PublicUriCollection>> => {
    const headers = buildHeaders(params, expander);

    return client.get(`/api/core/fileversion/${id}/publicuris`, headers);
  },

  /**
   * List the public links registered against a file version.
   *
   * @example
   * ```ts
   * const res = await aprimo.fileVersions.getPublicLinks(fileVersionId);
   * ```
   */
  getPublicLinks: async (
    id: string,
    params?: QueryParams,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<PublicLinkCollection>> => {
    const headers = buildHeaders(params, expander);

    return client.get(`/api/core/fileversion/${id}/publiclinks`, headers);
  },
});

import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { DigitalAssetRendition } from "../../../model/productivity/DigitalAssetRendition";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";

/**
 * Payload for `digitalAssetRenditions.create`. `FileId` / `FileName` come
 * from a prior PM-side {@link uploader} upload — pass the response
 * through verbatim.
 */
export interface CreateDigitalAssetRenditionRequest {
  /** Display title for the rendition. */
  title: string;
  /** Free-form description. */
  description?: string;
  /** Version id this rendition derives from (echoed in the URL). */
  versionId: number;
  /** File id returned by the PM uploader. */
  FileId: string;
  /** File name returned by the PM uploader. */
  FileName: string;
  /** File size in bytes. */
  filesize?: number;
  /** Rendition type id (tenant lookup — proxy, thumbnail, etc.). */
  attachmentVersionType?: number;
}

/**
 * Renditions of a specific {@link DigitalAssetVersion} — alternate
 * derivatives (proxies, format conversions, watermarked copies) generated
 * from the source version.
 */
export const digitalAssetRenditions = (client: HttpClient) => ({
  /** List the renditions on a version. */
  getByVersionId: async (
    assetId: number | string,
    versionId: number | string,
  ): Promise<
    ApiResult<PmPagedCollection<DigitalAssetRendition, "digital-asset-rendition" | "digital-asset-renditions">>
  > => {
    return client.get(
      `/api/digital-assets/${assetId}/versions/${versionId}/renditions`,
    );
  },

  /** Fetch a single rendition by id. */
  getById: async (
    assetId: number | string,
    versionId: number | string,
    renditionId: number | string,
  ): Promise<ApiResult<DigitalAssetRendition>> => {
    return client.get(
      `/api/digital-assets/${assetId}/versions/${versionId}/renditions/${renditionId}`,
    );
  },

  /**
   * Create a new rendition for a version. Upload the binary with the PM
   * {@link uploader} first and pass the resulting `FileId`/`FileName`.
   */
  create: async (
    assetId: number | string,
    versionId: number | string,
    request: CreateDigitalAssetRenditionRequest,
  ): Promise<ApiResult<DigitalAssetRendition>> => {
    return client.post(
      `/api/digital-assets/${assetId}/versions/${versionId}/renditions`,
      request,
    );
  },
});

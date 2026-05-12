import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { DigitalAssetFolder } from "../../../model/productivity/DigitalAssetFolder";

/**
 * Folder membership on PM digital assets. Folders are tenant-defined
 * categorization buckets — this module wires existing assets into them
 * (and back out).
 */
export const digitalAssetFolders = (client: HttpClient) => ({
  /** List the folders that contain a given asset. */
  getByAssetId: async (
    assetId: number | string,
  ): Promise<ApiResult<DigitalAssetFolder[]>> => {
    return client.get(`/api/digital-assets/${assetId}/folders`);
  },

  /**
   * Add an asset to a folder.
   *
   * @example
   * ```ts
   * await aprimo.productivity.digitalAssetFolders.add(assetId, folderId);
   * ```
   */
  add: async (
    assetId: number | string,
    folderId: number | string,
  ): Promise<ApiResult<DigitalAssetFolder>> => {
    return client.post(
      `/api/digital-assets/${assetId}/folders/${folderId}`,
      {},
    );
  },

  /** Remove an asset from a folder. */
  remove: async (
    assetId: number | string,
    folderId: number | string,
  ): Promise<ApiResult<boolean>> => {
    return client.delete(`/api/digital-assets/${assetId}/folders/${folderId}`);
  },
});

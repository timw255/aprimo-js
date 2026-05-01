import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { DigitalAssetFolder } from "../../../model/productivity/DigitalAssetFolder";

export const digitalAssetFolders = (client: HttpClient) => ({
  getByAssetId: async (
    assetId: number | string,
  ): Promise<ApiResult<DigitalAssetFolder[]>> => {
    return client.get(`/api/digital-assets/${assetId}/folders`);
  },

  add: async (
    assetId: number | string,
    folderId: number | string,
  ): Promise<ApiResult<DigitalAssetFolder>> => {
    return client.post(
      `/api/digital-assets/${assetId}/folders/${folderId}`,
      {},
    );
  },

  remove: async (
    assetId: number | string,
    folderId: number | string,
  ): Promise<ApiResult<boolean>> => {
    return client.delete(`/api/digital-assets/${assetId}/folders/${folderId}`);
  },
});

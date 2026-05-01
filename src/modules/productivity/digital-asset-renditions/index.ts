import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { DigitalAssetRendition } from "../../../model/productivity/DigitalAssetRendition";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";

export interface CreateDigitalAssetRenditionRequest {
  title: string;
  description?: string;
  versionId: number;
  FileId: string;
  FileName: string;
  filesize?: number;
  attachmentVersionType?: number;
}

export const digitalAssetRenditions = (client: HttpClient) => ({
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

  getById: async (
    assetId: number | string,
    versionId: number | string,
    renditionId: number | string,
  ): Promise<ApiResult<DigitalAssetRendition>> => {
    return client.get(
      `/api/digital-assets/${assetId}/versions/${versionId}/renditions/${renditionId}`,
    );
  },

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

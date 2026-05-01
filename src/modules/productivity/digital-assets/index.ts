import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { DigitalAsset } from "../../../model/productivity/DigitalAsset";

export interface CreateDigitalAssetRequest {
  title: string;
  type?: number;
  assetStatus?: number;
  restrictionStatus?: number;
  hasVersions?: boolean;
  visibleInPortal?: number;
  isReferenceDocument?: boolean;
  ownerId?: number;
  customThumbnail?: number;
  allowOnDemand?: number;
  promotedFromActivity?: boolean;
  activityId?: number;
  packages?: unknown[];
  categories?: unknown[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  canDownload?: boolean;
}

export type UpdateDigitalAssetRequest = Partial<CreateDigitalAssetRequest>;

export const digitalAssets = (client: HttpClient) => ({
  getById: async (id: number | string): Promise<ApiResult<DigitalAsset>> => {
    return client.get(`/api/digital-assets/${id}`);
  },

  create: async (
    request: CreateDigitalAssetRequest,
  ): Promise<ApiResult<DigitalAsset>> => {
    return client.post("/api/digital-assets/", request);
  },

  update: async (
    id: number | string,
    request: UpdateDigitalAssetRequest,
  ): Promise<ApiResult<DigitalAsset>> => {
    return client.put(`/api/digital-assets/${id}`, request);
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/digital-assets/${id}`);
  },
});

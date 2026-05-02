import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  DigitalAssetVersion,
  DigitalAssetVersionComment,
  DigitalAssetVersionTag,
} from "../../../model/productivity/DigitalAssetVersion";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateDigitalAssetVersionRequest {
  FileId: string;
  FileName: string;
  isDefaultVersion?: boolean;
  versionNumber?: string;
  versionDate?: string;
  versionType?: number;
  versionComments?: string;
  thumbnailStatus?: number;
  extension?: string;
  hasRendition?: boolean;
  annotationFileType?: number;
  isReferenceDocument?: boolean;
  isDamVideoPreviewAvailable?: boolean;
  isDamPreviewAvailable?: boolean;
  isDamFileAvailable?: boolean;
  hasXfdfAnnotations?: boolean;
  isEligibleForDamContent?: boolean;
}

export interface UpdateDigitalAssetVersionTagsRequest {
  tags: Partial<DigitalAssetVersionTag>[];
}

export const digitalAssetVersions = (client: HttpClient) => ({
  getByAssetId: async (
    assetId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<DigitalAssetVersion, "version" | "versions">>> => {
    return client.get(
      `/api/digital-assets/${assetId}/versions${buildQueryString(params)}`,
    );
  },

  getById: async (
    assetId: number | string,
    versionId: number | string,
  ): Promise<ApiResult<DigitalAssetVersion>> => {
    return client.get(`/api/digital-assets/${assetId}/versions/${versionId}`);
  },

  getComments: async (
    assetId: number | string,
    versionId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<DigitalAssetVersionComment, "comment" | "comments">>
  > => {
    return client.get(
      `/api/digital-assets/${assetId}/versions/${versionId}/comments${buildQueryString(params)}`,
    );
  },

  getTags: async (
    assetId: number | string,
    versionId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<DigitalAssetVersionTag, "tag" | "tags">>> => {
    return client.get(
      `/api/digital-assets/${assetId}/versions/${versionId}/tags/${buildQueryString(params)}`,
    );
  },

  getTagById: async (
    assetId: number | string,
    versionId: number | string,
    tagId: number | string,
  ): Promise<ApiResult<DigitalAssetVersionTag>> => {
    return client.get(
      `/api/digital-assets/${assetId}/versions/${versionId}/tags/${tagId}`,
    );
  },

  create: async (
    assetId: number | string,
    request: CreateDigitalAssetVersionRequest,
  ): Promise<ApiResult<DigitalAssetVersion>> => {
    return client.post(`/api/digital-assets/${assetId}/versions`, request);
  },

  updateTags: async (
    assetId: number | string,
    versionId: number | string,
    request: UpdateDigitalAssetVersionTagsRequest,
  ): Promise<ApiResult<unknown>> => {
    return client.put(
      `/api/digital-assets/${assetId}/versions/${versionId}/tags`,
      request,
    );
  },
});

import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  AttachmentVersion,
  AttachmentVersionComment,
} from "../../../model/productivity/AttachmentVersion";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export const attachmentVersions = (client: HttpClient) => ({
  getByAttachmentId: async (
    attachmentId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<AttachmentVersion, "version" | "versions">>> => {
    return client.get(
      `/api/attachments/${attachmentId}/versions${buildQueryString(params)}`,
    );
  },

  getById: async (
    attachmentId: number | string,
    versionId: number | string,
  ): Promise<ApiResult<AttachmentVersion>> => {
    return client.get(`/api/attachments/${attachmentId}/versions/${versionId}`);
  },

  getComments: async (
    attachmentId: number | string,
    versionId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<AttachmentVersionComment, "comment" | "comments">>
  > => {
    return client.get(
      `/api/attachments/${attachmentId}/versions/${versionId}/comments${buildQueryString(params)}`,
    );
  },

  getXfdfAnnotations: async (
    attachmentId: number | string,
    versionId: number | string,
  ): Promise<ApiResult<string>> => {
    return client.get(
      `/api/attachments/${attachmentId}/versions/${versionId}/xfdf-annotations`,
    );
  },
});

import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  Annotation,
  AnnotationContent,
  AnnotationGeometry,
  AnnotationReferenceLink,
  AnnotationStyle,
  AnnotationType,
} from "../../../model/productivity/Annotation";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateAnnotationRequest {
  type: AnnotationType;
  page: number;
  authorId: number;
  geometry?: AnnotationGeometry;
  style?: AnnotationStyle;
  content?: AnnotationContent;
  referenceLink?: AnnotationReferenceLink;
}

export const annotations = (client: HttpClient) => ({
  get: async (
    assetId: number | string,
    versionId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Annotation, "annotation" | "annotations">>> => {
    return client.get(
      `/api/assets/${assetId}/versions/${versionId}/annotations-data${buildQueryString(params)}`,
    );
  },

  create: async (
    assetId: number | string,
    versionId: number | string,
    request: CreateAnnotationRequest,
  ): Promise<ApiResult<Annotation>> => {
    return client.post(
      `/api/assets/${assetId}/versions/${versionId}/annotations-data`,
      request,
    );
  },

  delete: async (
    assetId: number | string,
    versionId: number | string,
    annotationId: number | string,
  ): Promise<ApiResult<void>> => {
    return client.delete(
      `/api/assets/${assetId}/versions/${versionId}/annotations-data/${annotationId}`,
    );
  },
});

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

/** Payload for `annotations.create`. */
export interface CreateAnnotationRequest {
  /** Annotation shape — typically `"rectangle"`, `"highlight"`, `"strikeout"`. */
  type: AnnotationType;
  /** Page number the annotation lives on (1-based). */
  page: number;
  /** PM user id of the author. */
  authorId: number;
  /** Page-space geometry (bounding box + quad coverage). */
  geometry?: AnnotationGeometry;
  /** Visual style overrides (color, line width, opacity). */
  style?: AnnotationStyle;
  /** Text content (comment, quoted source text). */
  content?: AnnotationContent;
  /** Reference link to another document, if this annotation is a link. */
  referenceLink?: AnnotationReferenceLink;
}

/**
 * Annotations on a {@link DigitalAssetVersion} — page-anchored markup
 * (rectangles, highlights, strikeouts) used in review workflows. Reads
 * and writes go through `/api/assets/{id}/versions/{id}/annotations-data`.
 */
export const annotations = (client: HttpClient) => ({
  /** List the annotations on a version. */
  get: async (
    assetId: number | string,
    versionId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Annotation, "annotation" | "annotations">>> => {
    return client.get(
      `/api/assets/${assetId}/versions/${versionId}/annotations-data${buildQueryString(params)}`,
    );
  },

  /**
   * Add an annotation to a version.
   *
   * @example
   * ```ts
   * await aprimo.productivity.annotations.create(assetId, versionId, {
   *   type: "rectangle",
   *   page: 1,
   *   authorId: 1234,
   *   geometry: { boundingBox: { left: 10, bottom: 20, right: 30, top: 40 } },
   * });
   * ```
   */
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

  /** Remove an annotation from a version. */
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

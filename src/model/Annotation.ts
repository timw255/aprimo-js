import { ApiLink } from "./ApiLink";

/**
 * Representation of an annotation.
 */
export interface Annotation {
  /** The Comments of this annotation. */
  comments: string;
  /** The creator id (AprimoId) of this annotation. */
  createdBy: string;
  /** The date when this annotation was created. Format: date-time. */
  createdOn: string;
  /** The File Version Id (AprimoId) of this annotation. */
  fileVersionId: string;
  /** The Id (AprimoId) of this annotation. */
  id: string;
  /** The modifier id (AprimoId) of this annotation. */
  modifiedBy: string;
  /** The date when this annotation was updated. Format: date-time. */
  modifiedOn: string;
  /** The Page Number of this annotation. Format: int32. */
  pageNumber: number;
  /** The Parent Annotation Id (AprimoId) of this annotation. */
  parentAnnotationId: string;
  /** The XfdfString of this annotation. */
  xfdfString: string;
  _links: AnnotationLinks;
}

/**
 * HAL `_links` for {@link Annotation}.
 */
export interface AnnotationLinks {
  self: ApiLink;
}

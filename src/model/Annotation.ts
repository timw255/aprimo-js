import { ApiLink } from "./ApiLink";

export interface Annotation {
  comments: string;
  createdBy: string;
  createdOn: string;
  fileVersionId: string;
  id: string;
  modifiedBy: string;
  modifiedOn: string;
  pageNumber: number;
  parentAnnotationId: string;
  xfdfString: string;
  _links: AnnotationLinks;
}

export interface AnnotationLinks {
  self: ApiLink;
}

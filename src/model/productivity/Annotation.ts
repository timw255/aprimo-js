import { PmPagedLinks } from "./PmPagedCollection";

export interface AnnotationBoundingBox {
  left: number;
  bottom: number;
  right: number;
  top: number;
}

export interface AnnotationQuad {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
}

export interface AnnotationGeometry {
  boundingBox?: AnnotationBoundingBox;
  quads?: AnnotationQuad[];
}

export interface AnnotationStyle {
  color?: string;
  width?: number;
  opacity?: number;
}

export interface AnnotationContent {
  comment?: string;
  quotedText?: string;
  fixedLabel?: string;
}

export interface AnnotationReferenceLink {
  documentUuid: string;
}

export type AnnotationType = "rectangle" | "highlight" | "strikeout" | string;

export interface Annotation {
  annotationId: number;
  associatedNumber?: number;
  createdDate?: string;
  modifiedDate?: string;
  replyCount?: number;
  type: AnnotationType;
  page: number;
  authorId: number;
  geometry?: AnnotationGeometry;
  style?: AnnotationStyle;
  content?: AnnotationContent;
  referenceLink?: AnnotationReferenceLink;
  _links?: PmPagedLinks;
}

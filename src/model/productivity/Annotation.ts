import { PmPagedLinks } from "./PmPagedCollection";

/**
 * Axis-aligned bounding box used to anchor an annotation on a page.
 * Coordinates are in the page's coordinate space (origin at bottom-left
 * for PDFs).
 */
export interface AnnotationBoundingBox {
  /** Left edge (x of west side). */
  left: number;
  /** Bottom edge (y of south side). */
  bottom: number;
  /** Right edge (x of east side). */
  right: number;
  /** Top edge (y of north side). */
  top: number;
}

/**
 * A quadrilateral describing the actual character/word run covered by a
 * highlight or strikeout annotation. Four (x,y) corners in page space.
 */
export interface AnnotationQuad {
  /** First corner — x. */
  x1: number;
  /** First corner — y. */
  y1: number;
  /** Second corner — x. */
  x2: number;
  /** Second corner — y. */
  y2: number;
  /** Third corner — x. */
  x3: number;
  /** Third corner — y. */
  y3: number;
  /** Fourth corner — x. */
  x4: number;
  /** Fourth corner — y. */
  y4: number;
}

/**
 * Geometry on a {@link Annotation} — usually a bounding box, plus
 * optional per-run quads for highlight/strikeout coverage.
 */
export interface AnnotationGeometry {
  /** Outer bounding box. */
  boundingBox?: AnnotationBoundingBox;
  /** Per-run quads for text-selection annotations. */
  quads?: AnnotationQuad[];
}

/**
 * Visual style overrides on a {@link Annotation}.
 */
export interface AnnotationStyle {
  /** Stroke/fill color (CSS color string). */
  color?: string;
  /** Line width in page units. */
  width?: number;
  /** Opacity (0–1). */
  opacity?: number;
}

/**
 * Text content on a {@link Annotation}.
 */
export interface AnnotationContent {
  /** Free-form review comment. */
  comment?: string;
  /** Source text the annotation references (for highlight/strikeout). */
  quotedText?: string;
  /** System-provided label (cannot be edited by users). */
  fixedLabel?: string;
}

/**
 * Reference to another document on a link annotation.
 */
export interface AnnotationReferenceLink {
  /** UUID of the linked document. */
  documentUuid: string;
}

/**
 * Annotation shape. The PM API ships with `"rectangle"`, `"highlight"`,
 * and `"strikeout"`; the catch-all `string` keeps the SDK forward-compat
 * with tenant-specific shapes.
 */
export type AnnotationType = "rectangle" | "highlight" | "strikeout" | string;

/**
 * A page-anchored review annotation on a {@link DigitalAssetVersion}.
 */
export interface Annotation {
  /** Stable numeric identifier. */
  annotationId: number;
  /** Display-only sequence number for the annotation (server-assigned). */
  associatedNumber?: number;
  /** Creation timestamp. */
  createdDate?: string;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Number of replies threaded under the annotation. */
  replyCount?: number;
  /** Annotation shape. */
  type: AnnotationType;
  /** Page the annotation lives on (1-based). */
  page: number;
  /** PM user id of the author. */
  authorId: number;
  /** Page-space geometry. */
  geometry?: AnnotationGeometry;
  /** Visual style overrides. */
  style?: AnnotationStyle;
  /** Text content. */
  content?: AnnotationContent;
  /** Reference link, if this annotation is a link. */
  referenceLink?: AnnotationReferenceLink;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}

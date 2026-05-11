import { Annotation } from "./Annotation";

/**
 * Annotation information for a file version, including counts and status.
 */
export interface FileVersionAnnotationInfo {
  /** Total number of annotations on this file version. */
  annotationCount: number;
  /** Gets the annotations for the file version. */
  annotations: Annotation[];
  /** Indicates if there are unread annotations. */
  hasUnreadAnnotations: boolean;
  /**
   * Gets the total number of found annotations. Format: int32.
   */
  totalCount: number;
}

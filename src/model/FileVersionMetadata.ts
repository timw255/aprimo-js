/**
 * Technical metadata extracted from a file (EXIF, XMP, IPTC, etc.).
 */
export interface FileVersionMetadata {
  /** The category or namespace of the metadata (e.g., "EXIF", "XMP", "IPTC"). */
  category: string;
  /**
   * Gets the label of the additional file.
   */
  contentType: string;
  /** The metadata key/field name. */
  key: string;
  /**
   * The metadata value.
   */
  value: string;
}

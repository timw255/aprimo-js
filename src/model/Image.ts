/**
 * Representation of an image with dimensions and access URI.
 */
export interface Image {
  /** The file extension (e.g., "jpg", "png"). */
  extension: string;
  /** The height of the image in pixels. Format: int32. */
  height: number;
  /** The file size of the image in bytes. Format: int32. */
  size: number;
  /** The URI to access the image. This URL is typically time-limited (valid for ~4 hours). */
  uri: string;
  /** The width of the image in pixels. Format: int32. */
  width: number;
}

import { ApiLink } from "./ApiLink";
import { Image } from "./Image";

/**
 * Representation of a single preview and thumbnail of a FileVersion.
 */
export interface FilePreview {
  /**
   * Gets the created on.
   */
  createdOn: string;
  /**
   * Gets the Id of this preview. AprimoId.
   */
  id: string;
  /**
   * Returns true if this preview has been added manually. false is returned if the preview was created
   * automatically by any of the media engines.
   */
  isManual: boolean;
  /**
   * Returns true if this is the master preview.
   */
  isMaster: boolean;
  /** Dictionary of metadata key-value pairs for this preview. */
  metadata: { [key: string]: string };
  /**
   * Gets or sets the name of this preview. This name does not have to be unique, is not required and can be
   * maximum 50 characters long.
   */
  name: string;
  /**
   * Gets or sets the page number of this preview. This is used to indicate of which page of a multi-page
   * document this preview was created.
   */
  pageNumber: number;
  /**
   * Gets the value of the Tag of this object. This property will not be returned by default. In order to include
   * the property in the response, add a header with the name 'select-filepreview' and the value 'Tag' to your
   * request.
   */
  tag: string;
  /**
   * HAL `_links` for this preview.
   */
  _links: FilePreviewLinks;
  /**
   * HAL `_embedded` resources keyed by link rel.
   */
  _embedded?: {
    [K in Exclude<
      keyof FilePreviewLinks,
      "self"
    >]?: FilePreviewLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL link relations for a {@link FilePreview}.
 */
export interface FilePreviewLinks {
  /** Self link. */
  self: ApiLink;
  /** Preview image. */
  preview: ApiLink<Image>;
  /** Thumbnail image. */
  thumbnail: ApiLink<Image>;
}

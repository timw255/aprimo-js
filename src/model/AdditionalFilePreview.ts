import { ApiLink } from "./ApiLink";

/**
 * Representation of a single preview of an AdditionalFile.
 */
export interface AdditionalFilePreview {
  /**
   * Gets the Id of this preview. Format: int64.
   */
  id: number;
  /**
   * Gets the metadata of this preview.
   */
  metadata: string[];
  /**
   * Returns a path to a preview file or null if no preview file is assigned. This property will not be returned
   * by default. In order to include the property in the response, add a header with the name
   * 'select-additionalfilepreview' and the value 'Uri' to your request.
   */
  uri: string;
  /**
   * HAL `_links` for this preview.
   */
  _links: AdditionalFilePreviewLinks;
}

/**
 * HAL link relations for an {@link AdditionalFilePreview}.
 */
export interface AdditionalFilePreviewLinks {
  /** Self link. */
  self: ApiLink;
}

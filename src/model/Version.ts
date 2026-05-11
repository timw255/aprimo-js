import { ApiLink } from "./ApiLink";

/**
 * Representation of a version of the API.
 */
export interface Version {
  /** The URI for the documentation. */
  documentationUri: string;
  /** The version number. */
  version: string;
  /** HAL links for this version. */
  _links: VersionLinks;
}

/**
 * HAL links for a {@link Version}.
 */
export interface VersionLinks {
  /** Link to this version. */
  self: ApiLink;
}

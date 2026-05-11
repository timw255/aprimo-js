import { ApiLink } from "./ApiLink";
import { Version } from "./Version";

/**
 * Representation of a non-paged collection of Version items.
 */
export interface VersionCollection {
  /** A collection of version items. */
  items: Version[];
  /** HAL links for this collection. */
  _links: VersionCollectionLinks;
}

/**
 * HAL links for a {@link VersionCollection}.
 */
export interface VersionCollectionLinks {
  /** Link to this collection. */
  self: ApiLink;
}

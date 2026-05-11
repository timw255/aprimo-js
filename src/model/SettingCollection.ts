import { ApiLink } from "./ApiLink";
import { Setting } from "./Setting";

/**
 * Representation of a non-paged collection of Setting items.
 */
export interface SettingCollection {
  /** A collection of setting items. */
  items: Setting[];
  _links: SettingCollectionLinks;
}

export interface SettingCollectionLinks {
  self: ApiLink;
}

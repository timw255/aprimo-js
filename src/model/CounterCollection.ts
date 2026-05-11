import { ApiLink } from "./ApiLink";
import { Counter } from "./Counter";

/**
 * Representation of a non-paged collection of Counter items.
 */
export interface CounterCollection {
  /** A collection of counter items. */
  items: Counter[];
  _links: CounterCollectionLinks;
}

export interface CounterCollectionLinks {
  self: ApiLink;
}

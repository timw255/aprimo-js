import { ApiLink } from "./ApiLink";
import { Label } from "./Label";

/**
 * Representation of an ancestor of a single Classification.
 */
export interface LinkedClassification {
  /** The depth of the linked classification. The depth of the top level classification is 0. Format: int32. */
  depth: number;
  /** The id of the linked classification (provides a link to this resource). */
  id: string;
  /** A collection of localized labels. */
  labels: Label[];
  /** HAL-style hypermedia links for this resource. */
  _links: LinkedClassificationLinks;
}

/** HAL-style link relations exposed on a LinkedClassification. */
export interface LinkedClassificationLinks {
  /** Self link to this linked classification. */
  self: ApiLink;
}

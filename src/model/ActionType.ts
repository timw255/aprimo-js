import { ApiLink } from "./ApiLink";

/**
 * Representation of a check action type from the Check Framework. An action type identifies the
 * kind of validation a {@link Check} performs; its id is what `checks.create` takes as
 * `actionTypeId`.
 */
export interface ActionType {
  /** Gets the identifier for this action type. */
  id: string;
  /** Gets the name of this action type. */
  name: string;
  _links: ActionTypeLinks;
}

export interface ActionTypeLinks {
  self: ApiLink;
}

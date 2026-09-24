import { ApiLink } from "./ApiLink";
import { Label } from "./Label";

/**
 * Representation of a check in the check framework system. Checks define the validation rules and
 * actions that can be performed on file versions.
 */
export interface Check {
  /**
   * Gets or sets the ID of the check action type for this check. This references a check action
   * type from the Check Framework.
   */
  actionTypeId: string;
  /** Gets or sets the ID of the check category this check belongs to. */
  checkCategoryId: string;
  /** Gets the name of the check category this check belongs to. */
  checkCategoryName: string;
  /** Gets the creation datetime in UTC time. */
  createdOn: string;
  /** Gets or sets the unique identifier for this check. */
  id: string;
  /** Gets the multi-language labels for this check. */
  labels: Label[];
  /** Gets or sets the name of the check. */
  name: string;
  _links: CheckLinks;
  _embedded?: {
    [K in Exclude<keyof CheckLinks, "self">]?: CheckLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

export interface CheckLinks {
  self: ApiLink;
}

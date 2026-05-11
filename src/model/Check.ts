import { ApiLink } from "./ApiLink";

/**
 * Representation of a check in the check framework system. Checks define the validation rules and
 * actions that can be performed on file versions.
 */
export interface Check {
  /** Gets or sets the action class for this check. */
  actionClass: string;
  /**
   * Gets or sets the ID of the check action type for this check. This references a check action
   * type from the Check Framework.
   */
  actionTypeId: string;
  /** Gets or sets the ID of the check category this check belongs to. */
  checkCategoryId: string;
  /** Gets or sets the user that created this resource. */
  createdBy: string;
  /** Gets the creation datetime in UTC time. */
  createdOn: string;
  /** Gets or sets the unique identifier for this check. */
  id: string;
  /** Gets or sets the user that last modified this check. */
  modifiedBy: string;
  /** Gets or sets the last modification datetime in UTC time. */
  modifiedOn: string;
  /** Gets or sets the name of the check. */
  name: string;
  _links: CheckLinks;
}

export interface CheckLinks {
  self: ApiLink;
}

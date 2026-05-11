/**
 * Permission settings for a user group on a classification. These permissions control
 * what actions users in the group can perform on records linked to this classification.
 */
export interface ClassificationUserGroupPermission {
  /**
   * Access right for records in this classification.
   */
  accessRight:
    | "Noaccess"
    | "Read"
    | "Classify"
    | "Modify"
    | "Delete"
    | "Fullcontrol"
    | "Deletedenyfullcontrol"
    | "Modifydenydelete"
    | "Classifydenymodify"
    | "Readdenyclassify"
    | "Denyread"
    | "Inherit";
  /** The ID of the user group this permission applies to. */
  userGroupId: string;
}

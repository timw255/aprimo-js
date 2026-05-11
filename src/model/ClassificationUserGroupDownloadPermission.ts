/**
 * Download permission settings for a user group on a classification.
 */
export interface ClassificationUserGroupDownloadPermission {
  /**
   * Download permission for files in this classification.
   */
  accessRight: "Noaccess" | "Allow" | "Deny" | "Inherit";
  /** The ID of the user group this permission applies to. */
  userGroupId: string;
}

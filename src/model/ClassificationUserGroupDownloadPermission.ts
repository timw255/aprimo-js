/**
 * Download rights assignable on a classification. A separate set from
 * {@link ClassificationTreeAccessRight}; record and tree rights are rejected
 * here ("Could not convert 'Read' to DownloadRight").
 *
 * Values are PascalCase, matching what the API returns on read. `Inherit` is
 * write-only: it deletes the group's entry and is never returned by a read.
 */
export type ClassificationDownloadAccessRight =
  | "NoAccess"
  | "Allow"
  | "Deny"
  | "Inherit";

/**
 * Download permission settings for a user group on a classification.
 */
export interface ClassificationUserGroupDownloadPermission {
  /** Download permission for files in this classification. */
  accessRight: ClassificationDownloadAccessRight;
  /** The ID of the user group this permission applies to. */
  userGroupId: string;
}

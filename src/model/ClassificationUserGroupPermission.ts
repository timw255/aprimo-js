/**
 * Access rights assignable on a classification subtree
 * (`classifications.updateTreePermissions`).
 *
 * Values are PascalCase, matching what the API returns on read. The API
 * accepts any casing on write.
 *
 * `Inherit` is write-only: assigning it deletes the group's entry so the node
 * falls back to its parent. It is never returned by a read.
 */
export type ClassificationTreeAccessRight =
  | "NoAccess"
  | "Read"
  | "Classify"
  | "Modify"
  | "Delete"
  | "FullControl"
  | "DeleteDenyFullControl"
  | "ModifyDenyDelete"
  | "ClassifyDenyModify"
  | "ReadDenyClassify"
  | "DenyRead"
  | "Inherit";

/**
 * Access rights assignable on the records in a classification
 * (`classifications.updateRecordPermissions`).
 *
 * Same as {@link ClassificationTreeAccessRight} minus a bare `Classify`, which
 * the API rejects with "The Classify right is not supported for record
 * rights." The composite `ClassifyDenyModify` is accepted.
 */
export type ClassificationRecordAccessRight = Exclude<
  ClassificationTreeAccessRight,
  "Classify"
>;

/**
 * Permission settings for a user group on a classification subtree. These
 * permissions control what actions users in the group can perform on the
 * classification itself.
 */
export interface ClassificationUserGroupPermission {
  /** Access right for this classification subtree. */
  accessRight: ClassificationTreeAccessRight;
  /** The ID of the user group this permission applies to. */
  userGroupId: string;
}

/**
 * Permission settings for a user group on the records linked to a
 * classification.
 */
export interface ClassificationUserGroupRecordPermission {
  /** Access right for records in this classification. */
  accessRight: ClassificationRecordAccessRight;
  /** The ID of the user group this permission applies to. */
  userGroupId: string;
}

/**
 * Permission settings for a user group on a collection.
 */
export interface CollectionGroupPermission {
  /** The ID of the user group this permission applies to. AprimoId. */
  groupId: string;
  /**
   * Permission level for this group.
   * - `None`: No access
   * - `Read`: Can view the collection and its contents
   * - `Modify`: Can edit the collection
   */
  permission: "None" | "Read" | "Modify";
}

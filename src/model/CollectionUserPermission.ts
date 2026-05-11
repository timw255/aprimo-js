/**
 * Permission settings for a specific user on a collection.
 */
export interface CollectionUserPermission {
  /**
   * Permission level for this user.
   * - `None`: No access
   * - `Read`: Can view the collection and its contents
   * - `Modify`: Can edit the collection (add/remove records, change settings)
   */
  permission: "None" | "Read" | "Modify";
  /** The ID of the user this permission applies to. AprimoId. */
  userId: string;
}

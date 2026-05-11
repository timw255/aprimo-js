/**
 * Content sharing settings for a collection.
 */
export interface CollectionContentPermission {
  /** Whether content sharing is enabled for this collection. */
  contentSharingEnabled: boolean;
  /** Expiry date for content sharing access. Format: date-time. */
  contentSharingExpiryDate: string;
  /**
   * Permission level for shared content access.
   */
  permission: "None" | "Read";
}

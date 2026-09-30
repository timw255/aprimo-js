/**
 * Comment read-status summary for a collection, as returned by
 * `collections.getCommentsStatus`.
 */
export interface CollectionCommentsStatus {
  /** Number of comments on this collection the current user has not read. Format: int32. */
  unreadComments: number;
}

import { ApiLink } from "./ApiLink";
import { CollectionPermissions } from "./CollectionPermissions";
import { Comment } from "./Comment";
import { PagedCollection } from "./PagedCollection";
import { RecordCollection } from "./RecordCollection";
import { SearchExpression } from "../modules/search";
import { User } from "./User";

/**
 * Representation of a collection of records. Collections allow users to curate groups of records for
 * sharing, organization, or workflow purposes.
 *
 * Collection Types:
 * - `static`: Manual collection where records are explicitly added/removed
 * - `dynamic`: Smart collection based on a search expression that automatically includes matching records
 *
 * Available select options for embedding related resources: `ownedby`, `permissions`, `records`,
 * `comments`, `modifiedby`, `createdby`, `IsReadOnly`, `Tag`.
 */
export interface Collection {
  /** The creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** A description of this collection's purpose or contents. */
  description: string;
  /** The unique identifier (GUID) of this collection. AprimoId. */
  id: string;
  /** Indicates whether the current user has read-only access to this collection. */
  isReadOnly: boolean | null;
  /** The last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** The display name of this collection. */
  name: string;
  /** The ID of the user who owns this collection. AprimoId. */
  ownerId: string;
  /**
   * Legacy search criteria for dynamic collections. Returns null for static collections.
   * Use `searchExpression` for new implementations.
   */
  searchCriteria: { [key: string]: object } | null;
  /**
   * Search expression defining the records included in a dynamic collection.
   * Returns null for static collections.
   */
  searchExpression: SearchExpression | null;
  /** Custom XML tag data for this collection. Not returned by default; include `select-collection: Tag` header to retrieve. */
  tag: string;
  /**
   * The type of this collection.
   * - `Static`: Records are manually added to or removed from this collection
   * - `Dynamic`: Records are automatically included based on a search expression
   */
  type: "Static" | "Dynamic";
  /** HAL links for this collection. */
  _links: CollectionLinks;
  /** Embedded resources corresponding to non-self links when requested via the `select` parameter. */
  _embedded?: {
    [K in Exclude<
      keyof CollectionLinks,
      "self"
    >]?: CollectionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL links for a {@link Collection}.
 */
export interface CollectionLinks {
  /** Link to this collection. */
  self: ApiLink;
  /** Link to the user who owns this collection. */
  ownedby: ApiLink<User>;
  /** Link to the permission settings for this collection. */
  permissions: ApiLink<CollectionPermissions>;
  /** Link to records in this collection (static collections only). */
  records: ApiLink<RecordCollection>;
  /** Link to comments on this collection. */
  comments: ApiLink<PagedCollection<Comment>>;
  /** Link to the user who last modified this collection. */
  modifiedby: ApiLink<User>;
  /** Link to the user who created this collection. */
  createdby: ApiLink<User>;
}

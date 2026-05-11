import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * Representation of a public link — a CDN-published link to a file rendition or additional file.
 */
export interface PublicLink {
  /** Gets the id of the related additional file, if applicable. */
  additionalFileId: string;
  /** Gets whether the public link can be deleted or not. */
  canDelete: boolean;
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Gets the file size of the related additional file, if applicable. Format: int64. */
  fileSize: number;
  /** Gets the id of the related file version. */
  fileVersionId: string;
  /** Gets the id of public link. */
  id: string;
  /** Gets the last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /**
   * Get the origin of public link, i.e. Order or API.
   */
  origin: "Order" | "Api";
  /** Gets the CDN provider of the public link. */
  provider: string;
  /** Gets the id of the related record. */
  recordId: string;
  /** Gets the name for rendition. Valid if this is created from API. */
  renditionName: string;
  /**
   * Gets the publish status.
   */
  status: "Pending" | "Published" | "Failed" | "Overwritten" | "Tobedeleted";
  /** Get the uri for published file. */
  uri: string;
  _links: PublicLinkLinks;
  _embedded?: {
    [K in Exclude<
      keyof PublicLinkLinks,
      "self"
    >]?: PublicLinkLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface PublicLinkLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}

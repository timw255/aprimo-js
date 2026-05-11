import { ApiLink } from "./ApiLink";
import { OrderTargetAssetType } from "./OrderTarget";
import { RenditionType } from "./Rendition";
import { User } from "./User";

/**
 * Representation of a public URI — a publicly accessible URL for a record's file rendition,
 * preview, thumbnail, or additional file.
 */
export interface PublicUri {
  /** Gets whether the public URI can be deleted or not. */
  canDelete: boolean;
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Gets the file name. */
  fileName: string;
  /** Gets the file version id. */
  fileVersionId: string;
  /** Gets the id of public link. */
  id: string;
  /** Gets the last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /**
   * Get the origin of public link, i.e. Order or API.
   */
  origin: "Order" | "Api";
  /** Gets the CDN provider name. */
  provider: string;
  /** Gets the record id. */
  recordId: string;
  /** Gets the rendition id. */
  renditionId: string;
  /** Gets the rendition name. */
  renditionName: string;
  /**
   * Gets the rendition type.
   */
  renditionType: RenditionType;
  /**
   * Gets the publish status.
   */
  status: "Pending" | "Published" | "Failed" | "Overwritten" | "Tobedeleted";
  /** Gets the target id. */
  targetId: string;
  /**
   * Gets the target type.
   */
  targetType: OrderTargetAssetType;
  /** Get the uri for published file. */
  uri: string;
  _links: PublicUriLinks;
  _embedded?: {
    [K in Exclude<
      keyof PublicUriLinks,
      "self"
    >]?: PublicUriLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface PublicUriLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}

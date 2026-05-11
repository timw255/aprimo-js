import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * Representation of a comment.
 */
export interface Comment {
  /** Gets the context id of this comment. Format: int64. */
  contextId: number;
  /** Gets the creation datetime in UTC time. */
  createdOn: string;
  /** Gets the Id of this comment. */
  id: string;
  /** Gets the message of this comment. */
  message: string;
  /** Gets the last modification datetime in UTC time. */
  modifiedOn: string;
  /** Determines if this comment has been read by the current user. */
  read: boolean | null;
  /**
   * The Tag value of this object as valid XML. Returned only when the
   * `select-comment: Tag` header is sent.
   */
  tag: string;
  /** Gets the version number of the comment (number of edits). Format: int32. */
  version: number;
  _links: CommentLinks;
  _embedded?: {
    [K in Exclude<
      keyof CommentLinks,
      "self"
    >]?: CommentLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface CommentLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}

import { ApiLink } from "./ApiLink";
import { User } from "./User";

export interface Comment {
  contextId: number;
  createdOn: string;
  id: string;
  message: string;
  modifiedOn: string;
  tag: string;
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

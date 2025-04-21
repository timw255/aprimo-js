import { ApiLink } from "./ApiLink";
import { CollectionPermissions } from "./CollectionPermissions";
import { Comment } from "./Comment";
import { PagedCollection } from "./PagedCollection";
import { RecordCollection } from "./RecordCollection";
import { User } from "./User";

export interface Collection {
  createdOn: string;
  description: string;
  id: string;
  modifiedOn: string;
  name: string;
  ownerId: string;
  searchCriteria: { [key: string]: object };
  searchExpression: object;
  tag: string;
  type: string;
  _links: CollectionLinks;
  _embedded?: {
    [K in Exclude<
      keyof CollectionLinks,
      "self"
    >]?: CollectionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface CollectionLinks {
  self: ApiLink;
  ownedby: ApiLink<User>;
  permissions: ApiLink<CollectionPermissions>;
  records: ApiLink<RecordCollection>;
  comments: ApiLink<PagedCollection<Comment>>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}

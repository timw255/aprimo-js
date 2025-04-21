import { ApiLink } from "./ApiLink";
import { User } from "./User";

export interface PublicUri {
  canDelete: boolean;
  createdOn: string;
  fileName: string;
  fileVersionId: string;
  id: string;
  modifiedOn: string;
  origin: string;
  provider: string;
  recordId: string;
  renditionId: string;
  renditionName: string;
  renditionType: string;
  status: string;
  targetId: string;
  targetType: string;
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

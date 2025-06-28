import { ApiLink } from "./ApiLink";
import { User } from "./User";

export interface PublicLink {
  additionalFileId: string;
  canDelete: boolean;
  createdOn: string;
  fileSize: number;
  fileVersionId: string;
  id: string;
  modifiedOn: string;
  origin: string;
  provider: string;
  recordId: string;
  renditionName: string;
  status: string;
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

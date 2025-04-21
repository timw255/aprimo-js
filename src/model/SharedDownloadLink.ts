import { ApiLink } from "./ApiLink";
import { SharedDownloadLinkFileCollection } from "./SharedDownloadLinkFileCollection";
import { User } from "./User";

export interface SharedDownloadLink {
  createdOn: string;
  expiresOn: string;
  id: string;
  sendEmail: boolean;
  useVerification: boolean;
  _links: SharedDownloadLinkLinks;
  _embedded?: {
    [K in Exclude<
      keyof SharedDownloadLinkLinks,
      "self"
    >]?: SharedDownloadLinkLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface SharedDownloadLinkLinks {
  self: ApiLink;
  files: ApiLink<SharedDownloadLinkFileCollection>;
  createdby: ApiLink<User>;
}

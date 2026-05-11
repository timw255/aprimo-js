import { ApiLink } from "./ApiLink";
import { SharedDownloadLinkFileCollection } from "./SharedDownloadLinkFileCollection";
import { User } from "./User";

/**
 * Representation of a shared download link — a time-limited link that grants the recipient access
 * to download a set of files.
 */
export interface SharedDownloadLink {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Gets the expiration datetime in UTC time. Format: date-time. */
  expiresOn: string;
  /** The Id of this shared download link. */
  id: string;
  /** Gets whether an e-mail was sent. */
  sendEmail: boolean;
  /** Gets whether verification is required. */
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

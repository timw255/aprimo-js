import { ApiLink } from "./ApiLink";

export interface Version {
  documentationUri: string;
  version: string;
  _links: VersionLinks;
}

export interface VersionLinks {
  self: ApiLink;
}

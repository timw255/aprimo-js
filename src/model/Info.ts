import { ApiLink } from "./ApiLink";

export interface Info {
  releaseInfo: object;
  _links: InfoLinks;
}

export interface InfoLinks {
  self: ApiLink;
}

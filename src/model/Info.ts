import { ApiLink } from "./ApiLink";

/**
 * Provides data about this service.
 */
export interface Info {
  /** Info about the release. */
  releaseInfo: object;
  _links: InfoLinks;
}

export interface InfoLinks {
  self: ApiLink;
}

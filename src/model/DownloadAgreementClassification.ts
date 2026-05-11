import { ApiLink } from "./ApiLink";
import { Classification } from "./Classification";

/**
 * Representation of a download agreement's classification — links a download agreement to a
 * classification it applies to.
 */
export interface DownloadAgreementClassification {
  /** Gets the Id of this classification. */
  id: string;
  _links: DownloadAgreementClassificationLinks;
  _embedded?: {
    [K in Exclude<
      keyof DownloadAgreementClassificationLinks,
      "self"
    >]?: DownloadAgreementClassificationLinks[K] extends ApiLink<infer R>
      ? R
      : never;
  };
}

export interface DownloadAgreementClassificationLinks {
  self: ApiLink;
  target: ApiLink<Classification>;
}

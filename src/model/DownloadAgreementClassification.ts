import { ApiLink } from "./ApiLink";
import { Classification } from "./Classification";

export interface DownloadAgreementClassification {
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

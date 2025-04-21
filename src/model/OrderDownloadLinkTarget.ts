import { ApiLink } from "./ApiLink";

export interface OrderDownloadLinkTarget {
  errorDescription: string;
  fileVersionId: string;
  id: string;
  recordId: string;
  status: string;
  targetType: string;
  _links: OrderDownloadLinkTargetLinks;
}

export interface OrderDownloadLinkTargetLinks {
  self: ApiLink;
}

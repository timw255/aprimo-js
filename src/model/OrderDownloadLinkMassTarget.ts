import { ApiLink } from "./ApiLink";

export interface OrderDownloadLinkMassTarget {
  errorDescription: string;
  errors: object[];
  fileVersionId: string;
  id: string;
  recordId: string;
  recordIds: string[];
  status: string;
  targetType: string;
  _links: OrderDownloadLinkMassTargetLinks;
}

export interface OrderDownloadLinkMassTargetLinks {
  self: ApiLink;
}

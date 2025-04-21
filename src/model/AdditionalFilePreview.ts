import { ApiLink } from "./ApiLink";

export interface AdditionalFilePreview {
  id: number;
  metadata: string[];
  uri: string;
  _links: AdditionalFilePreviewLinks;
}

export interface AdditionalFilePreviewLinks {
  self: ApiLink;
}

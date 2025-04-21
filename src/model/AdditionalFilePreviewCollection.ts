import { AdditionalFilePreview } from "./AdditionalFilePreview";
import { ApiLink } from "./ApiLink";

export interface AdditionalFilePreviewCollection {
  items: AdditionalFilePreview[];
  _links: AdditionalFilePreviewCollectionLinks;
}

export interface AdditionalFilePreviewCollectionLinks {
  self: ApiLink;
}

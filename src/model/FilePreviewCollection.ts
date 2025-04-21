import { ApiLink } from "./ApiLink";
import { FilePreview } from "./FilePreview";

export interface FilePreviewCollection {
  items: FilePreview[];
  _links: FilePreviewCollectionLinks;
}

export interface FilePreviewCollectionLinks {
  self: ApiLink;
}

import { PmPagedLinks } from "./PmPagedCollection";

export interface DigitalAssetRendition {
  renditionId: number;
  versionId: number;
  title?: string;
  filename?: string;
  fileSize?: number;
  renditionUri?: string;
  attachmentVersionType?: number;
  modifiedDate?: string;
  _links?: PmPagedLinks;
}

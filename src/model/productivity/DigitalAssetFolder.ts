import { PmPagedLinks } from "./PmPagedCollection";

export interface DigitalAssetFolder {
  title?: string;
  categoryId?: number;
  digitalAssetId?: number;
  _links?: PmPagedLinks;
}

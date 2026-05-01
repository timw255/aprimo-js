import { PmPagedLinks } from "./PmPagedCollection";

export type GenericObjectType = "alpha" | "bravo" | "charlie" | "delta" | "echo";

export interface GenericObject {
  id: number;
  name: string;
  description?: string;
  createdBy?: number;
  createdDate?: string;
  modifiedBy?: number;
  modifiedDate?: string;
  relatedObjectId?: number;
  status?: string;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}

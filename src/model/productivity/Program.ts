import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

export interface Program {
  programId: number;
  title: string;
  ownerId?: number;
  description?: string;
  startDate?: string;
  endDate?: string;
  modifiedUser?: number;
  modifiedDate?: string;
  classificationId?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  accessList?: AccessListEntry[];
  _links?: PmPagedLinks;
}

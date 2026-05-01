import { PmPagedLinks } from "./PmPagedCollection";

export interface Treatment {
  treatmentId: number;
  title: string;
  description?: string;
  treatmentCode?: string;
  typeId?: number;
  channelId?: number;
  activeFlag?: number;
  activitySpecific?: number;
  currencyCode?: number;
  modifiedUser?: number;
  modifiedDate?: string;
  assignedActivityIds?: number[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}

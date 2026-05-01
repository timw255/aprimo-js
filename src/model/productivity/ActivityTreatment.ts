import { PmPagedLinks } from "./PmPagedCollection";

export interface EmbeddedTreatment {
  treatmentId: number;
  title?: string;
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
}

export interface ActivityTreatment {
  activityTreatmentId: number;
  treatmentId: number;
  activityId: number;
  currencyCode?: number;
  _embedded?: { treatment?: EmbeddedTreatment | EmbeddedTreatment[] };
  _links?: PmPagedLinks;
}

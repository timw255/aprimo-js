import { PmPagedLinks } from "./PmPagedCollection";

export interface Activity {
  activityId: number;
  name: string;
  description?: string;
  activityTypeId?: number;
  activityStateId?: number;
  ownerId?: number;
  administratorId?: number;
  beginDate?: string;
  endDate?: string;
  visualEndDate?: string;
  currencyCode?: number;
  scsId?: number;
  timeZoneId?: number;
  modifiedUser?: number;
  modifiedDate?: string;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}

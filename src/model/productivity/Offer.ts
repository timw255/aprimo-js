import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

export interface Offer {
  offerId: number;
  title: string;
  offerCode?: string;
  statusId?: number;
  description?: string;
  ownerId?: number;
  beginDate?: string;
  expirationDate?: string;
  modifiedUser?: number;
  modifiedDate?: string;
  activitySpecific?: number;
  accessList?: AccessListEntry[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}

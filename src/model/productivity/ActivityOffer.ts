import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

export interface EmbeddedOffer {
  title?: string;
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
}

export interface ActivityOffer {
  activityOfferId: number;
  offerId: number;
  activityId: number;
  revenuePerOffer?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _embedded?: { offer?: EmbeddedOffer | EmbeddedOffer[] };
  _links?: PmPagedLinks;
}

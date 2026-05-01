import { PmPagedLinks } from "./PmPagedCollection";
import { LookupListItem } from "./LookupListItem";

export interface LookupList {
  description: string;
  count: number;
  items: LookupListItem[];
  _links?: PmPagedLinks;
}

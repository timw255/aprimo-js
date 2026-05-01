import { PmPagedLinks } from "./PmPagedCollection";

export interface ExtendedAttributePicklistItem {
  itemId?: number;
  displayValue: string;
  sequence?: number;
  active?: boolean;
  systemName?: string;
}

export interface ExtendedAttributePicklist {
  listName?: string;
  description?: string;
  items: ExtendedAttributePicklistItem[];
  _links?: PmPagedLinks;
}

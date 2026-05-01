import { PmPagedLinks } from "./PmPagedCollection";

export interface SystemTypeRef {
  systemTypeName: string;
  uri: string;
}

export interface SystemTypeRefEntry {
  type: SystemTypeRef;
}

export interface SystemTypeCollection {
  systemtypes: SystemTypeRefEntry[];
  _links?: PmPagedLinks;
}

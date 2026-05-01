import { PmPagedLinks } from "./PmPagedCollection";

export interface DomainRight {
  name: string;
  functionID: number;
  description: string;
  _links?: PmPagedLinks;
}

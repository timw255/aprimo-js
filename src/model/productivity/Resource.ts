import { PmPagedLinks } from "./PmPagedCollection";

export interface Resource {
  id: string;
  value: string;
  _links?: PmPagedLinks;
}

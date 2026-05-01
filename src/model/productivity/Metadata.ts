import { PmPagedLinks } from "./PmPagedCollection";

export interface Metadata {
  objectName?: string;
  fields?: unknown[];
  [key: string]: unknown;
  _links?: PmPagedLinks;
}

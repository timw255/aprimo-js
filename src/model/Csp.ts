import { ApiLink } from "./ApiLink";

export interface Csp {
  domains: string[];
  _links: CspLinks;
}

export interface CspLinks {
  self: ApiLink;
}

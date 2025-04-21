import { ApiLink } from "./ApiLink";

export interface Setting {
  name: string;
  value: string;
  _links: SettingLinks;
}

export interface SettingLinks {
  self: ApiLink;
}

import { ApiLink } from "./ApiLink";

export type SettingScope = "user" | "usergroup" | "site" | "system";

export interface Setting {
  name: string;
  value: string;
  _links: SettingLinks;
}

export interface SettingLinks {
  self: ApiLink;
}

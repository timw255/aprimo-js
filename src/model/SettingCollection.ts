import { ApiLink } from "./ApiLink";
import { Setting } from "./Setting";

export interface SettingCollection {
  items: Setting[];
  _links: SettingCollectionLinks;
}

export interface SettingCollectionLinks {
  self: ApiLink;
}

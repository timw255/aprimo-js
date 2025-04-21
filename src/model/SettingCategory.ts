import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

export interface SettingCategory {
  createdOn: string;
  id: string;
  labels: Label[];
  modifiedOn: string;
  name: string;
  tag: string;
  _links: SettingCategoryLinks;
  _embedded?: {
    [K in Exclude<
      keyof SettingCategoryLinks,
      "self"
    >]?: SettingCategoryLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface SettingCategoryLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}

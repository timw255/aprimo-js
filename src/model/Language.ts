import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { User } from "./User";

export interface Language {
  createdOn: string;
  culture: string;
  id: string;
  isEnabledForFields: boolean;
  isEnabledForUI: boolean;
  modifiedOn: string;
  name: string;
  tag: string;
  _links: LanguageLinks;
  _embedded?: {
    [K in Exclude<
      keyof LanguageLinks,
      "self"
    >]?: LanguageLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface LanguageLinks {
  self: ApiLink;
  image: ApiLink<Image>;
  createdby: ApiLink<User>;
  modifiedby: ApiLink<User>;
}

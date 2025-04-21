import { ApiLink } from "./ApiLink";
import { TranslationItem } from "./TranslationItem";
import { User } from "./User";

export interface Translation {
  createdOn: string;
  id: string;
  localizedValues: TranslationItem[];
  modifiedOn: string;
  module: string;
  name: string;
  studio: string;
  tag: string;
  _links: TranslationLinks;
  _embedded?: {
    [K in Exclude<
      keyof TranslationLinks,
      "self"
    >]?: TranslationLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface TranslationLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}

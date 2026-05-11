import { ApiLink } from "./ApiLink";
import { TranslationItem } from "./TranslationItem";
import { User } from "./User";

/**
 * Representation of a translation.
 */
export interface Translation {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Gets or sets the translation identifier. */
  id: string;
  /** Collection of localized translation values. */
  localizedValues: TranslationItem[];
  /** Gets the last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** Gets or sets the module name for this translation. */
  module: string;
  /** Gets or sets the name of the element that should be translated. */
  name: string;
  /** Gets or sets the studio name for this translation. */
  studio: string;
  /**
   * Gets or sets the value for the Tag of this object. The value of this
   * property should be valid Xml. This property will not be returned by
   * default. In order to include the property in the response, add a header
   * with the name 'select-translation' and the value 'Tag' to your request.
   */
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

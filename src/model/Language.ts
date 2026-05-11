import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { User } from "./User";

/**
 * Representation of a Language.
 */
export interface Language {
  /** Gets the created on date in UTC of this language. Format: date-time. */
  createdOn: string;
  /** Gets the culture of this language. */
  culture: string;
  /** Gets the language identifier. */
  id: string;
  /** Gets or sets a value indicating whether this language is enabled for fields. */
  isEnabledForFields: boolean;
  /** Gets a value indicating whether this language is enabled for UI. */
  isEnabledForUI: boolean;
  /** Gets the modified on date in UTC of this language. Format: date-time. */
  modifiedOn: string;
  /** Gets the name of this language. */
  name: string;
  /**
   * Gets the Tag of this object. The value of this property has to be valid
   * Xml. This property will not be returned by default. In order to include
   * the property in the response, add a header with the name 'select-language'
   * and the value 'Tag' to your request.
   */
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

import { ApiLink } from "./ApiLink";

/**
 * Collection of fields that can be inherited by child records of a content type.
 */
export interface ContentTypeInheritableFieldCollection {
  /** Field entries with `fieldId` referencing each inheritable field. */
  items: { fieldId: string }[];
  _links: ContentTypeInheritableFieldCollectionLinks;
}

/**
 * HAL `_links` for {@link ContentTypeInheritableFieldCollection}.
 */
export interface ContentTypeInheritableFieldCollectionLinks {
  self: ApiLink;
}

import { ApiLink } from "./ApiLink";
import { FieldDefinition } from "./FieldDefinition";

/**
 * Representation of a non-paged collection of FieldDefinition items.
 */
export interface FieldDefinitionCollection {
  /** A collection of field definition items. */
  items: FieldDefinition[];
  /** HAL `_links` for the collection. */
  _links: FieldDefinitionCollectionLinks;
}

/**
 * HAL `_links` map for {@link FieldDefinitionCollection}.
 */
export interface FieldDefinitionCollectionLinks {
  /** Link to this collection resource. */
  self: ApiLink;
}

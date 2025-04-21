import { ApiLink } from "./ApiLink";
import { FieldDefinition } from "./FieldDefinition";

export interface FieldDefinitionCollection {
  items: FieldDefinition[];
  _links: FieldDefinitionCollectionLinks;
}

export interface FieldDefinitionCollectionLinks {
  self: ApiLink;
}

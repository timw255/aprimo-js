import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of a UserGroupListField. References to user
 * groups (values are stored as GUIDs).
 *
 * Spec schema: `Usergrouplistfielddefinition`. Discriminator value: `dataType = "usergrouplist"`.
 */
export interface UserGroupListFieldDefinition extends BaseFieldDefinition {
  /** The filter applied to this field. */
  filter: string;
}

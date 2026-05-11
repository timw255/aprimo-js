import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of a UserListField. References to users
 * (values are stored as GUIDs).
 *
 * Spec schema: `Userlistfielddefinition`. Discriminator value: `dataType = "userlist"`.
 */
export interface UserListFieldDefinition extends BaseFieldDefinition {
  /** The filter applied to this field. */
  filter: string;
}

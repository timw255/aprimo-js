import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of a RecordListField. References to records
 * (values are stored as GUIDs).
 *
 * Spec schema: `Recordlistfielddefinition`. Discriminator value: `dataType = "recordlist"`.
 */
export interface RecordListFieldDefinition extends BaseFieldDefinition {
  /** The id of the summary field (if any). */
  summaryFieldId: string;
}

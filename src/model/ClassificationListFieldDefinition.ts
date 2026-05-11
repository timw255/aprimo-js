import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * The classification display mode set as default in the selection dialog.
 */
export type SelectionDisplayMode = "Browse" | "Search" | "Dropdown";

/**
 * Representation of the definition of a ClassificationListField. Extends `BaseFieldDefinition`
 * with classification-list-specific properties.
 */
export interface ClassificationListFieldDefinition extends BaseFieldDefinition {
  /** Indicates if multiple value selection is allowed. */
  acceptMultipleOptions: boolean;
  /** The classification display mode that is set as default in the selection dialog. */
  defaultSelectionDisplayMode: SelectionDisplayMode;
  /** The filter of this field. */
  filter: string;
  /** Indicates if the field is synchronized with the linked classifications of a record. Cannot be changed once the field definition is created. */
  linkRecordToSelectedClassifications: boolean;
  /** Indicates whether only the lowest level values should be used for this field. */
  restrictValuesToLeafNodes: boolean;
  /** The Id of the classification that is set as root for this field. Returns an empty guid if no root is specified. */
  rootId: string;
}

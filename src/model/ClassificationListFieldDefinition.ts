import { BaseFieldDefinition } from "./BaseFieldDefinition";

export type SelectionDisplayMode = "Browse" | "Search" | "Dropdown";

export interface ClassificationListFieldDefinition extends BaseFieldDefinition {
  acceptMultipleOptions: boolean;
  defaultSelectionDisplayMode: SelectionDisplayMode;
  filter: string;
  linkRecordToSelectedClassifications: boolean;
  restrictValuesToLeafNodes: boolean;
  rootId: string;
}

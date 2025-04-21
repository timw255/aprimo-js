import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { OptionListItemDefinition } from "./OptionListItemDefinition";

export type OptionListSortOrder = "Label" | "Name" | "SortIndex";

export interface OptionListFieldDefinition extends BaseFieldDefinition {
  acceptMultipleOptions: boolean;
  filter: string;
  items: OptionListItemDefinition[];
  range: string;
  sortOrder: OptionListSortOrder;
}

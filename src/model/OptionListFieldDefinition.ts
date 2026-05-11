import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { OptionListItemDefinition } from "./OptionListItemDefinition";

/**
 * Sort order for option list items.
 */
export type OptionListSortOrder = "Label" | "Name" | "SortIndex";

/**
 * Representation of the definition of an OptionListField. Selection from predefined
 * options; values are stored as GUIDs referencing {@link OptionListItemDefinition}s.
 *
 * Spec schema: `Optionlistfielddefinition`. Discriminator value: `dataType = "optionlist"`.
 */
export interface OptionListFieldDefinition extends BaseFieldDefinition {
  /** Whether multiple options can be selected. */
  acceptMultipleOptions: boolean;
  /** The filter applied to this field. */
  filter: string;
  /** Collection of option list items available for this field. */
  items: OptionListItemDefinition[];
  /** Sort order. */
  sortOrder: OptionListSortOrder;
}

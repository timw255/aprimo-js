import { Label } from "./Label";
import { Image } from "./Image";

/**
 * Represents the definition of an option list item.
 */
export interface OptionListItemDefinition {
  /** Defines the state of the option in DAM UI. If it's disabled, it can't be selected in DAM UI. */
  disabledInDAMUI: boolean;
  /** The Id of the OptionListItemDefinition. */
  id: string;
  /** Optional image associated with the option item. */
  image: Image;
  /** The definition label. */
  label: string;
  /** A collection of Label items. */
  labels: Label[];
  /** The definition name. */
  name: string;
  /** The definition sort index. Format: int32. */
  sortIndex: number;
  /** The definition tag. This property will not be returned by default. */
  tag: string;
}

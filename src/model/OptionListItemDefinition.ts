import { Label } from "./Label";
import { Image } from "./Image";

export interface OptionListItemDefinition {
  disabledInDAMUI: boolean;
  id: string;
  image: Image;
  label: string;
  labels: Label[];
  name: string;
  sortIndex: number;
  tag: string;
}

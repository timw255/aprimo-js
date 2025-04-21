import { Label } from "./Label";

export interface Option {
  id?: string;
  name: string;
  labels: Label[];
  tag?: string;
  disabledInDAMUI?: boolean;
}

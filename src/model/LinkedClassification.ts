import { ApiLink } from "./ApiLink";
import { Label } from "./Label";

export interface LinkedClassification {
  depth: number;
  id: string;
  labels: Label[];
  _links: LinkedClassificationLinks;
}

export interface LinkedClassificationLinks {
  self: ApiLink;
}

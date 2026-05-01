import { PmPagedLinks } from "./PmPagedCollection";

export interface ActivityCell {
  activityCellId: number;
  title: string;
  description?: string;
  activityId: number;
  code?: string;
  sourceCode?: string;
  estimatedQuantity?: number;
  actualQuantity?: number;
  actualResponse?: number;
  modifiedUser?: number;
  modifiedDate?: string;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}

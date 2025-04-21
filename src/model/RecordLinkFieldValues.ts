import { RecordLinkItem } from "./RecordLinkItem";

export interface RecordLinkFieldValues {
  children: RecordLinkItem[];
  languageId: string;
  links: RecordLinkItem[];
  modifiedOn: string;
  parents: RecordLinkItem[];
  readOnly: boolean;
}

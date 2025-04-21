import { ClassificationListFieldDefinition } from "./ClassificationListFieldDefinition";
import { DateFieldDefinition } from "./DateFieldDefinition";
import { DateTimeFieldDefinition } from "./DateTimeFieldDefinition";
import { DurationFieldDefinition } from "./DurationFieldDefinition";
import { HtmlFieldDefinition } from "./HtmlFieldDefinition";
import { HyperlinkListFieldDefinition } from "./HyperlinkListFieldDefinition";
import { JsonFieldDefinition } from "./JsonFieldDefinition";
import { LanguageListFieldDefinition } from "./LanguageListFieldDefinition";
import { MultiLineTextFieldDefinition } from "./MultiLineTextFieldDefinition";
import { NumericFieldDefinition } from "./NumericFieldDefinition";
import { OptionListFieldDefinition } from "./OptionListFieldDefinition";
import { RecordLinkFieldDefinition } from "./RecordLinkFieldDefinition";
import { RecordListFieldDefinition } from "./RecordListFieldDefinition";
import { RichContentFieldDefinition } from "./RichContentFieldDefinition";
import { SingleLineTextFieldDefinition } from "./SingleLineTextFieldDefinition";
import { TextListFieldDefinition } from "./TextListFieldDefinition";
import { TimeFieldDefinition } from "./TimeFieldDefinition";
import { UserGroupListFieldDefinition } from "./UserGroupListFieldDefinition";
import { UserListFieldDefinition } from "./UserListFieldDefinition";

export type FieldDefinition =
  | SingleLineTextFieldDefinition
  | MultiLineTextFieldDefinition
  | HtmlFieldDefinition
  | NumericFieldDefinition
  | DateFieldDefinition
  | DateTimeFieldDefinition
  | TimeFieldDefinition
  | ClassificationListFieldDefinition
  | OptionListFieldDefinition
  | RecordListFieldDefinition
  | UserListFieldDefinition
  | UserGroupListFieldDefinition
  | DurationFieldDefinition
  | JsonFieldDefinition
  | LanguageListFieldDefinition
  | RichContentFieldDefinition
  | TextListFieldDefinition
  | HyperlinkListFieldDefinition
  | RecordLinkFieldDefinition;

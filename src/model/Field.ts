import { ClassificationListField } from "./ClassificationListField";
import { DateField } from "./DateField";
import { DateTimeField } from "./DateTimeField";
import { DurationField } from "./DurationField";
import { HtmlField } from "./HtmlField";
import { HyperlinkListField } from "./HyperlinkListField";
import { JsonField } from "./JsonField";
import { LanguageListField } from "./LanguageListField";
import { MultiLineTextField } from "./MultiLineTextField";
import { NumericField } from "./NumericField";
import { OptionListField } from "./OptionListField";
import { RecordLinkField } from "./RecordLinkField";
import { RecordListField } from "./RecordListField";
import { RichContentField } from "./RichContentField";
import { SingleLineTextField } from "./SingleLineTextField";
import { TextListField } from "./TextListField";
import { TimeField } from "./TimeField";
import { UserGroupListField } from "./UserGroupListField";
import { UserListField } from "./UserListField";

export type Field =
  | SingleLineTextField
  | MultiLineTextField
  | HtmlField
  | NumericField
  | DateField
  | DateTimeField
  | TimeField
  | ClassificationListField
  | OptionListField
  | RecordListField
  | UserListField
  | UserGroupListField
  | DurationField
  | JsonField
  | LanguageListField
  | RichContentField
  | TextListField
  | HyperlinkListField
  | RecordLinkField;

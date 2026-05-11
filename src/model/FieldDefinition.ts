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

/**
 * Definition of a metadata field that can be attached to records, files, classifications, or users.
 * Field definitions specify the data type, validation rules, and behavior of metadata fields.
 *
 * This is a discriminated union over the `dataType` field. The spec lower-cases the
 * discriminator values: `singlelinetext`, `multilinetext`, `numeric`, `datetime`, `date`,
 * `time`, `optionlist`, `duration`, `userlist`, `usergrouplist`, `html`, `json`,
 * `classificationlist`, `recordlist`, `recordlink`, `languagelist`, `textlist`,
 * `hyperlinklist` (plus `none`).
 *
 * Available select options (for HAL embedding / header `select-fielddefinition`):
 * - `createdby` — User who created this field definition
 * - `modifiedby` — User who last modified this field definition
 * - `Tag` — Custom XML tag data
 */
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

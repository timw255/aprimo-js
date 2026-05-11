/**
 * Source for the record title.
 * - `Field`: Use the value of a specified field
 * - `Filename`: Use the filename of the master file
 */
export type TitleOption = "Field" | "FileName";

/**
 * Configuration for how record display titles are computed.
 */
export interface TitleConfiguration {
  /** Source for the record title. Enum: "Field" | "Filename". */
  option: TitleOption;
  /** ID of the field to use as title. Required when `option` is `Field`. */
  fieldId?: string;
  /**
   * Whether to include the file extension in the displayed title.
   */
  showExtension?: boolean;
}

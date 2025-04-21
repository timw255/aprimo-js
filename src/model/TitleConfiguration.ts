export type TitleOption = "Field" | "FileName";

export interface TitleConfiguration {
  option: TitleOption;
  fieldId?: string;
  showExtension?: boolean;
}

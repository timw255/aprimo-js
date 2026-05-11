/**
 * Type discriminator for a maintenance action.
 */
export type MaintenanceActionType =
  | "appendtextfield"
  | "assignwatermarkrecord"
  | "classificationcopy"
  | "classificationmove"
  | "classifyrecord"
  | "delete"
  | "forcedirty"
  | "overwritefield"
  | "recordsave"
  | "refreshfilerecord"
  | "refreshfiletyperecord"
  | "replacetextfield"
  | "resettodefaultfield"
  | "touch"
  | "unclassifyrecord"
  | "changecontenttype"
  | "field"
  | "order"
  | "processdeferred"
  | "textsummary"
  | "updateclassmappings"
  | "basicaction"
  | "createpresetcrops"
  | "aprimoai"
  | "createreviewfile"
  | "appendtofield"
  | "removefromfield"
  | "createrenditions"
  | "changerecordstatus"
  | "rulemaintenance"
  | "fileversionrunmediaengine"
  | "fileversioncalculatecrc"
  | "fileversionmovefilestofinalstore"
  | "classificationsave"
  | "packageingestion"
  | "resetfilestate"
  | "trimvideo"
  | "refreshurltopdf"
  | "predictivemetadata"
  | "enhancedcaptioning"
  | "cropimage"
  | "resizeimage"
  | "resizeimagewithclippingpath"
  | "transcodevideo"
  | "trimvideoorder"
  | "createpackage"
  | "refreshonakamaicdn"
  | "refreshonpubliccdn"
  | "updatexmpmetadata"
  | "createpubliclinks"
  | "deletepubliclinks"
  | "cropimageorder"
  | "packagedownloadorder"
  | "resizewithclippingpath"
  | "cleanupblobs"
  | "generatecontactsheet";

/**
 * Represents a maintenance action.
 */
export interface MaintenanceAction {
  /**
   * Type of the action.
   */
  action: MaintenanceActionType;
  /** Short description of the action. */
  description: string;
  /** Name of the action. */
  label: string;
  /** Action-specific parameters (open-ended; structure depends on `action`). */
  parameters: { [key: string]: object };
}

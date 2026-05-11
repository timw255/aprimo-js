/**
 * Represents information about a linked file version.
 */
export interface LinkedVersionInfo {
  /** The File id the FileVersion belongs to. */
  fileId: string;
  /** The id of the FileVersion that is linked. */
  fileVersionId: string;
  /** The id of the FileVersion this link belongs to. */
  linkSourceVersionId: string;
  /**
   * Whether the FileVersionId is used in linkSourceVersionId or contains a link to linkSourceVersionId.
   */
  linkType: "Contains" | "Usedin";
  /** The Record id the FileVersion belongs to. */
  recordId: string;
}

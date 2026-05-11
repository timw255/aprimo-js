/**
 * Information about potential duplicates of a file version based on checksum matching.
 */
export interface FileVersionDuplicateInfo {
  /**
   * Returns the mode used to determine if files are a duplicate.
   */
  detectionMode: "filenameandcontent" | "filename" | "filecontent";
  /** IDs of file versions that are duplicates of this file. */
  duplicateFileVersionIds: string[];
  /** Gets the duplicates of the file version to which the user has (read) access. */
  duplicates: object[];
  /** Indicates if duplicate files were found. */
  hasDuplicates: boolean;
  /**
   * Gets the duplicate status of the file version.
   */
  status: "undetermined" | "noduplicate" | "duplicate";
  /**
   * Gets the total number of found duplicates. Format: int32.
   */
  totalCount: number;
}

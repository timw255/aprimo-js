import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A version of a {@link DigitalAsset} — pairs a specific file (uploaded
 * via the PM {@link uploader}) with version metadata, DAM-availability
 * flags, and a thumbnail/preview state machine.
 */
export interface DigitalAssetVersion {
  /** Stable numeric identifier. */
  versionId: number;
  /** Whether this version is the asset's default. */
  isDefaultVersion?: boolean;
  /** Parent asset id. */
  digitalAssetId: number;
  /** Parent asset title. */
  digitalAssetTitle?: string;
  /** Parent asset type id. */
  digitalAssetType?: number;
  /** Free-form version number string (e.g., `"1.2"`). */
  versionNumber?: string;
  /** Version date. */
  versionDate?: string;
  /** Legacy-UI detail-page URI. */
  legacyDetailsUri?: string;
  /** Legacy-UI annotation-viewer URI. */
  legacyAnnotationViewerUri?: string;
  /** Legacy-UI read-only annotation-viewer URI. */
  legacyAnnotationViewerReadOnlyUri?: string;
  /** Legacy-UI offline annotation-viewer URI. */
  legacyOfflineAnnotationViewerUri?: string;
  /** Thumbnail-processing status id. */
  thumbnailStatus?: number;
  /** File extension (without leading dot). */
  extension?: string;
  /** Direct thumbnail URI. */
  thumbnailUri?: string;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Creation timestamp. */
  createdDate?: string;
  /** Whether a rendition exists for this version. */
  hasRendition?: boolean;
  /** Annotation file type id (PDF, image, etc.). */
  annotationFileType?: number;
  /** Whether the version is a reference document. */
  isReferenceDocument?: boolean;
  /** Whether DAM has a video preview ready. */
  isDamVideoPreviewAvailable?: boolean;
  /** Whether DAM has an image/document preview ready. */
  isDamPreviewAvailable?: boolean;
  /** Whether the underlying file is downloadable from DAM. */
  isDamFileAvailable?: boolean;
  /** Whether XFDF annotations exist. */
  hasXfdfAnnotations?: boolean;
  /** Whether the file is eligible to be served from DAM. */
  isEligibleForDamContent?: boolean;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}

/**
 * A free-form comment on a {@link DigitalAssetVersion}. Comments thread
 * via `numberOfReplies` (server-computed).
 */
export interface DigitalAssetVersionComment {
  /** Stable numeric identifier. */
  id: number;
  /** PM user id of the comment author. */
  creatorId?: number;
  /** Comment-status id (read, resolved, etc.). */
  status?: number;
  /** Page number the comment is anchored to (for paginated documents). */
  pageNumber?: number;
  /** Creation timestamp. */
  createdDate?: string;
  /** Style id (color/format). */
  style?: number;
  /** Author first name. */
  userFirstName?: string;
  /** Author last name. */
  userLastName?: string;
  /** Count of replies under this comment. */
  numberOfReplies?: number;
}

/**
 * A tag (positional pin) on a {@link DigitalAssetVersion}. Like a
 * comment, but anchored to a 2-D location on the page for review
 * workflows.
 */
export interface DigitalAssetVersionTag {
  /** Stable numeric identifier. */
  tagId: number;
  /** Parent version id. */
  versionId: number;
  /** PM user id of the tag author. */
  creatorId?: number;
  /** Tag-status id. */
  status?: number;
  /** Whether the tag has replies. */
  hasReplies?: boolean;
  /** Creation timestamp. */
  createdDate?: string;
  /** Style id (color/icon). */
  style?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the last modifier. */
  modifiedBy?: number;
  /** Reply count. */
  numberOfReplies?: number;
  /** Author first name. */
  userFirstName?: string;
  /** Author last name. */
  userLastName?: string;
  /** Page the tag is anchored on. */
  pageNumber?: number;
  /** Print-output position id, for print review. */
  printNumber?: number;
  /** Encoded geometry / location string. */
  location?: string;
  /** Display title. */
  title?: string;
  /** Parent asset id. */
  assetId?: number;
  /** Whether the calling user can open the viewer to see the tag. */
  canAccessViewer?: boolean;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** Versioning counter for the tag itself. */
  tagVersion?: number;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}

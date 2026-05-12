import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A version of an {@link Attachment}. Each version carries its own file
 * (uploaded via PM {@link uploader} in `attachment: true` mode), preview
 * state, and comment stream.
 */
export interface AttachmentVersion {
  /** Stable numeric identifier. */
  versionId: number;
  /** Whether this version is the default. */
  isDefaultVersion?: boolean;
  /** Parent attachment id. */
  attachmentId: number;
  /** Original file name. */
  filename?: string;
  /** File extension (without leading dot). */
  extension?: string;
  /** Direct thumbnail URI. */
  thumbnailUri?: string;
  /** Direct download URI. */
  downloadUri?: string;
  /** Thumbnail-processing status id. */
  thumbnailStatus?: number;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Creation timestamp. */
  createdDate?: string;
  /** Version type id. */
  versionType?: number;
  /** PM user id of the creator. */
  creatorId?: number;
  /** File id returned by the PM uploader. */
  fileId?: string;
  /** Annotation file type id. */
  annotationFileType?: number;
  /** Author comments on the version. */
  versionComments?: string;
  /** Whether to send notifications on changes. */
  sendNotification?: number;
  /** Version URL override. */
  versionUrl?: string;
  /** Sitemap-publishing status id. */
  sitemapStatus?: number;
  /** Web-PDF generation status id. */
  webPDFStatus?: number;
  /** Web-PDF published flag. */
  webPDFPublished?: number;
  /** Whether annotations exist on this version. */
  hasAnnotations?: boolean;
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
 * A free-form comment on an {@link AttachmentVersion}.
 */
export interface AttachmentVersionComment {
  /** Stable numeric identifier. */
  id: number;
  /** Comment body. */
  commentText?: string;
  /** PM user id of the author. */
  creatorId?: number;
  /** Comment-status id (read, resolved, etc.). */
  status?: number;
  /** Page number the comment is anchored to. */
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

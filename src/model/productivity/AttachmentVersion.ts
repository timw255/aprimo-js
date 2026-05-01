import { PmPagedLinks } from "./PmPagedCollection";

export interface AttachmentVersion {
  versionId: number;
  isDefaultVersion?: boolean;
  attachmentId: number;
  filename?: string;
  extension?: string;
  thumbnailUri?: string;
  downloadUri?: string;
  thumbnailStatus?: number;
  modifiedUser?: number;
  modifiedDate?: string;
  createdDate?: string;
  versionType?: number;
  creatorId?: number;
  fileId?: string;
  annotationFileType?: number;
  versionComments?: string;
  sendNotification?: number;
  versionUrl?: string;
  sitemapStatus?: number;
  webPDFStatus?: number;
  webPDFPublished?: number;
  hasAnnotations?: boolean;
  isDamFileAvailable?: boolean;
  hasXfdfAnnotations?: boolean;
  isEligibleForDamContent?: boolean;
  _links?: PmPagedLinks;
}

export interface AttachmentVersionComment {
  id: number;
  commentText?: string;
  creatorId?: number;
  status?: number;
  pageNumber?: number;
  createdDate?: string;
  style?: number;
  userFirstName?: string;
  userLastName?: string;
  numberOfReplies?: number;
}

import { PmPagedLinks } from "./PmPagedCollection";

export interface DigitalAssetVersion {
  versionId: number;
  isDefaultVersion?: boolean;
  digitalAssetId: number;
  digitalAssetTitle?: string;
  digitalAssetType?: number;
  versionNumber?: string;
  versionDate?: string;
  legacyDetailsUri?: string;
  legacyAnnotationViewerUri?: string;
  legacyAnnotationViewerReadOnlyUri?: string;
  legacyOfflineAnnotationViewerUri?: string;
  thumbnailStatus?: number;
  extension?: string;
  thumbnailUri?: string;
  modifiedDate?: string;
  createdDate?: string;
  hasRendition?: boolean;
  annotationFileType?: number;
  isReferenceDocument?: boolean;
  isDamVideoPreviewAvailable?: boolean;
  isDamPreviewAvailable?: boolean;
  isDamFileAvailable?: boolean;
  hasXfdfAnnotations?: boolean;
  isEligibleForDamContent?: boolean;
  _links?: PmPagedLinks;
}

export interface DigitalAssetVersionComment {
  id: number;
  creatorId?: number;
  status?: number;
  pageNumber?: number;
  createdDate?: string;
  style?: number;
  userFirstName?: string;
  userLastName?: string;
  numberOfReplies?: number;
}

export interface DigitalAssetVersionTag {
  tagId: number;
  versionId: number;
  creatorId?: number;
  status?: number;
  hasReplies?: boolean;
  createdDate?: string;
  style?: number;
  modifiedDate?: string;
  modifiedBy?: number;
  numberOfReplies?: number;
  userFirstName?: string;
  userLastName?: string;
  pageNumber?: number;
  printNumber?: number;
  location?: string;
  title?: string;
  assetId?: number;
  canAccessViewer?: boolean;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  tagVersion?: number;
  _links?: PmPagedLinks;
}

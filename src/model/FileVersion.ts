import { AdditionalFileCollection } from "./AdditionalFileCollection";
import { ApiLink } from "./ApiLink";
import { FilePreview } from "./FilePreview";
import { FilePreviewCollection } from "./FilePreviewCollection";
import { FileType } from "./FileType";
import { FileVersionAnnotationInfo } from "./FileVersionAnnotationInfo";
import { FileVersionDuplicateInfo } from "./FileVersionDuplicateInfo";
import { FileVersionMetadata } from "./FileVersionMetadata";
import { FileVersionPermissions } from "./FileVersionPermissions";
import { Image } from "./Image";
import { LinkedVersionInfoCollection } from "./LinkedVersionInfoCollection";
import { PublicLinkCollection } from "./PublicLinkCollection";
import { PublicUriCollection } from "./PublicUriCollection";
import { RenditionCollection } from "./RenditionCollection";
import { User } from "./User";
import { Watermark } from "./Watermark";

export interface FileVersion {
  annotationInfo: FileVersionAnnotationInfo;
  comment: string;
  content: string;
  crc32: number;
  createdOn: string;
  duplicateInfo: FileVersionDuplicateInfo;
  fileCreatedOn: string;
  fileExtension: string;
  fileModifiedOn: string;
  fileName: string;
  fileSize: number;
  fileState: string;
  id: string;
  isLatest: boolean;
  metadata: { [key: string]: FileVersionMetadata };
  preventDownload: boolean;
  publications: string[];
  versionLabel: string;
  versionNumber: number;
  watermarkId: string;
  watermarkType: string;
  _links: FileVersionLinks;
  _embedded?: {
    [K in Exclude<
      keyof FileVersionLinks,
      "self"
    >]?: FileVersionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface FileVersionLinks {
  self: ApiLink;
  filetype: ApiLink<FileType>;
  filepreviews: ApiLink<FilePreviewCollection>;
  masterfilepreview: ApiLink<FilePreview>;
  preview: ApiLink<Image>;
  thumbnail: ApiLink<Image>;
  additionalfiles: ApiLink<AdditionalFileCollection>;
  renditions: ApiLink<RenditionCollection>;
  publiclinks: ApiLink<PublicLinkCollection>;
  watermark: ApiLink<Watermark>;
  publicuris: ApiLink<PublicUriCollection>;
  permissions: ApiLink<FileVersionPermissions>;
  usedin: ApiLink<LinkedVersionInfoCollection>;
  contains: ApiLink<LinkedVersionInfoCollection>;
  createdby: ApiLink<User>;
}

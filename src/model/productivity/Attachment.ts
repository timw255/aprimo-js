import { PmPagedLinks } from "./PmPagedCollection";

export interface Attachment {
  attachmentId: number;
  title: string;
  objectId?: number;
  objectTypeId?: number;
  attachmentTypeId?: number;
  projectVisibility?: boolean;
  attachmentType?: string;
  modifiedUser?: number;
  modifiedDate?: string;
  creatorId?: number;
  customThumb?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  projects?: unknown[];
  activityProjectList?: number;
  sendNotification?: number;
  _links?: PmPagedLinks;
}

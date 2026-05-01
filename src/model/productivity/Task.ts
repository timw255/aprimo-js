import { PmPagedLinks } from "./PmPagedCollection";

export interface Task {
  taskId: number;
  projectId?: number;
  name?: string;
  description?: string;
  status?: number;
  beginDate?: string;
  endDate?: string;
  duration?: number;
  ownerId?: number;
  assignedTo?: number;
  modifiedDate?: string;
  modifiedUser?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}

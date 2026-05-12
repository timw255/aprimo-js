import { PmPagedLinks } from "./PmPagedCollection";

/** A PM task. */
export interface Task {
  /** Stable numeric identifier. */
  taskId: number;
  /** Parent project id. */
  projectId?: number;
  /** Display name. */
  name?: string;
  /** Long-form description. */
  description?: string;
  /** Workflow state id. */
  status?: number;
  /** Start date. */
  beginDate?: string;
  /** End date. */
  endDate?: string;
  /** Duration in working days. */
  duration?: number;
  /** PM user id of the owner. */
  ownerId?: number;
  /** PM user id of the primary assignee. */
  assignedTo?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}

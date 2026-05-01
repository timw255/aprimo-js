import { PmPagedLinks } from "./PmPagedCollection";

export interface UserRole {
  roleId: number;
  name: string;
  description?: string;
  activeFlag: number;
  currencyCode?: number;
  laborRateBase?: number;
  excludeFromChatboards?: number;
  usedInAnnotations?: number;
  color?: string;
  modifiedUser?: number;
  modifiedDate?: string;
  users?: { userId: number }[];
  groups?: { userId: number }[];
  _links?: PmPagedLinks;
}

import { PmPagedLinks } from "./PmPagedCollection";

export interface GroupRight {
  functionID: number;
  functionName?: string;
  domainID?: number;
}

export interface GroupDomainRights {
  domainId: number;
  rights: GroupRight[];
}

export interface Group {
  groupId: number;
  name: string;
  status?: number;
  financeGroup?: number;
  description?: string;
  adamUserId?: string;
  modifiedBy?: number;
  modifiedDate?: string;
  createdBy?: number;
  createdDate?: string;
  users?: { userId: number }[];
  roles?: { roleId: number }[];
  domainRights?: GroupDomainRights[];
  _links?: PmPagedLinks;
}

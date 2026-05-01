import { PmPagedLinks } from "./PmPagedCollection";
import { TeamMember } from "./TeamMember";

export interface Team {
  teamId: number;
  name: string;
  description?: string;
  teamMembers?: TeamMember[];
  _links?: PmPagedLinks;
}

import { HttpClient } from "../../http";
import { activities } from "./activities";
import { activityCells } from "./activity-cells";
import { activityCellTreatments } from "./activity-cell-treatments";
import { activityMilestones } from "./activity-milestones";
import { activityOffers } from "./activity-offers";
import { activityProposals } from "./activity-proposals";
import { activityRoles } from "./activity-roles";
import { activityTreatments } from "./activity-treatments";
import { annotations } from "./annotations";
import { attachments } from "./attachments";
import { attachmentVersions } from "./attachment-versions";
import { brands } from "./brands";
import { clients } from "./clients";
import { commitments } from "./commitments";
import { contentPlans } from "./content-plans";
import { digitalAssetFolders } from "./digital-asset-folders";
import { digitalAssetRenditions } from "./digital-asset-renditions";
import { digitalAssetVersions } from "./digital-asset-versions";
import { digitalAssets } from "./digital-assets";
import { domainRights } from "./domain-rights";
import { extendedAttributeOptions } from "./extended-attribute-options";
import { fda2253 } from "./fda2253";
import { financialHierarchies } from "./financial-hierarchies";
import { financialHierarchyNodes } from "./financial-hierarchy-nodes";
import { fundingAccounts } from "./funding-accounts";
import { genericObjects } from "./generic-objects";
import { groupMemberships } from "./group-memberships";
import { groups } from "./groups";
import { invoices } from "./invoices";
import { journalVouchers } from "./journal-vouchers";
import { lookupLists } from "./lookup-lists";
import { metadata } from "./metadata";
import { myPreferences } from "./my-preferences";
import { offers } from "./offers";
import { programs } from "./programs";
import { programProposals } from "./program-proposals";
import { projects } from "./projects";
import { resources } from "./resources";
import { suppliers } from "./suppliers";
import { systemTypes } from "./system-types";
import { tasks } from "./tasks";
import { teams } from "./teams";
import { treatments } from "./treatments";
import { uploader } from "./uploader";
import { userRoles } from "./user-roles";
import { users } from "./users";

export const productivity = (client: HttpClient) => ({
  activities: activities(client),
  activityCells: activityCells(client),
  activityCellTreatments: activityCellTreatments(client),
  activityMilestones: activityMilestones(client),
  activityOffers: activityOffers(client),
  activityProposals: activityProposals(client),
  activityRoles: activityRoles(client),
  activityTreatments: activityTreatments(client),
  annotations: annotations(client),
  attachments: attachments(client),
  attachmentVersions: attachmentVersions(client),
  brands: brands(client),
  clients: clients(client),
  commitments: commitments(client),
  contentPlans: contentPlans(client),
  digitalAssetFolders: digitalAssetFolders(client),
  digitalAssetRenditions: digitalAssetRenditions(client),
  digitalAssetVersions: digitalAssetVersions(client),
  digitalAssets: digitalAssets(client),
  domainRights: domainRights(client),
  extendedAttributeOptions: extendedAttributeOptions(client),
  fda2253: fda2253(client),
  financialHierarchies: financialHierarchies(client),
  financialHierarchyNodes: financialHierarchyNodes(client),
  fundingAccounts: fundingAccounts(client),
  genericObjects: genericObjects(client),
  groupMemberships: groupMemberships(client),
  groups: groups(client),
  invoices: invoices(client),
  journalVouchers: journalVouchers(client),
  lookupLists: lookupLists(client),
  metadata: metadata(client),
  myPreferences: myPreferences(client),
  offers: offers(client),
  programs: programs(client),
  programProposals: programProposals(client),
  projects: projects(client),
  resources: resources(client),
  suppliers: suppliers(client),
  systemTypes: systemTypes(client),
  tasks: tasks(client),
  teams: teams(client),
  treatments: treatments(client),
  uploader: uploader(client),
  userRoles: userRoles(client),
  users: users(client),
});

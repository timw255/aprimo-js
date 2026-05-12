import { PmPagedLinks } from "./PmPagedCollection";
import { UserRight } from "./UserRight";

/**
 * A PM user (employee, contractor, portal/review user). Identity is keyed
 * on `userId` and is independent of the DAM user namespace.
 */
export interface User {
  /** Stable numeric identifier. */
  userId: number;
  /** Login identifier (typically email-shaped). */
  loginId: string;
  /** Email address. */
  email: string;
  /** First name. */
  firstName?: string;
  /** Last name. */
  lastName: string;
  /** Company / organization name. */
  company?: string;
  /** User-type id (application user, portal user, etc.). */
  userType: number;
  /** Default currency code id. */
  currencyCode: number;
  /** Currency code id used for labor-rate display. */
  laborRateCurrencyCode: number;
  /** Language id. */
  languageId: number;
  /** Locale id. */
  localeId: number;
  /** Auto-save preference. */
  autoSave: number;
  /** Date-format id. */
  dateFormat: number;
  /** Time-format id. */
  timeFormat: number;
  /** Number-format id. */
  numberFormatId: number;
  /** Time-zone id. */
  timezoneId: number;
  /** Default paper-size id for reports/exports. */
  paperSize: number;
  /** UI theme id. */
  themeId?: number;
  /** Whether the user receives HTML-format emails. */
  htmlEmail: boolean;
  /** Notification preference id. */
  notificationTypeId?: number;
  /** Cross-domain analyze flag. */
  analyzeAllDomains: number;
  /** Whether the user is in a forced-PIN-reset state. */
  isPinReset: number;
  /** Whether the password expires. */
  passwordExpires: number;
  /** Last time the password was set. */
  passwordSetDate?: string;
  /** Ad-hoc user flag (non-licensed). */
  adHocUser: boolean;
  /** Active flag. */
  activeFlag: number;
  /** Application-user flag. */
  applicationUser: boolean;
  /** Portal-user flag. */
  portalUser: boolean;
  /** Review-user flag. */
  reviewUser: boolean;
  /** Out-of-office flag. */
  isOutOfOffice: boolean;
  /** Out-of-office status id when `isOutOfOffice` is true. */
  outOfOfficeStatus?: number;
  /** Last successful login timestamp. */
  lastLoginDate?: string;
  /** Client logging verbosity. */
  clientLoggingLevel: number;
  /** Landing page id the user lands on after login. */
  preferredLandingPage?: number;
  /** Spend-focused-view preference (financial UI). */
  spendFocusedView?: number;
  /** Group ids the user belongs to. */
  groups: number[];
  /** Directly-granted rights (function + domain pairs). */
  rights: UserRight[];
  /** Rights inherited via group membership. */
  inheritedRights?: UserRight[];
  /** Backup approver users for investment reviews. */
  investmentReviewUserBackups: { userId: number }[];
  /** Backup approver groups for investment reviews. */
  investmentReviewGroupBackups: { groupId: number }[];
  /** Backup approver users for activity financials. */
  activityFinancialUserBackups: { userId: number }[];
  /** Backup approver groups for activity financials. */
  activityFinancialGroupBackups: { groupId: number }[];
  /** Backup approver users for concept reviews. */
  conceptReviewUserBackups: { userId: number }[];
  /** Backup approver groups for concept reviews. */
  conceptReviewGroupBackups: { groupId: number }[];
  /** Backup approver users for workflow tasks. */
  workflowUserBackups: { userId: number }[];
  /** Backup approver group ids for workflow tasks. */
  workflowGroupBackups: number[];
  /** ADAM (legacy DAM) login id, if the user is mapped. */
  adamLoginId?: string;
  /** ADAM (legacy DAM) user id, if the user is mapped. */
  adamUserId?: string;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}

/**
 * Numeric ids that identify built-in PM object instances. Used in
 * payloads where the API expects an object id (permissions, security
 * contexts, extended-attribute references).
 */
export const PmObjectIds = {
  Activities: 1,
  ActivityCells: 10100,
  ActivityForecasts: 6113,
  ActivityOffers: 9709,
  ActivityProposals: 3,
  Attachments: 6214,
  Brands: 10065,
  CalendarEvents: 6069,
  Clients: 10056,
  Commitments: 6135,
  CurrencyExchangeRates: 10270,
  DigitalAssets: 39,
  ExpenseCategories: 10324,
  FundingAccounts: 10235,
  GenericObjectAlpha: 10891,
  GenericObjectBravo: 10892,
  GenericObjectCharlie: 10893,
  GenericObjectDelta: 10894,
  GenericObjectEcho: 10895,
  Incentives: 10121,
  Invoices: 6,
  JournalVouchers: 10345,
  Notes: 6202,
  Offers: 9709,
  Products: 10129,
  Programs: 2,
  Projects: 9952,
  Roles: 9944,
  Supplies: 11,
  Tasks: 9963,
  Treatments: 9711,
  Users: 12,
} as const;

/** Numeric ids that identify built-in PM object types. */
export const PmObjectTypeIds = {
  AccountIntegration: 10283,
  Activities: 1,
  ActivityAudienceMembers: 37,
  ActivityCells: 10100,
  Attachments: 6214,
  AudienceMembers: 9,
  Brands: 10065,
  Clients: 10056,
  Commitments: 6135,
  Companies: 35,
  CurrencyCodes: 6025,
  CurrencyExchangeRates: 10270,
  DigitalAssets: 39,
  DistributionGroups: 6120,
  ExpenseCategories: 6171,
  FormResponseHistory: 6206,
  FundingAccounts: 10235,
  HistoryRecords: 6435,
  Households: 36,
  Incentives: 10121,
  Invoices: 6,
  JournalVouchers: 10345,
  Leads: 6280,
  Notes: 6202,
  Offers: 9709,
  Participants: 8,
  Products: 6275,
  Programs: 2,
  Projects: 9952,
  SqlQuery: 6219,
  Suppliers: 11,
  Tasks: 9963,
  Users: 12,
  UserRoles: 9944,
} as const;

/** Union of all numeric values produced by {@link PmObjectIds}. */
export type PmObjectId = (typeof PmObjectIds)[keyof typeof PmObjectIds];
/** Union of all numeric values produced by {@link PmObjectTypeIds}. */
export type PmObjectTypeId = (typeof PmObjectTypeIds)[keyof typeof PmObjectTypeIds];

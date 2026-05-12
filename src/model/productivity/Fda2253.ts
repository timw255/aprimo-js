/** One advertising material entry on an {@link Fda2253Submission}. */
export interface Fda2253AdvertisementMaterial {
  /** Material type (e.g., "TV", "Print", "Web"). */
  MaterialType?: string;
  /** Publication date (form-localized format). */
  PublicationDate?: string;
  /** Internal material id / catalog code. */
  MaterialIdCode?: string;
  /** Free-form description. */
  MaterialDescription?: string;
}

/** A complete FDA Form 2253 promotional-labeling submission. */
export interface Fda2253Submission {
  /** Submission date in form-localized format. */
  DateSubmitted: string;
  /** Optional review-tracking number. */
  LabelReviewNumber?: string;
  /** Submission type. */
  Type?: string;
  /** Internal tracking number for this submission. */
  Number?: string;
  /** Whether the submission covers a single product (`true`) or multiple. */
  SingleProductOrMultiple?: boolean;
  /** Brand / proprietary name. */
  ProprietaryName?: string;
  /** Established (generic / chemical) product name. */
  EstablishedName?: string;
  /** FDA product code. */
  ProductCodeNo?: string;
  /** Whether the material targets professionals (`true`) or consumers (`false`). */
  ProfessionalOrConsumer?: boolean;
  /** Package-insert date and id number. */
  PackageInsertDateAndIdNumber?: string;
  /** Manufacturer legal name. */
  ManufacturerName?: string;
  /** License number for biologics, if applicable. */
  LicenseNoBiologics?: number;
  /** Advertising material entries covered by this submission. */
  AdvertisementMaterials?: Fda2253AdvertisementMaterial[];
  /** Free-form comments. */
  Comments?: string;
  /** Street address line 1. */
  Address1?: string;
  /** Street address line 2. */
  Address2?: string;
  /** City. */
  City?: string;
  /** State / region. */
  State?: string;
  /** Country. */
  Country?: string;
  /** Postal / zip code. */
  ZipCode?: string;
  /** Contact phone number. */
  Phone?: string;
  /** Contact fax number. */
  Fax?: string;
  /** Contact email address. */
  Email?: string;
  /** Typed name of the submitting agent. */
  TypedNameOfAgent?: string;
  /** Signature date. */
  DateSigned?: string;
  /** Draft (`true`) vs final (`false`) — CBER products only. */
  DraftOrFinalForCberProductsOnly?: boolean;
}

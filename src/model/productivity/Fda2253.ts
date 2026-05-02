export interface Fda2253AdvertisementMaterial {
  MaterialType?: string;
  PublicationDate?: string;
  MaterialIdCode?: string;
  MaterialDescription?: string;
}

export interface Fda2253Submission {
  DateSubmitted: string;
  LabelReviewNumber?: string;
  Type?: string;
  Number?: string;
  SingleProductOrMultiple?: boolean;
  ProprietaryName?: string;
  EstablishedName?: string;
  ProductCodeNo?: string;
  ProfessionalOrConsumer?: boolean;
  PackageInsertDateAndIdNumber?: string;
  ManufacturerName?: string;
  LicenseNoBiologics?: number;
  AdvertisementMaterials?: Fda2253AdvertisementMaterial[];
  Comments?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  Country?: string;
  ZipCode?: string;
  Phone?: string;
  Fax?: string;
  Email?: string;
  TypedNameOfAgent?: string;
  DateSigned?: string;
  DraftOrFinalForCberProductsOnly?: boolean;
}

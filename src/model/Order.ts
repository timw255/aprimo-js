import { AkamaiCdnOrder } from "./AkamaiCdnOrder";
import { BrandTemplateOrder } from "./BrandTemplateOrder";
import { BrandTemplatePreprocessingOrder } from "./BrandTemplatePreprocessingOrder";
import { DownloadContactSheet } from "./DownloadContactSheet";
import { DownloadOrder } from "./DownloadOrder";
import { EmailOrder } from "./EmailOrder";
import { FtpOrder } from "./FtpOrder";
import { FtpResortOrder } from "./FtpResortOrder";
import { PublicCdnOrder } from "./PublicCdnOrder";
import { ShareDownloadLinkOrder } from "./ShareDownloadLinkOrder";

/**
 * Discriminated union of every order representation returned by the DAM
 * orders API (download, email, FTP, CDN, brand template, share-link, etc.).
 * The concrete shape is identified by the `orderType`/`type` discriminator
 * on each variant.
 */
export type Order =
  | AkamaiCdnOrder
  | BrandTemplateOrder
  | BrandTemplatePreprocessingOrder
  | DownloadOrder
  | EmailOrder
  | FtpOrder
  | FtpResortOrder
  | PublicCdnOrder
  | ShareDownloadLinkOrder
  | DownloadContactSheet;

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

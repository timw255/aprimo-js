import { PmPagedLinks } from "./PmPagedCollection";

export interface ActivityCellTreatment {
  activityCellTreatmentId: number;
  activityCellId: number;
  channelId?: number;
  activityTreatmentId: number;
  activityWaveId?: number;
  cellPercentage?: number;
  estResponseRatePercent?: number;
  sequence?: number;
  _links?: PmPagedLinks;
}

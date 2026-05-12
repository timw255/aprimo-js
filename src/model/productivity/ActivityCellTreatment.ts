import { PmPagedLinks } from "./PmPagedCollection";

/**
 * The join between an `ActivityCell` and an `ActivityTreatment`. Carries
 * the split percentage, forecast, ordering, and channel that bind the two.
 */
export interface ActivityCellTreatment {
  /** Stable numeric identifier for the cell-treatment link. */
  activityCellTreatmentId: number;
  /** Cell this treatment is applied to. */
  activityCellId: number;
  /** Channel id. */
  channelId?: number;
  /** Treatment assigned to the cell. */
  activityTreatmentId: number;
  /** Optional wave id grouping this cell-treatment with others. */
  activityWaveId?: number;
  /** Share of the cell receiving this treatment (0–100). */
  cellPercentage?: number;
  /** Forecasted response rate as a percent (0–100). */
  estResponseRatePercent?: number;
  /** Ordering position within the cell. */
  sequence?: number;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}

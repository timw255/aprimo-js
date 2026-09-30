import { HeaderSource } from "../../select";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { MaintenanceJob } from "../../model/MaintenanceJob";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

/** A single record or classification a maintenance job acts on. */
export interface MaintenanceJobTarget {
  /** Target record id. Set for `type: "record"` jobs. */
  recordId?: string;
  /** Target classification id. Set for `type: "classification"` jobs. */
  classificationId?: string;
  /** Re-run the action even if the target previously succeeded. */
  forceRetry?: boolean;
  /** Custom XML tag stored on the target. */
  tag?: string;
}

/** One action applied to every target of a maintenance job. */
export interface MaintenanceJobAction {
  /** Action name, e.g. `"ChangeRecordStatus"`, `"Touch"`, `"RefreshFileRecord"`. */
  action: string;
  label?: string;
  description?: string;
  /** Action-specific parameters, e.g. `{ status: "draft" }`. */
  parameters?: Record<string, unknown>;
}

export interface CreateMaintenanceJobRequest {
  /** What the job operates on. */
  type: "record" | "classification";
  priority?: "High" | "Medium";
  /** Address notified when the job finishes. */
  creatorEmail?: string;
  disableNotification?: boolean;
  /** Earliest execution time, as an ISO-8601 UTC string. */
  earliestStartDate?: string;
  targets: MaintenanceJobTarget[];
  actions: MaintenanceJobAction[];
}

export interface CreateMaintenanceJobResponse {
  id: string;
}

export const maintenanceJobs = (client: HttpClient) => ({
  /**
   * List background maintenance jobs and their status.
   *
   * @example
   * ```ts
   * const res = await aprimo.maintenanceJobs.get();
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<PagedCollection<MaintenanceJob>>> => {
    const headers = buildHeaders(params, expander);

    return await client.get("/api/core/maintenancejobs", headers);
  },

  /**
   * Queue a maintenance job that applies `actions` to every entry in `targets`.
   *
   * The job runs asynchronously and mutates the targeted records or
   * classifications — poll `get` for its status.
   *
   * @returns `ApiResult` whose `data.id` is the new job's id.
   *
   * @example
   * ```ts
   * const res = await aprimo.maintenanceJobs.create({
   *   type: "record",
   *   priority: "Medium",
   *   targets: [{ recordId }],
   *   actions: [
   *     { action: "ChangeRecordStatus", parameters: { status: "draft" } },
   *   ],
   * });
   * ```
   */
  create: async (
    request: CreateMaintenanceJobRequest,
  ): Promise<ApiResult<CreateMaintenanceJobResponse>> => {
    return client.post("/api/core/maintenancejobs", request);
  },
});

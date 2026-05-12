import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Fda2253Submission } from "../../../model/productivity/Fda2253";

/**
 * FDA Form 2253 submissions — the FDA promotional-labeling report used
 * by US pharma tenants. Aprimo will package the submission and route it
 * downstream.
 */
export const fda2253 = (client: HttpClient) => ({
  /**
   * Submit a 2253 form.
   *
   * @param submission - The form payload.
   * @param flatten - When `true` (default), forwards `flatten=true` so the
   *   server returns a flattened response.
   *
   * @example
   * ```ts
   * await aprimo.productivity.fda2253.submit({
   *   DateSubmitted: "2026-05-11",
   *   ProprietaryName: "Acme RX",
   *   AdvertisementMaterials: [{ MaterialType: "TV", MaterialIdCode: "TV-001" }],
   * });
   * ```
   */
  submit: async (
    submission: Fda2253Submission,
    flatten: boolean = true,
  ): Promise<ApiResult<unknown>> => {
    const query = flatten ? "?flatten=true" : "";
    return client.post(`/api/fda2253${query}`, submission);
  },
});

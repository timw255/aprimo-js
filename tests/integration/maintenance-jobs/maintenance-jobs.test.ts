import { describe, it, expect } from "vitest";
import { expectOk, logShape } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("maintenanceJobs integration", () => {
  it("fetches the list of maintenance jobs", async () => {
    const res = await aprimo.maintenanceJobs.get({ pageSize: 10 });

    expectOk(res);
    logShape("maintenanceJobs.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("creates a maintenance job against a scratch record", async () => {
    const created = await aprimo.records.create({ status: "draft" });
    expectOk(created);
    const recordId = created.data!.id;

    try {
      const res = await aprimo.maintenanceJobs.create({
        type: "record",
        priority: "Medium",
        disableNotification: true,
        targets: [{ recordId }],
        actions: [
          { action: "ChangeRecordStatus", parameters: { status: "draft" } },
        ],
      });
      expectOk(res);
      logShape("maintenanceJobs.create", res.data);
      expect(res.data?.id).toBeDefined();
    } finally {
      await aprimo.records.delete(recordId);
    }
  });
});

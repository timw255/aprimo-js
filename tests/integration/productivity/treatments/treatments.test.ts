import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const treatmentId = Number(process.env.APRIMO_PM_TREATMENT_ID);

describe("productivity treatments integration", () => {
  it("searches treatments", async () => {
    const res = await aprimo.productivity.treatments.search(
      { equals: { fieldName: "activeFlag", fieldValue: 1 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("treatments.search", res.data);
  });

  it("gets a treatment by id", async () => {
    const res = await aprimo.productivity.treatments.getById(treatmentId);
    expectOk(res);
    logShape("treatments.getById", res.data);
    expect(res.data?.treatmentId).toBe(treatmentId);
  });

  it("updates the treatment", async () => {
    const current = await aprimo.productivity.treatments.getById(treatmentId);
    expectOk(current);
    const res = await aprimo.productivity.treatments.update(treatmentId, {
      ...(current.data as unknown as Record<string, unknown>),
      treatmentId,
      description: "Updated by integration test",
    });
    expectOk(res);
  });
});

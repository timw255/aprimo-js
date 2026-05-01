import { describe, it } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("productivity fda2253 integration", () => {
  it("submits an FDA 2253 form", async () => {
    const res = await aprimo.productivity.fda2253.submit({
      DateSubmitted: "01/01/2026",
      Type: "PMA",
      Number: "INT-TEST-001",
      ProprietaryName: "Integration Test",
      EstablishedName: "Integration Test",
      ManufacturerName: "Integration Test Manufacturer",
      Email: "integration@example.com",
      DateSigned: "01/01/2026",
    });
    expectOk(res);
  });
});

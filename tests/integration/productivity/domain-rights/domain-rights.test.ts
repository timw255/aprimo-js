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

describe("productivity domainRights integration", () => {
  it("gets domain rights", async () => {
    const res = await aprimo.productivity.domainRights.get({ limit: 10 });
    expectOk(res);
    logShape("domainRights.get", res.data);
    expect(res.data?._total).toBeDefined();
  });
});

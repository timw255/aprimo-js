import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("permissions integration", () => {
  it("fetches a list of permissions", async () => {
    const res = await aprimo.permissions.get({ pageSize: 10 });

    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThanOrEqual(0);
  });
});

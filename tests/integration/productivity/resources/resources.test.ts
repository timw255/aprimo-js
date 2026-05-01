import { describe, it, expect, beforeAll } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("productivity resources integration", () => {
  let resourceId: string;

  beforeAll(async () => {
    const staticRes = await aprimo.productivity.resources.getStatic();
    const data = staticRes.data as unknown as { resources?: { id?: string }[] };
    resourceId = data.resources![0]!.id!;
  });

  it("gets static resources", async () => {
    const res = await aprimo.productivity.resources.getStatic();
    expectOk(res);
    logShape("resources.getStatic", res.data);
  });

  it("gets a resource by id", async () => {
    const res = await aprimo.productivity.resources.getById(resourceId);
    expectOk(res);
    logShape("resources.getById", res.data);
    expect(res.data?.id).toBeDefined();
  });
});

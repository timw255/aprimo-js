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

const lookupId = process.env.APRIMO_PM_LOOKUP_ID!;

describe("productivity lookupLists integration", () => {
  it("gets a lookup list by id", async () => {
    const res = await aprimo.productivity.lookupLists.getById(lookupId);
    expectOk(res);
    logShape("lookupLists.getById", res.data);
    expect(res.data?.items).toBeDefined();
  });

  it("gets a parameterized lookup with filterText", async () => {
    const res = await aprimo.productivity.lookupLists.getById(506, {
      filterText: "a",
    });
    expectOk(res);
    logShape("lookupLists.getById(filterText)", res.data);
  });
});

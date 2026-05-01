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

describe("productivity systemTypes integration", () => {
  it("gets all system types", async () => {
    const res = await aprimo.productivity.systemTypes.get();
    expectOk(res);
    logShape("systemTypes.get", res.data);
    expect(Array.isArray(res.data?.systemtypes)).toBe(true);
  });

  it("gets a system type by name", async () => {
    const res = await aprimo.productivity.systemTypes.getByName("attachment");
    expectOk(res);
    logShape("systemTypes.getByName", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets active system type entries by name", async () => {
    const res = await aprimo.productivity.systemTypes.getActiveByName("attachment");
    expectOk(res);
    logShape("systemTypes.getActiveByName", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets a system type entry by id", async () => {
    const list = await aprimo.productivity.systemTypes.getByName("attachment");
    expectOk(list);
    const itemHref = list.data?._embedded?.items?.[0];
    const itemId = (itemHref as { systemTypeId?: number } | undefined)
      ?.systemTypeId!;
    const res = await aprimo.productivity.systemTypes.getById("attachment", itemId);
    expectOk(res);
    logShape("systemTypes.getById", res.data);
  });
});

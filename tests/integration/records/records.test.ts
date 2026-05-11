import { describe, it, expect } from "vitest";
import { expectOk, logShape } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("records integration", () => {
  let recordId: string;

  it("creates a record", async () => {
    const res = await aprimo.records.create(
      {
        status: "draft",
        fields: {
          addOrUpdate: [],
        },
      },
      true,
    );

    expectOk(res);
    logShape("records.create", res.data);
    expect(res.data?.id).toBeDefined();
    recordId = res.data!.id;
  });

  it("reads the record", async () => {
    const res = await aprimo.records.getById(recordId);

    expectOk(res);
    logShape("records.getById", res.data);
    expect(res.data?.id).toBe(recordId);
  });

  it("updates the record", async () => {
    const res = await aprimo.records.update(recordId, {
      status: "released",
    });

    expectOk(res);
    logShape("records.update", res.data);
  });

  it("updates the record with immediateSearchIndexUpdate", async () => {
    const res = await aprimo.records.update(
      recordId,
      { status: "draft" },
      true,
    );

    expectOk(res);
    logShape("records.update:immediateSearchIndexUpdate", res.data);
  });

  it("fetches records", async () => {
    const res = await aprimo.records.get({ pageSize: 5 });
    expectOk(res);
    logShape("records.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged records", async () => {
    let count = 0;

    for await (const page of aprimo.records.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("records.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the record", async () => {
    const res = await aprimo.records.delete(recordId);
    expectOk(res);
    logShape("records.delete", res.data);
  });
});

import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
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
    expect(res.data?.id).toBeDefined();
    recordId = res.data!.id;
  });

  it("reads the record", async () => {
    const res = await aprimo.records.getById(recordId);

    expectOk(res);
    expect(res.data?.id).toBe(recordId);
  });

  it("updates the record", async () => {
    const res = await aprimo.records.update(recordId, {
      status: "released",
    });

    expectOk(res);
  });

  it("updates the record with immediateSearchIndexUpdate", async () => {
    const res = await aprimo.records.update(
      recordId,
      { status: "draft" },
      true
    );

    expectOk(res);
  });

  it("fetches records", async () => {
    const res = await aprimo.records.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged records", async () => {
    let count = 0;

    for await (const page of aprimo.records.getPaged({ pageSize: 2 })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the record", async () => {
    const res = await aprimo.records.delete(recordId);
    expectOk(res);
  });
});

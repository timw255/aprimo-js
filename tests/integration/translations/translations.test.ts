import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("translations integration", () => {
  let id: string;

  it("creates a translation", async () => {
    const res = await aprimo.translations.create({
      studio: "Providers",
      module: ".RegisteredMaintenanceActions",
      name: "TutorialTranslation",
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    id = res.data!.id;
  });

  it("fetches translations", async () => {
    const res = await aprimo.translations.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged translations", async () => {
    let count = 0;

    for await (const page of aprimo.translations.getPaged({ pageSize: 2 })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("fetches a translation by ID", async () => {
    if (!id) {
      throw new Error("No translation ID available from previous test.");
    }

    const res = await aprimo.translations.getById(id);
    expectOk(res);
    expect(res.data?.id).toBe(id);
  });

  it("updates a translation", async () => {
    if (!id) {
      throw new Error("No translation ID available to update.");
    }

    const res = await aprimo.translations.update(id, {
      name: "TutorialTranslationUpdated",
    });

    expectOk(res);
  });

  it("deletes a translation", async () => {
    if (!id) {
      throw new Error("No translation ID available to delete.");
    }

    const res = await aprimo.translations.delete(id);
    expectOk(res);
  });
});

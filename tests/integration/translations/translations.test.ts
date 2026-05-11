import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk, logShape } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("translations integration", () => {
  let id: string;
  const stamp = Date.now().toString(36);

  it("creates a translation", async () => {
    const res = await aprimo.translations.create({
      studio: "Providers",
      module: ".RegisteredMaintenanceActions",
      name: `TutorialTranslation_${stamp}`,
    });

    expectOk(res);
    logShape("translations.create", res.data);
    expect(res.data?.id).toBeDefined();
    id = res.data!.id;
  });

  it("fetches translations", async () => {
    const res = await aprimo.translations.get({ pageSize: 5 });
    expectOk(res);
    logShape("translations.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged translations", async () => {
    let count = 0;

    for await (const page of aprimo.translations.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("translations.getPaged:page", page.data);
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
    logShape("translations.getById", res.data);
    expect(res.data?.id).toBe(id);
  });

  it("updates a translation", async () => {
    if (!id) {
      throw new Error("No translation ID available to update.");
    }

    const res = await aprimo.translations.update(id, {
      name: `TutorialTranslationUpdated_${stamp}`,
    });

    expectOk(res);
    logShape("translations.update", res.data);
  });

  it("deletes a translation", async () => {
    if (!id) {
      throw new Error("No translation ID available to delete.");
    }

    const res = await aprimo.translations.delete(id);
    expectOk(res);
    logShape("translations.delete", res.data);
  });
});

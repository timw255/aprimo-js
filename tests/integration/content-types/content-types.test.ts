import { describe, it, expect } from "vitest";
import { expectOk, logShape } from "../../utils";
import { TitleConfiguration } from "../../../src/model/TitleConfiguration";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("contentTypes integration", () => {
  let id: string;

  const titleConfig: TitleConfiguration = {
    option: "FileName",
    showExtension: true,
  };

  it("creates a content type", async () => {
    const res = await aprimo.contentTypes.create({
      name: `Integration Type ${Date.now()}`,
      titleConfiguration: titleConfig,
    });

    expectOk(res);
    logShape("contentTypes.create", res.data);
    expect(res.data?.id).toBeDefined();
    id = res.data!.id;
  });

  it("reads the content type by ID", async () => {
    const res = await aprimo.contentTypes.getById(id);
    expectOk(res);
    logShape("contentTypes.getById", res.data);
    expect(res.data?.id).toBe(id);
  });

  it("updates the content type", async () => {
    const res = await aprimo.contentTypes.update(id, {
      purpose: "Testing",
    });

    expectOk(res);
    logShape("contentTypes.update", res.data);
  });

  it("fetches a list of content types", async () => {
    const res = await aprimo.contentTypes.get({ pageSize: 5 });
    expectOk(res);
    logShape("contentTypes.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged content types", async () => {
    let count = 0;

    for await (const page of aprimo.contentTypes.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("contentTypes.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the content type", async () => {
    const res = await aprimo.contentTypes.delete(id);
    expectOk(res);
    logShape("contentTypes.delete", res.data);
  });
});

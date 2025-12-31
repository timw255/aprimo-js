import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("classifications integration", () => {
  let id: string;

  it("creates a classification", async () => {
    const res = await aprimo.classifications.create(
      {
        name: `Integration Test ${Date.now()}`,
        isRoot: true,
        identifier: "",
        namePath: "",
        labelPath: "",
        labels: [],
        sortIndex: 1,
        sortOrder: "",
        disabledInDAMUI: false,
        tag: "",
      },
      true,
    );

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    id = res.data!.id;
  });

  it("reads the classification", async () => {
    const res = await aprimo.classifications.getById(id);
    expectOk(res);
    expect(res.data?.id).toBe(id);
  });

  it("updates the classification", async () => {
    const updateRes = await aprimo.classifications.update(id, {
      name: "Integration-Test",
    });

    expectOk(updateRes);
  });

  it("updates with immediateSearchIndexUpdate", async () => {
    const res = await aprimo.classifications.update(
      id,
      { name: "Fast Update" },
      true,
    );

    expectOk(res);
  });

  it("updates multilingual labels", async () => {
    const languageId = "c2bd4f9bbb954bcb80c31e924c9c26dc";

    const updateRes = await aprimo.classifications.update(id, {
      labels: [
        {
          languageId,
          value: "Updated Classification Label",
        },
      ],
    });

    expectOk(updateRes);

    const getRes = await aprimo.classifications.getById(id, undefined, "*");
    expectOk(getRes);

    const updatedLabel = getRes.data?.labels?.find(
      (l) => l.languageId === languageId,
    );
    expect(updatedLabel?.value).toBe("Updated Classification Label");
  });

  it("fetches a list of classifications", async () => {
    const res = await aprimo.classifications.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged classifications", async () => {
    let count = 0;

    for await (const page of aprimo.classifications.getPaged({ pageSize: 2 })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the classification", async () => {
    const res = await aprimo.classifications.delete(id);
    expectOk(res);
  });
});

import { describe, it, expect } from "vitest";
import { expectOk, logShape } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const userGroupId = process.env.APRIMO_DAM_TEST_USER_GROUP_ID!;

describe("classifications integration", () => {
  let classificationId: string;

  it("creates a root classification", async () => {
    const res = await aprimo.classifications.create(
      {
        identifier: `int_test_${Date.now()}`,
        name: `IntegrationClassification_${Date.now()}`,
        isRoot: true,
        sortIndex: 1,
        sortOrder: "Label",
        disabledInDAMUI: false,
        labels: [],
      },
      true,
    );
    expectOk(res);
    logShape("classifications.create", res.data);
    expect(res.data?.id).toBeDefined();
    classificationId = res.data!.id;
  });

  it("gets a list of classifications", async () => {
    const res = await aprimo.classifications.get({ pageSize: 5 });
    expectOk(res);
    logShape("classifications.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches classifications paged", async () => {
    let count = 0;
    for await (const page of aprimo.classifications.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("classifications.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 4) break;
    }
    expect(count).toBeGreaterThan(0);
  });

  it("gets the classification by id", async () => {
    const res = await aprimo.classifications.getById(classificationId);
    expectOk(res);
    logShape("classifications.getById", res.data);
    expect(res.data?.id).toBe(classificationId);
  });

  it("updates the classification", async () => {
    const res = await aprimo.classifications.update(classificationId, {
      sortIndex: 2,
    });
    expectOk(res);
    logShape("classifications.update", res.data);
  });

  it("gets the user's tree permission for the classification", async () => {
    const res = await aprimo.classifications.getTreePermission(classificationId);
    expectOk(res);
    logShape("classifications.getTreePermission", res.data);
    expect(res.data?.canRead).toBeDefined();
  });

  it("updates record permissions", async () => {
    const res = await aprimo.classifications.updateRecordPermissions(
      classificationId,
      {
        breakInheritance: false,
        permissions: {
          addOrUpdate: [{ userGroupId, accessRight: "Read" }],
        },
      },
    );
    expectOk(res);
    logShape("classifications.updateRecordPermissions", res.data);
  });

  it("updates tree permissions", async () => {
    const res = await aprimo.classifications.updateTreePermissions(
      classificationId,
      {
        breakInheritance: false,
        permissions: {
          addOrUpdate: [{ userGroupId, accessRight: "Read" }],
        },
      },
    );
    expectOk(res);
    logShape("classifications.updateTreePermissions", res.data);
  });

  it("updates download permissions", async () => {
    const res = await aprimo.classifications.updateDownloadPermissions(
      classificationId,
      {
        breakInheritance: false,
        permissions: {
          addOrUpdate: [{ userGroupId, accessRight: "Allow" }],
        },
      },
    );
    expectOk(res);
    logShape("classifications.updateDownloadPermissions", res.data);
  });

  it("deletes the classification", async () => {
    const res = await aprimo.classifications.delete(classificationId);
    expectOk(res);
    logShape("classifications.delete", res.data);
  });
});

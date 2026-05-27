import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { expectOk, logShape } from "../../utils";
import { createClient, Expander } from "../../../src";
import type { Classification } from "../../../src/model/Classification";

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

describe("classification field values integration", () => {
  let fieldDefId: string;
  let classificationId: string;
  let languageId: string;
  const stamp = Date.now();
  const probeValue = `int_test_value_${stamp}`;

  beforeAll(async () => {
    const langs = await aprimo.languages.get();
    expectOk(langs);
    languageId = langs.data!.items![0]!.id;

    const fdRes = await aprimo.fieldDefinitions.create({
      dataType: "SingleLineText",
      name: `IntTestClassFieldDef_${stamp}`,
      label: `IntTest classification field ${stamp}`,
      labels: [
        { languageId, value: `IntTest classification field ${stamp}` },
      ],
      scope: "ClassificationProfileClassDependent",
      scopeCategory: "Classification",
      languageMode: "Single",
    });
    expectOk(fdRes);
    fieldDefId = fdRes.data!.id;

    const cRes = await aprimo.classifications.create(
      {
        identifier: `int_test_fv_${stamp}`,
        name: `IntTestFieldValue_${stamp}`,
        isRoot: true,
        sortIndex: 1,
        sortOrder: "Label",
        disabledInDAMUI: false,
        labels: [],
        registeredFields: { addOrUpdate: [fieldDefId] },
      },
      true,
    );
    expectOk(cRes);
    classificationId = cRes.data!.id;
  });

  afterAll(async () => {
    if (classificationId) {
      await aprimo.classifications.delete(classificationId, true);
    }
    if (fieldDefId) {
      await aprimo.fieldDefinitions.delete(fieldDefId);
    }
  });

  it("returns field values via Expander.expand('fields')", async () => {
    const expander = Expander.create()
      .for<Classification>("Classification")
      .expand("fields");
    const res = await aprimo.classifications.getById(classificationId, expander);
    expectOk(res);
    logShape("classifications.getById:fields-expanded", res.data);
    const fields = res.data?._embedded?.fields;
    expect(fields?.items?.length).toBeGreaterThan(0);
  });

  it("writes a field value via classifications.update", async () => {
    const res = await aprimo.classifications.update(
      classificationId,
      {
        fields: {
          addOrUpdate: [
            {
              id: fieldDefId,
              localizedValues: [{ languageId, value: probeValue }],
            },
          ],
        },
      },
      true,
    );
    expectOk(res);
    logShape("classifications.update:fields", res.data);
  });

  it("reads back the written field value", async () => {
    const expander = Expander.create()
      .for<Classification>("Classification")
      .expand("fields");
    const res = await aprimo.classifications.getById(classificationId, expander);
    expectOk(res);
    const fields = res.data?._embedded?.fields as
      | { items?: Array<Record<string, unknown>> }
      | undefined;
    const target = fields?.items?.find((f) => f.id === fieldDefId);
    expect(target).toBeDefined();
    const serialized = JSON.stringify(target?.localizedValues);
    expect(serialized).toContain(probeValue);
  });
});

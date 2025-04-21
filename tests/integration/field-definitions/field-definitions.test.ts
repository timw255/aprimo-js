import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { CreateSingleLineTextFieldDefinitionRequest } from "../../../src/modules/field-definitions";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("fieldDefinitions integration", () => {
  let id: string;

  it("creates a SingleLineText field definition", async () => {
    const request: CreateSingleLineTextFieldDefinitionRequest = {
      name: `IntegrationField_${Date.now()}`,
      label: "Integration Field",
      dataType: "SingleLineText",
      isRequired: false,
      isReadOnly: false,
      languageMode: "Multiple",
      maximumLength: 0,
      minimumLength: 0,
      regularExpression: "",
      defaultValue: "",
      enabledLanguages: {
        addOrUpdate: ["c2bd4f9bbb954bcb80c31e924c9c26dc"],
      },
      helpText: "",
      helpTexts: [],
      indexed: false,
      inlineStyle: "",
      isUniqueIdentifier: false,
      labels: [],
      memberships: {
        addOrUpdate: [],
      },
      resetToDefaultFields: [],
      resetToDefaultTriggers: ["OnNewField"],
      scope: "RecordContentGlobal",
      scopeCategory: "Record",
      searchIndexRebuildRequired: false,
      sortIndex: 1,
      storageMode: "LogChanges",
      tag: "",
      validation: "",
      validationErrorMessage: "",
      validationTrigger: "Always",
    };

    const res = await aprimo.fieldDefinitions.create(request);
    expectOk(res);
    expect(res.data?.id).toBeDefined();
    id = res.data!.id;
  });

  it("updates the field definition", async () => {
    const res = await aprimo.fieldDefinitions.update(id, {
      defaultValue: "Default Value",
    });

    expectOk(res);
  });

  it("lists field definitions", async () => {
    const res = await aprimo.fieldDefinitions.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches field definitions paged", async () => {
    let count = 0;

    for await (const page of aprimo.fieldDefinitions.getPaged({
      pageSize: 2,
    })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the field definition", async () => {
    const res = await aprimo.fieldDefinitions.delete(id);
    expectOk(res);
  });
});

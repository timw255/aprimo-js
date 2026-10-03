import { describe, it, expect } from "vitest";
import { eventually, expectOk, logShape } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const recordId = process.env.TEST_RECORD_ID!;
const userGroupId = process.env.APRIMO_DAM_TEST_USER_GROUP_ID!;

describe("collections integration", () => {
  let staticId: string;
  let dynamicId: string;
  let dynamicSubId: string;

  it("creates a static collection", async () => {
    const res = await aprimo.collections.createStatic({
      name: `IntegrationStatic_${Date.now()}`,
      description: "Integration test static collection",
    });
    expectOk(res);
    logShape("collections.createStatic", res.data);
    expect(res.data?.id).toBeDefined();
    staticId = res.data!.id;
  });

  it("creates a dynamic collection", async () => {
    const res = await aprimo.collections.createDynamic({
      name: `IntegrationDynamic_${Date.now()}`,
      searchExpression: {
        expression: "*",
        languages: [],
      },
    });
    expectOk(res);
    logShape("collections.createDynamic", res.data);
    expect(res.data?.id).toBeDefined();
    dynamicId = res.data!.id;
  });

  it("creates a dynamic collection with sub-expressions", async () => {
    const res = await aprimo.collections.createDynamicWithSubExpressions({
      name: `IntegrationDynamicSub_${Date.now()}`,
      searchExpression: { defaultLogicalOperator: "OR" },
      subExpressions: [
        { expression: "ContentType = 'Asset'" },
        { expression: "ContentType = 'Video'" },
      ],
    });
    expectOk(res);
    logShape("collections.createDynamicWithSubExpressions", res.data);
    expect(res.data?.id).toBeDefined();
    dynamicSubId = res.data!.id;

    // the clauses must survive the round trip, not be silently dropped
    const back = await aprimo.collections.getById(dynamicSubId);
    expectOk(back);
    expect(back.data?.searchExpression?.subExpressions).toHaveLength(2);
  });

  it("gets a list of collections", async () => {
    const res = await aprimo.collections.get({ pageSize: 5 });
    expectOk(res);
    logShape("collections.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches collections paged", async () => {
    let count = 0;
    for await (const page of aprimo.collections.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("collections.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 4) break;
    }
    expect(count).toBeGreaterThan(0);
  });

  it("gets the static collection by id", async () => {
    const res = await aprimo.collections.getById(staticId);
    expectOk(res);
    logShape("collections.getById", res.data);
    expect(res.data?.id).toBe(staticId);
  });

  it("updates records on the static collection", async () => {
    const res = await aprimo.collections.updateRecords(staticId, {
      records: { addOrUpdate: [recordId] },
    });
    expectOk(res);
    logShape("collections.updateRecords", res.data);
  });

  it("gets the records on the static collection", async () => {
    const res = await aprimo.collections.getRecords(staticId);
    expectOk(res);
    logShape("collections.getRecords", res.data);
    expect(res.data?.items?.some((r) => r.id === recordId)).toBe(true);
  });

  it("updates the static collection", async () => {
    const name = `IntegrationStaticRenamed_${Date.now()}`;
    const res = await aprimo.collections.update(staticId, { name });
    expectOk(res);
    logShape("collections.update", res.data);

    const after = await aprimo.collections.getById(staticId);
    expectOk(after);
    expect(after.data?.name).toBe(name);
  });

  it("reads the collection permissions", async () => {
    const res = await aprimo.collections.getPermissions(staticId);
    expectOk(res);
    logShape("collections.getPermissions", res.data);
    expect(res.data?.publicPermission).toBeDefined();
    expect(Array.isArray(res.data?.groupsPermissions)).toBe(true);
  });

  it("grants a user group permission on the collection", async () => {
    const res = await aprimo.collections.updatePermissions(staticId, {
      groupsPermissions: { addOrUpdate: [{ groupId: userGroupId, permission: "Read" }] },
    });
    expectOk(res);

    const back = await eventually(
      () => aprimo.collections.getPermissions(staticId),
      (d) => !!d?.groupsPermissions?.some((g) => g.groupId === userGroupId),
    );
    expectOk(back);
    expect(
      back.data?.groupsPermissions?.find((g) => g.groupId === userGroupId)
        ?.permission,
    ).toBe("Read");
  });

  it("removes the user group permission by groupId alone", async () => {
    const res = await aprimo.collections.updatePermissions(staticId, {
      groupsPermissions: { remove: [{ groupId: userGroupId }] },
    });
    expectOk(res);

    const back = await eventually(
      () => aprimo.collections.getPermissions(staticId),
      (d) => !d?.groupsPermissions?.some((g) => g.groupId === userGroupId),
    );
    expectOk(back);
    expect(
      back.data?.groupsPermissions?.some((g) => g.groupId === userGroupId),
    ).toBe(false);
  });

  it("sets the public permission on the collection", async () => {
    const res = await aprimo.collections.updatePermissions(staticId, {
      publicPermission: "Read",
    });
    expectOk(res);

    const back = await eventually(
      () => aprimo.collections.getPermissions(staticId),
      (d) => d?.publicPermission === "Read",
    );
    expectOk(back);
    expect(back.data?.publicPermission).toBe("Read");
  });

  it("posts, reads and deletes a comment on the collection", async () => {
    const created = await aprimo.collections.createComment(staticId, {
      message: "integration comment",
    });
    expectOk(created);
    logShape("collections.createComment", created.data);
    const commentId = created.data!.id;
    expect(commentId).toBeDefined();

    const one = await aprimo.collections.getCommentById(staticId, commentId);
    expectOk(one);
    logShape("collections.getCommentById", one.data);
    expect(one.data?.message).toBe("integration comment");

    const edited = await aprimo.collections.updateComment(staticId, commentId, {
      content: "integration comment (edited)",
    });
    expectOk(edited);
    const afterEdit = await eventually(
      () => aprimo.collections.getCommentById(staticId, commentId),
      (d) => d?.message === "integration comment (edited)",
    );
    expect(afterEdit.data?.message).toBe("integration comment (edited)");

    const marked = await aprimo.collections.markCommentsAsRead(staticId, {
      id: commentId,
      lastReadCommentDate: new Date().toISOString(),
    });
    expectOk(marked);
    logShape("collections.markCommentsAsRead", marked.data);
    expect(typeof marked.data?.unreadComments).toBe("number");

    const list = await aprimo.collections.getComments(staticId);
    expectOk(list);
    logShape("collections.getComments", list.data);
    expect(list.data?.items?.some((c) => c.id === commentId)).toBe(true);

    const removed = await aprimo.collections.deleteComment(staticId, commentId);
    expectOk(removed);

    const after = await eventually(
      () => aprimo.collections.getComments(staticId),
      (d) => !d?.items?.some((c) => c.id === commentId),
    );
    expect(after.data?.items?.some((c) => c.id === commentId)).toBe(false);
  });

  it("reads the comment status for the collection", async () => {
    const res = await aprimo.collections.getCommentsStatus(staticId);
    expectOk(res);
    logShape("collections.getCommentsStatus", res.data);
    expect(typeof res.data?.unreadComments).toBe("number");
  });

  it("deletes the static collection", async () => {
    const res = await aprimo.collections.delete(staticId);
    expectOk(res);
    logShape("collections.delete:static", res.data);
  });

  it("deletes the dynamic collection", async () => {
    const res = await aprimo.collections.delete(dynamicId);
    expectOk(res);
    logShape("collections.delete:dynamic", res.data);
  });

  it("deletes the dynamic-with-sub-expressions collection", async () => {
    const res = await aprimo.collections.delete(dynamicSubId);
    expectOk(res);
    logShape("collections.delete:dynamicSub", res.data);
  });
});

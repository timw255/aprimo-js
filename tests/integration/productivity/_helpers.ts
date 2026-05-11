import { Aprimo, ApiResult } from "../../../src/client";

export interface TenantDefaults {
  activityTypeId: number;
  activityStateId: number;
  supplierTypeId: number;
  notificationTypeId: number;
  currencyCode: number;
  languageId: number;
  userTypeId: number;
  timezoneId: number;
  scsId: number;
  financeGroupId: number;
  fiscalYearId: number | undefined;
}

let defaultsPromise: Promise<TenantDefaults> | null = null;

async function loadTenantDefaults(aprimo: Aprimo): Promise<TenantDefaults> {
  const meRes = await aprimo.productivity.users.getMe();
  if (!meRes.ok || !meRes.data) {
    throw new Error(
      `users.getMe failed: ${meRes.status} ${meRes.error?.message ?? ""}`,
    );
  }
  const me = meRes.data;

  const actsRes = await aprimo.productivity.activities.get({ limit: 1 });
  const firstActivity = (
    actsRes.data?._embedded as { activities?: Record<string, unknown>[] } | undefined
  )?.activities?.[0];
  const activityTypeId = (firstActivity?.activityTypeId as number | undefined) ?? 1;
  const activityStateId = (firstActivity?.activityStateId as number | undefined) ?? 1;
  const scsId = (firstActivity?.scsId as number | undefined) ?? 1;

  const supRes = await aprimo.productivity.suppliers.get({ limit: 1 });
  const firstSupplier = (
    supRes.data?._embedded as { suppliers?: Record<string, unknown>[] } | undefined
  )?.suppliers?.[0];
  const supplierTypeId =
    (firstSupplier?.supplierTypeId as number | undefined) ?? 1;
  const notificationTypeId =
    (firstSupplier?.notificationTypeId as number | undefined) ??
    me.notificationTypeId ??
    1;

  const groupsRes = await aprimo.productivity.groups.get({ limit: 50 });
  const groups =
    (groupsRes.data?._embedded as
      | { groups?: { groupId?: number; financeGroup?: number }[] }
      | undefined)?.groups ?? [];
  const financeGroupId = groups.find((g) => g.financeGroup === 1)?.groupId ?? 0;

  return {
    activityTypeId,
    activityStateId,
    supplierTypeId,
    notificationTypeId,
    currencyCode: me.currencyCode ?? 1,
    languageId: me.languageId ?? 1,
    userTypeId: me.userType ?? 1,
    timezoneId: me.timezoneId ?? 1,
    scsId,
    financeGroupId,
    fiscalYearId: undefined,
  };
}

export function getTenantDefaults(aprimo: Aprimo): Promise<TenantDefaults> {
  if (!defaultsPromise) {
    defaultsPromise = loadTenantDefaults(aprimo);
  }
  return defaultsPromise;
}

export { logShape } from "../../utils";

export function pickFirstId<TId extends number | string>(
  res: ApiResult<{ _embedded?: Record<string, unknown> }>,
  idField: string,
): TId | undefined {
  if (!res.ok || !res.data?._embedded) return undefined;
  for (const items of Object.values(res.data._embedded)) {
    if (Array.isArray(items) && items.length > 0) {
      const item = items[0] as Record<string, unknown>;
      const id = item[idField];
      if (typeof id === "number" || typeof id === "string") return id as TId;
    }
  }
  return undefined;
}

export function pickFirstItem<T>(
  res: ApiResult<{ _embedded?: Record<string, unknown> }>,
): T | undefined {
  if (!res.ok || !res.data?._embedded) return undefined;
  for (const items of Object.values(res.data._embedded)) {
    if (Array.isArray(items) && items.length > 0) {
      return items[0] as T;
    }
  }
  return undefined;
}

export async function getCurrentUserId(aprimo: Aprimo): Promise<number> {
  const me = await aprimo.productivity.users.getMe();
  if (!me.ok || !me.data?.userId) {
    throw new Error("Could not resolve current PM user via /api/users/me");
  }
  return me.data.userId;
}

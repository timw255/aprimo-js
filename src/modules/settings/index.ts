import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { Setting, SettingScope } from "../../model/Setting";
import { SettingCollection } from "../../model/SettingCollection";

export const settings = (client: HttpClient) => {
  // Overload for single setting
  function getByName(
    name: string,
    scope?: SettingScope,
    scopeId?: string,
  ): Promise<ApiResult<Setting>>;

  // Overload for multiple settings
  function getByName(
    names: string[],
    scope?: SettingScope,
    scopeId?: string,
  ): Promise<ApiResult<SettingCollection>>;

  // Implementation
  async function getByName(
    names: string | string[],
    scope?: SettingScope,
    scopeId?: string,
  ): Promise<ApiResult<Setting> | ApiResult<SettingCollection>> {
    const nameList = Array.isArray(names) ? names : [names];
    const isSingle = nameList.length === 1;

    let url = isSingle
      ? `/api/core/setting/${encodeURIComponent(nameList[0])}`
      : `/api/core/settings`;

    const queryParams: string[] = [];

    if (!isSingle) {
      queryParams.push(`names=${encodeURIComponent(nameList.join(","))}`);
    }

    if (scope) queryParams.push(`scope=${scope}`);
    if (scopeId) queryParams.push(`scopeId=${scopeId}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    return client.get(url) as Promise<
      ApiResult<Setting> | ApiResult<SettingCollection>
    >;
  }

  // Return API
  return {
    getByName,

    update: async (setting: {
      name: string;
      value: string;
      scope: "user" | "usergroup" | "site" | "system";
      scopeId?: string;
    }): Promise<ApiResult<void>> => {
      if (
        (setting.scope === "usergroup" || setting.scope === "site") &&
        !setting.scopeId
      ) {
        throw new Error(`scopeId is required when scope is '${setting.scope}'`);
      }

      return client.put(
        `/api/core/setting/${encodeURIComponent(setting.name)}`,
        setting,
      );
    },
  };
};

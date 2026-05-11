import { ApiResult } from "../../client";
import { AprimoConfigError } from "../../errors";
import { HttpClient } from "../../http";
import { Setting, SettingScope } from "../../model/Setting";
import { SettingCollection } from "../../model/SettingCollection";

export const settings = (client: HttpClient) => {
  /**
   * Fetch one or more setting values by name.
   *
   * Pass a single string to fetch one setting (returns `ApiResult<Setting>`);
   * pass an array of strings to fetch many at once (returns
   * `ApiResult<SettingCollection>`).
   *
   * @param name - Setting name (or array of names).
   * @param scope - Optional scope: `"user"`, `"usergroup"`, `"site"`, or `"system"`.
   * @param scopeId - Required when `scope` is `"usergroup"` or `"site"`.
   *
   * @example
   * ```ts
   * const single = await aprimo.settings.getByName("MySetting");
   * const many = await aprimo.settings.getByName(["A", "B", "C"]);
   * ```
   */
  function getByName(
    name: string,
    scope?: SettingScope,
    scopeId?: string,
  ): Promise<ApiResult<Setting>>;

  function getByName(
    names: string[],
    scope?: SettingScope,
    scopeId?: string,
  ): Promise<ApiResult<SettingCollection>>;

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

  return {
    getByName,

    /**
     * Set a setting value at a given scope.
     *
     * Throws if `scope` is `"usergroup"` or `"site"` and `scopeId` is missing.
     *
     * @example
     * ```ts
     * await aprimo.settings.update({
     *   name: "MySetting", value: "true", scope: "system",
     * });
     * ```
     */
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
        throw new AprimoConfigError(
          `scopeId is required when scope is '${setting.scope}'`,
        );
      }

      return client.put(
        `/api/core/setting/${encodeURIComponent(setting.name)}`,
        setting,
      );
    },
  };
};

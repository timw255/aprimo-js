import { ApiLink } from "./ApiLink";

/**
 * Scope of a setting (SDK-only convenience type; no matching enum schema in dam.yaml).
 */
export type SettingScope = "user" | "usergroup" | "site" | "system";

/**
 * Represents a single setting in ADAM. Because settings can contain sensitive
 * information, an additional security measure is present in the REST API
 * preventing access to settings unless explicitly allowed by the ADAM
 * administrator. In order to access (read/write) any of the settings in ADAM,
 * the administrator first needs to configure a whitelist of all the settings
 * allowed to be accessed through the REST API. This whitelist is a system
 * setting in ADAM, named '.rest_SettingsWhitelist', in the form of a
 * comma-separated list of allowed setting names, and can be updated through
 * the System Studio. However, the whitelist does not affect users from the
 * ADAM Administrator and Operator user groups: they have access to all their
 * ADAM settings, irrespective of the whitelist. After the whitelist has been
 * properly configured, consumers can access the settings specified in the
 * whitelist via the REST API.
 */
export interface Setting {
  /** Gets the name of the setting. */
  name: string;
  /** Gets the value of the setting. */
  value: string;
  _links: SettingLinks;
}

export interface SettingLinks {
  self: ApiLink;
}

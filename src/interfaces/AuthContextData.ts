import type { AccountInfo } from "@azure/msal-browser";

export default interface AuthContextData {
  token: string | null;
  account: AccountInfo | null;
  roles: string[];
  rolesLoaded: boolean;
}
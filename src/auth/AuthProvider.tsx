import { createContext, useEffect, useState } from "react";
import type TokenProviderProps from "../interfaces/AuthProviderProps";
import { useMsal } from "@azure/msal-react";
import type { AccountInfo } from '@azure/msal-browser';
import type AuthContextData from "../interfaces/AuthContextData";
import { jwtDecode } from "jwt-decode";
import Constants from "../constants";

const scope = [ Constants.apiScope ];

export function useTokenProvider() {
  const { instance, accounts } = useMsal();

  const getToken = async () => {
    const account = accounts[0];
    if (!account) throw new Error("No active account");

    const request = {
      scopes: scope,
      account,
    };

    try {
      const response = await instance.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      // if refresh fails, reprompt login
      await instance.acquireTokenRedirect(request);
      throw error;
    }
  };

  return { getToken };
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  account: null,
  roles: [],
  rolesLoaded: false
});

export function AuthProvider({ children } : TokenProviderProps) {
  const { accounts, instance } = useMsal();
  const [token, setToken] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [fetched, setFetched] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [rolesLoaded, setRolesLoaded] = useState(false);

  useEffect(() => {
    if (accounts.length === 0) {
    // User has logged out (MSAL cleared accounts)
    setAccount(null);
    setToken(null);
    setRoles([]);
    setFetched(false);
    setRolesLoaded(false);
    return;
  }

    const activeAccount = accounts[0];
    setAccount(activeAccount);

    const request = {
      scopes: scope,
      account: activeAccount,
    };

    instance.acquireTokenSilent(request)
      .then(res => {
        setToken(res.accessToken);
        const decoded: any = jwtDecode(res.idToken); // Decoded.roles = ["UI.rfp_user"]
        setRoles(decoded.roles || []);
      })
      .catch(() => instance.acquireTokenRedirect(request))
      .finally(() => {
        setFetched(true);
        setRolesLoaded(true);
      });
  }, [accounts, instance, fetched]);

  return (
    <AuthContext.Provider value={{ token, account, roles, rolesLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}
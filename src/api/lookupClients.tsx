import { ClientClient, ClientDto, EmployeeClient, EmployeeDto, Organization, OrganizationClient} from "./client";
import {  useTokenProvider } from "../auth/AuthProvider";

type StaticLookup<T> = {
  mode: "static";
  fetch: () => Promise<T[]>;
  valueField: keyof T;
  labelField: keyof T;
};

type SearchableLookup<T> = {
  mode: "searchable";
  fetch: (search: string) => Promise<T[]>;
  fetchById: (id: string) => Promise<T>;
  valueField: keyof T;
  labelField: keyof T;
  minChars?: number;
};

export type LookupConfig<T> = StaticLookup<T> | SearchableLookup<T>;
export type LookupMap = {
  organization: LookupConfig<Organization>;
  principalInCharge: LookupConfig<EmployeeDto>;
  projectManager: LookupConfig<EmployeeDto>;
  supervisor: LookupConfig<EmployeeDto>;
  captureManager: LookupConfig<EmployeeDto>;
  biller: LookupConfig<EmployeeDto>;
  primaryClient: LookupConfig<ClientDto>;
  billingClient: LookupConfig<ClientDto>;
};

export function useAuthFetch() {
  const { getToken } = useTokenProvider();

  return async function authFetch(url: RequestInfo, init?: RequestInit) {
    const token = await getToken(); // will silently refresh if needed

    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${token}`);

    return fetch(url, { ...init, headers });
  };
}

export function useLookupClients(): LookupMap {
  const authFetch = useAuthFetch();

  // Orgs
  const organizationClient = new OrganizationClient("", { fetch: authFetch });
  const organizationObject = {
    mode: "static",
    fetch: () => organizationClient.organization_Get(),
    valueField: "org",
    labelField: "name",
  } as const;

  // Firms
  const clientClient = new ClientClient("", { fetch: authFetch })
  const clientObject = {
    mode: "searchable",
    fetch: (search: string) =>
      clientClient.client_Get(search),
    fetchById: (id: string) => clientClient.client_GetById(id),  
    valueField: "clientId",
    labelField: "name",
    minChars: 2,
  } as const;

  // Employees
  const employeeClient = new EmployeeClient("", { fetch: authFetch })
  const employeeObject = {
    mode: "searchable",
    fetch: (search: string) =>
      employeeClient.employee_Get(search),
    fetchById: (id: string) => employeeClient.employee_GetById(id),
    valueField: "employee",
    labelField: "titleName",
    minChars: 2,
  } as const;
 
  return {
    organization: organizationObject,
    principalInCharge: employeeObject,
    projectManager: employeeObject,
    supervisor: employeeObject,
    captureManager: employeeObject,
    biller: employeeObject,
    primaryClient: clientObject,
    billingClient: clientObject,
  } satisfies Record<string, LookupConfig<any>>;
}

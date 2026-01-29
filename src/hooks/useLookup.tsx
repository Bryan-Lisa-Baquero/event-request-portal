import { useQuery } from "@tanstack/react-query";
import { useLookupClients, type LookupConfig, type LookupMap } from "../api/lookupClients";

export const useLookup = <K extends keyof LookupMap>(
  field: K,
  search?: string
) => {
  const clients = useLookupClients();
  const config = clients[field];

  if (!config) {
    return { data: [], isLoading: false, error: null };
  }

  // Infer the DTO type for this lookup
  type ItemType = typeof config extends LookupConfig<infer T> ? T : never;

  return useQuery<ItemType[]>({
    queryKey: ["lookup", field, search],
    queryFn: () => {
      if (config.mode === "static") {
        return config.fetch() as Promise<ItemType[]>;
      }

      if (!search) return Promise.resolve([]) as Promise<ItemType[]>;

      return config.fetch(search) as Promise<ItemType[]>;
    },
    enabled:
      config.mode === "static" ||
      (search?.length ?? 0) >= (config.minChars ?? 1),
  });
};
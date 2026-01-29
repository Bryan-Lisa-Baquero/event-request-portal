/**
 * This helper function converts camelCase strings to kebab-case. Useful to match naming conventions dynamically.
 * 
 * @param str camelCase string to be formatted
 * @returns kebab-case formatted string
 */
export function camelToKebab(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * This helper function converts camelCase strings to Proper Case. Useful for generating User-facing strings dynamically.
 * 
 * @param str camelCase string to be formatted
 * @returns Proper Case formatted string
 */
export function camelToUserFriendly(str: string) {
   return  str
    .replace(/\.\d+/g, "")          // remove array indices
    .split(".")
    .pop()!                         // get last segment
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (s) => s.toUpperCase());
   
}

export function convertDatesToLocal<T = any>(raw: unknown): T {
  if (raw === null || raw === undefined) return raw as T;
  if (typeof raw !== "object") return raw as T;

  const obj = raw as { [key: string]: any };
  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = obj[key];

    if (value === null || value === undefined) {
      result[key] = value;
    } else if (typeof value === "string") {
      const isoDateRegex =
        /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?Z?)?$/;
      if (isoDateRegex.test(value)) {
        const d = new Date(value);
        if (!isNaN(d.getTime())) {
          result[key] = d;
          continue;
        }
      }
      result[key] = value;
    } else if (typeof value === "object") {
      result[key] = convertDatesToLocal(value); // recurse
    } else {
      result[key] = value;
    }
  }

  return result as T;
}


export function convertDatesToUtc<T = any>(raw: unknown): T {
  if (raw === null || raw === undefined) return raw as T;
  if (typeof raw !== "object") return raw as T;

  const obj = raw as { [key: string]: any };
  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = obj[key];

    if (value === null || value === undefined) {
      result[key] = value;
    } else if (value instanceof Date) {
      result[key] = value.toISOString();
    } else if (typeof value === "object") {
      result[key] = convertDatesToUtc(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

export function normalizeNullsToUndefined<T>(obj: unknown): T {
  if (obj === null) return undefined as T;
  if (typeof obj !== "object" || obj === undefined) return obj as T;

  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj as any) {
    const value = (obj as any)[key];
    result[key] = normalizeNullsToUndefined(value);
  }

  return result as T;
}

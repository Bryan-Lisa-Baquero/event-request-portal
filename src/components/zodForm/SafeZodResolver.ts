import { ZodType, ZodError } from "zod";
import type { Resolver } from "react-hook-form";

/**
 * Converts a Zod error (ZodError) to the format expected by React Hook Form.
 */
function zodToRHFError(zodError: ZodError, data: any): Record<string, any> {
  const errors: Record<string, any> = {};

  console.log(data);

  for (const issue of zodError.issues) {
    // Construct the dot/array path to the property, e.g., "user.email"
    const path = issue.path.join('.');

    // Find the actual field name for ref, if available
    let ref: any = {};
    if (path && typeof path === "string") {
      ref = { name: path };
    }

    errors[path] = {
      message: issue.message,
      type: issue.code,
      ref,
    };
  }

  return errors;
}

/**
 * Wraps Zod validation for use in React Hook Form, swallowing exceptions and formatting errors correctly.
 */
export function safeZodResolver<T extends ZodType<any, any>>(schema: T): Resolver<any> {
  return async (values) => {
    try {
      const result = schema.safeParse(values);
      if (result.success) {
        return { values: result.data, errors: {} };
      }
      // Format errors
      const errors = zodToRHFError(result.error, values);

      return {
        values: {},
        errors,
      };
    } catch (e) {
      // If Zod itself throws, log and return an "unknown" error on the form
      return {
        values: {},
        errors: {
          root: {
            message: "Validation failed",
            type: "validation_error",
            ref: {},
          },
        },
      };
    }
  };
}

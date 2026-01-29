import { ZodObject, ZodType } from "zod";

export default function getSchemaAtPath(schema: ZodType<unknown>, path: string): ZodType<unknown> {
  return path.split(".").reduce((current, key) => {
    if (current instanceof ZodObject) {
      return current.shape[key];
    }
    console.log("errorings in getschemaatpath")
    throw new Error(`Cannot descend into non-object schema at '${key}'`);
  }, schema);
}

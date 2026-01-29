export type FieldMeta = {
  name: string;
  type: "string" | "number" | "dropdown" | "nested";
  enumOptions?: string[];
  nestedType?: any;
};
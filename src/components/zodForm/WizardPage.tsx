import { type UseFormReturn } from "react-hook-form";
import { ZodObject } from "zod";
import RenderField from "./RenderFields";
import getSchemaAtPath from "./WalkSchema";

export type WizardMeta = Record<string, readonly string[]>; // step name -> paths

export interface WizardPageProps<
  TSchema extends ZodObject<any>
> {
  stepKey: string;
  meta: WizardMeta;
  schema: TSchema;
  form: UseFormReturn<Record<string, unknown>>;
}

export function WizardPage<TSchema extends ZodObject<any>>(
  props: WizardPageProps<TSchema>
) {
  const { stepKey, meta, schema, form } = props;
  const fields = meta[stepKey] as readonly string[];

  return (
    <>
      {fields.map((path) => {
        const fieldSchema = getSchemaAtPath(schema, path);
        return (
          <div key={path} className="mb-3">
            <RenderField path={path} schema={fieldSchema} register={form.register} control={form.control}/>
          </div>
        );
      })}
    </>
  );
}

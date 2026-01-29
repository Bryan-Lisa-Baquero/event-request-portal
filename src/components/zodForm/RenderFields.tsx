import { ZodEnum, ZodLiteral, ZodNumber, ZodString, ZodType, ZodUnion, ZodDate, ZodBoolean, ZodUndefined, ZodOptional, ZodNullable, ZodFile } from "zod";
import { Controller, useFormState, useWatch, type Control, type FieldValues, type Path, type UseFormRegister, useFormContext, type PathValue } from "react-hook-form";
import { camelToKebab, camelToUserFriendly } from "../../Helpers";
import { useLookupClients } from "../../api/lookupClients";
import { ZodArray } from "zod";
import { ZodObject } from "zod";
import RenderStaticLookupField from "./RenderStaticLookupField";
import RenderSearchableLookupField from "./RenderSearchableLookupField";

interface RenderFieldProps<T extends FieldValues = FieldValues> {
  path: string;
  schema: ZodType<unknown>;
  register: UseFormRegister<T>;
  control: Control<T>;
  readonly?: boolean;
}

function unwrapSchema(s: any): any {
  while (s instanceof ZodOptional || s instanceof ZodNullable) {
    s = s._def.innerType;
  }
  return s;
  
}

function getLiteralOptions(schema: any): any[] {
  if (schema instanceof ZodLiteral) return [schema.value];
  if (schema instanceof ZodEnum) return schema.options;
  if (schema instanceof ZodUnion) return schema.options.flatMap(getLiteralOptions);
  return [];
}

function isOptionalString(schema: any) {

  const unwrapped = unwrapSchema(schema);

  // Either a plain string
  if (unwrapped instanceof ZodString) return true;

  // Or a union that includes string + undefined
  if (
    unwrapped instanceof ZodUnion &&
    unwrapped.options.some((opt: any) => opt instanceof ZodString) &&
    unwrapped.options.some((opt: any) => opt instanceof ZodUndefined)
  ) {
    return true;
  }

  return false;
}

function isZodFileInstance(schema: any): boolean {
  return schema.description === "file";
}

export default function RenderField<T extends FieldValues = FieldValues>({ path, schema, register, control, readonly }: RenderFieldProps<T>) {
  const { errors } = useFormState({ control });
  console.log(JSON.stringify(errors))
  console.log(errors[`${path}`]?.message)
  const error = errors[`${path}`]?.message as string
  console.log(`${path} error: ${error}`);
  const displayPath = path.replace(/\.\d+$/, "");
  console.log(`${displayPath} (displayPath) error: ${error}`);
  const id = camelToKebab(path);
  const unwrapped = unwrapSchema(schema);
  const clients = useLookupClients();
  const lookupKey =  path.split(".").pop()!;
  const lookupCfg = clients[lookupKey as keyof typeof clients];
  const selectError = `Invalid input. ${camelToUserFriendly(displayPath)} is required.`
  const currentValue = useWatch({ control, name: path as Path<T> }) ?? [];
  const { setValue } = useFormContext<T>();

  if (lookupCfg && lookupCfg.mode === "static") {
    // debugger;
    // const { data } = useLookup(lookupKey as keyof typeof clients); // WHY DOES THIS HOOK VIOLATION FIX IT
    return <RenderStaticLookupField id={id} displayPath={displayPath} lookupCfg={lookupCfg} control={control} path={path} readonly={readonly}/>
   }

  if (lookupCfg && lookupCfg.mode === "searchable") {
    return <RenderSearchableLookupField id={id} displayPath={displayPath} lookupCfg={lookupCfg} control={control} path={path} readonly={readonly} />;
  }

  if (unwrapped instanceof ZodString || isOptionalString(schema)) {
      return (
        <Controller
          name={path as Path<T>}
          control={control}
          defaultValue={"" as PathValue<T, Path<T>>}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor={id}>{camelToUserFriendly(displayPath)}</label>
              <input
                id={id}
                {...field}
                className="form-control"
                autoComplete={id}
                disabled={readonly}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.error && (
                <div className="text-danger">{fieldState.error.message}</div>
              )}
            </div>
          )}
      />

      );
    }

  if (schema instanceof ZodNumber) {
    return (
      <Controller 
        name={path as Path<T>}
        control={control}
        render={({ field }) => (
          <div>
          <label htmlFor={id}>
            {camelToUserFriendly(displayPath)}
          </label>

          <input
            type="number"
            id={id}
            className="form-control"
            disabled={readonly}
            value={field.value ?? ""} // keep input controlled
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value === "" ? undefined : Number(value));
            }}
          />

          {error && <div className="text-danger">{error}</div>}
        </div>
        )}
      />
    );
  }

  if (schema instanceof ZodEnum) {
    return (
      <div>
        <label htmlFor={id}>{camelToUserFriendly(displayPath)}</label>
        <select {...register(path as Path<T>)} className="form-control" disabled={readonly}>
          {schema.options.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {error && <div className="text-danger">{selectError}</div>}
      </div>
    );
  }

  const options = getLiteralOptions(unwrapped);
  if (options.length > 0) {
    return (
      <Controller
        name={path as any} // adjust type to Path<T> if needed
        control={control}
        render={({ field }) => (
          <div className="mb-3">
            <label htmlFor={id}>{camelToUserFriendly(displayPath)}</label>
            <select
              id={id}
              {...field}
              className="form-control"
              onChange={(e) =>
                field.onChange(e.target.value === "" ? undefined : e.target.value)
              }
              disabled={readonly}
            >
              <option value="">Select an option</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            {error && <div className="text-danger">{selectError}</div>}
          </div>
        )}
      />
    );
  }


  if (schema instanceof ZodDate) {
  return (
    <Controller
      name={path as Path<T>}
      control={control}
      render={({ field }) => {
        // Convert Date to YYYY-MM-DD string for the input
        const valueAsString =
          (field.value)
            ? field.value.toISOString().split("T")[0]
            : "";

        return (
          <div>
            <label htmlFor={id}>{camelToUserFriendly(displayPath)}</label>
            <input
              id={id}
              type="date"
              className="form-control"
              disabled={readonly}
              value={valueAsString} // always a string for React
              onChange={(e) => {
                const val = e.target.value;
                // Convert string to Date for Zod
                field.onChange(val ? new Date(val) : undefined);
              }}
              onBlur={field.onBlur}
              name={field.name}
            />
            {error && <div className="text-danger">{error}</div>}
          </div>
        );
      }}
    />
  );
}


// Boolean or optional boolean (boolean | undefined)
if (
  unwrapped instanceof ZodBoolean ||
  (unwrapped instanceof ZodUnion &&
    unwrapped.options.some(opt => opt instanceof ZodBoolean) &&
    unwrapped.options.some(opt => opt instanceof ZodUndefined))
) {
  return (
    <div className="mb-3 align-items-center gap-2">
      <input
        type="checkbox"
        id={id}
        {...register(path as Path<T>)}
        className="form-check-input"
        disabled={readonly}
      />
      <label htmlFor={id} className="form-check-label mb-0 ms-2">
        {camelToUserFriendly(displayPath)}
      </label>
      {error && <div className="text-danger ms-3">{error}</div>}
    </div>
  );
}

if (unwrapped instanceof ZodFile 
  || isZodFileInstance(schema)
) {
  return (
    <div className="mb-3">
      <label htmlFor={id}>{camelToUserFriendly(displayPath)}</label>
      <input
        id={id}
        type="file"
        {...register(path as Path<T>)}
        className="form-control"
        disabled={readonly}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  )
}
if (unwrapped instanceof ZodArray) {

  const itemSchema = unwrapped.element;

  return (
    <div className="mb-3">
      <label className="form-label">
        {camelToUserFriendly(displayPath)}
      </label>

      <button
        type="button"
        className="btn btn-sm btn-outline-primary mb-2"
        disabled={readonly}
        onClick={() => {
          const current = currentValue ?? [];
          setValue(path as Path<T>, [...current, {}] as any);
        }}
      >
        + Add
      </button>

      {(currentValue ?? []).map((_, index) => (
        <div key={index} className="border p-2 mb-2">
          <RenderField
            schema={itemSchema as ZodType<unknown>}
            path={`${path}.${index}`}
            control={control}
            register={register}
            readonly={readonly}
          />
        </div>
      ))}
    </div>
  );
}
if (unwrapped instanceof ZodObject) {
  const shape = unwrapped.shape;

  return (
    <div className="mb-3">
      {Object.entries(shape).map(([key, fieldSchema]) => (
        <RenderField
          key={key}
          path={`${path}.${key}`}
          schema={fieldSchema}
          control={control}
          register={register}
          readonly={readonly}
        />
      ))}
    </div>
  );
}
//   As more fields are needed, like array, add.
  return <div>Unsupported field type</div>;
}
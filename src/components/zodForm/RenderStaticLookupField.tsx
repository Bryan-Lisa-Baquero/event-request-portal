import { Controller, useFormState, type Control, type FieldValues, type Path, type PathValue } from "react-hook-form";
import { camelToUserFriendly } from "../../Helpers";
import { useLookupClients, type LookupConfig } from "../../api/lookupClients";
import type { ClientDto, EmployeeDto, Organization } from "../../api/client";
import { useLookup } from "../../hooks/useLookup";

export interface StaticLookupFieldProps<T extends FieldValues = FieldValues> {
    id: string;
    displayPath: string;
    lookupCfg: LookupConfig<Organization> | LookupConfig<EmployeeDto> | LookupConfig<ClientDto>
    control: Control<T>
    path: string;
    readonly?: boolean;
}

export default function RenderStaticLookupField<T extends FieldValues = FieldValues>({ id, displayPath, lookupCfg, control, path, readonly }: StaticLookupFieldProps<T> ) {
    const lookupKey =  path.split(".").pop()!;
    const clients = useLookupClients();
    const { data } = useLookup(lookupKey as keyof typeof clients);
    const { errors } = useFormState({ control });
    const error = errors[`${path}`]?.message as string

    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {camelToUserFriendly(displayPath)}
        </label>

        {/* STATIC LOOKUP */}
        {lookupCfg.mode === "static" && (
          <Controller
            control={control}
            name={path as Path<T>}
            render={({ field }) => (
              <select 
                {...field} 
                id={id} 
                className="form-control" 
                onChange={e => field.onChange(e.target.value === "" ? undefined : e.target.value)}
                disabled={readonly}
                defaultValue={"" as PathValue<T, Path<T>>}
              >
                <option value="">Select one…</option>
                {data?.map(item => {
                  const value = item[lookupCfg.valueField];
                  const label = item[lookupCfg.labelField];

                  return (
                    <option key={String(value)} value={String(value)}>
                      {String(label)}
                    </option>
                  );
                })}
              </select>
            )}
          />
        )}

        {error && (
                  <div className="text-danger mt-1">
                    Invalid input. {camelToUserFriendly(displayPath)} is required. 
                  </div>
                )}
              </div>
        );
}

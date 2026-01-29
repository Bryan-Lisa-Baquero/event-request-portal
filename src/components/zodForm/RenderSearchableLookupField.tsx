import { Controller, useFormState, useWatch, type Control, type FieldValues, type Path } from "react-hook-form";
import { useLookupClients, type LookupConfig } from "../../api/lookupClients";
import type { ClientDto, EmployeeDto, Organization } from "../../api/client";
import { useEffect, useState } from "react";
import { useLookup } from "../../hooks/useLookup";
import { useDebounce } from "../../hooks/useDebounce";
import { camelToUserFriendly } from "../../Helpers";

export interface SearchableLookupFieldProps<T extends FieldValues = FieldValues> {
    id: string;
    displayPath: string;
    lookupCfg: LookupConfig<Organization> | LookupConfig<EmployeeDto> | LookupConfig<ClientDto>
    control: Control<T>
    path: string;
    readonly?: boolean;
}

export default function RenderSearchableLookupField<T extends FieldValues = FieldValues>({id, displayPath, lookupCfg, control, path, readonly}: SearchableLookupFieldProps<T>) {
    const { errors } = useFormState({ control });
    console.log(`Errors inside of rendersearchablelookupfield: ${JSON.stringify(errors)}`)
    const error = errors[`${path}`]?.message as string
    console.log(`SEARCHABLE ERROR: ${error}`);
    const clients = useLookupClients();
    const lookupKey =  path.split(".").pop()!;
    const [isSearching, setIsSearching] = useState(false);    
    const fieldValue = useWatch({ name: path as Path<T>, control });    
    const [searchInput, setSearchInput] = useState(''); // visible input
    const [ignoreNextInputEffect, setIgnoreNextInputEffect] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const debouncedSearch = useDebounce(searchInput, 300);    
    const { data } = useLookup(
        lookupKey as keyof typeof clients,
        isSearching && debouncedSearch
          ? debouncedSearch
          : undefined
      );

       // ---- READONLY MODE ---- //  
      useEffect(() => {  
        if (!readonly) return;  
        // When in readonly, always resolve the ID to label and show label only  
        if (!fieldValue) {  
          setSearchInput('');
        } else if (lookupCfg.mode === 'searchable'){  
          lookupCfg.fetchById(fieldValue).then((item: Organization | EmployeeDto | ClientDto) =>  
            setSearchInput(item ? String((item as Record<string, any>)[lookupCfg.labelField]) : '')  
          );  
        }  
        // Ensure dropdown never shows in readonly  
        setShowDropdown(false);  
      }, [readonly, lookupCfg, fieldValue]); 

      // ---- EDIT MODE - Manage input field state ---- //  
  useEffect(() => {  
    if (readonly) return; // only runs in edit mode  
  
    // When switching from readonly → edit, ignore first input population  
    if (ignoreNextInputEffect) {  
      setIgnoreNextInputEffect(false);  
      return;  
    }  
  
    // Populate search input from resolved label when value changes  
    if (!lookupCfg || !fieldValue) {  
      setSearchInput('');  
    }  else if (lookupCfg.mode === 'searchable'){  
      lookupCfg.fetchById(fieldValue).then((item: Organization | EmployeeDto | ClientDto) =>  
        setSearchInput(item ? String((item as Record<string, any>)[lookupCfg.labelField]) : '')  
      );  
    }  
    // Don't show dropdown just because input populated on edit open  
    setShowDropdown(false);  
  }, [readonly, lookupCfg, fieldValue, ignoreNextInputEffect]);  
  
  // ---- When readonly changes to false, ignore dropdown if input value is set ---- //  
  useEffect(() => {  
    if (!readonly) {  
      setIgnoreNextInputEffect(true);  
    }  
  }, [readonly]);  
  
  // ---- Editable: dropdown should only show after user types ---- //    
  
  useEffect(() => {
  if (readonly) return setShowDropdown(false);

  setShowDropdown(
    isSearching &&
    !!debouncedSearch &&
    !!data?.length
  );
}, [readonly, isSearching, debouncedSearch, data]);

    
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {camelToUserFriendly(displayPath)}
        </label>

        {/* SEARCHABLE LOOKUP */}
        {lookupCfg.mode === "searchable" && (
          <Controller
            control={control}
            name={path as Path<T>}
            render={({ field }) => {            

              return (
                <div className="position-relative">
                  <input
                    id={id}
                    className="form-control"
                    value={searchInput} // bind to visible input
                    placeholder={`Search ${camelToUserFriendly(displayPath)}…`}
                    onChange={(e) => {
                      setIsSearching(true);
                      setSearchInput(e.target.value)}}
                    autoComplete="off"
                    disabled={readonly}
                    // onBlur={() => setIsSearching(false)}
                  />

                  {showDropdown && data !== undefined && data?.length > 0 && (
                    <ul className="list-group position-absolute w-100 z-3">
                      {data.map(item => {
                        const value = item[lookupCfg.valueField];
                        const label = item[lookupCfg.labelField];

                        return (
                          <li
                            key={String(value)}
                            className="list-group-item list-group-item-action"
                            onClick={() => {
                              field.onChange(value);
                              setSearchInput(String(label));
                              setIsSearching(false);
                              setShowDropdown(false);
                            }}
                          >
                            {String(label)}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            }}
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
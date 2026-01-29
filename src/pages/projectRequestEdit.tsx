import { useState, useEffect } from "react";
import { ProjectRequest, ProjectRequestDelta, type StageKind } from "../api/client";
import RenderField from "../components/zodForm/RenderFields";
import { useAuthFetch } from "../api/lookupClients";
import { useParams } from "react-router-dom";
import { iNewProjectRequestSchema } from "../api/client.zod";
import { stageSchemas } from "../components/entry/StageSchemas";
import { FormProvider, useForm } from "react-hook-form";
import { expandSchemaFields } from "../components/entry/ProjectRequestWizard";
import getSchemaAtPath from "../components/zodForm/WalkSchema";
import { ProjectRequestClientExt } from "../api/client.ext";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertDatesToLocal, convertDatesToUtc } from "../Helpers";



export function ProjectRequestEdit() {  
  const { id } = useParams();  
  const [data, setData] = useState<any>(null);  
  const [readonly, setReadonly] = useState(true);  
  const [loading, setLoading] = useState(true);  
  const [schema, setSchema] = useState<any>();
  
  const authFetch = useAuthFetch();  
  const client = new ProjectRequestClientExt("", { fetch: authFetch });

  const load = async () => {  
      setLoading(true);  
      const raw = await client.projectRequest_GetById(Number(id));
      const rawLocalDates = convertDatesToLocal(raw);
      const typedProjectRequest = raw as ProjectRequest;
      const stageSchema = getFullSchemaForStage(typedProjectRequest.stage);  
      setSchema(stageSchema);  
      setData(rawLocalDates);  
      setLoading(false);  
    }

  const onApprove = async () => {
    // make a delta and approve
    const delta = new ProjectRequestDelta();
    delta.projectRequestStage = "Approved";
    await client.projectRequest_Patch(Number(id), delta);
    await load();
  }

  const onDeny = async () => {
    // make a delta and DENY
    const delta = new ProjectRequestDelta();
    delta.projectRequestStage = "Changes Requested";
    await client.projectRequest_Patch(Number(id), delta);
    await load();
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const valid = await form.trigger();

    console.log(`isValid? ${valid}`)

    if (!valid) return;

    const values = form.getValues();
    const valuesUtcDates = convertDatesToUtc(values)

    console.log(values)
    console.log(JSON.stringify(values));

    await client.projectRequest_Put(Number(id), valuesUtcDates);
    setReadonly(true);
    await load();
  }
  
  // Load the data and schema  
  useEffect(() => {  
    load();  
  }, [id]);  
  
  // Setup RHF form, defaultValues from loaded data  
  const form = useForm<ProjectRequest>({
  defaultValues: {}, // start empty
  shouldUnregister: false,
  resolver: schema ? zodResolver(schema) : undefined
});

useEffect(() => {
  if (data) {
    form.reset(data);
  }
}, [data, form]);
  
  // Map fields to RenderField  
  if (loading || !schema) return <div>Loading...</div>;  
  const fields = expandSchemaFields(schema);  
  
  return (  
    <FormProvider {...form}>  
      <form onSubmit={onSubmit}>  
        {fields.map((field) => (  
          <RenderField
            key={field}  
            path={field}  
            schema={getSchemaAtPath(schema, field)}  
            register={form.register}  
            control={form.control}  
            readonly={readonly}  
          />  
        ))}
        <div className="mt-4 d-flex gap-3">
            {/* Primary action: Edit ↔ Save */}
            <button
                type={readonly ? "button" : "submit"}
                onClick={(e) => {
                if (readonly) {
                    e.preventDefault();
                    e.stopPropagation();
                    setReadonly(false);
                }
                }}
            >
                {readonly ? "Edit" : "Save"}
            </button>

            {/* Secondary actions when readonly */}
            {readonly && (
                <>
                <button
                    type="button"
                    onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await onApprove();
                    }}
                >
                    Approve
                </button>

                <button
                    type="button"
                    onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // TODO: request changes handler
                    await onDeny();
                    }}
                >
                    Request Changes
                </button>
                </>
            )}

            {/* Cancel only when editing */}
            {!readonly && (
                <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.reset();      // revert to last loaded values
                    setReadonly(true);
                }}
                >
                Cancel
                </button>
            )}
            </div>

      </form>  
    </FormProvider>  
  );  
}  
const ROOT_FORM_OMIT = {
  requesterEmail: true,
  stage: true,
} as const;

const STAGE_DATA_OMIT = {
  stage: true,
} as const;

function getFullSchemaForStage(stage: StageKind) {
  return iNewProjectRequestSchema
    .omit(ROOT_FORM_OMIT)
    .extend({
      stageData: stageSchemas[stage].omit(STAGE_DATA_OMIT),
    });
}



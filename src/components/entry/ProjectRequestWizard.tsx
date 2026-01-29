import { Wizard } from "../zodForm/Wizard";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../api/lookupClients";
import { AuthContext } from "../../auth/AuthProvider";
import { useContext, useMemo, useState } from "react";
import type AuthContextData from "../../interfaces/AuthContextData";
import { ProjectRequestFileUploadClient } from "../../api/projectRequestFileUploadClient";
import z, { ZodObject } from "zod";
import { withFileUpload } from "../zodForm/UploadFileSchema";
import { stageSchemas } from "./StageSchemas";
import { NewProjectRequest, ProjectRequestClient, type StageKind } from "../../api/client";
import { StageKindLabels } from "./Labels";
import { iNewProjectRequestSchema } from "../../api/client.zod";
import type { WizardMeta } from "../zodForm/WizardPage";
import type { Path } from "react-hook-form";
import { ZodEffects } from "zod/v3";
import { convertDatesToUtc } from "../../Helpers";


/**
 * ProjectRequestWizard
 *
 * Shared orchestration layer for all Project Request wizards (PreAward, PostAward, etc).
 *
 * Responsibilities:
 * - Wire Wizard -> API submission flow
 * - Handle authenticated client initialization
 * - Handle optional file upload using the created projectRequestId
 * - Enforce a consistent submit + success navigation pattern
 *
 * Stage-specific wizards should:
 * - Define their own Zod schema & WizardMeta
 * - Provide the POST method (e.g. postPreAward, postPostAward)
 * - Provide a payload builder
 *
 * This component exists to avoid duplicating submit + upload logic
 * across every ProjectRequest stage.
 */
interface ProjectRequestWizardProps {
    hasFileUpload?: boolean;
}

export function ProjectRequestWizard({
    hasFileUpload = false,
}: ProjectRequestWizardProps) {
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const { account } = useContext<AuthContextData>(AuthContext);

    const [selectedStage, setSelectedStage] = useState<StageKind | null>();

    const effectiveSchema = selectedStage && stageSchemas[selectedStage]
        ? hasFileUpload
            ? withFileUpload(getFullSchemaForStage(selectedStage))
            : getFullSchemaForStage(selectedStage)
        : null;
    
    const meta = useMemo(() => {
        return effectiveSchema
            ? buildWizardMeta<NewProjectRequest>(effectiveSchema, hasFileUpload)
            : null;
    }, [effectiveSchema, hasFileUpload]);


    const submit = async (data: any) => {
        const email = account?.username ?? "";
        const client = new ProjectRequestClient("", { fetch: authFetch });

        const payload = {
            ...data,
            requesterEmail: email,
            stage: selectedStage,
            stageData: {
                // IMPORTANT: backend REQUIRES this order. stage, restOfData
                stage: selectedStage,
                ...data.stageData
            }
        } as NewProjectRequest;
        console.log(JSON.stringify(payload));
        const payloadUtcDates = convertDatesToUtc(payload)
        const res = await client.projectRequest_Post(payloadUtcDates);
        if (hasFileUpload && data.contractOrProposal?.length && data.fileType && res.projectRequestId) {
            const uploadClient = new ProjectRequestFileUploadClient("", { fetch: authFetch });
            await uploadClient.uploadFile(res.projectRequestId, data.contractOrProposal[0], data.fileType);
        }
        navigate(`/management/project-request/success/${res.projectRequestId}`);
    }

    if (!effectiveSchema || !meta) {
        return (
            <div>
                <label>Select Stage</label>
                <select
                    value={selectedStage ?? ""}
                    onChange={(e) =>
                        setSelectedStage(e.target.value as StageKind)
                    }
                    >
                        <option value="">Select an option</option>
                    {Object.entries(StageKindLabels).map(([key, label]) => (
                        <option key={key} value={key}>
                        {label}
                        </option>
                    ))}
                </select>
            </div>

        );
    }

    return (
        <Wizard
            meta={meta}
            schema={effectiveSchema}
            onSubmit={submit}
        />
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

function buildWizardMeta<T>(
  schema: ZodObject<any>,
  hasFileUpload: boolean
): WizardMeta {
  const fields = expandSchemaFields(schema) as Path<T>[];
  let meta = buildSteps<T>(fields, 6);

  if (hasFileUpload) {
    meta = injectFileUploadStep(meta);
  }

  return meta;
}


function unwrapZodObject(schema: any): ZodObject<any> | null {
  console.log("trying to unwrap")
  if (schema instanceof ZodObject) return schema;
  if (schema instanceof ZodEffects) return unwrapZodObject(schema._def.schema);
  return null;
}


export function expandSchemaFields(
  schema: z.ZodObject<any>,
  prefix = ""
): string[] {
  const fields: string[] = [];

  for (const [key, value] of Object.entries(schema.shape)) {
    // Hide discriminator from UI
    if (key === "stage") continue;
    // Hide redundant fields we populate (TODO: this can be an array if key in [ ])
    if (key === "requesterEmail") continue;

    const child = unwrapZodObject(value);

    if (child) {
      // Nested object → recurse with dot-path
      fields.push(
        ...expandSchemaFields(
          child,
          prefix ? `${prefix}.${key}` : key
        )
      );
    } else {
      // Leaf field
      fields.push(prefix ? `${prefix}.${key}` : key);
    }
  }

  return fields;
}


function buildSteps<T>(
  fields: Path<T>[],
  fieldsPerStep = 6
): WizardMeta {
  const meta: WizardMeta = {};
  let step = 1;

  for (let i = 0; i < fields.length; i += fieldsPerStep) {
    meta[`step${step}`] = fields.slice(i, i + fieldsPerStep);
    step++;
  }

  return meta;
}

function injectFileUploadStep<T>(
  meta: WizardMeta
): WizardMeta {
  return {
    ...meta,
    [`step${Object.keys(meta).length + 1}`]: [
      "contractOrProposal",
      "fileType",
    ] as Path<T>[]
  };
}


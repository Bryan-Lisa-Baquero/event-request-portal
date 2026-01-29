import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject } from "zod";
import { WizardPage, type WizardMeta } from "./WizardPage";
 import{ FormProvider } from "react-hook-form";
// import { safeZodResolver } from "./SafeZodResolver";
interface WizardProps {
  meta: WizardMeta;
  schema: ZodObject<any>;
  onSubmit: SubmitHandler<FieldValues>;
}

export function Wizard({ meta, schema, onSubmit }: WizardProps) {
  const form = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    shouldUnregister: false,
  });

  const stepKeys = Object.keys(meta) as (keyof typeof meta)[];
  const [stepIndex, setStepIndex] = useState(0);
  const currentStepKey = stepKeys[stepIndex];

  const next = async () => {
    const stepFields = meta[currentStepKey]; // array of paths on this step
    const valid = await form.trigger(stepFields);

    if (valid && stepIndex < stepKeys.length - 1) {
        setStepIndex(stepIndex + 1);
    }
    };

  const back = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const valid = await form.trigger();

    console.log(`isValid? ${valid}`)

    if (!valid) return;

    onSubmit(form.getValues());
  };
  return (
     <FormProvider {...form}>
    <form onSubmit={submit}>
      <WizardPage stepKey={currentStepKey} meta={meta} schema={schema} form={form} />

      <div className="mt-4">
        {stepIndex > 0 && (
          <button type="button" onClick={back} className="btn btn-secondary me-2">
            Back
          </button>
        )}
        {stepIndex < stepKeys.length - 1 && (
          <button type="button" onClick={next} className="btn btn-primary">
            Next
          </button>
        )}
        {stepIndex === stepKeys.length - 1 && (
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        )}
      </div>
    </form>
     </FormProvider>
  );
}

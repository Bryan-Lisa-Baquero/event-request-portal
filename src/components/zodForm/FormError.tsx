import { type FieldErrors, type FieldValues } from "react-hook-form";

interface FormErrorProps<T extends FieldValues = FieldValues> {
  path: string;
  errors: FieldErrors<T>;
}

export default function FormError<T extends FieldValues = FieldValues>({
  path,
  errors,
}: FormErrorProps<T>) {
  // React Hook Form error objects are nested according to field paths
  const error = path
    .split(".")
    .reduce((acc: any, key: string) => (acc ? acc[key] : undefined), errors);

  if (!error) return null;

  return <div className="text-danger">{(error as any).message}</div>;
}

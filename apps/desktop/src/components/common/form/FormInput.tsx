import { useFormContext } from "react-hook-form";
import Input from "@/components/ui/Input";
import type { InputHTMLAttributes } from "react";

interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  label: string;
  name: string;
}
const FormInput = ({
  label,
  name,
  ...inputProps
}: FormInputProps) => {
    const {
  register,
  formState: { errors },
} = useFormContext();
  return (
    <Input
  label={label}
  error={errors[name]?.message as string | undefined}
  {...register(name)}
  {...inputProps}
/>
  );
};

export default FormInput;
import { useForm } from "react-hook-form";

const useFormValidate = () => {
  const {
    reset,
    register,
    handleSubmit,
    clearErrors,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  return {
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    clearErrors,
    isSubmitSuccessful,
    errors,
    register,
  };
};

export default useFormValidate;

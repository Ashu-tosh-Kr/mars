import { useField } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const InputField = ({ name, mb, label, required, ...rest }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    name,
    variant: "filled",
    ...field,
    ...rest,
  };
  return (
    <>
      <FormControl
        isRequired={required}
        isInvalid={meta.error && meta.touched}
        mb={mb}
      >
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input {...configTextField} isInvalid={meta.touched && !!meta.error} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default InputField;

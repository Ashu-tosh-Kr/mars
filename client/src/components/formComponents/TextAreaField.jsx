import { useField } from "formik";
import {
  FormErrorMessage,
  FormControl,
  Textarea,
  FormLabel,
} from "@chakra-ui/react";

const TextAreaField = ({ name, mb, label, required, ...rest }) => {
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
        <Textarea
          {...configTextField}
          isInvalid={meta.touched && !!meta.error}
        />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default TextAreaField;

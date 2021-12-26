import { useField } from "formik";
import { FormErrorMessage, FormControl, Textarea } from "@chakra-ui/react";

const TextAreaField = ({ name, mb, ...rest }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    name,
    variant: "filled",
    ...field,
    ...rest,
  };
  return (
    <>
      <FormControl isInvalid={meta.error && meta.touched} mb={mb}>
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

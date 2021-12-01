import { useField } from "formik";
import { Input, FormErrorMessage, FormControl } from "@chakra-ui/react";

const InputField = ({ name, mb, ...rest }) => {
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
        <Input {...configTextField} isInvalid={meta.touched && !!meta.error} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default InputField;

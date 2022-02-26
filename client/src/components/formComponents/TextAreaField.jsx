import { useField } from "formik";
import {
  FormErrorMessage,
  FormControl,
  Textarea,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useFastField(props) {
  const [field, meta] = useField(props);
  const [value, setValue] = useState(field.value);
  const { onChange } = field;
  //why useDebounce?
  //because we want to wait for the user to stop typing before we update the value to improve performance
  const debounced = useDebouncedCallback((e) => {
    onChange(e);
  }, 100);

  field.value = value;
  field.onChange = (e) => {
    if (e && e.currentTarget) {
      setValue(e.currentTarget.value);
      debounced(e);
    }
  };
  return [field, meta];
}

const TextAreaField = ({ name, mb, label, required, ...rest }) => {
  const [field, meta] = useFastField(name);
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

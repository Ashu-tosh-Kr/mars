import { useField } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";

export function useFastField(props) {
  const [field, meta] = useField(props);
  const [value, setValue] = useState(field.value);
  const { onBlur, onChange } = field;

  field.value = value;
  field.onChange = (e) => {
    if (e && e.currentTarget) {
      setValue(e.currentTarget.value);
    }
  };
  field.onBlur = (e) => {
    onChange(e);
    onBlur(e);
  };

  return [field, meta];
}

const InputField = ({ name, mb, label, required, ...rest }) => {
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
        <Input {...configTextField} isInvalid={meta.touched && !!meta.error} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default InputField;

export const InputFieldSlow = ({ name, mb, label, required, ...rest }) => {
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

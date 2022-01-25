import { useField } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
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

const InputArray = ({
  name,
  mb,
  rightAddOn,
  leftAddOn,
  leftAddOnClick,
  rightAddOnClick,
  ...rest
}) => {
  const [field, meta] = useFastField(name);
  const configTextField = {
    name,
    variant: "filled",
    ...field,
    ...rest,
  };
  return (
    <>
      <FormControl isInvalid={meta.error && meta.touched} mb={mb}>
        <InputGroup>
          <InputLeftAddon cursor="pointer" onClick={leftAddOnClick}>
            {leftAddOn}
          </InputLeftAddon>
          <Input
            {...configTextField}
            isInvalid={meta.touched && !!meta.error}
          />
          <InputRightAddon cursor="pointer" onClick={rightAddOnClick}>
            {rightAddOn}
          </InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default InputArray;

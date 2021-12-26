import { useField } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
} from "@chakra-ui/react";

const InputField = ({
  name,
  mb,
  rightAddOn,
  leftAddOn,
  leftAddOnClick,
  rightAddOnClick,
  ...rest
}) => {
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
export default InputField;

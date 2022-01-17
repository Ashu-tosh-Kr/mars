import { useField } from "formik";
import {
  FormErrorMessage,
  FormControl,
  Select,
  FormLabel,
} from "@chakra-ui/react";

const MenuField = ({ name, mb, options, label, required, ...rest }) => {
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
        <Select
          placeholder="Select Option"
          {...configTextField}
          isInvalid={meta.touched && !!meta.error}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt._id}>
              {opt.name}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default MenuField;

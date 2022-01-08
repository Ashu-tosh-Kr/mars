import { Field, useField } from "formik";
import {
  FormErrorMessage,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  FormLabel,
} from "@chakra-ui/react";

const RadioField = ({ name, mb, options, label, required, ...rest }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    name,
    variant: "filled",
    ...field,
    ...rest,
  };
  return (
    <>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <FormControl
              isRequired={required}
              isInvalid={meta.error && meta.touched}
              mb={mb}
            >
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <RadioGroup
                {...configTextField}
                value={`${value}`}
                onChange={(val) => setFieldValue(name, val)}
              >
                <Stack direction="row">
                  {options.map((opt, i) => (
                    <Radio key={i} value={opt.value}>
                      {opt.key}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
    </>
  );
};
export default RadioField;

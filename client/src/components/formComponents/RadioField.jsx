import { Field, useField } from "formik";
import {
  FormErrorMessage,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

const RadioField = ({ name, mb, options, ...rest }) => {
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
            <FormControl isInvalid={meta.error && meta.touched} mb={mb}>
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

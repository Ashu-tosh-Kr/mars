import {
  Grid,
  GridItem,
  FormLabel,
  Input,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//non lib imports
import InputField from "components/formComponents/InputField";
import RichTextEditor from "components/formComponents/RichTextEditor";
import TextAreaField from "components/formComponents/TextAreaField";

export default function DetailSection({ user, formik }) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Details
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={12}>
            {/* <TextAreaField
    disabled={user.role === 0}
    label="Details"
    placeholder="Details"
    name="gigDetails"
  /> */}
            <FormLabel htmlFor={"gigDetails"}>{"Details"}</FormLabel>
            <RichTextEditor
              value={formik.values.gigDetails}
              onChange={(date) => formik.setFieldValue("gigDetails", date)}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor="gigArrive">Arrival Time</FormLabel>
            <DatePicker
              disabled={user.role === 0}
              selected={formik.values.gigArrive}
              onChange={(time) => formik.setFieldValue("gigArrive", time)}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="Pp"
              timeFormat="p"
              placeholderText="Arrival Time"
              customInput={<Input variant="filled" />}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor="gigGoHome">Departure Time</FormLabel>
            <DatePicker
              disabled={user.role === 0}
              selected={formik.values.gigGoHome}
              onChange={(time) => formik.setFieldValue("gigGoHome", time)}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="Pp"
              timeFormat="p"
              placeholderText="Departure Time"
              customInput={<Input variant="filled" />}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor="embargo">Embargo</FormLabel>
            <DatePicker
              disabled={user.role === 0}
              selected={formik.values.embargo}
              onChange={(time) => formik.setFieldValue("embargo", time)}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="Pp"
              timeFormat="p"
              placeholderText="Embargo"
              customInput={<Input variant="filled" />}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label="Host"
              placeholder="Host"
              name="gigHosts"
            />
          </GridItem>
          <GridItem colSpan={12}>
            <TextAreaField
              disabled={user.role === 0}
              label="Schedule Details"
              placeholder="Schedule Details"
              name="gigScheduleDetails"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label="Caution"
              placeholder="Caution"
              name="caution"
            />
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

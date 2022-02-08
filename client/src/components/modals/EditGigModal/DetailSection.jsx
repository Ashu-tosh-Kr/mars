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
import { useTranslation } from "react-i18next";

export default function DetailSection({ user, formik }) {
  const { t } = useTranslation();
  const T = (val) => t(`EditGigModal.DetailSection.${val}`);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {T("Details_Section")}
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
            <FormLabel htmlFor={"gigDetails"}>{T("Gig_Details")}</FormLabel>
            <RichTextEditor
              value={formik.values.gigDetails}
              onChange={(date) => formik.setFieldValue("gigDetails", date)}
            />
          </GridItem>

          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor="gigArrive">{T("Arrival_Time")}</FormLabel>
            <DatePicker
              disabled={user.role === 0}
              selected={formik.values.gigArrive}
              onChange={(time) => formik.setFieldValue("gigArrive", time)}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="Pp"
              timeFormat="p"
              placeholderText={T("Select_Arrival_Time")}
              customInput={<Input variant="filled" />}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor="gigGoHome">{T("Departure_Time")}</FormLabel>
            <DatePicker
              disabled={user.role === 0}
              selected={formik.values.gigGoHome}
              onChange={(time) => formik.setFieldValue("gigGoHome", time)}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="Pp"
              timeFormat="p"
              placeholderText={T("Select_Departure_Time")}
              customInput={<Input variant="filled" />}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor="embargo">{T("Embargo")}</FormLabel>
            <DatePicker
              disabled={user.role === 0}
              selected={formik.values.embargo}
              onChange={(time) => formik.setFieldValue("embargo", time)}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="Pp"
              timeFormat="p"
              placeholderText={T("Select_Embargo")}
              customInput={<Input variant="filled" />}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Host")}
              placeholder={T("Enter_Host")}
              name="gigHost"
            />
          </GridItem>
          <GridItem colSpan={12}>
            <TextAreaField
              disabled={user.role === 0}
              label={T("Schedule_Details")}
              placeholder={T("Enter_Schedule_Details")}
              name="gigScheduleDetail"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Caution")}
              placeholder={T("Enter_Caution")}
              name="caution"
            />
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

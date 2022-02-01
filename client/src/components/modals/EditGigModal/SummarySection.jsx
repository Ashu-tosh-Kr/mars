import {
  Grid,
  GridItem,
  FormLabel,
  Input,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//non lib imports
import InputField from "components/formComponents/InputField";
import MenuField from "components/formComponents/MenuField";
import { useTranslation } from "react-i18next";
import { InputFieldSlow } from "components/formComponents/InputField";

export default function SummarySection({ formik, user, clients, users }) {
  const { t } = useTranslation();
  const T = (val) => t(`EditGigModal.SummarySection.${val}`);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {T("Summary_Section")}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={[12, 12, 12, 3]}>
            <InputFieldSlow
              required={true}
              disabled={user.role === 0}
              label={T("Gig_ID")}
              placeholder={T("Auto_generated")}
              name={T("galId")}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 9]}>
            <InputFieldSlow
              required={true}
              disabled={user.role === 0}
              label={T("Gig_Title")}
              placeholder={T("Enter_Title")}
              name="gigTitle"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <MenuField
              required={true}
              disabled={user.role === 0}
              label={T("Client")}
              placeholder={T("Select_Client")}
              name="clientId"
              options={clients}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <MenuField
              required={true}
              disabled={user.role === 0}
              label={T("Talent")}
              placeholder={T("Select_Talent")}
              name="talentId"
              //filtering the list of all users to find only talents and then adding a key "name" for the sake of Menufield
              options={users
                .filter((user) => user.role === 0)
                .map((user) => {
                  return { ...user, name: user.username };
                })}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Gig_type")}
              placeholder={T("Select_gig_type")}
              name="gigType"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <MenuField
              disabled={user.role === 0}
              name="gigAssistantId"
              label={T("Assistant")}
              placeholder={T("Select_assistant")}
              //filtering the list of all users to find only assistants and then adding a key "name" for the sake of Menufield
              options={users
                .filter((user) => user.role === 1)
                .map((user) => {
                  return { ...user, name: user.username };
                })}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 3]}>
            <InputField
              disabled={user.role === 0}
              label={T("Gig_Location")}
              placeholder={T("Select_gig_location")}
              name="gigLocation"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 2]}>
            <InputField
              label={T("Postal_Code")}
              placeholder={T("Enter_Postal_Code")}
              name="gigPostalCode"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 7]}>
            <InputField
              disabled={user.role === 0}
              label={T("Address")}
              placeholder={T("Enter_address")}
              name="gigAddress"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor={"gigStart"}>{T("Gig_Start")}</FormLabel>
            <DatePicker
              disabled={user.role === 0}
              selected={formik.values.gigStart}
              onChange={(date) => formik.setFieldValue("gigStart", date)}
              selectsStart
              startDate={formik.values.gigStart}
              endDate={formik.values.gigEnd}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="Pp"
              timeFormat="p"
              placeholderText={T("Select_gig_start_date")}
              customInput={<Input variant="filled" />}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor="gigEnd">{T("Gig_end")}</FormLabel>
            <DatePicker
              disabled={user.role === 0}
              selected={formik.values.gigEnd}
              onChange={(date) => formik.setFieldValue("gigEnd", date)}
              selectsEnd
              startDate={formik.values.gigStart}
              endDate={formik.values.gigEnd}
              minDate={formik.values.gigStart}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="Pp"
              timeFormat="p"
              placeholderText={T("Select_gig_end")}
              customInput={<Input variant="filled" />}
            />
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

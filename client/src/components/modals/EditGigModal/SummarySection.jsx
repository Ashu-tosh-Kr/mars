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

export default function SummarySection({ formik, user, clients, users }) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Gig Summary
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={[12, 12, 12, 3]}>
            <InputField
              required={true}
              disabled={user.role === 0}
              label="Id"
              placeholder="Id"
              name="galId"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 9]}>
            <InputField
              required={true}
              disabled={user.role === 0}
              label="Title"
              placeholder="Title"
              name="gigTitle"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <MenuField
              required={true}
              disabled={user.role === 0}
              label="Client"
              placeholder="Select Client"
              name="clientId"
              options={clients}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <MenuField
              required={true}
              disabled={user.role === 0}
              label="Talent"
              placeholder="Select Talent"
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
              label="Gig type"
              placeholder="Gig Type"
              name="gigType"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <MenuField
              disabled={user.role === 0}
              name="gigAssistantId"
              label="Assistant"
              placeholder="Select Assistant"
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
              label="Location"
              placeholder="Location"
              name="gigLocation"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 2]}>
            <InputField
              label="Postal Code"
              placeholder="Postal Code"
              name="gigPostalCode"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 7]}>
            <InputField
              disabled={user.role === 0}
              label="Address"
              placeholder="Address"
              name="gigAddress"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor={"gigStart"}>{"Gig Start"}</FormLabel>
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
              placeholderText="Start Date"
              customInput={<Input variant="filled" />}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <FormLabel htmlFor="gigEnd">End Date</FormLabel>
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
              placeholderText="End Date"
              customInput={<Input variant="filled" />}
            />
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

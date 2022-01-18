import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
//non library imports
import { useAddNewGig, useGetAllClients, useGetAllUsers } from "api/hooks";
import InputField from "components/formComponents/InputField";
import InputArray from "components/formComponents/InputArray";
import MenuField from "components/formComponents/MenuField";
import RadioField from "components/formComponents/RadioField";
import TextAreaField from "components/formComponents/TextAreaField";
import Loader from "components/globals/Loader";

const initialValues = {
  galId: "",
  gigTitle: "",
  clientId: "",
  talentId: "",
  gigType: "",
  gigStart: "",
  gigEnd: "",
  embargo: "",
  gigLocation: "",
  gigAddress: "",
  gigPostalCode: "",
  gigArrive: "",
  gigGoHome: "",
  gigScheduleDetail: "",
  gigAssistantId: "",
  gigDetails: "",
  gigHost: "",
  caution: "",
  dressCode: "",
  whatToBring: "",
  gigPeopleCount: "",
  gigPeopleName: [""],
  promotion: "",
  carParking: "",
  interviewQuestions: [""],
  dvd: false,
  photoShoot: "",
  autograph: "",
  food: "",
  other: "",
  memo: "",
};

//helpers
const validationSchema = Yup.object({
  galId: Yup.string()
    .required("Required")
    .matches(/(\d{2}(0[1-9]|1[0-2])(\d{2}[1-9]))/, "Invalid ID"),
  gigTitle: Yup.string().required("Required"),
  clientId: Yup.string().required("Required"),
  talentId: Yup.string().required("Required"),
});

const NewGigScreen = () => {
  //queries
  const { clients, clientsLoading, clientsError } = useGetAllClients();
  const { users, usersLoading, usersError } = useGetAllUsers();
  //mutations
  const { mutate, isLoading } = useAddNewGig();

  //handlers
  const onSubmit = (values) => {
    mutate(values);
  };

  //jsx
  if (clientsLoading || usersLoading) {
    return <Loader />;
  }
  if (clientsError || usersError) {
    return (
      <Center width="100%" h="100%">
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>
            There was an error in fetching client or talent details
          </AlertTitle>
          <AlertDescription>Check your internet connection</AlertDescription>
        </Alert>
      </Center>
    );
  }

  return (
    <>
      <Flex
        align="flex-start"
        justify={"center"}
        width="100%"
        minHeight="100%"
        px={20}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                  <GridItem colSpan={[12, 12, 12, 3]}>
                    <InputField
                      required={true}
                      label="Id"
                      placeholder="Id"
                      name="galId"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 9]}>
                    <InputField
                      required={true}
                      label="Title"
                      placeholder="Title"
                      name="gigTitle"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <MenuField
                      label="Client"
                      required={true}
                      placeholder="Select Client"
                      name="clientId"
                      options={clients}
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <MenuField
                      label="Talent"
                      required={true}
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
                      label="Gig Type"
                      placeholder="Gig Type"
                      name="gigType"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <MenuField
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
                      label="Address"
                      placeholder="Address"
                      name="gigAddress"
                    />
                  </GridItem>
                  <GridItem colSpan={12}>
                    <TextAreaField
                      label="Details"
                      placeholder="Details"
                      name="gigDetails"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <FormLabel htmlFor={"gigStart"}>{"Gig Start"}</FormLabel>
                    <DatePicker
                      selected={formik.values.gigStart}
                      onChange={(date) =>
                        formik.setFieldValue("gigStart", date)
                      }
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
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <FormLabel htmlFor="gigArrive">Arrival Time</FormLabel>
                    <DatePicker
                      selected={formik.values.gigArrive}
                      onChange={(time) =>
                        formik.setFieldValue("gigArrive", time)
                      }
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
                      selected={formik.values.gigGoHome}
                      onChange={(time) =>
                        formik.setFieldValue("gigGoHome", time)
                      }
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
                      label="Host"
                      placeholder="Host"
                      name="gigHosts"
                    />
                  </GridItem>
                  <GridItem colSpan={12}>
                    <TextAreaField
                      label="Schedule Details"
                      placeholder="Schedule Details"
                      name="gigScheduleDetails"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      label="Caution"
                      placeholder="Caution"
                      name="caution"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      label="Dress Code"
                      placeholder="Dress Code"
                      name="dressCode"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      label="What To Bring"
                      placeholder="What To Bring"
                      name="whatToBring"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      label="People Count"
                      placeholder="People Count"
                      name="gigPeopleCount"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12]}>
                    <FormLabel htmlFor="gigPeopleName">
                      Gig People Name
                    </FormLabel>
                    <FieldArray
                      name="gigPeopleName"
                      render={(arrayHelpers) => (
                        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                          {formik.values.gigPeopleName.map((name, index) => (
                            <GridItem colSpan={[12, 12, 12, 12]} key={index}>
                              <InputArray
                                key={index}
                                label="Gig People Name"
                                placeholder="Gig People Name"
                                name={`gigPeopleName.${index}`}
                                rightAddOn={<AiOutlinePlusCircle />}
                                leftAddOn={<AiOutlineMinusCircle />}
                                rightAddOnClick={() =>
                                  arrayHelpers.insert(index + 1)
                                }
                                leftAddOnClick={() => {
                                  if (formik.values.gigPeopleName.length !== 1)
                                    arrayHelpers.remove(index);
                                }}
                              />
                            </GridItem>
                          ))}
                        </Grid>
                      )}
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      label="Promotion"
                      placeholder="Promotion"
                      name="promotion"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      label="Car Parking"
                      placeholder="Car Parking"
                      name="carParking"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      label="Photo Shoot"
                      placeholder="Photo Shoot"
                      name="photoShoot"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      label="Autograph"
                      placeholder="Autograph"
                      name="autograph"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField label="Food" placeholder="Food" name="food" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <RadioField
                      name="dvd"
                      label="DVD"
                      options={[
                        { key: "Bring DVD", value: "true" },
                        { key: "Don't Bring DVD", value: "false" },
                      ]}
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 12]}>
                    <InputField
                      label="Other"
                      placeholder="Other"
                      name="other"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 12]}>
                    <InputField label="Memo" placeholder="Memo" name="memo" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12]}>
                    <FormLabel htmlFor="interviewQuestions">
                      Interview Questions
                    </FormLabel>
                    <FieldArray
                      name="interviewQuestions"
                      render={(arrayHelpers) => (
                        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                          {formik.values.interviewQuestions.map(
                            (question, index) => (
                              <GridItem colSpan={[12, 12, 12]} key={index}>
                                <InputArray
                                  key={index}
                                  placeholder="Interview Questions"
                                  name={`interviewQuestions.${index}`}
                                  rightAddOn={<AiOutlinePlusCircle />}
                                  leftAddOn={<AiOutlineMinusCircle />}
                                  rightAddOnClick={() =>
                                    arrayHelpers.insert(index + 1)
                                  }
                                  leftAddOnClick={() => {
                                    if (
                                      formik.values.interviewQuestions
                                        .length !== 1
                                    )
                                      arrayHelpers.remove(index);
                                  }}
                                />
                              </GridItem>
                            )
                          )}
                        </Grid>
                      )}
                    />
                  </GridItem>
                </Grid>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  colorScheme="teal"
                  mr={3}
                  mt={3}
                >
                  Add
                </Button>
                <Button mt={3}>Cancel</Button>
              </Form>
            );
          }}
        </Formik>
      </Flex>
    </>
  );
};

export default NewGigScreen;

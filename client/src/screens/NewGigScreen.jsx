import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { useAddNewGig, useGetAllClients, useGetAllUsers } from "api/hooks";
import InputField from "components/formComponents/InputField";
import InputArray from "components/formComponents/InputArray";
import MenuField from "components/formComponents/MenuField";
import RadioField from "components/formComponents/RadioField";
import TextAreaField from "components/formComponents/TextAreaField";
import Loader from "components/globals/Loader";
import { FieldArray, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

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
};

const validationSchema = Yup.object({
  galId: Yup.string()
    .required("Required")
    .matches(
      /(\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(\d{2}[1-9]))/,
      "Invalid ID"
    ),
  gigTitle: Yup.string().required("Required"),
  clientId: Yup.string().required("Required"),
  talentId: Yup.string().required("Required"),
});

const NewGigScreen = () => {
  const { clients, clientsLoading, clientsError } = useGetAllClients();
  const { users, usersLoading, usersError } = useGetAllUsers();
  const { mutate, isLoading } = useAddNewGig();

  const onSubmit = (values) => {
    mutate(values);
  };

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
                    <InputField placeholder="Id" name="galId" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 9]}>
                    <InputField placeholder="Title" name="gigTitle" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <MenuField
                      placeholder="Select Client"
                      name="clientId"
                      options={clients}
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <MenuField
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
                    <InputField placeholder="Gig Type" name="gigType" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <MenuField
                      name="gigAssistantId"
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
                    <InputField placeholder="Location" name="gigLocation" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 9]}>
                    <InputField placeholder="Address" name="gigAddress" />
                  </GridItem>
                  <GridItem colSpan={12}>
                    <TextAreaField placeholder="Details" name="gigDetails" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
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
                    <InputField placeholder="Host" name="gigHosts" />
                  </GridItem>
                  <GridItem colSpan={12}>
                    <TextAreaField
                      placeholder="Schedule Details"
                      name="gigScheduleDetails"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField placeholder="Caution" name="caution" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField placeholder="Dress Code" name="dressCode" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      placeholder="What To Bring"
                      name="whatToBring"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField
                      placeholder="People Count"
                      name="gigPeopleCount"
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12]}>
                    <FieldArray
                      name="gigPeopleName"
                      render={(arrayHelpers) => (
                        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                          {formik.values.gigPeopleName.map((name, index) => (
                            <GridItem colSpan={[12, 12, 12, 12]} key={index}>
                              <InputArray
                                key={index}
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
                    <InputField placeholder="Promotion" name="promotion" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField placeholder="Car Parking" name="carParking" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField placeholder="Photo Shoot" name="photoShoot" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField placeholder="Autograph" name="autograph" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField placeholder="Food" name="food" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <RadioField
                      name="dvd"
                      options={[
                        { key: "Bring DVD", value: "true" },
                        { key: "Don't Bring DVD", value: "false" },
                      ]}
                    />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <InputField placeholder="Other" name="other" />
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12]}>
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

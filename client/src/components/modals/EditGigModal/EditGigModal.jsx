import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Flex,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Accordion,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { useSelector } from "react-redux";

//non library imports
import {
  useEditGig,
  useGetAllClients,
  useGetAllUsers,
  useUpdateGigStatus,
} from "api/hooks";
import Loader from "components/globals/Loader";
import SummarySection from "./SummarySection";
import DetailSection from "./DetailSection";
import MoreDetailsSection from "./MoreDetailsSection";
import MoneySection from "./MoneySection";

//helpers
const validationSchema = Yup.object({
  galId: Yup.string()
    .required("Required")
    .matches(/(\d{2}(0[1-9]|1[0-2])(\d{2}[1-9]))/, "Invalid ID"),
  gigTitle: Yup.string().required("Required"),
  clientId: Yup.string().required("Required"),
  talentId: Yup.string().required("Required"),
  money: Yup.object().shape({
    billableCost: Yup.string().matches(/^\d+$/, "Should be a number"),
    talentFeeBeforeTax: Yup.string().matches(/^\d+$/, "Should be a number"),
  }),
});

const calcStep = (step) => {
  switch (step) {
    case 1:
      return "step-one";
    case 2:
      return "step-two";
    case 3:
      return "step-three";
    case 4:
      return "step-four";
    case 5:
      return "step-five";
    case 6:
      return "step-six";
    case 7:
      return "step-seven";
    case 8:
      return "step-eight";
    case 9:
      return "step-nine";
    case 10:
      return "step-ten";
  }
};

const EditGigModal = ({ isOpen, onClose, gig }) => {
  const placeholderMoneySlice = {
    tax: 10,
    serviceFeeBeforeTax: 0,
    serviceFeeIncludingTax: 0,
    costCondition: 1,
    billableCost: 0,
    moneyNote: "",
    talentFeeBeforeTax: 0,
    talentFeeIncludingTax: 0,
    total: 0,
  };
  const initialValues = {
    galId: gig?.galId,
    gigTitle: gig?.gigTitle,
    clientId: gig?.client?._id,
    talentId: gig?.talent?._id,
    gigType: gig?.gigType,
    gigStart: gig?.gigStart,
    gigEnd: gig?.gigEnd,
    embargo: gig?.embargo,
    gigLocation: gig?.gigLocation,
    gigPostalCode: gig?.gigPostalCode,
    gigAddress: gig?.gigAddress,
    gigArrive: gig?.gigArrive,
    gigGoHome: gig?.gigGoHome,
    gigScheduleDetail: gig?.gigScheduleDetail,
    gigAssistantId: gig?.gigAssistantId,
    gigDetails: gig?.gigDetails,
    gigHost: gig?.gigHost,
    caution: gig?.caution,
    dressCode: gig?.dressCode,
    whatToBring: gig?.whatToBring,
    gigPeopleCount: gig?.gigPeopleCount,
    gigPeopleName: gig?.gigPeopleName,
    promotion: gig?.promotion,
    carParking: gig?.carParking,
    interviewQuestions: gig?.interviewQuestions,
    dvd: false,
    photoShoot: gig?.photoShoot,
    autograph: gig?.autograph,
    food: gig?.food,
    other: gig?.other,
    memo: gig?.memo,
    costs: gig?.costs,
    money: gig.money ? gig.money : placeholderMoneySlice,
    assignee: "",
  };

  //fetched data
  const { clients, clientsLoading, clientsError } = useGetAllClients();
  const { users, usersLoading, usersError } = useGetAllUsers();
  const user = useSelector((state) => state.userLogin.userInfo.data.user);
  //mutation
  const { mutate: mutateEditGig, isLoading } = useEditGig(gig._id);
  const { mutateStatusUpdate, isLoadingStatusUpdate } = useUpdateGigStatus(
    gig._id
  );

  //handlers
  const onSubmit = (values) => {
    mutateEditGig(values);
  };

  //jsx
  if (clientsLoading || usersLoading) {
    return (
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Client</ModalHeader>
          <Loader />{" "}
        </ModalContent>
      </Modal>
    );
  }
  if (clientsError || usersError) {
    return (
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Client</ModalHeader>
          <ModalCloseButton />
          <Center width="100%" h="100%">
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>
                There was an error in fetching client or talent details
              </AlertTitle>
              <AlertDescription>
                Check your internet connection
              </AlertDescription>
            </Alert>
          </Center>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Client</ModalHeader>
        <ModalCloseButton />

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
                  <ModalBody pb={6}>
                    <Accordion defaultIndex={[0]} minW="50vw" allowMultiple>
                      <SummarySection
                        user={user}
                        formik={formik}
                        clients={clients}
                        users={users}
                      />
                      <DetailSection user={user} formik={formik} />
                      <MoreDetailsSection
                        user={user}
                        formik={formik}
                        users={users}
                      />
                      <MoneySection user={user} formik={formik} users={users} />
                    </Accordion>
                  </ModalBody>
                  <ModalFooter>
                    <HStack d={user?.role === 0 && "none"}>
                      <Button type="submit" isLoading={isLoading}>
                        Save
                      </Button>
                      <Button
                        isLoading={isLoadingStatusUpdate}
                        onClick={() =>
                          mutateStatusUpdate({
                            step: calcStep(gig?.currentStatus?.step),
                            isApproved: true,
                            newAssigneeId: formik.values.assignee,
                          })
                        }
                        mt={3}
                      >
                        {gig.currentStatus.step === 1 ||
                        gig.currentStatus.step === 3
                          ? "Send For Review"
                          : gig.currentStatus.step <= 5
                          ? "Approve"
                          : "Mark As Done"}
                      </Button>
                      {gig.currentStatus.step !== 1 &&
                        gig.currentStatus.step !== 3 &&
                        gig.currentStatus.step <= 5 && (
                          <Button
                            isLoading={isLoadingStatusUpdate}
                            onClick={() =>
                              mutateStatusUpdate({
                                step: calcStep(gig?.currentStatus?.step),
                                isApproved: false,
                                newAssigneeId: formik.values.assignee,
                              })
                            }
                            mt={3}
                          >
                            Reject
                          </Button>
                        )}
                      <Button>Close Gig</Button>
                    </HStack>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default EditGigModal;

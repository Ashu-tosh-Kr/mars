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
import { useTranslation } from "react-i18next";

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

  /**hooks */
  const { t } = useTranslation();
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
  const T = (val) => t(`EditGigModal.${val}`);

  //jsx
  if (clientsLoading || usersLoading) {
    return (
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{T("Update_Gig")}</ModalHeader>
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
          <ModalHeader>{T("Update_Gig")}</ModalHeader>
          <ModalCloseButton />
          <Center width="100%" h="100%">
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{T("Fetch_Error_Msg")}</AlertTitle>
              <AlertDescription>{T("Fetch_Error_Desc")}</AlertDescription>
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
        <ModalHeader>{T("Update_Gig")}</ModalHeader>
        <ModalCloseButton />

        <Flex
          align="flex-start"
          justify={"center"}
          width="100%"
          minHeight="100%"
          px={[0, 5, 10, 20]}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <Form>
                  <ModalBody minWidth={[0, 0, "45rem", "50rem"]} pb={4}>
                    <Accordion defaultIndex={[0]} allowMultiple>
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
                  <ModalFooter d={user?.role === 0 && "none"}>
                    <Button m={2} type="submit" isLoading={isLoading}>
                      {T("Save")}
                    </Button>
                    <Button
                      m={2}
                      isLoading={isLoadingStatusUpdate}
                      onClick={() =>
                        mutateStatusUpdate({
                          step: calcStep(gig?.currentStatus?.step),
                          isApproved: true,
                          newAssigneeId: formik.values.assignee,
                        })
                      }
                    >
                      {gig.currentStatus.step === 1 ||
                      gig.currentStatus.step === 3
                        ? T("Send_For_Review")
                        : gig.currentStatus.step <= 5
                        ? T("Approve")
                        : T("Mark_As_Done")}
                    </Button>
                    {gig.currentStatus.step !== 1 &&
                      gig.currentStatus.step !== 3 &&
                      gig.currentStatus.step <= 5 && (
                        <Button
                          m={2}
                          isLoading={isLoadingStatusUpdate}
                          onClick={() =>
                            mutateStatusUpdate({
                              step: calcStep(gig?.currentStatus?.step),
                              isApproved: false,
                              newAssigneeId: formik.values.assignee,
                            })
                          }
                        >
                          {T("Reject")}
                        </Button>
                      )}
                    <Button m={2}>{T("Close_Gig")}</Button>
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

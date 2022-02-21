import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  Grid,
  GridItem,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Box,
  Image,
  Center,
  ModalFooter,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { MdDelete } from "react-icons/md";

//non lib imports
import inboxEmpty from "assets/globals/inboxEmpty.svg";
import MenuField from "components/formComponents/MenuField";
import { useAddCostToGig, useDelCostFromGig } from "api/hooks";
import { useTranslation } from "react-i18next";
import { InputFieldSlow } from "components/formComponents/InputField";

//helpers
const initialValues = {
  costCategory: "",
  costDetail: "",
  price: "",
  paymentMethod: "",
};

const validationSchema = Yup.object({
  costCategory: Yup.string().required("Required"),
  costDetail: Yup.string().required("Required"),
  price: Yup.string().matches(/^\d+$/, "Invalid number").required("Required"),
  paymentMethod: Yup.string().required("Required"),
});

export default function CostModal({ isOpen, onClose, gig }) {
  /** hooks */
  const { t } = useTranslation();
  const [isLarge] = useMediaQuery("(min-width: 768px)");

  //queries
  const { mutate, isLoading } = useAddCostToGig();
  const { mutate: mutateDel, isLoading: isLoadingDel } = useDelCostFromGig();

  //handlers
  const onSubmit = (values) => {
    mutate({ gigId: gig._id, values });
  };
  const T = (val) => t(`CostModal.${val}`);

  const costCategories = [
    { _id: "Transport Taxi", name: T("Transport_Taxi") },
    { _id: "Transport Bus", name: T("Transport_Bus") },
    { _id: "Transport Train", name: T("Transport_Train") },
    { _id: "Hotel", name: T("Hotel") },
    { _id: "Food", name: T("Food") },
    { _id: "Cafe", name: T("Cafe") },
    { _id: "Other", name: T("Other") },
  ];

  const paymentMethods = [
    { _id: "Company Card", name: T("Company_Credit_Card") },
    { _id: "Personal Card", name: T("Personal_Credit_Card") },
    { _id: "Company Cash", name: T("Company_Cash") },
    { _id: "Personal Cash", name: T("Personal_Cash") },
  ];

  //jsx
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{T("Manage_Cost")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <VStack>
                  <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                    <GridItem colSpan={[12, 12, 6, 3]}>
                      <MenuField
                        label={t("CostModal.Category")}
                        required={true}
                        placeholder={"Select cost category"}
                        name="costCategory"
                        options={costCategories}
                      />
                    </GridItem>
                    <GridItem colSpan={[12, 12, 6, 3]}>
                      <InputFieldSlow
                        label={t("CostModal.Detail")}
                        required={true}
                        placeholder={t("CostModal.Detail")}
                        name="costDetail"
                      />
                    </GridItem>
                    <GridItem colSpan={[12, 12, 6, 3]}>
                      <InputFieldSlow
                        label={t("CostModal.Price")}
                        required={true}
                        placeholder={t("CostModal.Price")}
                        name="price"
                      />
                    </GridItem>
                    <GridItem colSpan={[12, 12, 6, 3]}>
                      <MenuField
                        label={t("CostModal.Method")}
                        required={true}
                        placeholder={t("CostModal.Method")}
                        name="paymentMethod"
                        options={paymentMethods}
                      />
                    </GridItem>
                  </Grid>
                  <Button type="submit" isLoading={isLoading} mr={3}>
                    {T("Add_Expense")}
                  </Button>
                </VStack>
              </Form>
            </Formik>
            <Box w="full">
              {gig.costs?.length > 0 ? (
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>{t("CostModal.Category")}</Th>
                      {isLarge && <Th>{t("CostModal.Detail")}</Th>}
                      <Th>{t("CostModal.Price")}</Th>
                      {isLarge && <Th>{t("CostModal.Method")}</Th>}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {gig.costs.map((cost, i) => (
                      <Tr key={i}>
                        <Td>{cost.costCategory}</Td>
                        {isLarge && <Td>{cost.costDetail}</Td>}
                        <Td>{cost.price}</Td>
                        {isLarge && <Td>{cost.paymentMethod}</Td>}

                        <Td>
                          <IconButton
                            onClick={() => {
                              mutateDel({ gigId: gig._id, costId: cost._id });
                            }}
                            isLoading={isLoadingDel}
                            size="sm"
                            icon={<MdDelete />}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Center>
                  <Image boxSize={"30%"} src={inboxEmpty} alt="emty inbox" />
                </Center>
              )}
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Heading>
            {t("CostModal.Total")}:
            {gig?.costs?.reduce((previousValue, currentValue) => {
              return +previousValue + +currentValue.price;
            }, 0)}
          </Heading>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

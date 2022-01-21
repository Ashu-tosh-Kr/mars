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
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { MdDelete } from "react-icons/md";

//non lib imports
import inboxEmpty from "assets/globals/inboxEmpty.svg";
import InputField from "components/formComponents/InputField";
import MenuField from "components/formComponents/MenuField";
import { useAddCostToGig, useDelCostFromGig } from "api/hooks";
import { useTranslation } from "react-i18next";

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
  price: Yup.number().required("Required"),
  paymentMethod: Yup.string().required("Required"),
});

const costCategories = [
  { _id: "Transport", name: "Transport" },
  { _id: "Hotel", name: "Hotel" },
  { _id: "Food", name: "Food" },
  { _id: "Cafe", name: "Cafe" },
  { _id: "Other", name: "Other" },
];

const paymentMethods = [
  { _id: "Company Card", name: "Company Credit Card" },
  { _id: "Personal Card", name: "Personal Credit Card" },
  { _id: "Company Cash", name: "Company Cash" },
  { _id: "P ersonal Cash", name: "Personal Cash" },
];

export default function CostModal({ isOpen, onClose, gig }) {
  /** hooks */
  const { t } = useTranslation();
  //queries
  const { mutate, isLoading } = useAddCostToGig();
  const { mutate: mutateDel, isLoading: isLoadingDel } = useDelCostFromGig();

  //handlers
  const onSubmit = (values) => {
    mutate({ gigId: gig._id, values });
  };

  //jsx
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cost</ModalHeader>
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
                      <InputField
                        label={t("CostModal.Detail")}
                        required={true}
                        placeholder={t("CostModal.Detail")}
                        name="costDetail"
                      />
                    </GridItem>
                    <GridItem colSpan={[12, 12, 6, 3]}>
                      <InputField
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
                  <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={isLoading}
                    mr={3}
                  >
                    Add Expense
                  </Button>
                </VStack>
              </Form>
            </Formik>
            <Box w="full">
              {gig.costs?.length > 0 ? (
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>{t("CostModal.Category")}</Th>
                      <Th>{t("CostModal.Detail")}</Th>
                      <Th>{t("CostModal.Price")}</Th>
                      <Th>{t("CostModal.Method")}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {gig.costs.map((cost, i) => (
                      <Tr key={i}>
                        <Td>{cost.costCategory}</Td>
                        <Td>{cost.costDetail}</Td>
                        <Td>{cost.price}</Td>
                        <Td>{cost.paymentMethod}</Td>

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
            Total:
            {gig?.costs?.reduce((previousValue, currentValue) => {
              return +previousValue + +currentValue.price;
            }, 0)}
          </Heading>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

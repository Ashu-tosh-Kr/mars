import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";
import { useAddNewCompany } from "api/hooks";
import InputField from "components/formComponents/InputField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const initialValues = {
  name: "",
  postCode: "",
  officeAddress: "",
  note: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  postCode: Yup.string().required("Required"),
  officeAddress: Yup.string().required("Required"),
  note: Yup.string().required("Required"),
});

const NewCompanyModal = ({ isOpen, onClose }) => {
  // ↓ translator hook
  const { t } = useTranslation();

  const { mutate, isLoading } = useAddNewCompany(onClose);

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("NewCompanyModal.Add_new_company")}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <ModalBody pb={6}>
              <InputField mb={3} placeholder={t("NewCompanyModal.Name")} name="name" />
              <InputField mb={3} placeholder={t("NewCompanyModal.Postal_code")} name="postCode" />
              <InputField
                mb={3}
                placeholder={t("NewCompanyModal.Office_address")}
                name="officeAddress"
              />
              <InputField mb={3} placeholder={t("NewCompanyModal.Note")} name="note" />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" isLoading={isLoading} colorScheme="blue" mr={3}>
                {t("NewCompanyModal.Add")}
              </Button>
              <Button onClick={onClose}>{t("NewCompanyModal.Cancel")}</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default NewCompanyModal;

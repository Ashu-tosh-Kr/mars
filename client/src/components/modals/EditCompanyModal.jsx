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
import { useUpdateCompany } from "api/hooks";
import InputField from "components/formComponents/InputField";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useTranslation } from "react-i18next";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  postCode: Yup.string().required("Required"),
  officeAddress: Yup.string().required("Required"),
  note: Yup.string().required("Required"),
});

const EditCompanyModal = ({ isOpen, onClose, company }) => {
  const initialValues = {
    name: company.name,
    postCode: company.postCode,
    officeAddress: company.officeAddress,
    note: company.note,
  };

  const { mutate, isLoading } = useUpdateCompany(onClose);

  const onSubmit = (values) => {
    mutate({ companyId: company._id, ...values });
  };

  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("EditCompanyModal.Update_company")}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <ModalBody pb={6}>
              <InputField mb={3} placeholder={t("EditCompanyModal.Name")} name="name" />
              <InputField mb={3} placeholder={t("EditCompanyModal.Postal_code")} name="postCode" />
              <InputField
                mb={3}
                placeholder={t("EditCompanyModal.Office_address")}
                name="officeAddress"
              />
              <InputField mb={3} placeholder={t("EditCompanyModal.Note")} name="note" />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" isLoading={isLoading} colorScheme="teal" mr={3}>
                {t("EditCompanyModal.Update")}
              </Button>
              <Button onClick={onClose}>{t("EditCompanyModal.Cancel")}</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default EditCompanyModal;

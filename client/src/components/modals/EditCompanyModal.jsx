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
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
//non lib imports
import { useUpdateCompany } from "api/hooks";
import { InputFieldSlow } from "components/formComponents/InputField";

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
              <InputFieldSlow
                mb={3}
                placeholder={t("EditCompanyModal.Name")}
                name="name"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("EditCompanyModal.Postal_code")}
                name="postCode"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("EditCompanyModal.Office_address")}
                name="officeAddress"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("EditCompanyModal.Note")}
                name="note"
              />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" isLoading={isLoading} mr={3}>
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

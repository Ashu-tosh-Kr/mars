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
import { useAddNewClient } from "api/hooks";
import InputField from "components/formComponents/InputField";
import MenuField from "components/formComponents/MenuField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const initialValues = {
  name: "",
  title: "",
  companyId: "",
  clientTeam: "",
  email: "",
  phone: "",
  note: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  companyId: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  clientTeam: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  note: Yup.string().required("Required"),
});

const NewClientModal = ({ isOpen, onClose, companies }) => {
  const { mutate, isLoading } = useAddNewClient(onClose);

  const onSubmit = (values) => {
    mutate(values);
  };

  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("NewClientModal.Add_New_Client")}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <ModalBody pb={6}>
              <InputField mb={3} placeholder={t("NewClientModal.Name")} name="name" />
              <InputField mb={3} placeholder={t("NewClientModal.Title")} name="title" />
              <MenuField
                mb={3}
                placeholder={t("NewClientModal.Select_Company")}
                name="companyId"
                options={companies}
              />
              <InputField mb={3} placeholder={t("NewClientModal.Phone")} name="phone" />
              <InputField mb={3} placeholder={t("NewClientModal.Team")} name="clientTeam" />
              <InputField mb={3} placeholder={t("NewClientModal.Email")} name="email" />
              <InputField mb={3} placeholder={t("NewClientModal.Note")} name="note" />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" isLoading={isLoading} colorScheme="teal" mr={3}>
                {t("NewClientModal.Add")}
              </Button>
              <Button onClick={onClose}>{t("NewClientModal.Cancel")}</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default NewClientModal;

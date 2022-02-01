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
import { InputFieldSlow } from "components/formComponents/InputField";
import MenuField from "components/formComponents/MenuField";
import { useUpdateClient } from "api/hooks";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  companyId: Yup.string().required("Required"),
  clientTeam: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  phone: Yup.string().required("Required"),
  note: Yup.string().required("Required"),
});

const EditClientModal = ({ isOpen, onClose, companies, client }) => {
  const initialValues = {
    name: client.name,
    title: client.title,
    companyId: client.company._id,
    clientTeam: client.clientTeam,
    email: client.email,
    phone: client.phone,
    note: client.note,
  };

  const { mutate, isLoading } = useUpdateClient(onClose);

  const onSubmit = (values) => {
    mutate({ clientId: client._id, ...values });
  };

  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("EditClientModal.Update_client")}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <ModalBody pb={6}>
              <InputFieldSlow
                mb={3}
                placeholder={t("EditClientModal.Name")}
                name="name"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("EditClientModal.Title")}
                name="title"
              />
              <MenuField mb={3} name="companyId" options={companies} />
              <InputFieldSlow
                mb={3}
                placeholder={t("EditClientModal.Team")}
                name="clientTeam"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("EditClientModal.Email")}
                name="email"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("EditClientModal.Phone")}
                name="phone"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("EditClientModal.Note")}
                name="note"
              />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" isLoading={isLoading} mr={3}>
                {t("EditClientModal.Update")}
              </Button>
              <Button onClick={onClose}>{t("EditClientModal.Cancel")}</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default EditClientModal;

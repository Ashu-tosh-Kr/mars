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
import { useAddNewUser } from "api/hooks";
import { InputFieldSlow } from "components/formComponents/InputField";
import MenuField from "components/formComponents/MenuField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const initialValues = {
  username: "",
  employeeId: "",
  email: "",
  phone: "",
  role: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  employeeId: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  role: Yup.number().required("Required"),
});

const NewUserModal = ({ isOpen, onClose }) => {
  const Roles = [
    { _id: 0, name: "Talent" },
    { _id: 1, name: "Assistant" },
    { _id: 2, name: "Superviser" },
    { _id: 3, name: "CEO" },
  ];
  const { mutate, isLoading } = useAddNewUser(onClose);

  const onSubmit = (values) => {
    //converting isActive from string to boolean since the checkbox doesn't allow boolean values
    mutate({ ...values, isActive: values.isActive === "true" });
  };

  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("NewUserModal.Add_user")}</ModalHeader>
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
                placeholder={t("NewUserModal.Employee_ID")}
                name="employeeId"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("NewUserModal.Username")}
                name="username"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("NewUserModal.EMail")}
                name="email"
              />
              <InputFieldSlow
                mb={3}
                placeholder={t("NewUserModal.Phone")}
                name="phone"
              />
              <MenuField mb={3} name="role" options={Roles} />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" isLoading={isLoading} mr={3}>
                {t("NewUserModal.Add")}
              </Button>
              <Button onClick={onClose}>{t("NewUserModal.Cancel")}</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default NewUserModal;

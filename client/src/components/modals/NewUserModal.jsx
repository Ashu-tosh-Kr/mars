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
import InputField from "components/formComponents/InputField";
import MenuField from "components/formComponents/MenuField";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  username: "",
  email: "",
  phone: "",
  role: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  role: Yup.number().required("Required"),
});

const NewUserModal = ({ isOpen, onClose }) => {
  const Roles = [
    { _id: 0, name: "Talent" },
    { _id: 1, name: "Assistant" },
    { _id: 2, name: "Superviser" },
    { _id: 3, name: "Admin" },
  ];
  const { mutate, isLoading } = useAddNewUser(onClose);

  const onSubmit = (values) => {
    //converting isActive from string to boolean since the checkbox doesn't allow boolean values
    mutate({ ...values, isActive: values.isActive === "true" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <ModalBody pb={6}>
              <InputField mb={3} placeholder="Username" name="username" />
              <InputField mb={3} placeholder="E-mail" name="email" />
              <InputField mb={3} placeholder="Phone" name="phone" />
              <MenuField mb={3} name="role" options={Roles} />
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                isLoading={isLoading}
                colorScheme="blue"
                mr={3}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default NewUserModal;

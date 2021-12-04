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

const initialValues = {
  name: "",
  companyId: "",
  email: "",
  phone: "",
  note: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  companyId: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  phone: Yup.string().required("Required"),
  note: Yup.string().required("Required"),
});

const NewClientModal = ({ isOpen, onClose, companies }) => {
  const { mutate, isLoading, isSuccess } = useAddNewClient();

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <Modal isOpen={isOpen && !isSuccess} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Client</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <ModalBody pb={6}>
              <InputField mb={3} placeholder="Name" name="name" />
              <MenuField mb={3} name="companyId" options={companies} />
              <InputField mb={3} placeholder="Email" name="email" />
              <InputField mb={3} placeholder="Phone" name="phone" />
              <InputField mb={3} placeholder="Note" name="note" />
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

export default NewClientModal;

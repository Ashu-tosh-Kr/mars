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
import { useUpdateClient } from "api/hooks";
import InputField from "components/formComponents/InputField";
import MenuField from "components/formComponents/MenuField";
import { Form, Formik } from "formik";
import * as Yup from "yup";

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Client</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <ModalBody pb={6}>
              <InputField mb={3} placeholder="Name" name="name" />
              <InputField mb={3} placeholder="Title" name="title" />
              <MenuField mb={3} name="companyId" options={companies} />
              <InputField mb={3} placeholder="Team" name="clientTeam" />
              <InputField mb={3} placeholder="Email" name="email" />
              <InputField mb={3} placeholder="Phone" name="phone" />
              <InputField mb={3} placeholder="Note" name="note" />
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                isLoading={isLoading}
                colorScheme="teal"
                mr={3}
              >
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default EditClientModal;

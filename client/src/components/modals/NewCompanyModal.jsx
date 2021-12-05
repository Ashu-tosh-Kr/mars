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
  const { mutate, isLoading } = useAddNewCompany();

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Company</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <ModalBody pb={6}>
              <InputField mb={3} placeholder="Name" name="name" />
              <InputField mb={3} placeholder="Postal Code" name="postCode" />
              <InputField
                mb={3}
                placeholder="Office Address"
                name="officeAddress"
              />
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

export default NewCompanyModal;

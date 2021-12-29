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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Company</ModalHeader>
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

export default EditCompanyModal;

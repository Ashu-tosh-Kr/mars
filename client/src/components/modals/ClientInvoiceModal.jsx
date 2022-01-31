import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";

//no lib imports
import ClientInvoice from "components/globals/ClientInvoice";

export default function ClientInvoiceModal({ isOpen, onClose, gig }) {
  /**hooks */
  const { t } = useTranslation();
  const ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  //handlers
  const T = (val) => t(`ClientInvoiceModal.${val}`);

  //jsx
  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{T("Client_Invoice")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ClientInvoice ref={ref} gig={gig} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePrint} mr={3}>
            {T("Print")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

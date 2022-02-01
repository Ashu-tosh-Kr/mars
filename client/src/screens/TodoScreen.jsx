import {
  Alert,
  AlertIcon,
  Box,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { FaRegMoneyBillAlt, FaFilePdf } from "react-icons/fa";
//non lib imports
import inboxEmpty from "assets/globals/inboxEmpty.svg";
import { useGetCurrUserInfo } from "api/hooks";
import EditGigModal from "components/modals/EditGigModal";
import CostModal from "components/modals/CostModal";
import { useTranslation } from "react-i18next";
import ClientInvoiceModal from "components/modals/ClientInvoiceModal";

const TodoScreen = () => {
  /** hooks */
  const {
    isOpen: isOpenEditGig,
    onOpen: onOpenEditGig,
    onClose: onCloseEditGig,
  } = useDisclosure();
  const {
    isOpen: isOpenCost,
    onOpen: onOpenCost,
    onClose: onCloseCost,
  } = useDisclosure();
  const {
    isOpen: isOpenInvoice,
    onOpen: onOpenInvoice,
    onClose: onCloseInvoice,
  } = useDisclosure();
  //states
  const [toBeEditedGig, setToBeEditedGig] = useState({});
  //queries
  const { userInfo, userInfoLoading, userInfoError } = useGetCurrUserInfo();

  const { t } = useTranslation();

  //jsx
  return (
    <>
      <CostModal
        isOpen={isOpenCost}
        onClose={onCloseCost}
        gig={toBeEditedGig}
      />
      <EditGigModal
        isOpen={isOpenEditGig}
        onClose={onCloseEditGig}
        gig={toBeEditedGig}
      />
      <ClientInvoiceModal
        isOpen={isOpenInvoice}
        onClose={onCloseInvoice}
        gig={toBeEditedGig}
      />
      {userInfoLoading ? (
        <Stack w="100%">
          <Skeleton isLoaded={!userInfoLoading} height="50px" />
          <Skeleton isLoaded={!userInfoLoading} height="50px" />
          <Skeleton isLoaded={!userInfoLoading} height="50px" />
        </Stack>
      ) : userInfoError ? (
        <Box w="full">
          <Alert status="error">
            <AlertIcon />
            {t("TodoScreen.Oops_Todos_cannot_be_loaded")}
          </Alert>
        </Box>
      ) : (
        <Box w="full">
          {userInfo.todos.length > 0 ? (
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>{t("TodoScreen.Name")}</Th>
                  <Th>{t("TodoScreen.Client")}</Th>
                  <Th>{t("TodoScreen.Talent")}</Th>
                  <Th>{t("TodoScreen.Status")}</Th>
                  <Th>{t("TodoScreen.Memo")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userInfo.todos.map((todo, i) => (
                  <Tr key={i}>
                    <Td>{todo.gigTitle}</Td>
                    <Td>{todo.client.name}</Td>
                    <Td>{todo.talent.username}</Td>
                    <Td>{todo.currentStatus.name}</Td>
                    <Td>{todo.memo}</Td>

                    <Td>
                      <IconButton
                        onClick={() => {
                          setToBeEditedGig(todo);
                          onOpenCost();
                        }}
                        size="sm"
                        icon={<FaRegMoneyBillAlt />}
                      />
                    </Td>

                    <Td>
                      <IconButton
                        onClick={() => {
                          setToBeEditedGig(todo);
                          onOpenEditGig();
                        }}
                        size="sm"
                        icon={<RiEditBoxLine />}
                      />
                    </Td>
                    {todo.currentStatus.step > 5 && (
                      <Td>
                        <IconButton
                          onClick={() => {
                            setToBeEditedGig(todo);
                            onOpenInvoice();
                          }}
                          size="sm"
                          icon={<FaFilePdf />}
                        />
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Image boxSize={"100%"} src={inboxEmpty} alt="emty inbox" />
          )}
        </Box>
      )}
    </>
  );
};

export default TodoScreen;

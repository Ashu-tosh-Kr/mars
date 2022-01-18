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
//non lib imports
import inboxEmpty from "assets/globals/inboxEmpty.svg";
import { useGetCurrUserInfo } from "api/hooks";
import EditGigModal from "components/modals/EditGigModal";

const TodoScreen = () => {
  //states
  const [toBeEditedGig, setToBeEditedGig] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  //queries
  const { userInfo, userInfoLoading, userInfoError } = useGetCurrUserInfo();

  //jsx
  return (
    <>
      <EditGigModal isOpen={isOpen} onClose={onClose} gig={toBeEditedGig} />
      {userInfoLoading ? (
        <Stack w="100%">
          <Skeleton isLoaded={!userInfoLoading} height="50px" />
          <Skeleton isLoaded={!userInfoLoading} height="50px" />
          <Skeleton isLoaded={!userInfoLoading} height="50px" />
        </Stack>
      ) : userInfoError ? (
        <Alert status="error">
          <AlertIcon />
          Oops! Todos cannot be loaded
        </Alert>
      ) : (
        <Box w="full">
          {userInfo.todos.length > 0 ? (
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Client</Th>
                  <Th>Talent</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userInfo.todos.map((todo, i) => (
                  <Tr key={i}>
                    <Td>{todo.gigTitle}</Td>
                    <Td>{todo.client.name}</Td>
                    <Td>{todo.talent.username}</Td>
                    <Td>{todo.currentStatus.name}</Td>

                    <Td>
                      <IconButton
                        onClick={() => {
                          setToBeEditedGig(todo);
                          onOpen();
                        }}
                        // onClick={onOpenEditClient}
                        size="sm"
                        icon={<RiEditBoxLine />}
                      />
                    </Td>
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

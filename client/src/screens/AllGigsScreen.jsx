import {
  Alert,
  AlertIcon,
  Box,
  Image,
  // IconButton,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
//non lib imports
import inboxEmpty from "assets/globals/inboxEmpty.svg";
import { useGetAllGigs } from "api/hooks";

const AllGigsScreen = () => {
  //queries
  const { gigs, gigsLoading, gigsError } = useGetAllGigs();
  //jsx
  return (
    <>
      {gigsLoading ? (
        <Stack w="100%">
          <Skeleton isLoaded={!gigsLoading} height="50px" />
          <Skeleton isLoaded={!gigsLoading} height="50px" />
          <Skeleton isLoaded={!gigsLoading} height="50px" />
        </Stack>
      ) : gigsError ? (
        <Alert status="error">
          <AlertIcon />
          Oops! Todos cannot be loaded
        </Alert>
      ) : (
        <Box w="full">
          {gigs.length > 0 ? (
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Client</Th>
                  <Th>Talent</Th>
                  <Th>Status</Th>
                  <Th>Memo</Th>
                </Tr>
              </Thead>
              <Tbody>
                {gigs.map((gig, i) => (
                  <Tr key={i}>
                    <Td>{gig.gigTitle}</Td>
                    <Td>{gig.client.name}</Td>
                    <Td>{gig.talent.username}</Td>
                    <Td>{gig.currentStatus.name}</Td>
                    <Td>{gig.memo}</Td>

                    {/* <Td>
                    <IconButton
                      onClick={() => {
                        setToBeEditedGig(gig);
                        onOpen();
                      }}
                      // onClick={onOpenEditClient}
                      size="sm"
                      icon={<RiEditBoxLine />}
                    />
                  </Td> */}
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

export default AllGigsScreen;

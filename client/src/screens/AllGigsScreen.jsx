import {
  Alert,
  AlertIcon,
  Box,
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
import { useGetAllGigs } from "api/hooks";
// import { RiEditBoxLine } from "react-icons/ri";

const AllGigsScreen = () => {
  const { gigs, gigsLoading, gigsError } = useGetAllGigs();
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
              {gigs.map((gig, i) => (
                <Tr key={i}>
                  <Td>{gig.gigTitle}</Td>
                  <Td>{gig.client.name}</Td>
                  <Td>{gig.talent.username}</Td>
                  <Td>{gig.currentStatus.name}</Td>

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
        </Box>
      )}
    </>
  );
};

export default AllGigsScreen;

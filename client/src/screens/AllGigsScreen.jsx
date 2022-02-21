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
  useMediaQuery,
} from "@chakra-ui/react";

//non lib imports
import inboxEmpty from "assets/globals/inboxEmpty.svg";
import { useGetAllGigs } from "api/hooks";

import { useTranslation } from "react-i18next";

const AllGigsScreen = () => {
  //queries
  const { gigs, gigsLoading, gigsError } = useGetAllGigs();
  const [isLarge] = useMediaQuery("(min-width: 768px)");
  const { t } = useTranslation();

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
        <Box w="full">
          <Alert status="error">
            <AlertIcon />
            {/* TODO ↓ Should be "Gigs cannot be loaded"?} */}
            {t("Oops_Todos_cannot_be_loaded")}
          </Alert>
        </Box>
      ) : (
        <Box w="full">
          {gigs.length > 0 ? (
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>{t("AllGigScreen.Name")}</Th>
                  <Th>{t("AllGigScreen.Client")}</Th>
                  {isLarge && <Th>{t("AllGigScreen.Talent")}</Th>}
                  {isLarge && <Th>{t("AllGigScreen.Status")}</Th>}
                  {isLarge && <Th>{t("AllGigScreen.Memo")}</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {gigs.map((gig, i) => (
                  <Tr key={i}>
                    <Td>{gig.gigTitle}</Td>
                    <Td>{gig.client.name}</Td>
                    {isLarge && <Td>{gig.talent.username}</Td>}
                    {isLarge && <Td>{gig.currentStatus.name}</Td>}
                    {isLarge && <Td>{gig.memo}</Td>}

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

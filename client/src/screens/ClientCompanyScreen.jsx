import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useGetAllClients, useGetAllCompanies } from "api/hooks";
import NewClientModal from "components/modals/NewClientModal";
import NewCompanyModal from "components/modals/NewCompanyModal";

const ClientCompanyScreen = () => {
  const { clients, clientsLoading, clientsError } = useGetAllClients();
  const { companies, companiesLoading, companiesError } = useGetAllCompanies();
  const {
    isOpen: isOpenClient,
    onOpen: onOpenClient,
    onClose: onCloseClient,
  } = useDisclosure();

  const {
    isOpen: isOpenCompany,
    onOpen: onOpenCompany,
    onClose: onCloseCompany,
  } = useDisclosure();

  return (
    <>
      {!companiesLoading && (
        <NewClientModal
          isOpen={isOpenClient}
          onClose={onCloseClient}
          companies={companies}
        />
      )}
      <NewCompanyModal isOpen={isOpenCompany} onClose={onCloseCompany} />
      <Tabs w="100%" isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Client</Tab>
          <Tab>Company</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button m="2rem" onClick={onOpenClient} colorScheme="teal">
              Add new Client
            </Button>

            {clientsLoading ? (
              <Stack>
                <Skeleton isLoaded={!clientsLoading} height="50px" />
                <Skeleton isLoaded={!clientsLoading} height="50px" />
                <Skeleton isLoaded={!clientsLoading} height="50px" />
              </Stack>
            ) : clientsError ? (
              <Alert status="error">
                <AlertIcon />
                Oops! Client list cannot be loaded
              </Alert>
            ) : (
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Company</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Note</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {clients.map((client, i) => (
                    <Tr key={i}>
                      <Td>{client.name}</Td>
                      <Td>{client.company.name}</Td>
                      <Td>{client.email}</Td>
                      <Td>{client.phone}</Td>
                      <Td>{client.note}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>
          <TabPanel>
            <Button onClick={onOpenCompany} m="2rem" colorScheme="teal">
              Add new Company
            </Button>
            {companiesLoading ? (
              <Stack>
                <Skeleton isLoaded={!companiesLoading} height="50px" />
                <Skeleton isLoaded={!companiesLoading} height="50px" />
                <Skeleton isLoaded={!companiesLoading} height="50px" />
              </Stack>
            ) : companiesError ? (
              <Alert status="error">
                <AlertIcon />
                Oops! Company list cannot be loaded
              </Alert>
            ) : (
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Postal Code</Th>
                    <Th>Office Address</Th>
                    <Th>Note</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {companies.map((company, i) => (
                    <Tr key={i}>
                      <Td>{company.name}</Td>
                      <Td>{company.postCode}</Td>
                      <Td>{company.officeAddress}</Td>
                      <Td>{company.note}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ClientCompanyScreen;

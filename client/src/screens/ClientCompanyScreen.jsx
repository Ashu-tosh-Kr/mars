import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Stack } from "@chakra-ui/layout";
import { Image, Center } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { RiEditBoxLine } from "react-icons/ri";
import { useState } from "react";
//non lib imports
import inboxEmpty from "assets/globals/inboxEmpty.svg";
import { useGetAllClients, useGetAllCompanies } from "api/hooks";
import NewClientModal from "components/modals/NewClientModal";
import NewCompanyModal from "components/modals/NewCompanyModal";
import EditClientModal from "components/modals/EditClientModal";
import EditCompanyModal from "components/modals/EditCompanyModal";

const ClientCompanyScreen = () => {
  //state
  const [toBeEditedClient, setToBeEditedClient] = useState({ company: "" });
  const [toBeEditedCompany, setToBeEditedCompany] = useState({});

  const {
    isOpen: isOpenNewClient,
    onOpen: onOpenNewClient,
    onClose: onCloseNewClient,
  } = useDisclosure();

  const {
    isOpen: isOpenEditClient,
    onOpen: onOpenEditClient,
    onClose: onCloseEditClient,
  } = useDisclosure();

  const {
    isOpen: isOpenNewCompany,
    onOpen: onOpenNewCompany,
    onClose: onCloseNewCompany,
  } = useDisclosure();

  const {
    isOpen: isOpenEditCompany,
    onOpen: onOpenEditCompany,
    onClose: onCloseEditCompany,
  } = useDisclosure();

  //queries
  const { clients, clientsLoading, clientsError } = useGetAllClients();
  const { companies, companiesLoading, companiesError } = useGetAllCompanies();

  //jsx
  return (
    <>
      {!companiesLoading && (
        <NewClientModal
          isOpen={isOpenNewClient}
          onClose={onCloseNewClient}
          companies={companies}
        />
      )}
      {!companiesLoading && (
        <EditClientModal
          isOpen={isOpenEditClient}
          onClose={onCloseEditClient}
          companies={companies}
          client={toBeEditedClient}
        />
      )}
      <NewCompanyModal isOpen={isOpenNewCompany} onClose={onCloseNewCompany} />
      <EditCompanyModal
        isOpen={isOpenEditCompany}
        onClose={onCloseEditCompany}
        company={toBeEditedCompany}
      />
      <Tabs w="100%" colorScheme="teal" isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab>Client</Tab>
          <Tab>Company</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button m="2rem" onClick={onOpenNewClient} colorScheme="teal">
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
              <>
                {clients.length > 0 ? (
                  <Table variant="striped" colorScheme="teal">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Title</Th>
                        <Th>Company</Th>
                        <Th>Team</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Note</Th>
                        <Th>Edit</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {clients.map((client, i) => (
                        <Tr key={i}>
                          <Td>{client.name}</Td>
                          <Td>{client.title}</Td>
                          <Td>{client.company.name}</Td>
                          <Td>{client.clientTeam}</Td>
                          <Td>{client.email}</Td>
                          <Td>{client.phone}</Td>
                          <Td>{client.note}</Td>
                          <Td>
                            <IconButton
                              onClick={() => {
                                setToBeEditedClient(client);
                                onOpenEditClient();
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
                  <Center>
                    <Image boxSize={"25%"} src={inboxEmpty} alt="emty inbox" />
                  </Center>
                )}
              </>
            )}
          </TabPanel>
          <TabPanel>
            <Button onClick={onOpenNewCompany} m="2rem" colorScheme="teal">
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
              <>
                {companies.length > 0 ? (
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
                          <Td>
                            <IconButton
                              onClick={() => {
                                setToBeEditedCompany(company);
                                onOpenEditCompany();
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
                  <Center>
                    <Image boxSize={"25%"} src={inboxEmpty} alt="emty inbox" />
                  </Center>
                )}
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ClientCompanyScreen;

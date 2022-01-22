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
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

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
      <Tabs w="100%" isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab>{t("ClientCompanyScreen.Client")}</Tab>
          <Tab>{t("ClientCompanyScreen.Company")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button m="2rem" onClick={onOpenNewClient}>
              {t("ClientCompanyScreen.Add_new_client")}
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
                {t("ClientCompanyScreen.Oops_Client_list_cannot_be_loaded")}
              </Alert>
            ) : (
              <>
                {clients.length > 0 ? (
                  <Table variant="striped">
                    <Thead>
                      <Tr>
                        <Th>{t("ClientCompanyScreen.Name")}</Th>
                        <Th>{t("ClientCompanyScreen.Title")}</Th>
                        <Th>{t("ClientCompanyScreen.Company")}</Th>
                        <Th>{t("ClientCompanyScreen.Team")}</Th>
                        <Th>{t("ClientCompanyScreen.Email")}</Th>
                        <Th>{t("ClientCompanyScreen.Phone")}</Th>
                        <Th>{t("ClientCompanyScreen.Note")}</Th>
                        <Th>{t("ClientCompanyScreen.Edit")}</Th>
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
            <Button onClick={onOpenNewCompany} m="2rem">
              {t("ClientCompanyScreen.Add_new_company")}
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
                {t("ClientCompanyScreen.Oops_Company_list_cannot_be_loaded")}
              </Alert>
            ) : (
              <>
                {companies.length > 0 ? (
                  <Table variant="striped">
                    <Thead>
                      <Tr>
                        <Th>{t("ClientCompanyScreen.Name")}</Th>
                        <Th>{t("ClientCompanyScreen.Postal_code")}</Th>
                        <Th>{t("ClientCompanyScreen.Office_address")}</Th>
                        <Th>{t("ClientCompanyScreen.Note")}</Th>
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

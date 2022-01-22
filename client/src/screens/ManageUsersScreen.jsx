import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { RiEditBoxLine } from "react-icons/ri";

import { useGetAllUsers } from "api/hooks";
import { useState } from "react";
import NewUserModal from "components/modals/NewUserModal";
import EditUserModal from "components/modals/EditUserModal";
import { useTranslation } from "react-i18next";

const ManageUsersScreen = () => {
  const { users, usersLoading, usersError } = useGetAllUsers();

  const [toBeEditedUser, setToBeEditedUser] = useState({});

  const {
    isOpen: isOpenNewUser,
    onOpen: onOpenNewUser,
    onClose: onCloseNewUser,
  } = useDisclosure();

  const {
    isOpen: isOpenEditUser,
    onOpen: onOpenEditUser,
    onClose: onCloseEditUser,
  } = useDisclosure();

  const { t } = useTranslation();

  return (
    <>
      <NewUserModal isOpen={isOpenNewUser} onClose={onCloseNewUser} />
      <EditUserModal
        isOpen={isOpenEditUser}
        onClose={onCloseEditUser}
        user={toBeEditedUser}
      />
      <Tabs w="100%" colorScheme="teal" isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab>{t("ManageUsersScreen.Active_users")}</Tab>
          <Tab>{t("ManageUsersScreen.Inactive_users")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button m="2rem" onClick={onOpenNewUser}>
              {t("ManageUsersScreen.Add_new_user")}
            </Button>

            {usersLoading ? (
              <Stack>
                <Skeleton isLoaded={!usersLoading} height="50px" />
                <Skeleton isLoaded={!usersLoading} height="50px" />
                <Skeleton isLoaded={!usersLoading} height="50px" />
              </Stack>
            ) : usersError ? (
              <Alert status="error">
                <AlertIcon />
                {t("ManageUsersScreen.Oops_Users_list_cannot_be_loaded")}
              </Alert>
            ) : (
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>{t("ManageUsersScreen.Name")}</Th>
                    <Th>{t("ManageUsersScreen.Employee_Id")}</Th>
                    <Th>{t("ManageUsersScreen.Email")}</Th>
                    <Th>{t("ManageUsersScreen.Role")}</Th>
                    <Th>{t("ManageUsersScreen.Phone")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users
                    .filter((user) => user.isActive && user.role !== 4)
                    .map((user, i) => (
                      <Tr key={i}>
                        <Td>{user.username}</Td>
                        <Td>{user.employeeId}</Td>
                        <Td>{user.email}</Td>
                        <Td>
                          {user.role === 0
                            ? "Talent"
                            : user.role === 1
                            ? "Assistant"
                            : user.role === 2
                            ? "Supervisor"
                            : user.role === 3
                            ? "CEO"
                            : "Admin"}
                        </Td>
                        <Td>{user.phone}</Td>
                        <Td>
                          <IconButton
                            onClick={() => {
                              setToBeEditedUser(user);
                              onOpenEditUser();
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
            )}
          </TabPanel>
          <TabPanel>
            {usersLoading ? (
              <Stack>
                <Skeleton isLoaded={!usersLoading} height="50px" />
                <Skeleton isLoaded={!usersLoading} height="50px" />
                <Skeleton isLoaded={!usersLoading} height="50px" />
              </Stack>
            ) : usersError ? (
              <Alert status="error">
                <AlertIcon />
                {t("ManageUsersScreen.Oops_Users_list_cannot_be_loaded")}
              </Alert>
            ) : (
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>{t("ManageUsersScreen.Name")}</Th>
                    <Th>{t("ManageUsersScreen.Employee_Id")}</Th>
                    <Th>{t("ManageUsersScreen.Email")}</Th>
                    <Th>{t("ManageUsersScreen.Role")}</Th>
                    <Th>{t("ManageUsersScreen.Phone")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users
                    .filter((user) => !user.isActive && user.role !== 4)
                    .map((user, i) => (
                      <Tr key={i}>
                        <Td>{user.username}</Td>
                        <Td>{user.employeeId}</Td>
                        <Td>{user.email}</Td>
                        <Td>
                          {user.role === 0
                            ? "Talent"
                            : user.role === 1
                            ? "Assistant"
                            : user.role === 2
                            ? "Supervisor"
                            : user.role === 3
                            ? "CEO"
                            : "Admin"}
                        </Td>
                        <Td>{user.phone}</Td>
                        <Td>
                          <IconButton
                            onClick={() => {
                              setToBeEditedUser(user);
                              onOpenEditUser();
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
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ManageUsersScreen;

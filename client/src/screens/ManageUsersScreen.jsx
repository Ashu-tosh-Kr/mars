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
import { useMediaQuery } from "@chakra-ui/react";

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
  const [isLarge] = useMediaQuery("(min-width: 768px)");

  const { t } = useTranslation();

  return (
    <>
      <NewUserModal isOpen={isOpenNewUser} onClose={onCloseNewUser} />
      <EditUserModal
        isOpen={isOpenEditUser}
        onClose={onCloseEditUser}
        user={toBeEditedUser}
      />
      <Tabs isFitted colorScheme={"teal"} variant={"enclosed"} w="100%">
        <TabList
          w={["full", "full", "initial"]}
          h={["40px", "40px", "49px"]}
          top={["calc(100% - 40px)", "calc(100% - 40px)", 0]}
          pos={["fixed", "fixed", "initial"]}
          zIndex={2}
          mb="1em"
          bg={["teal.300", "teal.300", "transparent"]}
        >
          <Tab
            _selected={{
              bg: ["", "", "teal.100"],
              borderTop: ["3px solid", "3px solid", "none"],
              borderTopColor: ["teal.800", "teal.800", "gray.50"],
              borderTopRadius: ["none", "none", 10],
              opacity: 1,
            }}
          >
            {t("ManageUsersScreen.Active_users")}
          </Tab>
          <Tab
            _selected={{
              bg: ["", "", "teal.100"],
              borderTop: ["3px solid", "3px solid", "none"],
              borderTopColor: ["teal.800", "teal.800", "gray.50"],
              borderTopRadius: ["none", "none", 10],
              opacity: 1,
            }}
          >
            {t("ManageUsersScreen.Inactive_users")}
          </Tab>
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
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>{t("ManageUsersScreen.Name")}</Th>
                    <Th>{t("ManageUsersScreen.Employee_Id")}</Th>
                    {isLarge && <Th>{t("ManageUsersScreen.Email")}</Th>}
                    {isLarge && <Th>{t("ManageUsersScreen.Role")}</Th>}
                    {isLarge && <Th>{t("ManageUsersScreen.Phone")}</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {users
                    .filter((user) => user.isActive && user.role !== 4)
                    .map((user, i) => (
                      <Tr key={i}>
                        <Td>{user.username}</Td>
                        <Td>{user.employeeId}</Td>
                        {isLarge && <Td>{user.email}</Td>}
                        {isLarge && (
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
                        )}
                        {isLarge && <Td>{user.phone}</Td>}
                        <Td>
                          <IconButton
                            onClick={() => {
                              setToBeEditedUser(user);
                              onOpenEditUser();
                            }}
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
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>{t("ManageUsersScreen.Name")}</Th>
                    <Th>{t("ManageUsersScreen.Employee_Id")}</Th>
                    {isLarge && <Th>{t("ManageUsersScreen.Email")}</Th>}
                    {isLarge && <Th>{t("ManageUsersScreen.Role")}</Th>}
                    {isLarge && <Th>{t("ManageUsersScreen.Phone")}</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {users
                    .filter((user) => !user.isActive && user.role !== 4)
                    .map((user, i) => (
                      <Tr key={i}>
                        <Td>{user.username}</Td>
                        <Td>{user.employeeId}</Td>
                        {isLarge && <Td>{user.email}</Td>}
                        {isLarge && (
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
                        )}
                        {isLarge && <Td>{user.phone}</Td>}
                        <Td>
                          <IconButton
                            onClick={() => {
                              setToBeEditedUser(user);
                              onOpenEditUser();
                            }}
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

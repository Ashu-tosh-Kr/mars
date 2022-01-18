import React from "react";
import {
  Flex,
  Text,
  Divider,
  Avatar,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  VStack,
  PopoverArrow,
  PopoverCloseButton,
  Badge,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
// import { IoPawOutline } from "react-icons/io5";
import NavItem from "components/globals/NavItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { logout } from "redux/actions/userActions";
import { useGetCurrUserInfo } from "api/hooks";

export default function Sidebar() {
  const user = useSelector((store) => store.userLogin.userInfo.data.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    queryClient.invalidateQueries();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const { userInfo } = useGetCurrUserInfo();

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={["15px", "30px"]}
      w={["75px", "200px"]}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={["center", "flex-start"]}
        as="nav"
      >
        <NavItem
          to="/"
          icon={FiHome}
          title="Dashboard"
          description="This is the description for the dashboard."
        />
        <Flex pos="relative" align={"center"} w="full">
          <NavItem to="todo" icon={FiCalendar} title="ToDo" active />
          <Badge
            pos="relative"
            left={["-10%", "-20%", "-30%", "-40%"]}
            colorScheme="purple"
          >
            {userInfo?.todos?.length}
          </Badge>
        </Flex>
        <NavItem to="clients" icon={FiUser} title="Clients" />
        <NavItem to="new-gig" icon={FiDollarSign} title="New Gig" />
        <NavItem to="all-gigs" icon={FiBriefcase} title="All Gigs" />
        {user.role === 4 && (
          <NavItem
            to="admin/manage"
            icon={AiOutlineUserAdd}
            title="Manage Users"
          />
        )}
        <NavItem to="settings" icon={FiSettings} title="Settings" />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={["center", "flex-start"]}
        mb={4}
      >
        <Divider display={["none", "flex"]} />
        <Popover placement="top-start">
          <PopoverTrigger>
            <Flex mt={4} align="center" cursor={"pointer"}>
              <Avatar size="sm" src={user.avatar} />
              <Flex flexDir="column" ml={4} display={["none", "flex"]}>
                <Heading as="h3" size="sm">
                  {user.username}
                </Heading>
                <Text color="gray">
                  {user.role === 0
                    ? "Talent"
                    : user.role === 1
                    ? "Assistant"
                    : user.role === 2
                    ? "SV"
                    : user.role === 3
                    ? "CEO"
                    : "Admin"}
                </Text>
              </Flex>
            </Flex>
          </PopoverTrigger>
          <PopoverContent w="full" bg="teal.50">
            {/* <PopoverHeader fontWeight='semibold'>Popover placement</PopoverHeader> */}
            <PopoverArrow bg="teal.50" />
            <PopoverCloseButton />
            <PopoverBody color="teal">
              <VStack>
                <Button colorScheme="teal" variant="link">
                  Profile
                </Button>
                <Divider bg="teal" />
                <Button
                  rightIcon={<FiLogOut />}
                  colorScheme="teal"
                  variant="outline"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
}

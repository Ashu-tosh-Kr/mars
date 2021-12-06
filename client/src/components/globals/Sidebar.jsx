import React from "react";
import { Flex, Text, Divider, Avatar, Heading } from "@chakra-ui/react";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
// import { IoPawOutline } from "react-icons/io5";
import NavItem from "components/globals/NavItem";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const user = useSelector((store) => store.userLogin.userInfo.data.user);

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
          to="/home"
          icon={FiHome}
          title="Dashboard"
          description="This is the description for the dashboard."
        />
        <NavItem to="todo" icon={FiCalendar} title="ToDo" active />
        <NavItem to="clients" icon={FiUser} title="Clients" />
        <NavItem to="new-gig" icon={FiDollarSign} title="New Gig" />
        <NavItem to="all-gigs" icon={FiBriefcase} title="All Gigs" />
        {user.role >= 4 && (
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
        <Flex mt={4} align="center">
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
                ? "Admin"
                : "CEO"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

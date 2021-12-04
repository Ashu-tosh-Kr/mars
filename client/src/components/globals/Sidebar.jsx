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

export default function Sidebar() {
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
        <NavItem to="manage" icon={AiOutlineUserAdd} title="Manage Users" />
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
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex flexDir="column" ml={4} display={["none", "flex"]}>
            <Heading as="h3" size="sm">
              Ken
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

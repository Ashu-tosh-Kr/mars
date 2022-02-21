import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

export default function NavItem({ icon, title, to }) {
  //jsx
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={["center", "flex-start"]}
    >
      <Menu placement="right">
        <Link
          as={NavLink}
          to={to}
          style={({ isActive }) => {
            return { backgroundColor: isActive && "#B2F5EA" };
          }}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "teal.100" }}
          w={"100%"}
        >
          <MenuButton w="100%">
            <Flex justify={"flex-start"}>
              <Icon as={icon} fontSize="xl" colorScheme={"teal"} />
              <Text ml={5} display={"flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}

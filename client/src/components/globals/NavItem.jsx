import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";
// import NavHoverBox from '../components/NavHoverBox'

export default function NavItem({ icon, title, to }) {
  // const [active, setActive] = useState(false);
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
            // setActive(isActive);
            return { backgroundColor: isActive && "#AEC8CA" };
          }}
          // backgroundColor={active && "#AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={"100%"}
        >
          <MenuButton w="100%">
            <Flex justify={["center", "flex-start"]}>
              <Icon as={icon} fontSize="xl" color={"#82AAAD"} />
              <Text ml={5} display={["none", "flex"]}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        {/* <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList> */}
      </Menu>
    </Flex>
  );
}

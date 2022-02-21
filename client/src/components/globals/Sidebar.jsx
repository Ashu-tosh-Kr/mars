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
  IconButton,
  Box,
  CloseButton,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
//non lib imports
import NavItem from "components/globals/NavItem";
import { logout } from "redux/actions/userActions";
import { useGetCurrUserInfo } from "api/hooks";

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" /*bg={useColorModeValue("gray.500", "gray.900")}*/>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={[0, 0, "4"]}>
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  /** hooks */
  const user = useSelector((store) => store.userLogin.userInfo.data.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useGetCurrUserInfo();
  const { t } = useTranslation();

  //handlers
  const handleLogout = () => {
    localStorage.clear();
    queryClient.invalidateQueries();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  //jsx
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      px={3}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <NavItem
        to="/"
        icon={FiHome}
        onClick={onClose}
        title={t("Sidebar.Dashboard")}
        description="This is the description for the dashboard."
      />
      <Flex pos="relative" align={"center"} w="full">
        <NavItem to="todo" icon={FiCalendar} title={t("Sidebar.ToDo")} active />
        <Badge pos="absolute" left={6} colorScheme="purple">
          {userInfo?.todos?.length}
        </Badge>
      </Flex>
      <NavItem to="clients" icon={FiUser} title={t("Sidebar.Clients")} />
      <NavItem to="new-gig" icon={FiDollarSign} title={t("Sidebar.New_Gig")} />
      <NavItem to="all-gigs" icon={FiBriefcase} title={t("Sidebar.All_Gigs")} />
      {user.role === 4 && (
        <NavItem
          to="admin/manage"
          icon={AiOutlineUserAdd}
          title={t("Sidebar.Manage_Users")}
        />
      )}
      <NavItem to="settings" icon={FiSettings} title={t("Sidebar.Settings")} />
      <Flex p="5%" flexDir="column" w="100%" alignItems={"flex-start"} mb={4}>
        <Divider display={"flex"} />
        <Popover placement="top-start">
          <PopoverTrigger>
            <Flex mt={4} align="center" cursor={"pointer"}>
              <Avatar size="sm" src={user.avatar} />
              <Flex flexDir="column" ml={4} display={"flex"}>
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
            <PopoverArrow bg="teal.50" />
            <PopoverCloseButton />
            <PopoverBody color="teal">
              <VStack>
                <Button variant="link">{t("Sidebar.Profile")}</Button>
                <Divider bg="teal" />
                <Button
                  rightIcon={<FiLogOut />}
                  variant="outline"
                  onClick={handleLogout}
                >
                  {t("Sidebar.Log_out")}
                </Button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

// export default function Sidebar() {
//   const user = useSelector((store) => store.userLogin.userInfo.data.user);
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     localStorage.clear();
//     queryClient.invalidateQueries();
//     dispatch(logout());
//     navigate("/login", { replace: true });
//   };

//   const { userInfo } = useGetCurrUserInfo();

//   // translator hook
//   const { t } = useTranslation();

//   return (
//     <Flex
//       pos="sticky"
//       left="5"
//       h="95vh"
//       marginTop="2.5vh"
//       boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
//       borderRadius={["15px", "30px"]}
//       w={["75px", "200px"]}
//       flexDir="column"
//       justifyContent="space-between"
//     >
//       <Flex
//         p="5%"
//         flexDir="column"
//         w="100%"
//         alignItems={["center", "flex-start"]}
//         as="nav"
//       >
//         <NavItem
//           to="/"
//           icon={FiHome}
//           title={t("Sidebar.Dashboard")}
//           description="This is the description for the dashboard."
//         />
//         <Flex pos="relative" align={"center"} w="full">
//           <NavItem
//             to="todo"
//             icon={FiCalendar}
//             title={t("Sidebar.ToDo")}
//             active
//           />
//           <Badge
//             pos="relative"
//             left={["-10%", "-20%", "-30%", "-40%"]}
//             colorScheme="purple"
//           >
//             {userInfo?.todos?.length}
//           </Badge>
//         </Flex>
//         <NavItem to="clients" icon={FiUser} title={t("Sidebar.Clients")} />
//         <NavItem
//           to="new-gig"
//           icon={FiDollarSign}
//           title={t("Sidebar.New_Gig")}
//         />
//         <NavItem
//           to="all-gigs"
//           icon={FiBriefcase}
//           title={t("Sidebar.All_Gigs")}
//         />
//         {user.role === 4 && (
//           <NavItem
//             to="admin/manage"
//             icon={AiOutlineUserAdd}
//             title={t("Sidebar.Manage_Users")}
//           />
//         )}
//         <NavItem
//           to="settings"
//           icon={FiSettings}
//           title={t("Sidebar.Settings")}
//         />
//       </Flex>

//       <Flex
//         p="5%"
//         flexDir="column"
//         w="100%"
//         alignItems={["center", "flex-start"]}
//         mb={4}
//       >
//         <Divider display={["none", "flex"]} />
//         <Popover placement="top-start">
//           <PopoverTrigger>
//             <Flex mt={4} align="center" cursor={"pointer"}>
//               <Avatar size="sm" src={user.avatar} />
//               <Flex flexDir="column" ml={4} display={["none", "flex"]}>
//                 <Heading as="h3" size="sm">
//                   {user.username}
//                 </Heading>
//                 <Text color="gray">
//                   {user.role === 0
//                     ? "Talent"
//                     : user.role === 1
//                     ? "Assistant"
//                     : user.role === 2
//                     ? "SV"
//                     : user.role === 3
//                     ? "CEO"
//                     : "Admin"}
//                 </Text>
//               </Flex>
//             </Flex>
//           </PopoverTrigger>
//           <PopoverContent w="full" bg="teal.50">
//             {/* <PopoverHeader fontWeight='semibold'>Popover placement</PopoverHeader> */}
//             <PopoverArrow bg="teal.50" />
//             <PopoverCloseButton />
//             <PopoverBody color="teal">
//               <VStack>
//                 <Button variant="link">{t("Sidebar.Profile")}</Button>
//                 <Divider bg="teal" />
//                 <Button
//                   rightIcon={<FiLogOut />}
//                   variant="outline"
//                   onClick={handleLogout}
//                 >
//                   {t("Sidebar.Log_out")}
//                 </Button>
//               </VStack>
//             </PopoverBody>
//           </PopoverContent>
//         </Popover>
//       </Flex>
//     </Flex>
//   );
// }

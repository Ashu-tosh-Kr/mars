import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/layout";
import Sidebar from "components/globals/Sidebar";
import { useToast } from "@chakra-ui/react";

export const RequireAuth = () => {
  const user = useSelector((store) => store.userLogin.userInfo?.data?.user);
  let location = useLocation();
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return (
    <Flex justify="space-around">
      <Sidebar />
      <Flex w="85%" m="2rem" p="2rem">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export const RequireAdminPriviledge = () => {
  const user = useSelector((store) => store.userLogin.userInfo?.data?.user);
  const toast = useToast();
  if (user.role < 4) {
    toast({ status: "warning", title: "Priviledged Route" });
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

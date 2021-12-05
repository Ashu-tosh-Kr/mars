import { Routes, Route, Outlet } from "react-router-dom";
import React from "react";

import LoginScreen from "screens/LoginScreen";
import Sidebar from "components/globals/Sidebar";
import Dashboard from "screens/Dashboard";
import { Flex } from "@chakra-ui/layout";
import ClientCompanyScreen from "screens/ClientCompanyScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/*" element={<MainRoutes />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="clients" element={<ClientCompanyScreen />} />
        </Route>
      </Routes>
    </>
  );
}

const MainRoutes = () => {
  return (
    <Flex justify="space-around">
      <Sidebar />
      <Flex w="85%" m="2rem" p="2rem">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default App;

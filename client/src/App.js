import { Routes, Route } from "react-router-dom";
import React from "react";

import LoginScreen from "screens/LoginScreen";

import Dashboard from "screens/Dashboard";
import ClientCompanyScreen from "screens/ClientCompanyScreen";
import PageNotFound from "screens/errorPages/PageNotFound";
import { RequireAuth } from "components/HOCs/ProtectedRoutes";
import { RequireAdminPriviledge } from "components/HOCs/ProtectedRoutes";
import ManageUsersScreen from "screens/ManageUsersScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/*" element={<RequireAuth />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="clients" element={<ClientCompanyScreen />} />
          <Route path="admin/*" element={<RequireAdminPriviledge />}>
            <Route path="manage" element={<ManageUsersScreen />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

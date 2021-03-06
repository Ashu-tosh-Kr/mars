import { Routes, Route } from "react-router-dom";
import React from "react";
//non lib imports
import "utils/i18n";
import LoginScreen from "screens/LoginScreen";
import Dashboard from "screens/Dashboard";
import ClientCompanyScreen from "screens/ClientCompanyScreen";
import PageNotFound from "screens/errorPages/PageNotFound";
import { RequireAuth } from "components/globals/ProtectedRoutes";
import { RequireAdminPriviledge } from "components/globals/ProtectedRoutes";
import ManageUsersScreen from "screens/ManageUsersScreen";
import NewGigScreen from "screens/NewGigScreen";
import TodoScreen from "screens/TodoScreen";
import AllGigsScreen from "screens/AllGigsScreen";
import SettingsScreen from "screens/SettingsScreen";
import Translator from "components/globals/Translator";

function App() {
  return (
    <>
      <Translator />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/*" element={<RequireAuth />}>
          <Route path="" element={<Dashboard />} />
          <Route path="clients" element={<ClientCompanyScreen />} />
          <Route path="new-gig" element={<NewGigScreen />} />
          <Route path="todo" element={<TodoScreen />} />
          <Route path="all-gigs" element={<AllGigsScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
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

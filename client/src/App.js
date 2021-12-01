import { Routes, Route } from "react-router-dom";
import React from "react";

import LoginScreen from "screens/LoginScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
    </Routes>
  );
}

export default App;

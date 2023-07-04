import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

function App() {
  const { userInfo } = useContext(UserContext);
  const { isAuthenticated } = userInfo;

  return (
    <Routes>
      <Route>
        <Route index element={<Landing />} />
        <Route
          path="/dashboard/*"
          element={(() => { 
            if (isAuthenticated) {
              return <Dashboard />;
            }
            return <Navigate to="/login" />;
          })()}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Landing" element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default App;

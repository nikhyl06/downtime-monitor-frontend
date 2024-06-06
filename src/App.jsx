import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// import Guide from './pages/Guide';
import BreakDown from "./pages/BreakDown";
import RegistrationForm from "./pages/RegistrationForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddData from "./pages/AddData";
import AddMachine from "./pages/machines/AddMachine";
import UpdateMachine from "./pages/machines/UpdateMachine";
import LoginForm from "./pages/LoginForm";
import SuccessRegister from "./pages/SuccessRegister";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Layout from "./Layout";
import NotFound from "./pages/basic/NotFound";
import Unauthorized from "./pages/basic/Unauthorized";
import DeleteMachine from "./pages/machines/DeleteMachine";
import TestApi from "./pages/TestApi";

const ROLES = {
  User: 2001,
  Admin: 5150,
  Editor: 1984,
};

function App() {
  return (
    <div className="parent">
      <Header />
      <div className="main">
        <Routes>
          {/* Layout route */}
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Layout />}>
              {/* public routes */}
              <Route index element={<Home />} />
              <Route path="register" element={<RegistrationForm />} />
              <Route
                path="registration-success"
                element={<SuccessRegister />}
              />
              <Route path="login" element={<LoginForm />} />

              {/* Nested private routes */}
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Editor]}
                  />
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />
                }
              >
                <Route path="breakdown" element={<BreakDown />} />
                <Route path="addData" element={<AddData />} />
                <Route path="test" element={<TestApi />} />
                <Route path="addMachine" element={<AddMachine />} />
                <Route path="updateMachine" element={<UpdateMachine />} />
                <Route path="deleteMachine" element={<DeleteMachine />} />
              </Route>
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="/401" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

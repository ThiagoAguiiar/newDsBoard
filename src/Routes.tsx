import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Account } from "./components/Account/Account";
import { Header } from "./components/Header/Header";
import { LoginProvider } from "./context/LoginContext";
import { ModalProvider } from "./context/ModalContext";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Register from "./pages/Register";

interface PrivateRoutesProps {
  children: JSX.Element;
}

export function RoutesApp() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <LoginProvider>
          <TaskProvider>
            <div className="main">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoutes>
                      <Dashboard />
                    </PrivateRoutes>
                  }
                >
                  <Route path="dashboard/:id" element={<Account />} />
                </Route>
                <Route path="*" element={<Error404 />} />
              </Routes>
            </div>
          </TaskProvider>
        </LoginProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}

// Rota protegida - Liberando acesso ao dashboard
function PrivateRoutes({ children }: PrivateRoutesProps): JSX.Element {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

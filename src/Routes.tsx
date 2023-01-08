import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ModalProvider>
          <div className="main">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoutes>
                    <Dashboard />
                  </PrivateRoutes>
                }
              />
            </Routes>
          </div>
        </ModalProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

interface PrivateRoutesProps {
  children: JSX.Element;
}

function PrivateRoutes({ children }: PrivateRoutesProps) {
  const session = true;
  return session ? children : <Navigate to="/" />;
}

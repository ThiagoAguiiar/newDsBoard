import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Adicionar from "./Components/Dashboard/Adicionar";
import Documents from "./Components/Dashboard/Documents";
import Edit from "./Components/Dashboard/Edit";
import Tarefas from "./Components/Dashboard/Tarefas";
import Header from "./Components/Header/Header";
import { TarefasProvider } from "./Context/TarefasContext";
import { UserProvider } from "./Context/UserContext";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

type DashboardType = {
  children: JSX.Element;
};

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <TarefasProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <DashboardAcess>
                  <Dashboard />
                </DashboardAcess>
              }
            >
              <Route path="" element={<Adicionar />} />
              <Route path="adicionar" element={<Adicionar />} />
              <Route path="tarefas" element={<Tarefas />} />
              <Route path="tarefas/:id" element={<Edit />} />

              <Route path="documentos" element={<Documents />} />
            </Route>
          </Routes>
        </TarefasProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

const DashboardAcess = ({ children }: DashboardType) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

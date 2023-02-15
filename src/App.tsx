import { RoutesApp } from "./Routes";
import { useUserContext } from "./Context/UserContext";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";

export default function App(): JSX.Element {
  return <RoutesApp />;
}

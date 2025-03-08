import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import "./Style/Layout.scss";
import "./Style/Components.scss";
import Menu from "./components/Menus/Menu";

//dsds
export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>Pulsix</Title>
          <Menu/>

          <Suspense>{props.children}</Suspense>
          
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

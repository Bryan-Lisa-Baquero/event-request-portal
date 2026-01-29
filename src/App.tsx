import { DISABLE_AUTH } from "./config/auth";
import "./App.css";
import Nav from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import Constants from "./constants";
import AppRoutes from "./AppRoutes";

function App() {
  if (DISABLE_AUTH) {
    return (
      <Router>
        <Nav />
        <AppRoutes />
      </Router>
    );
  }

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={{ scopes: [Constants.apiScope] }}
    >
      <Router>
        <Nav />
        <AppRoutes />
      </Router>
    </MsalAuthenticationTemplate>
  );
}

export default App;

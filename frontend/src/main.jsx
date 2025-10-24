import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import ThirdParty from "supertokens-web-js/recipe/thirdparty";

import { backendURL } from "../config.js";

SuperTokens.init({
  appInfo: {
    apiDomain: backendURL,
    appName: "CryptIQ",
  },
  recipeList: [Session.init(), EmailPassword.init(), ThirdParty.init()],
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

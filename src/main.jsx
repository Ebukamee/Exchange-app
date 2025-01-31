import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <Theme appearance="light">
          <App />
        </Theme>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

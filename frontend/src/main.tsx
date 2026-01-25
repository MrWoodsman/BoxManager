import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "@ionic/react/css/core.css";
import "@ionic/react/css/structure.css";
// import "@ionic/react/css/normalize.css";

import { setupIonicReact } from "@ionic/react";
setupIonicReact({
  mode: "ios",
});

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { App } from "./App.tsx";
import { AuthContextProvider } from "./hook/auth.tsx";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";

localStorage.setItem("language", "en");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <AuthContextProvider>
          <ThemeProvider>
            <App />
            <ToastContainer />
          </ThemeProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);

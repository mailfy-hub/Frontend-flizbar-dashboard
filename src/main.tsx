import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { App } from "./App.tsx";
import { AuthContextProvider } from "./hook/auth.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider>
          <App />
          <ToastContainer />
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

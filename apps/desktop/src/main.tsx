import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "@/contexts/sidebar";
import "./index.css";
import App from "./App";
import AuthProvider from "@/features/auth/context/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
  <AuthProvider>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </AuthProvider>
</BrowserRouter>
  </StrictMode>
);
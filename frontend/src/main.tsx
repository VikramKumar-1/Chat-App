import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import React from "react"
//import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"
import { AuthProvider } from "./features/ChatAi/auth/context/AuthProvider"
import { Router } from "./features/ChatAi/app/Router"
import "./index.css"


//import { MantineProvider } from "@mantine/core"
//import { Notifications } from "@mantine/notifications"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
   
      <Router />
      <Toaster position="top-right" richColors />
    </AuthProvider>
     </BrowserRouter>
    
   
  </StrictMode>,
)

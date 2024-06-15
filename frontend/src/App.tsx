import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
// context
import { UserProvider } from "./context/UserContext";

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "./context/theme-provider";

export function App() {
  return(
    <div>
      <UserProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header/>
      <div className="w-full m-auto min-h-screen px-8 py-4">
        <Outlet/>
        <Toaster richColors/>
      </div>
      <Footer/>
      </ThemeProvider>
      </UserProvider>
    </div>
  )
}


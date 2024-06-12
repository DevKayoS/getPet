import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
// context
import { UserProvider } from "./context/UserContext";

export function App() {
  return(
    <div>
      <UserProvider>
      <Header/>
      <div className="w-full m-auto min-h-screen px-8 py-4">
        <Outlet/>
      </div>
      <Footer/>
      </UserProvider>
    </div>
  )
}


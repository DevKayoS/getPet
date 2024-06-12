import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function App() {
  return(
    <div>
      <Header/>
      <div className="w-full m-auto min-h-screen px-8 py-4">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}


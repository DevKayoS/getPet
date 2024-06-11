import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function App() {
  return(
    <div>
      <Header/>
      <div className="h-3/4">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}


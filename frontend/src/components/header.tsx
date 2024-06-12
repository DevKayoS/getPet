import { Link } from "react-router-dom"
import Logo from '../assets/img/favicon-32x32.png'

export const Header = () => {
  return(
    <div>
      <nav className="flex justify-between px-6 py-2 w-full h-16 border-b-2 border-slate-100/50 items-center">
        <Link to={"/"} className="flex text-center justify-center gap-2">
          <img src={Logo} alt="Logo" className="size-8"/>
          <h1 className="text-xl">Get a Pet</h1>
        </Link>
        <div className="flex gap-5 text-lg">
        <Link to={"/"} className="hover:text-sky-400">
            Adotar
          </Link>
          <Link to={"/login"} className="hover:text-sky-400">
            Entrar
          </Link>
          <Link to={"/register"} className="hover:text-sky-400">
            Registrar
          </Link>
        </div>
      </nav>
    </div>
  )
}
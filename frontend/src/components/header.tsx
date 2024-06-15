import { Link } from "react-router-dom"
import Logo from '../assets/img/favicon-32x32.png'
// context
import {useAuthContext} from "../context/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import api from "@/utils/api"
import { useState, useEffect } from "react"
import { ModeToggle } from "./layout/modeToggle"


export const Header = () => {
  const {authenticated, logout} = useAuthContext()
  const [user, setUser] = useState({
    image: '',
  })
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(()=>{
    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response)=> {
      setUser(response.data)
    })
  },[token])

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
          {authenticated ? (
            <>
              <Link to={"/user/profile"} className="hover:text-sky-400">
                Perfil
              </Link>
              <li onClick={logout}
              className="hover:text-sky-400 list-none cursor-pointer"
              >Sair</li>
              <Avatar>
                <AvatarImage src={`${import.meta.env.VITE_API}/images/users/${user.image}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

            </>
          ) : (
            <>
              <Link to={"/login"} className="hover:text-sky-400">
                Entrar
              </Link>
              <Link to={"/register"} className="hover:text-sky-400">
                Registrar
              </Link>
            </>
          )}
          <ModeToggle/>
        </div>
      </nav>
    </div>
  )
}
import {  InputConfig } from "@/components/form/input";
import { useAuthContext } from "@/context/UserContext";
import { IUserLogin } from "@/interface/IUserLogin";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"

export function Login(){ 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {login} = useAuthContext()

  async function handleSubmit(e: { preventDefault: () => void; }){
    e.preventDefault()
    // send user for database
    const user: IUserLogin = {
      email: email,
      password: password,
    }

    await login(user)
  }

  return(
    <div className="p-10">
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center m-auto  w-96 bg-zinc-600/20 gap-5 rounded-lg shadow-2xl shadow-black p-4">
     
      <InputConfig
        text="E-mail"
        type="text"
        name="email"
        placeholder="Digite o seu e-mail"
        value={email} 
        handleOnChange={(e)=> setEmail(e.target.value)} 
        multiple={undefined}       
         />
     
      <InputConfig
        text="Senha"
        type="password"
        name="password"
        placeholder="Digite a sua senha"
        value={password}
        handleOnChange={(e)=> setPassword(e.target.value)} 
        multiple={undefined}       
         />
     
        <input type="submit" value="Entrar" className=" bg-zinc-500/20 rounded-md shadow-md  shadow-black w-full h-12 hover:bg-emerald-900 cursor-pointer"/>
    </form>
    <div className="flex items-center mt-5">
      <p className="m-auto">Não tem conta? <Link to={"/register"} className="font-bold text-sky-400 hover:text-sky-700">Clique aqui</Link></p>
    </div>
    <Toaster richColors/>
  </div>
  )
}
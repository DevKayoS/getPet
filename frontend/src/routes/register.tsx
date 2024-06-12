import { Input } from "@/components/form/input";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import {Context} from '../context/UserContext'

export function Register(){
  const [user, setUser] = useState({})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const {register} = useContext(Context)

  async function handleSubmit(e: { preventDefault: () => void; }){
    e.preventDefault()
    // send user for database
    setUser({
      name: name,
      email: email,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword
    })
    console.log(user)
    register(user)
  }
  return(
    <div className="p-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center m-auto  w-96 bg-zinc-950/60 gap-5 rounded-lg shadow-xl shadow-black p-4">
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          value={name}
          handleOnChange={(e)=> setName(e.target.value)} 
          multiple={undefined}       
           />
        <Input
          text="E-mail"
          type="text"
          name="email"
          placeholder="Digite o seu e-mail"
          value={email} 
          handleOnChange={(e)=> setEmail(e.target.value)} 
          multiple={undefined}       
           />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          value={phone}
          handleOnChange={(e)=> setPhone(e.target.value)} 
          multiple={undefined}       
           />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          value={password}
          handleOnChange={(e)=> setPassword(e.target.value)} 
          multiple={undefined}       
           />
        <Input
          text="Confirme a sua senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          value={confirmPassword}
          handleOnChange={(e)=> setConfirmPassword(e.target.value)} 
          multiple={undefined}       
           />
          <input type="submit" value="Cadastrar" className="bg-zinc-500/20 rounded-md shadow-md  shadow-black w-full h-8 hover:bg-sky-900 cursor-pointer"/>
      </form>
      <div className="flex items-center mt-5">
        <p className="m-auto">Já tem conta? <Link to={"/login"} className="font-bold text-sky-400 hover:text-sky-700">Clique aqui</Link></p>
      </div>
      <Toaster richColors/>
    </div>
  )
}
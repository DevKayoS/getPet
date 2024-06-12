import { Input } from "@/components/form/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

export function Register(){
  const [user, setUser] = useState({})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
   

  function handleSubmit(e: { preventDefault: () => void; }){
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
    toast.success('Usuário cadastrado com sucesso!')
  }
  return(
    <div className="p-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center m-auto  w-96 bg-zinc-950/60 gap-5 rounded-lg shadow-xl shadow-black p-4">
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={(e)=> setName(e.target.value)} 
          value={name}
          multiple={undefined}       
           />
        <Input
          text="E-mail"
          type="text"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={(e)=> setEmail(e.target.value)} 
          value={email} 
          multiple={undefined}       
           />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={(e)=> setPhone(e.target.value)} 
          value={phone}
          multiple={undefined}       
           />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={(e)=> setPassword(e.target.value)} 
          value={password}
          multiple={undefined}       
           />
        <Input
          text="Confirme a sua senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          handleOnChange={(e)=> setConfirmPassword(e.target.value)} 
          value={confirmPassword}
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
import { Input } from "@/components/form/input";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import api from '../../utils/api'

export function Profile(){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [ password, setPassword] = useState("")
  const [image, setImage] = useState("")
  const [ confirmPassword, setConfirmPassword] = useState("")
  const [user,setUser] = useState({})

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
  
 
  function onFileChange(e){

  }
 
  return(

    <div className="text-2xl text-slate-100">
      <p>preview Imagem</p>
      <form className="flex flex-col items-center justify-center m-auto max-w-xl bg-zinc-600/20 gap-5 rounded-lg shadow-2xl shadow-black p-4">
      <Input
          text="Imagem"
          type="file"
          name="image"
          
          handleOnChange={onFileChange} 
          multiple={undefined}       
           />
      <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          value={user.name}
          handleOnChange={(e)=> setName(e.target.value)} 
          multiple={undefined}       
           />
        <Input
          text="E-mail"
          type="text"
          name="email"
          placeholder="Digite o seu e-mail"
          value={user.email} 
          handleOnChange={(e)=> setEmail(e.target.value)} 
          multiple={undefined}       
           />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          value={user.phone}
          handleOnChange={(e)=> setPhone(e.target.value)} 
          multiple={undefined}       
           />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={(e)=> setPassword(e.target.value)} 
          multiple={undefined}       
           />
        <Input
          text="Confirme a sua senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          handleOnChange={(e)=> setConfirmPassword(e.target.value)} 
          multiple={undefined}       
           />
          <input type="submit" value="Cadastrar" className=" bg-zinc-500/20 rounded-md shadow-md  shadow-black w-full h-12 hover:bg-sky-900 cursor-pointer"/>
      </form>
      <Toaster richColors/>
    </div>
  )
}
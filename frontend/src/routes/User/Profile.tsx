import { Input } from "@/components/form/input";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import api from '../../utils/api'
import { Iuser } from "@/interface/IUser";

export function Profile(){
  // const [image, setImage] = useState("")
  const [user,setUser] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    image: null,
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
  
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onFileChange(e: { target: {[x: string]: any; value: any; files: any[]; }; }){
    setUser({...user, [e.target.name]: e.target.files[0]})
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleOnChange(e: { target: {name: any; value: any; }; }){
    setUser({...user, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e: { preventDefault: () => void; }){
    e.preventDefault()

    const formData =  new FormData()
  

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    Object.keys(user).forEach((key) => formData.append(key, (user as any)[key]))
 
    
    await api.patch(`/users/edit/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-type': 'multipart/form-data'
      }
    }).then((response)=> {
      toast.success('Dados atualizado com sucesso!')
      return response.data
    }).catch((err)=> {
      const message = err.response.data.message
      toast.error(`Algo deu errado: ${message}`)
    })

  }
 
  return(

    <div className="text-2xl text-slate-100">
      <p>preview Imagem</p>
      <form onSubmit={handleSubmit} className=" text-xl flex flex-col items-center justify-center m-auto max-w-xl bg-zinc-600/20 gap-5 rounded-lg shadow-2xl shadow-black p-4">
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
          value={user.name || ''}
          handleOnChange={handleOnChange} 
          multiple={undefined}       
           />
        <Input
          text="E-mail"
          type="text"
          name="email"
          placeholder="Digite o seu e-mail"
          value={user.email} 
          handleOnChange={handleOnChange} 
          multiple={undefined}       
           />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          value={user.phone}
          handleOnChange={handleOnChange} 
          multiple={undefined}       
           />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleOnChange} 
          multiple={undefined}       
           />
        <Input
          text="Confirme a sua senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleOnChange} 
          multiple={undefined}       
           />
          <input type="submit" value="Cadastrar" className=" bg-zinc-500/20 rounded-md shadow-md  shadow-black w-full h-12 hover:bg-sky-900 cursor-pointer"/>
      </form>
      <Toaster richColors/>
    </div>
  )
}
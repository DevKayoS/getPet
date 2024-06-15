/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/form/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import api from '../../utils/api'
import { RoundedImage } from "@/components/layout/roundedImage";

export function Profile(){
  const [preview, setPreview] = useState<File | null>(null);
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
  
 

  function onFileChange(e: ChangeEvent<HTMLInputElement>){
    if (e.target.files && e.target.files[0]) {
      setPreview(e.target.files[0])
      setUser({ ...user, [e.target.name]: e.target.files[0] });
    }
  }
 
  function handleOnChange(e: ChangeEvent<HTMLInputElement>){
    setUser({...user, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e: { preventDefault: () => void; }){
    e.preventDefault()

    const formData =  new FormData()
  
   await Object.keys(user).forEach((key) => formData.append(key, (user as any)[key]))
 
    
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
      <form onSubmit={handleSubmit} className=" text-xl flex flex-col items-center justify-center m-auto max-w-xl bg-zinc-600/20 gap-5 rounded-lg shadow-2xl shadow-black p-4">
        <div>
          {(user.image || preview) && (
            <RoundedImage src={preview ? URL.createObjectURL(preview) :
              `${import.meta.env.VITE_API}/images/users/${user.image}`} 
               alt={user.name} /> 
          )}
        </div>
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
          <input type="submit" value="Editar" className=" bg-zinc-500/20 rounded-md shadow-md  shadow-black w-full h-12 hover:bg-sky-900 cursor-pointer"/>
      </form>
      <Toaster richColors/>
    </div>
  )
}
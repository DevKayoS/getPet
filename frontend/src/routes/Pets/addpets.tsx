import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from "@/components/ui/sonner"
import  {toast} from 'sonner'
import { AddPetForm } from '@/components/form/addPet'
import { IPet } from '@/interface/IPet'

export function AddPet() {
  const [token] = useState(localStorage.getItem('token') || '')
  const navigate = useNavigate()

  
  async function registerPet(pet: IPet): Promise<void> {
    if (!pet || typeof pet !== 'object') {
      throw new Error('Invalid pet object');
    }
    const formData =  new FormData()

    await Object.keys(pet).forEach((key)=>{
      if(key === 'images' && Array.isArray(pet[key])){
        for(let i = 0; i < (pet[key] as File[]).length; i++){
          formData.append('images', (pet[key] as File[])[i])
        }
      } else {
        formData.append(key, String(pet[key]))
      }
    })

       const data = await api.post('/pets/create', formData, {
        headers: {
          Authorization:  `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data'
        }
       })
       .then((response)=> {
          toast.success(`Pet cadastrado com sucesso!`,{
            description: `${pet.name} está disponível para doação!`
          })
          navigate('/users/mypets')
          return response.data
       })
       .catch((err)=> { 
        toast.error(`Algo deu errado: ${err.response.data.message}`)
        return err.response.data
       }) 


}
  return(
    <div>
      <div>
        <h1 className='text-3xl font-medium'>Cadastre um novo Pet</h1>
        <p className='text-emerald-500'>Depois ele ficará disponivel para adoção!</p>
      </div>
      <AddPetForm handleSubmit={registerPet} btnText='Cadastrar Pet' petData={undefined}/>
      <Toaster richColors/>
    </div>
  )
}
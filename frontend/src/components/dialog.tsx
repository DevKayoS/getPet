import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { AddPetForm } from "./form/addPet"
import { useEffect, useState } from "react"
import api from "@/utils/api"
import { IPet } from "@/interface/IPet"
import {  toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"
 
export function EditDialog({id}: IPet) {
  const [pet, setPet] = useState<IPet>({
    name: '',
    age: '',
    weight: '',
    coat: '',
    images: []
  })
  const [token] = useState(localStorage.getItem('token')|| '')


  useEffect(()=>{
    api.get(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response)=>{
      setPet(response.data.pet)
    })
  }, [token, id])

  async function updatePet(updatedPet: IPet){
    const formData =  new FormData()

    await Object.keys(updatedPet).forEach((key)=>{
      if(key === 'images'){
        for(let i = 0; i < (updatedPet[key] as File[]).length; i++){
          formData.append('images', (updatedPet[key] as File[])[i])
        }
      } else {
        formData.append(key, String(updatedPet[key]))
      }
    })
    console.log(formData)
    console.log(pet)

    const data = await api.patch(`/pets/${pet._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((response)=>{
      toast.success('Pet atualizado com sucesso',{
        description: `Mudanças realizada nos dados do Pet: ${pet.name}, foram salvas! `
      })
      console.log(response.data)
       return response.data
    }).catch((err)=> {
      toast.error('Algo deu errado! ',{
        description: `${err.response.data.message}`
      })
      return err.response.data
    })
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Pencil className="size-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar o {pet.name}</DialogTitle>
          <DialogDescription>
            Faça as alterações que deseja, ao finalizar clique em editar para salvar as mudanças.
          </DialogDescription>
        </DialogHeader>
        <AddPetForm handleSubmit={updatePet} petData={pet} btnText="Editar"/>
      </DialogContent>
      <Toaster richColors/>
    </Dialog>
  )
}
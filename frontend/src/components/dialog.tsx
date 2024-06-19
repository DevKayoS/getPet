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
 
export function EditDialog({id}: IPet) {
  const [pet, setPet] = useState<IPet>({
    name: '',
    age: '',
    weight: '',
    coat: ''
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

  async function updatePet(){

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
    </Dialog>
  )
}
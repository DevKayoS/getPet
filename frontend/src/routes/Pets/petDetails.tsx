import { IPet } from "@/interface/IPet"
import api from "@/utils/api"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

export function PetDetails(){
  const [pet, setPet] = useState<IPet>({
    name: "",
    age: "",
    coat: "",
    weight: "",
    images: [],
  })
  const {id} = useParams()
  const [token] = useState(localStorage.getItem('token')|| '')
  useEffect(()=>{
   api.get(`/pets/${id}`).then((response)=>{
    setPet(response.data.pet)
   }).catch((err)=>{
    toast.error('Algo deu errado',{
      description: `${err.response.data.message}`
    })
    return err.response.data
   }) 
  }, [id])
  console.log(pet)

  return(
    <div>
      <h1 >{pet.name}</h1>
      <Toaster richColors/>
    </div>
  )
}
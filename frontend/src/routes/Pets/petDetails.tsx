import { IPet } from "@/interface/IPet"
import api from "@/utils/api"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

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

  return(
    <>
      {pet.name && (
        <section>
            <div>
              <h1>Conhcendo o Pet: {pet.name}</h1>
              <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
            </div>
            <div>
              {pet.images && pet.images.length > 0 && pet.images.map((image, index)=>(
                <img
                src={`${import.meta.env.VITE_API}/images/pets/${image}`}
                alt={pet.name}
                key={index}
                />
              ))}
            </div>
            <p><span>Peso: </span>{pet.weight}kg</p>
            <p><span>Idade: </span>{pet.age} anos</p>
            {token ? (
             <Button>Solicitar Visita</Button>
            ):(
            <p>Você precisa <Link to={'/register'}>criar uma conta</Link> para solicitar a visita</p>
            )}
          <Toaster richColors/>
        </section>
      )}
    </>
  )
}
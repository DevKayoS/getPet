import { IPet } from "@/interface/IPet"
import api from "@/utils/api"
import { useEffect, useState } from "react"
import { Link} from "react-router-dom"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

  export function PetDetails({id}: IPet){
  const [pet, setPet] = useState<IPet>({
    name: "",
    age: "",
    coat: "",
    weight: "",
    images: [],
  })
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

  async function schedule() {
    const data = await api.patch(`pets/schedule/${pet._id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response)=>{
      toast.success('Visita solicitada com sucesso',{
        description: `A solicitação será enviada para o tutor: ${pet.user.name}`
      })
      return response.data    
    }).catch((err)=>{
      toast.error('Algo deu errado',{
        description: `${err.response.data.message}`
      })
      return err.response.data
    })
  }

  return(
    <>
      {pet.name && (
        <section>
            <div>
              <h1 className="text-xl"> <span className="font-semibold"> Conhecendo o Pet:</span>  {pet.name}</h1>
              <p className="text-zinc-400">Se tiver interesse, marque uma visita para conhecê-lo melhor</p>
            </div>
            <div className="flex flex-col max-w-xl mt-8 m-auto">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
              {pet.images && pet.images.length > 0 && pet.images.map((image, index)=>(
                <img
                className="rounded-md "
                src={`${import.meta.env.VITE_API}/images/pets/${image}`}
                alt={pet.name}
                key={index}
                />
              ))}
            </div>
            <div className="mt-2 mb-4">
              <p><span>Peso: </span>{pet.weight}kg</p>
              <p><span>Idade: </span>{pet.age} anos</p>
              <p><span>Pelagem: </span>{pet.coat}</p>
            </div>
            {token ? (
             <Button onClick={()=> schedule()} variant='able' >Solicitar Visita</Button>
            ):(
            <p className="text-sm m-auto">Você precisa <Link className="text-emerald-400" to={'/register'}>criar uma conta</Link> para solicitar a visita</p>
            )}
            </div>
        </section>
      )}
    </>
  )
}
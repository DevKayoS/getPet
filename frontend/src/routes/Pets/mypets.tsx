import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CirclePlus, Trash } from 'lucide-react';
import api from "@/utils/api";
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { IPet } from "@/interface/IPet";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { EditDialog } from "@/components/dialog";

export function MyPets() {
  const [pets, setPets] = useState<IPet[]>([])
  const [token] = useState(localStorage.getItem('token')|| '')

  useEffect(()=>{
    api.get('/pets/mypets',{
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response)=> {
      setPets(response.data.pets)
    })
  }, [token])

  async function removePet(name: string,id:string) {
     await api.delete(`/pets/remove/${id}`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response)=>{
      const updatedPets = pets.filter((pet)=> pet._id !== id)
      setPets(updatedPets)
      toast.success('Pet removido com sucesso!', {
        description: `${name} foi excluido da sua lista de pets`
      })
      return response.data
    })
    .catch((err)=>{
      toast.error( `Algo deu errado: ${err.response.data}`)
      return( err.response.data)
    })
  }

  return(
   <div>
    <div className="flex justify-between mb-5 items-center">
      <h1 className="font-medium text-2xl">Meus Pets</h1>
      <Button asChild>
        <Link className='flex gap-2' to={'/pets/addpet'}><CirclePlus className="size-5"/> Cadastrar Pet</Link>
        </Button>
    </div>
    <div className="grid md:grid-cols-4 grid-cols-1">
      {pets.length > 0   && (
        pets.map((pet)=> (
          <Card className="m-5  " key={pet._id}>
          <CardHeader>
            <div className="flex flex-col gap-5">
                  {pet.available && (
                    <CardTitle className="justify-end">
                      <Badge variant='able'>Disponível para adoção</Badge>
                    </CardTitle>
                  )}
              <CardTitle className="text-xl flex gap-3 ">
              <Avatar>
              {pet.images && pets.length > 0 ?(
                <AvatarImage className="max-w-16 min-h-16 rounded-md" src={`${import.meta.env.VITE_API}/images/pets/${pet.images[0]}`} />
              ) :
              <AvatarFallback>CN</AvatarFallback>
            }
            </Avatar>
                {pet.name}
                </CardTitle>
            </div>

            <CardDescription>
              <p>Idade: <span>{pet.age} anos</span></p>
              <p>Peso: <span>{pet.weight} kg</span></p>
              <p>Pelagem: <span>{pet.coat}</span></p>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            {pet.available ? (
              <div className="flex items-center gap-4 w-full justify-end">
              {pet.adopter && (
                <Button><Badge variant="secondary">Concluir adoção</Badge></Button>
              )}
              <EditDialog id={pet._id} name={""} age={""} weight={""} coat={""}/>
              <Button onClick={()=>removePet(pet.name,pet._id)}>
                <Trash className="size-3"/>
                </Button>
              </div>
            ) : <Badge variant="destructive">Pet já adotado</Badge>}
          </CardFooter>
        </Card>
        ))
      )}
      {pets.length === 0 && (
        <p>Você ainda não tem pets cadastrados ainda</p>
      )}
    </div>
    <Toaster richColors/>
   </div>
  )
}
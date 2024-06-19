import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CirclePlus, Pencil, Trash } from 'lucide-react';
import api from "@/utils/api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export function MyPets() {
  const [pets, setPets] = useState([])
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

  return(
   <div>
    <div className="flex justify-between mb-5 items-center">
      <h1 className="font-medium text-2xl">MyPets</h1>
      <Button asChild>
        <Link className='flex gap-2' to={'/pets/addpet'}><CirclePlus className="size-5"/> Cadastrar Pet</Link>
        </Button>
    </div>
    <div className="grid grid-cols-4">
      {pets.length > 0   && (
        pets.map((pet)=> (
          <Card className="m-5 justify-between" key={pet._id}>
          <CardHeader>
            <CardTitle className="text-xl flex gap-2 items-center">
            <Avatar>
                <AvatarImage className="max-w-16 min-h-16 rounded-md" src={`${import.meta.env.VITE_API}/images/pets/${pet.images[0]}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {pet.name}
              </CardTitle>
            <CardDescription>
              <p>Idade: <span>{pet.age} anos</span></p>
              <p>Peso: <span>{pet.weight} kg</span></p>
              <p>Pelagem: <span>{pet.coat}</span></p>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            {/* colocar uma badge do shadcnui */}
            {pet.available ? (
              <>
              {pet.adopter && (
                <Button>Concluir adoção</Button>
              )}
              <Link to={`/pet/edit/${pet._id}`}><Pencil/></Link>
              <Button variant='outline'><Trash/></Button>
              </>
            ) : <p>Pet já adotado</p>}
          </CardFooter>
        </Card>
        ))
      )}
      {pets.length === 0 && (
        <p>Você ainda não tem pets cadastrados ainda</p>
      )}
    </div>
   </div>
  )
}
import { IPet } from "@/interface/IPet"
import api from "@/utils/api"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "../ui/card"

export function MyAdoptions(){
  const [pets, setPets] = useState<IPet[]>([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(()=> {
    api.get('/pets/myadoptions', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response)=> {
      setPets(response.data.pets)
    })
  }, [token])
  
  console.log(pets)

  return(
    <section>
      <div>
        <h1>Minhas adoções</h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 items-center">
        {pets.length > 0  && ( 
          pets.map((pet)=> (
             <Card className="m-5 flex min-h-64 items-center justify-between max-w-[800px]" key={pet._id}>
             <CardHeader>
               <div className="flex flex-col gap-5">
                 <CardTitle className="text-xl gap-3 ">
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
               <CardContent>
                <p><span className="font-medium">Fale com:</span> {pet.user.name}</p>
                <p><span className="font-medium">Ligue para:</span> {pet.user.phone}</p>
               </CardContent>
             <CardFooter className="justify-end">
               {pet.available ? (
                <Badge >Adoção em processo</Badge>
               ) : 
                <Badge variant="able">Parabéns por concluir a adoção</Badge>
               }
             </CardFooter>
           </Card>
        ))
        )}
        {pets.length === 0 && <p>Ainda não há adoções de pets.</p>}
      </div>
    </section>
  )
}
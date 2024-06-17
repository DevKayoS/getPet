import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"
import { CirclePlus } from 'lucide-react';

export function MyPets() {
  const [pets, setPets] = useState([])


  return(
   <div>
    <div className="flex justify-between mb-5 items-center">
      <h1>MyPets</h1>
      <Button asChild>
        <Link className='flex gap-2' to={''}><CirclePlus className="size-5"/> Cadastrar Pet</Link>
        </Button>
    </div>
    <div>
      {pets.length > 0   && (
        <p>Meus Pets Cadastrados</p>
      )}
      {pets.length === 0 && (
        <p>Você ainda não tem pets cadastrados ainda</p>
      )}
    </div>
   </div>
  )
}
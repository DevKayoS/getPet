import { PetDetailsDialog } from "@/components/petDetailsDialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Toaster } from "@/components/ui/sonner"
import { IPet } from "@/interface/IPet"
import api from "@/utils/api"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function Home(){
  const [pets, setPets] = useState<IPet[]>([])

  useEffect(()=>{
    api.get('/pets/', {

    }).then((response)=>{
      setPets(response.data.pets)
    }).catch((err)=>{
      return err.response.data.message
    })
  },[])

  return(
    <div className="text-2xl">
      <div>
        <h1 className="text-3xl font-medium">Adote um pet!</h1>
        <p className="text-lg">Veja mais detalhes sobre o pet e agende uma visita para conhecer melhor o tutor e o pet</p>
      </div>


      <div className="grid md:grid-cols-4 grid-cols-1">
      { pets.length > 0 &&
        pets.map((pet)=>(
        <Card className="md:m-5 max-w-80 m-auto mt-8" key={pet._id}>
        <CardHeader>
          <div className="flex flex-col gap-">
        <Carousel
        opts={{
        align: "start",
        loop: true,
        }}
      > 
      <CarouselContent>
        {pet.images && (
        pet.images.map((images, index: unknown)=>(
          <CarouselItem >
             <Card className="flex items-center justify-center m-auto max-w-72 ">
             <CardContent className="flex min-h-36 max-h-72 m-auto bg-cover outline-none aspect-square items-center justify-center ">
                  <img 
                  className="bg-cover"
                  src={`${import.meta.env.VITE_API}/images/pets/${images}`}
                  alt={pet.name}
                  key={`${pet.name}+${index}`}/>
                </CardContent>
             </Card>
            </CarouselItem> 
        )
        ))
        }
      </CarouselContent>
        <CarouselPrevious /><CarouselNext />
      </Carousel>
            <CardTitle className="text-xl flex gap-3 mt-3">
              {pet.name}
            </CardTitle>
          </div>
          <CardDescription>
            <p>Idade: <span>{pet.age} anos</span></p>
            <p>Peso: <span>{pet.weight} kg</span></p>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center items-center  gap-2">
          {pet.available ? (
          <div className="flex justify-between items-center gap-2 w-full">
          <Badge variant='able' className="cursor-pointer w-full items-center justify-center">Disponível </Badge>
          <PetDetailsDialog id={pet._id} name={""} age={""} weight={""} coat={""}/>
          </div>
          ):(<Badge variant='destructive'>Adotado</Badge>)}
        </CardFooter>
      </Card>
    ))}
     {pets.length === 0 && (
      <p>Não há pets cadastrados ou disponíveis para adoção</p>
     )}
      </div>
      <Toaster richColors/>
    </div>
  )
}
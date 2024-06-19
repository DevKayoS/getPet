import { ChangeEvent, useState } from "react"
import * as React from "react"
import { InputConfig } from "./input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IPet } from "@/interface/IPet"

interface AddPetFormProps{
  handleSubmit: (pet: IPet) => void
  petData?: IPet
  btnText: string
}

export function AddPetForm({handleSubmit, petData, btnText}: AddPetFormProps){
  const [pet, setPet] = useState<IPet>(petData || {
    name: '',
    age: '',
    coat: '',
    weight: '',
    images: [],
    available: false
  })
  const [preview, setPreview] = useState<File[]>([])
  const coat = ["Branco", "Preto", "Castanho", "Caramelo", "Tigrado", "Cinza", "outro"]
  

  function onFileChange(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files){
      setPreview(Array.from(e.target.files))
      setPet({...pet, images: Array.from(e.target.files)})
    }
  }
  function handleOnChange(e: ChangeEvent<HTMLInputElement>){
    setPet({...pet, [e.target.name]: e.target.value})
  }
  function handleColor(value: string){
    setPet({...pet, coat: value})
  }
  function submit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if (pet) {
      handleSubmit(pet);
    } else {
      console.error('Pet object is invalid');
    }
  }

  return(
    <form onSubmit={submit} className="flex flex-col items-center justify-center m-auto mt-8 mb-20 w-96 bg-zinc-600/20 gap-5 rounded-lg shadow-2xl shadow-black p-4">
      <Carousel
        opts={{
        align: "start",
        loop: true,
        }}
      >
     
      <CarouselContent>
        {preview.length > 0
        ? preview.map((image,index)=>(
          <CarouselItem >
             <Card>
             <CardContent className="flex items-center justify-center p-2">
                  <img 
                  src={URL.createObjectURL(image)} 
                  alt={pet.name} 
                  key={`${pet.name}+${index}`}/>
                </CardContent>
             </Card>
            </CarouselItem>
        )):
        pet.images && (
        pet.images.map((images, index: unknown)=>(
          <CarouselItem >
             <Card>
             <CardContent className="flex items-center justify-center p-2">
                  <img 
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
      {preview.length > 0 ? (
        <><CarouselPrevious /><CarouselNext /></>
      ): (
        <></>
      ) }
       {pet.images && pet.images.length > 0 ? (
        <><CarouselPrevious /><CarouselNext /></>
      ): (
        <></>
      ) }


      </Carousel>
      
      <InputConfig
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
       <InputConfig
        text="Nome do Pet"
        type="text"
        name='name'
        handleOnChange={handleOnChange}
        multiple={undefined}
        placeholder="Digite o nome"
        value={pet.name || ''}
      />
       <InputConfig
        text="Idade do Pet"
        type="text"
        name='age'
        handleOnChange={handleOnChange}
        multiple={undefined}
        placeholder="Digite a idade"
        value={pet.age || ''}
      />
          <InputConfig
        text="Peso do Pet"
        type="number"
        name='weight'
        handleOnChange={handleOnChange}
        multiple={undefined}
        placeholder="Digite o peso"
        value={pet.weight || ''}
      />
      <Select onValueChange={handleColor}>
        <SelectTrigger >
          <SelectValue placeholder={pet.coat || "Pelagem"} />
        </SelectTrigger>
        <SelectContent>
          {coat.map((coat)=>
            <SelectItem key={coat} value={ coat}>{ coat}</SelectItem>
          )}
        </SelectContent>
      </Select>
      <input type="submit" value={btnText} className=" bg-zinc-500/20 rounded-md shadow-md  shadow-black w-full h-12 hover:bg-emerald-900 cursor-pointer"/>
    </form>
  )
}
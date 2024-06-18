import { ChangeEvent, useState } from "react"
import { InputConfig } from "./input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

interface AddPetFormProps{
  handleSubmit: () => void,
  petData: {
    name: string,
    weight: number,
    age: number,
    coat: string,
    images?: File,
    available: boolean
  },
  btnText: string
}

export function AddPetForm({handleSubmit, petData, btnText}: AddPetFormProps){
  const [pet, setPet] = useState(petData || {})
  const [preview, setPreview] = useState([])
  const coat = ["Branco", "Preto", "Castanho", "Caramelo", "Tigrado", "Cinza", "outro"]

  function onFileChange(e: ChangeEvent<HTMLInputElement>){

  }
  function handleOnChange(e: ChangeEvent<HTMLInputElement>){
  
  }

  return(
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center m-auto  w-96 bg-zinc-600/20 gap-5 rounded-lg shadow-2xl shadow-black p-4">
      <InputConfig
        text="Imagens do Pet"
        type="file"
        name='images'
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
      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select> */}
      <input type="submit" value={btnText} className=" bg-zinc-500/20 rounded-md shadow-md  shadow-black w-full h-12 hover:bg-emerald-900 cursor-pointer"/>
    </form>
  )
}
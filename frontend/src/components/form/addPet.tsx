import { ChangeEvent, useState } from "react"
import { InputConfig } from "./input"

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
    if (e.target.files && e.target.files) {
      setPreview(e.target.files)
      setPet({ ...pet, [e.target.name]: e.target.files[0] });
    }
  }
  function handleOnChange(e: ChangeEvent<HTMLInputElement>){
    setPet({...pet, [e.target.name]: e.target.value})
  }

  return(
    <form>
      <InputConfig
        text="Imagens do Pet"
        type="file"
        name='images'
        handleOnChange={onFileChange}
        multiple={true}
      />
       <InputConfig
        text="Imagens do Pet"
        type="file"
        name='images'
        handleOnChange={onFileChange}
        multiple={undefined}
      />
    </form>
  )
}
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from "@/components/ui/sonner"
import  {toast} from 'sonner'
import { AddPetForm } from '@/components/form/addPet'

export function AddPet() {
  return(
    <div>
      <div>
        <h1>Cadastre um novo Pet</h1>
        <p>Depois ele ficará disponivel para adoção!</p>
      </div>
      <AddPetForm/>
    </div>
  )
}
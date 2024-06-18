import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from "@/components/ui/sonner"
import  {toast} from 'sonner'
import { AddPetForm } from '@/components/form/addPet'
import { CirclePlus } from 'lucide-react'

export function AddPet() {
  return(
    <div>
      <div>
        <h1 className='text-3xl font-medium'>Cadastre um novo Pet</h1>
        <p className='text-emerald-500'>Depois ele ficará disponivel para adoção!</p>
      </div>
      <AddPetForm btnText='Cadastrar Pet'/>
    </div>
  )
}
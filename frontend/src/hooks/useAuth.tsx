// api
import { Iuser } from "@/interface/IUser"
import api from "../utils/api"
import {toast } from "sonner";
import { AxiosError } from "axios";

// import {useState, useEffect} from "react"
// import {useHistory} from "react-router-dom"



export default function useAuth(){
  async function register(user: Iuser){
    

    try {
      const data = await api.post('/users/register', user).then((response)=> {
        return response.data
      })
      toast.success('Cadastro realizado com sucesso!')
      console.log(data)
    } catch (error: AxiosError) {
      // tratar erro
      const messageError = error.response.data.message
      toast.error(`Algo deu errado: ${messageError}`)
    }
  }

  return {register}
}

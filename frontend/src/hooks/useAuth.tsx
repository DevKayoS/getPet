// api
import { Iuser } from "@/interface/IUser"
import api from "../utils/api"
import {useNavigate} from 'react-router-dom'
import {toast } from "sonner";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export default function useAuth(){
const [authenticated, setAuthenticated] = useState(false)
const history = useNavigate()

useEffect(()=> {
  const token = localStorage.getItem('token')

  if(token){
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
    setAuthenticated(true)
  }
}, [])

  async function register(user: Iuser){
    try {
      const data = await api.post('/users/register', user).then((response)=> {
        return response.data
      })
      await authUser(data)
      toast.success('Cadastro realizado com sucesso!')
    } catch (error: unknown) {
      // tratar erro
      if(error instanceof AxiosError){
        const messageError = error.response?.data?.message
        toast.error(`Algo deu errado: ${messageError}`)
      } else {
        toast.error('Erro desconhecido!')
      }
    }
  }
  async function authUser(data: { token: string; }){
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))

    history('/')
  }

  async function logout(){
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = null
    history('/')
    toast.success('Logout realizado com sucesso!')
  }
  return {authenticated, register, logout}
}

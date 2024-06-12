// api
import api from "../utils/api"

// import {useState, useEffect} from "react"
// import {useHistory} from "react-router-dom"
import {User} from '../../../api/interface/UserInterface'


export default function useAuth(){
  async function register(user: User){

    try {
      const data = await api.post('/users/register', user).then((response)=> {
        return response.data
      })
      console.log(data)
    } catch (error) {
      // tratar erro
      console.log(error)
    }
  }

  return {register}
}

import { Response } from "express"
import { User } from "../interface/UserInterface"

const jwt = require('jsonwebtoken')

// create a token
export const createUserToken = async(user: User, res: Response) => {
   const token = jwt.sign({
    name: user.name,
    id: user._id
   }, "nossosecret")
  //  return token
  res.status(200).json({
    message: "Você está autenticado",
    token: token,
    userId: user._id,
  })
}
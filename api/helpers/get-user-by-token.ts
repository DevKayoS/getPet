import { Response } from "express"

const jwt = require('jsonwebtoken')

const  User = require('../models/User')

// get user by jwt token

export const getUserbyToken = async(token: string, res: Response)=>{

  if(!token){
    return res.status(401).json({
      message: "Access denied"
    })
  }

  const decoded = jwt.verify(token, 'nossosecret')

  const userId = decoded.id

  const user = await User.findOne({_id: userId})

  return user
}
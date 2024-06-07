import {Request, Response, NextFunction} from "express"
import { getToken } from "./get-token"

const jwt = require('jsonwebtoken')

// middleware to validate token
export const checkToken=  (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization){
    res.status(401).json({
      message: 'Access denied!'
    })
    return
  }
  const token = getToken(req,res)

  if(!token){
    res.status(401).json({
      message: 'Access denied!'
    })
    return
  }
  try {
    const verified = jwt.verify(token, 'nossosecret')
    req.user = verified
    next()
  } catch (error) {
    return res.status(400).json({
      message: 'Token is invalid!'
    })
  }
}
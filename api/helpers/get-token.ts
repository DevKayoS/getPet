import {Request, Response} from "express"

export const getToken = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization 

  if(authHeader){
    const token = authHeader.split(' ')[1]
    return token
  } else {
    res.status(500).json({
      message: 'AuthHeader is undefined'
    })
  }
}
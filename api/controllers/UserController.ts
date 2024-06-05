import { Request, Response} from "express";

const User = require('../models/User')

export class UserController {
  static async register(req: Request, res: Response){
    const name =  req.body.name
    const email = req.body.email
    const password = req.body.password
    const image = req.body.image
    const phone =  req.body.phone
    

  }
}
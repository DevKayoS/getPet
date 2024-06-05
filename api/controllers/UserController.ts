import { Request, Response} from "express";

const User = require('../models/User')

export class UserController {
  static async register(req: Request, res: Response){
    const {name, email, phone, password, confirmPassword} = req.body

    // validations
    if(!name){
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    if(!email){
      res.status(422).json({message: 'O email é obrigatório'})
      return
    }
    if(!phone){
      res.status(422).json({message: 'O telefone é obrigatório'})
      return
    }
    if(!password){
      res.status(422).json({message: 'O senha é obrigatório'})
      return
    }
    if(!confirmPassword){
      res.status(422).json({message: 'A confirmação de senha é obrigatório'})
      return
    }
    if(password !== confirmPassword){
      res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais'})
      return
    }
    // check if user exists
    const userExists =  await User.findOne({email: email})

    if(userExists){
      res.status(422).json({message:'O usuário já existe!! Por favor usar outro email'})
      return
    }

  }
}
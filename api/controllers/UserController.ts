import { Request, Response} from "express";

import { createUserToken } from "../helpers/create-user-token";
import { getToken } from "../helpers/get-token";
import { getUserbyToken } from "../helpers/get-user-by-token";
import { imageUpload } from "../helpers/image-upload";

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

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
      res.status(422).json({
        message:'O usuário já existe!! Por favor usar outro email'
      })
      return
    }
    // create a password
     const salt = await bcrypt.genSalt(12)
     const passwordHash =  await bcrypt.hash(password, salt)

    // create a user
    const user = new User({
      name,
      email,
      password: passwordHash,
      phone
    })   
    try {
      const newUser = await user.save()

      await createUserToken(newUser,res)
  
    } catch (error) {
      res.status(500).json({message: error})
    }
  }
  
  static async login(req: Request, res: Response){
    const {email, password} =  req.body

    if(!email){
      res.status(422).json({
        message: 'O campo email é obrigatória'
      })
      return
    }
    if(!password){
       res.status(422).json({
        message: 'O campo senha é obrigatório'
       })
       return
    }

    const user = await User.findOne({email: email})

    if(!user){
      res.status(404).json({
        message: 'O usuário não foi encontrado'
      })
      return
    }

    // check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
      res.status(422).json({
        message: 'Senha inválida'
      })
      return
    }
    try {
      await createUserToken(user,res)
  
    } catch (error) {
      res.status(500).json({message: error})
    }
  }

  static async checkUser(req: Request, res: Response){
    let currentUser

    if(req.headers.authorization){
      const token = getToken(req,res)
      const decoded = jwt.verify(token, 'nossosecret')
     
      currentUser = await User.findById(decoded.id)

      currentUser.password = undefined

    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }
  static async getUserById(req: Request, res: Response){
    const id = req.params.id

    const user =  await User.findById(id).select('-password')

    if(!user){
      res.status(422).json({
        message: "User not found"
      })
      return
    }

    res.status(200).json({user})
  }
  static async editUser(req: Request, res: Response){
    const id = req.params.id
     // check if user existis
     const token = getToken(req,res)?? ''
     
     const user = await getUserbyToken(token,res)

     if(!user){
       res.status(422).json({
         message: "User not found"
       })
       return
     }
     console.log(user)

    const {name,email,phone,password, confirmPassword} = req.body
    
    let image = ''
    if(req.file){
     user.image = req.file.filename
    }

    // validations
    if(!name){
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    user.name = name
    if(!email){
      res.status(422).json({message: 'O email é obrigatório'})
      return
    }
    // check if email has already taken
    const userExists = await User.findOne({email: email})
    if(user.email != email && userExists ){
      res.status(422).json({
        message: 'This email has already take'
      })
      return
    }
    user.email = email

    if(!phone){
      res.status(422).json({message: 'O telefone é obrigatório'})
      return
    }
    user.phone = phone
    if(!password){
      res.status(422).json({
        message: 'A senha é obrigatória'
      })
      return
    }
    if(!confirmPassword){
      res.status(422).json({
        message: 'A confirmação de senha é obrigatória'
      })
      return
    }
    if(password !== confirmPassword){
      res.status(422).json({message: 'As senhas não conferem'})
      return
    } else if(password === confirmPassword && password !== null){
      // create password
      const salt =  await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash
    } 
    try {
      // return user updated data
     await User.findOneAndUpdate(
        {_id: user._id},
        {$set: user},
        {new: true} 
      )

      res.status(200).json({
        message: 'Usuário atualizado com sucesso!'
      })
    } catch (error) {
      res.status(500).json({message: error})
      return
    }
  }
}
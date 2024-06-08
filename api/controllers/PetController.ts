import {Request, Response } from 'express'
import { getToken } from '../helpers/get-token'
import { getUserbyToken } from '../helpers/get-user-by-token'
const Pet = require('../models/Pet')



export class PetController {

  static async create(req: Request, res:Response){
    
    const {name, age, weight, coat} = req.body

    const available =  true

    // images upload

    const images = req.files as Express.Multer.File[];
  
    // validations
    if(!name){
      res.status(422).json({
        message: 'o campo nome é obrigatório'
      })  
      return
    }
    if(!age){
      res.status(422).json({
        message: 'o campo idade é obrigatório'
      })  
      return
    }
    if(!weight){
      res.status(422).json({
        message: 'o campo peso é obrigatório'
      })  
      return
    }
    if(!coat){
      res.status(422).json({
        message: 'o campo raça é obrigatório'
      }) 
      return
    }
  
    if (!images || images.length === 0) {
      res.status(422).json({
        message: 'O campo imagem é obrigatório',
      });
      return;
    }
    // get pet owner
    const token = await getToken(req, res)?? ''
   
    const user = await getUserbyToken(token, res)

    // create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      coat,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone
      }
    })

      images.map((image) => {
        pet.images.push(image.filename);
      });
   
    
    try {
      const newPet = await pet.save() 
      res.status(201).json({
        message: 'Pet cadastrado com sucesso!',
        newPet
      }
    )
    } catch (error) {
      res.status(500).json({
        message: error
      })
    }
   
  }

}

import {Request, Response } from 'express'
import { getToken } from '../helpers/get-token'
import { getUserbyToken } from '../helpers/get-user-by-token'

const Pet = require('../models/Pet')
const objectId = require('mongoose').Types.ObjectId


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
  static async getAll(req: Request, res: Response){
    const pets = await Pet.find().sort('-createdAt')

    res.status(200).json({
      message: 'Pets pego com sucesso',
      pets
    })
  }
  static async getAllUserPets(req: Request, res: Response){

    const token = await getToken(req,res)?? ''
    const user = await getUserbyToken(token, res)


    const pets =  await Pet.find({'user._id': user._id}).sort("-createdAt")


   
    res.status(200).json({
      pets
    })
   
  }

  static async getAllUsersAdoption(req: Request, res: Response){
    const token  = getToken(req,res)?? ''
    const user =  await getUserbyToken(token, res)

    const adoptPets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

    res.status(200).json({
      adoptPets
    })

  }
  static async getPetById(req: Request, res: Response){
    const id = req.params.id

    if(!objectId.isValid(id)){
      res.status(422).json({
        message: 'ID is invalid'
      })
      return
    }
    // check if pet exists
    const pet = await Pet.findOne({_id: id})

    if(!pet){
      res.status(404).json({
        message: 'This Pet not exists!'
      })
      return
    }

    res.status(200).json({
      pet
    })
  }
}

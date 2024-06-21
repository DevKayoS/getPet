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
        message: 'o campo pelagem é obrigatório'
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
        message: 'invalid id'
      })
      return
    }
    // check if pet exists
    const pet = await Pet.findOne({_id: id})

    if(!pet){
      res.status(404).json({
        message: 'pet not found'
      })
      return
    }

    res.status(200).json({
      pet
    })
  }
  static async deletePet(req: Request, res: Response){
    // check if id is valid
   const id =  req.params.id
    if(!objectId.isValid(id)){
      res.status(422).json({
        message: 'invalid id'
      })
      return
    }
    // check if pet exist
    const pet = await Pet.findOne({_id: id})
    // check if logged in user registered the pet 
    const token = getToken(req,res)?? ""
    const user = await getUserbyToken(token, res)

    if(pet.user._id.toString() !== user._id.toString()){
      res.status(422).json({
        message: 'logged user dont have permission for this action'
      })
      return
    }

    await Pet.findByIdAndDelete(id)

    res.status(200).json({
      message: 'Pet deleted with successfully'
    })
  }
  static async upadatePet(req: Request, res: Response){
    // check if pet exists
    const id = req.params.id
    if(!objectId.isValid(id)){
      res.status(422).json({
        message: 'invalid id'
      })
      return
    }
    const pet = await Pet.findOne({_id: id})
    if(!pet){
      res.status(404).json({
        message: 'pet not found'
      })
      return
    }
    // check if user logged registerd a pet
    const token = getToken(req,res)?? ""
    const user = await getUserbyToken(token, res)

    if(pet.user._id.toString() != user._id.toString()){
      res.status(422).json({
        message: 'logged user dont have permission for this action'
      })
      return
    }
    

    const {name, age, weight, coat, available} = req.body

    const images = req.files as Express.Multer.File[];

    const updatedData = {
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      coat: pet.coat,
      images: pet.images
    }
    // validations
   
    // validations
    if(!name){
      res.status(422).json({
        message: 'o campo nome é obrigatório'
      })  
      return
    } else {
      updatedData.name = name
    }
    if(!age){
      res.status(422).json({
        message: 'o campo idade é obrigatório'
      })  
      return
    } else {
      updatedData.age = age
    }
    if(!weight){
      res.status(422).json({
        message: 'o campo peso é obrigatório'
      })  
      return
    } else {
      updatedData.weight = weight
    }
    if(!coat){
      res.status(422).json({
        message: 'o campo pelagem é obrigatório'
      }) 
      return
    } else {
      updatedData.coat = coat
    }
  
  if(images.length > 0){
    updatedData.images = []
    images.map((image)=>{
      updatedData.images.push(image.filename)
    })
  }

    await Pet.findByIdAndUpdate(id, updatedData)

    res.status(200).json({
      message: 'Pet was updated with successfully!',
    })
  }
  static async schedule(req: Request, res: Response){
    const id = req.params.id

    if(!objectId.isValid(id)){
      res.status(422).json({
        message: 'invalid id'
      })
      return
    }

    // check if pet exists
    const pet = await Pet.findOne({_id: id})
    if(!pet){
      res.status(404).json({
        message: 'pet not found'
      })
      return
    }

    // check if pet isnt the logged user
    const token = getToken(req,res)?? ''
    const user =  await getUserbyToken(token,res)

    if(pet.user._id.equals(user._id)){
      res.status(422).json({
        message: 'Você não pode agendar visita para o seu próprio pet'
      })
      return
    } 

    // check if the logged user already scheduled visit
    if(pet.adopter){
      if(pet.adopter._id.equals(user._id)){
        res.status(422).json({message: 'Você já marcou uma visita!'})
        return
      }
    }

    // add adopter to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image
    }

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({
      message: `appointment has already been scheduled, please contact ${pet.user.name} at phone ${pet.user.phone}`
    })
  }
  static async concludeAdoption(req: Request, res: Response){
    const id = req.params.id

    if(!objectId.isValid(id)){
      res.status(422).json({
        message: 'invalid id'
      })
      return
    }
    // check if pet exist 
    const pet = await Pet.findOne({_id: id})
    if(!pet){
      res.status(404).json({
        message: 'pet not found'
      })
      return
    }
    // check if logged user has registered
    const token =  getToken(req,res)?? ''
    const user =  await getUserbyToken(token, res)

    if(!pet.user._id.equals(user._id)){
      res.status(422).json({
        message: 'you dont have permission for this action'
      })
      return
    }

    pet.available = false

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({
      message: 'Congratulations, pet has been successfully adopted.'
    })
  }
}

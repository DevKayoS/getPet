import {Request, Response } from 'express'
const Pet = require('../models/Pet')

export class PetController {

  static async create(req: Request, res:Response){
    res.json({
      message: 'Deu bom'
    })
  }

}

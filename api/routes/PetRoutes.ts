const router =  require('express').Router()
import { PetController } from "../controllers/PetController"

// middleware
import { checkToken } from '../helpers/verify-token'

router.post('/create', checkToken, PetController.create)

module.exports =  router
const router =  require('express').Router()
import { PetController } from "../controllers/PetController"

router.post('/create', PetController.create)

module.exports =  router
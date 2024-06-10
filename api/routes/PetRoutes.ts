const router =  require('express').Router()
import { PetController } from "../controllers/PetController"

// middleware
import { checkToken } from '../helpers/verify-token'
const {imageUpload} = require("../helpers/image-upload")

router.post('/create', checkToken, imageUpload.array('images'), PetController.create)
router.get('/', PetController.getAll)
router.get('/mypets', checkToken, PetController.getAllUserPets)
router.get('/myadoptions', checkToken, PetController.getAllUsersAdoption)
router.get('/:id', PetController.getPetById)

module.exports =  router
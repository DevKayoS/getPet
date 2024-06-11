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
router.delete('/remove/:id', checkToken, PetController.deletePet)
router.patch('/:id', checkToken, imageUpload.array('images'), PetController.upadatePet)
router.patch('/schedule/:id', checkToken, PetController.schedule)
router.patch('/conclude/:id', checkToken, PetController.concludeAdoption)

module.exports =  router
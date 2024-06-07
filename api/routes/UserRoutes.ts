const router = require('express').Router()
import {UserController} from '../controllers/UserController'
// middleware
import { checkToken } from '../helpers/verify-token'
const {imageUpload} = require("../helpers/image-upload")


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkUser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', checkToken, imageUpload.single("image"), UserController.editUser)


module.exports =  router
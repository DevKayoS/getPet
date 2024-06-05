const router = require('express').Router()
import {UserController} from '../controllers/UserController'


router.post('/register', UserController.register)


module.exports =  router
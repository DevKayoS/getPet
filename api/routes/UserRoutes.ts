const router = require('express').Router()
import {UserController} from '../controllers/UserController'


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkUser', UserController.checkUser)
router.get('/:id', UserController.getUserById)


module.exports =  router
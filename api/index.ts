const express = require('express')
const cors = require('cors')

const app = express()

// config JSON response
app.use(express.json())

// Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))

// Public folder for images
app.use(express.static('public'))

// routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes =  require('./routes/PetRoutes')

app.use('/pets', PetRoutes)
app.use('/users', UserRoutes)



app.listen(5000)
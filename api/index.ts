import multer from "multer"

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

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Erro gerado pelo multer
    return res.status(422).json({
      message: 'Erro no upload do arquivo',
      error: err.message
    });
  } else if (err) {
    // Outros erros
    return res.status(500).json({
      message: 'Por favor, envie apenas arquivos JPG,PNG ou JPEG!',
      error: err.message
    });
  }
  next();
});



app.listen(5000)
import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Configuração do armazenamento das imagens
const imageStorage = multer.diskStorage({
  destination: function(req: Request, file: Express.Multer.File, cb: CallableFunction) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    // Corrige o caminho absoluto para o destino das imagens
    const absolutePath = path.join(__dirname, `../public/images/${folder}`);
    cb(null, absolutePath);
  },
  filename: function(req: Request, file: Express.Multer.File, cb: CallableFunction) {
    cb(null, Date.now() + String(Math.floor(Math.random()*100)) + path.extname(file.originalname));
  }
});

// Configuração do middleware multer para upload de imagens
const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req: Request, file: Express.Multer.File, cb: CallableFunction) {
    // Verifica se o arquivo tem uma extensão válida
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas arquivos JPG ou PNG!"));
    }
    cb(null, true);
  }
});

export { imageUpload };
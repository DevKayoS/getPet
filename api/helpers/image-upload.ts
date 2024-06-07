import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback,  } from 'multer';
import path from 'path';


// Declare um módulo para estender o tipo Request
declare module 'express-serve-static-core' {
  interface Request {
    baseUrl: string;
  }
}

declare module 'multer' {
  interface File {
    originalname: string;
  }
}


//Destination to store the images
const imageStorage = multer.diskStorage({
  destination: function(req: Request, file: Express.Multer.File, cb: CallableFunction){
    let folder = ""
    
    if(req.baseUrl.includes("users")){
      folder = "users"
    } else if(req.baseUrl.includes(" pets")){
      folder = "pet"
    }

    cb(null,`public/images/${folder}`)
  },
  filename: function(req: Request, file: Express.Multer.File, cb: CallableFunction){
    
    cb(null, Date.now() + path.extname(file.originalname) )
  }
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req: Request, file: Express.Multer.File, cb: CallableFunction){
    if(!file.originalname.match(/\.(png|jpeg)$/)){
      return cb(new Error("Por favor, envie apenas jpg ou png!"))
    }
    cb(null, true)
  }
})

module.exports = {imageUpload}
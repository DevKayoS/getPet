// types/express.d.ts ou custom.d.ts
import * as express from 'express';
import { User } from './interface/UserInterface';


declare global {
  namespace Express {
    interface Request {
      user?: User; // Você pode definir um tipo específico em vez de 'any'
    }
  }
}

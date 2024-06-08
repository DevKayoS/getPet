import { ObjectId } from "mongoose";

export interface User {
  _id: ObjectId
  name: string;
  email: string;
  password: string,
  image?: string,
  phone: string,
  createAt: Date,
  updateAt: Date
}
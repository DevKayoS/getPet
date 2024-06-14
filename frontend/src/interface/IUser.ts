export interface Iuser {
  _id: string,
  name: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
  image?: File | null;
}
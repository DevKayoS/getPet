export interface IPet {
  name: string,
  age: string,
  weight: string,
  coat: string,
  images?: File[],
  available?: boolean,
  [key: string]: any 
}
export interface IPet {
  name: string,
  age: string,
  weight: string,
  coat: string,
  images?: File[],
  available?: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any 
}
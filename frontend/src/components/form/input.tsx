import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input"

interface InputProps {
  type: string,
  text: string,
  name: string,
  placeholder?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  multiple: any

}


export function InputConfig({type, text, name, placeholder, handleOnChange, value, multiple}: InputProps){
  return(
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor={name}>{text}</label>
      <Input
      type={type} 
      name={name} 
      id={name} 
      placeholder={placeholder} 
      onChange={handleOnChange} 
      value={value}
      {...(multiple ?  {multiple} : '')}
      />
    </div>
  )
}
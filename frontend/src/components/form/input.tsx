interface InputProps {
  type: any,
  text: string,
  name: string,
  placeholder: string,
  handleOnChange: (handleOnChange: any) => void,
  value: string,
  multiple: any

}


export function Input({type, text, name, placeholder, handleOnChange, value, multiple}: InputProps){
  return(
    <div className="flex flex-col w-full gap-1 mb-2">
      <label htmlFor={name}>{text}</label>
      <input 
      type={type} 
      name={name} 
      id={name} 
      placeholder={placeholder} 
      onChange={handleOnChange} 
      value={value}
      {...(multiple ?  {multiple} : '')}
      className="p-2 rounded-md"
      />
    </div>
  )
}
import { Input } from "@/components/form/input";
import { Link } from "react-router-dom";

export function Register(){
  function handleChange(){
    
  }
  return(
    <div className="p-10">
      <form action="" className="flex flex-col items-center justify-center m-auto  w-96 bg-zinc-950/60 gap-5 rounded-lg shadow-xl shadow-black p-4">
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange} 
          value={""} 
          multiple={undefined}       
           />
        <Input
          text="E-mail"
          type="text"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange} 
          value={""} 
          multiple={undefined}       
           />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange} 
          value={""} 
          multiple={undefined}       
           />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange} 
          value={""} 
          multiple={undefined}       
           />
        <Input
          text="Confirme a sua senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange} 
          value={""} 
          multiple={undefined}       
           />
          <input type="submit" value="Cadastrar" className="bg-zinc-500/20 rounded-md shadow-md  shadow-black w-full h-8 hover:bg-sky-900 cursor-pointer"/>
      </form>
      <div className="flex items-center mt-5">
        <p className="m-auto">Já tem conta? <Link to={"/login"} className="font-bold text-sky-400 hover:text-sky-700">Clique aqui</Link></p>
      </div>
    </div>
  )
}
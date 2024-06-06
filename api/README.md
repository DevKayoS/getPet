# API do get a Pet
A API esta sendo feita na arquitetura MVC, sendo utilizado o mongoose como ODM para a aplicação e sendo usado o Typescript para fazer a tipagem da aplicação.

## Controllers
No método de  REGISTRAR usuário está sendo feito a seguinte lógica:
  * Primeiro: é pego os dados da requisição
  * Segundo: é feito uma validação dos dados que veio na requisição verificando se não veio em branco
  * Terceiro: é feito uma validação da senha para verificar se a senha e a confirmação de senha são a mesma
  * Quarto: com todos os dados ja validado, é criado uma senha encriptada
  * Quinto: com todos os dados ja validado e senha encriptado é pego o model de User e é usado o método "save()" para salvar no mongoDB o novo usuário


# Get a Pet
Um website para adoções de pet, na qual facilita a vida da pessoa que quer adotar um pet, quanto a pessoa que esta anunciando o pet, contando com uma interface moderna e intuitiva para os usuários, desde se registrar no site até finalizar a adoção o site faz toda ligação entre os dois.

![image](https://github.com/DevKayoS/getPet/assets/157029608/41ab8d43-c9b2-47ca-a603-371bbf8475e5)

## Introdução
Esse foi um projeto fullstack, realizado com base no projeto do curso de node do instrutor Matheus Battisti, fiz algumas mudanças como a adaptação do projeto para typescript tanto na API quanto no front-end.

### Registro e login de usuário
Para que seja possível algum usuário cadastrar algum pet para adoção ou solicitar uma visita para conhecer algum pet é necessário que ele esteja logado, com isso caso o usuário não tenha alguma conta ainda terá que se cadastrar.

![image](https://github.com/DevKayoS/getPet/assets/157029608/6e328824-11b9-447a-bcb8-123a6b924bbe)
(página de cadastro)

Ao se cadastrar o usuário já é logado na seção o que é gerado um token JWT, que fica salvo no local storage da aplicação, que será necessária, pois para fazer certas ações o usuário precisa estar autenticado, essa autentificação acontece toda na API, já que toda vez que algum usuário é logado ou cadastrado a API gera um token, que no front-end conseguimos pegar esse token e salvar no local storage.

![image](https://github.com/DevKayoS/getPet/assets/157029608/6ef53d34-55b9-4aa6-b0ca-46db764bbd6d)
(página de login)

### Atualizando dados do usuário
Como num bom e velho crud, existe como atualizarmos os dados do usuário e adicionar uma imagem de perfil para ele, assim como está na imagem abaixo:

![image](https://github.com/DevKayoS/getPet/assets/157029608/5b81bcde-7675-4b4c-9117-4fdc8a7fce90)


O tratamento da imagem acontece por meio do multer que foi configurado na API.


### Cadastro de novo Pet
Agora que o usuário esta cadastrado ele pode cadastrar novos pets para ficar disponivel para adoção, ele pode acessar a área de cadastro de novo pet clicando em meus pets como esta na imagem abaixo.
![image](https://github.com/DevKayoS/getPet/assets/157029608/abb68477-5a26-4f72-98e2-cfa47315587c)
Indo em cadastrar pet irá ser redirecionado para a seguinte página: 
![image](https://github.com/DevKayoS/getPet/assets/157029608/acb88f28-0f91-4e17-9e1f-6aafd051f1c0)

E logo após ter cadastrado um novo pet ele ficará exebido para possiveis edições ou caso queira apagar o pet caso tenha dado algum erro
![image](https://github.com/DevKayoS/getPet/assets/157029608/05ed78bc-574b-4985-9c07-f3e791b06685)

## Solicitando a visita e concluindo adoção
Todos os usuários tem acesso a home que mostra todos os pets, porém precisa estar logado para solicitar uma visita na qual ficará disponivel os dados de quem cadastrou o pet na seção de minhas adoções. Veja um exemplo abaixo apos clicarmos em ver mais detalhes em um pet.

![image](https://github.com/DevKayoS/getPet/assets/157029608/739cafd2-7c64-49a4-82d3-abea84981113)

Então somos obrigados a logar, pois é necessária essa autentificação para fazer esse agendamento e que foi tratado tanto na API com middlewares para identificar se o usuário tem algum token quanto no frontend pegando o token no localstorage.

Agora que estamos logado podemos solicitar a visita para conhecer melhor o pet o usuário que cadastrou o pet conhecerá quem esta solicitando.
![image](https://github.com/DevKayoS/getPet/assets/157029608/6115ffaa-bbb4-4dad-a5e0-f8f1d6ee48a9)

Indo em meus pets e depois clicando minhas adoções será exibido todos os pets que o usuário solicitou a visita
![image](https://github.com/DevKayoS/getPet/assets/157029608/088d751c-a4fd-4dd5-b30b-fbcab4545a67)

Agora o que irá acontecer não precisa mais ser no site e tem que ser entre o quem colocou o pet para adoção e quem quer adotar.

Após isso para finalizar o ciclo quem cadastrou pet tem que ir na seção de pets e permitir e clicar em concluir adoção para que caso outros usuários tenham interesse seja mostrado que o pet ja foi adotado da seguinte forma:

Seção de meus pets do responsavel pela adoção:
![image](https://github.com/DevKayoS/getPet/assets/157029608/b6009090-bb16-486c-8204-a4fff41ebc01)

Ao concluir adoção irá ser exibido para todos que o pet foi adotado

Dashboard do responsavel pela adoção:
![image](https://github.com/DevKayoS/getPet/assets/157029608/5bda7bd1-cd03-4594-b617-0b0ba730e7c7)

Página principal de adoção de pets:
![image](https://github.com/DevKayoS/getPet/assets/157029608/5901824f-673f-40e1-9531-6d783506ebcd)

E agora em minhas adoções de quem solicitou a visita:
![image](https://github.com/DevKayoS/getPet/assets/157029608/0f658445-0a80-4fec-aab4-d922f19724e5)

E com isso concluimos todos os passos de adoção!

# Tecnologias:

## API
  * Foi utilizado a arquitetura MVC para uma maior organização;
  * Node;
  * Typescript;
  * Express;
  * MongoDB;
  * Mongoose;
  * Bcrypt, Biblioteca para fazer a criptografia das senhas;
  * JWT, para geração do Token de autentificação;

## Front-end
  * Vite;
  * React;
  * Typescript;
  * TailwindCss;
  * Shadcn ui;

## Como rodar:
Para rodar a aplicação precisa de um requisito minimo ter instalado mongoDB na sua máquina:

```sh
git clone [https://github.com/usuario/repositorio.git](https://github.com/DevKayoS/getPet.git)
```
Instalando dependencias
```sh
npm install
```
Entrando na pasta api e rodando a api
```sh
  cd ./api
  npm start
```
Entrando na pasta do front end e rodando
```sh
  cd ../frontend
  npm run dev
```












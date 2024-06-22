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

![image](https://github.com/DevKayoS/getPet/assets/157029608/e9452163-0208-4ff3-969f-2d6061381414)

O tratamento da imagem acontece por meio do multer que foi configurado na API.


### Cadastro de novo Pet





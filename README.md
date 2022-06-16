# Cadastro de carro

**RF** 

Deve ser possível cadastrar um novo carro.

**RN**

* Não deve ser possível cadastrar um carro com uma placa já existente.
* O carro deve ser cadastrado por padrão com disponibilidade.
* O usuario responsável pelo cadastro deve ser um usuário administrador. *

# Listagem de carros

**RF**

Deve ser possível listar os carros disponíveis.
Dever ser possível listar todos os carros disponíveis pelo nome da categoria
Dever ser possível listar todos os carros disponíveis pelo nome da marca
Dever ser possível listar todos os carros disponíveis pelo nome do carro

**RN**
* O usuário não precisar está logado no sistema.

# Cadastro de Especificação no carro

**RF**

Deve ser possível cadastrar uma especficação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**

* Não deve ser possível cadastrar uma especificação para um carro inexistente.
* Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
* O usuario responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**

Deve ser possível cadastrar a imagem do caro
Deve ser possível listar todos os carros

**RNF**

Utilizar o multer para upload dos arquivos

**RN**

* O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
* O usuario responsável pelo cadastro deve ser um usuário administrador.

# Aluguel

**RF**

Deve ser possível cadastrar um aluguel

**RN**

* O alugel deve ter duração minima de 24 horas.
* Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo usuário
* Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo carro
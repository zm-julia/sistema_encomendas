# Sistema de Gestão e Rastreamento de Encomendas - Logística Express

## Requisitos Funcionais (RF)

| Código | Descrição |
|---|---|
| RF01 | O sistema deve permitir cadastrar funcionário (nome, e-mail e senha criptografada). |
| RF02 | O sistema deve autenticar o funcionário por e-mail e senha. |
| RF03 | O sistema deve permitir logout do funcionário. |
| RF04 | A página principal deve exibir o funcionário logado, o menu de navegação e o logout. |
| RF05 | O sistema deve permitir cadastrar motorista (nome, CNH, CPF e telefone). |
| RF06 | O sistema deve listar os motoristas em tabela. |
| RF07 | O sistema deve consultar motorista por código. |
| RF08 | O sistema deve buscar motorista por nome. |
| RF09 | O sistema deve permitir atualizar os dados do motorista. |
| RF10 | O sistema deve permitir apagar motorista. |
| RF11 | O sistema deve cadastrar carga vinculada a um motorista (descrição, peso, volume e código de rastreio). |
| RF12 | O sistema deve cadastrar entrega vinculada a uma carga (cidade, destino, status, data e hora). |
| RF13 | O sistema deve permitir atualizar a entrega, incluindo o status ENTREGUE ou TRANSITO. |
| RF14 | O sistema deve listar as entregas em tabela com filtro de ordenação por data. |

## Requisitos Não Funcionais (RNF)

| Código | Descrição |
|---|---|
| RNF01 | A senha do funcionário, a CNH e o CPF do motorista devem ser armazenados criptografados (AES). |
| RNF02 | A sessão deve expirar em 180 minutos após o login. |
| RNF03 | O acesso ao sistema deve ser restrito à rede interna e a funcionários autenticados. |
| RNF04 | A comunicação entre frontend e backend deve ser feita por API REST com dados em JSON. |
| RNF05 | As rotas, exceto cadastro de funcionário e login, devem ser protegidas por token no cabeçalho Authorization. |
| RNF06 | O frontend deve funcionar nos navegadores modernos (Google Chrome). |
| RNF07 | O sistema deve usar banco de dados relacional com integridade referencial por chaves estrangeiras. |

## Regras de Negócio (RN)

| Código | Descrição |
|---|---|
| RN01 | Somente funcionários cadastrados e autenticados podem acessar os módulos do sistema. |
| RN02 | Após 180 minutos de uso, o token expira e o funcionário deve fazer login novamente. |
| RN03 | CNH e CPF são gravados criptografados, mas nunca podem ser exibidos criptografados nas consultas e listagens. |
| RN04 | Toda carga deve estar associada a um motorista existente. |
| RN05 | O código de rastreio da carga deve ser numérico. |
| RN06 | Toda entrega deve estar associada a uma carga existente. |
| RN07 | O status da entrega deve ser ENTREGUE ou TRANSITO. |
| RN08 | Ao apagar um motorista, suas cargas e as entregas dessas cargas também são apagadas. |
| RN09 | A listagem de entregas deve poder ser ordenada por data (crescente ou decrescente). |

## Requisitos de Infraestrutura

| Item | Especificação |
|---|---|
| Banco de dados | MySQL 8.0 (db_logistica) |
| Linguagem de programação | JavaScript com Node.js 22 (LTS) |
| Bibliotecas do backend | Express 5.3.0, Sequelize 6.37.8, mysql2 3.24.6, crypto-js 4.2.0, cors 2.8.6 |
| Servidor backend (web local) | Express em http://localhost:3000 |
| Servidor frontend | Live Server (VS Code) servindo HTML, CSS e JavaScript |
| Ferramenta de teste | REST Client (VS Code) com o arquivo backend/teste.http |
| Navegador | Google Chrome |

# 🚀 Plataforma de Eventos

Aplicação **FrontEnd** desenvolvida em **ReactJS** para gerenciamento de **eventos**, permitindo cadastro, listagem e controle de eventos, participantes e ingressos, com **integração a uma API REST**, conforme proposta de projeto acadêmico.

---

## 🌐 Deploy da Aplicação

- 🔗 **FrontEnd (produção):**  
  https://plataforma-eventos-bay.vercel.app

- 🔗 **BackEnd (API REST):**  
  https://github.com/Emersontlsd/backend-eventos.git

---

## 📦 Repositórios do Projeto

- 🔗 **FrontEnd (ReactJS):**  
  https://github.com/Emersontlsd/Plataforma-Eventos.git / https://github.com/rosejauna/Plataforma--Eventos

- 🔗 **BackEnd (Node.js + Express + MongoDB):**  
  https://github.com/Emersontlsd/backend-eventos.git

---

## 🧭 Visão Geral do Projeto

- **Domínio:** Gerenciamento de Eventos  
- **Objetivo:** Desenvolver uma plataforma FrontEnd para **criação, listagem e gerenciamento de eventos**, com autenticação de usuários e consumo de API REST.  
- **Persistência:** Realizada por meio de integração com Backend.  

---

## 🧰 Tecnologias Utilizadas

### FrontEnd
- ReactJS  
- JavaScript (ES6+)  
- Vite  
- CSS  
- Fetch API / Axios  

### BackEnd (Integração)
- Node.js  
- Express  
- MongoDB (Mongoose)  
- API REST  
- Autenticação JWT  

---

# 🎯 Funcionalidades Atendidas

O projeto contempla as seguintes funcionalidades:

- ✅ Cadastro de eventos  
- ✅ Listagem de eventos  
- ✅ Cadastro de participantes  
- ✅ Listagem de participantes  
- ✅ Cadastro de ingressos  
- ✅ Listagem de ingressos  
- ✅ Autenticação de usuários  
- ✅ Upload de imagens  
- ✅ Integração FrontEnd ↔ BackEnd via API REST  

---

## 📋 Requisitos Funcionais (RF)

### Usuários
- RF01 — Cadastrar usuário  
- RF02 — Autenticar usuário  

### Eventos
- RF03 — Cadastrar evento  
- RF04 — Listar eventos  

### Participantes
- RF05 — Cadastrar participante  
- RF06 — Listar participantes  

### Ingressos
- RF07 — Cadastrar ingresso  
- RF08 — Listar ingressos  

---

## ⚙️ Requisitos Não Funcionais (RNF)

- RNF01 — Aplicação desenvolvida em ReactJS  
- RNF02 — Comunicação com Backend via API REST  
- RNF03 — Interface organizada e responsiva  
- RNF04 — Validação de formulários  
- RNF05 — Autenticação baseada em JWT  
- RNF06 — Código organizado por componentes e responsabilidades  

---

## 🖼️ Telas da Aplicação

*(Adicionar capturas de tela reais da aplicação)*

### Tela 1 — Login
<img width="653" height="700" alt="image" src="https://github.com/user-attachments/assets/19912973-a653-44b9-86aa-3aff4c75f070" />

### Tela 2 - Menu de Navegação 

<img width="217" height="635" alt="image" src="https://github.com/user-attachments/assets/660eb0ac-ff8d-4506-ad1e-39e3392cda0c" />

### Tela 3 — Painel
<img width="1905" height="856" alt="image" src="https://github.com/user-attachments/assets/bb9617c4-0771-4d12-9e1d-33b30cd27407" />
<img width="1612" height="549" alt="image" src="https://github.com/user-attachments/assets/fe24284c-700c-4cdb-8fe2-cc30f6a8cf3a" />

### Tela 4 — Eventos
<img width="1904" height="801" alt="image" src="https://github.com/user-attachments/assets/23f59a44-f70f-42b8-8a08-28aff09c79da" />

### Tela 5 — Cadastro de Evento
<img width="201" height="123" alt="image" src="https://github.com/user-attachments/assets/5b3be083-9987-4dd6-b038-695136d2ba77" />
<img width="653" height="574" alt="image" src="https://github.com/user-attachments/assets/714da8f4-cfec-41df-8589-20ab6ed22650" />

### Tela 6 — Participantes
<img width="1906" height="701" alt="image" src="https://github.com/user-attachments/assets/bc5be3f4-0b9c-4408-b7cb-a6ae53655616" />

### Tela 6 — Cadastro de Participantes
<img width="384" height="183" alt="image" src="https://github.com/user-attachments/assets/c16882ad-0aeb-438f-a78c-9218aff76985" />
<img width="751" height="663" alt="image" src="https://github.com/user-attachments/assets/3837bd42-cd21-447c-a2a9-f5b2365e5659" />

### Tela 7 — Ingressos
<img width="1902" height="753" alt="image" src="https://github.com/user-attachments/assets/9d7c7c9e-92af-4c26-8288-782b5a08a6f9" />

### Tela 6 — Cadastro de Ingressos 
<img width="294" height="177" alt="image" src="https://github.com/user-attachments/assets/b2f55bc3-cff7-45ba-a4d9-d1ea97a4b5e9" />
<img width="739" height="542" alt="image" src="https://github.com/user-attachments/assets/e7017d1a-f548-4c34-8c1a-c9b2f74bf04e" />


### Tela — Relatórios
<img width="1913" height="694" alt="image" src="https://github.com/user-attachments/assets/f9d7f026-5f55-4496-b7ec-b7b773964c91" />



---

## 🧠 Modelagem dos Dados

### Evento
- id  
- nome  
- data  
- descrição  

### Participante
- id  
- nome  
- email  
- imagem  

### Ingresso
- id  
- tipo  
- valor  

### Usuário
- id  
- nome  
- email  

---

## 🔗 Integração com Backend

A aplicação FrontEnd consome uma **API REST** desenvolvida em **Node.js com Express**, com persistência de dados em **MongoDB** e autenticação via **JSON Web Tokens (JWT)**.

### Endpoints Utilizados

#### Autenticação
- **POST** `/auth/login` — Login de usuário  
- **POST** `/auth/register` — Cadastro de usuário  

#### Eventos
- **GET** `/eventos` — Listar eventos  
- **POST** `/eventos` — Criar evento  

#### Participantes
- **GET** `/participantes` — Listar participantes  
- **POST** `/participantes` — Criar participante  

#### Ingressos
- **GET** `/ingressos` — Listar ingressos  
- **POST** `/ingressos` — Criar ingresso  

#### Upload de Imagens
- **POST** `/participantes/imagem`  
- **POST** `/usuarios/imagem`  

---

## 📂 Estrutura do Projeto FrontEnd

```bash
src/
├── api/
├── auth/
├── components/
├── dao/
├── layou/
├── pages/
├── routes/
├── App.css
├── App.jsx
├── index.css
└── main.jsx

```

---

## ▶️ Execução Local

npm install
npm run dev

---

## 👥 Autoria

Autora: Emerson Souza e Jessika Cintra

Projeto: Plataforma de Eventos

Área: Desenvolvimento FrontEnd

---

## 📌 Considerações Finais

Este projeto demonstra:

domínio dos conceitos de CRUD;

integração FrontEnd ↔ BackEnd via API REST;

autenticação segura com JWT;

organização de código em ReactJS;

aplicação publicada em ambiente de produção.







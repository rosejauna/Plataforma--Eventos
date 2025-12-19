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

### Tela — Login
![Login](./screenshots/login.png)

### Tela — Eventos
![Eventos](./screenshots/eventos.png)

### Tela — Cadastro de Evento
![Cadastro Evento](./screenshots/cadastro-evento.png)

### Tela — Participantes
![Participantes](./screenshots/participantes.png)

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


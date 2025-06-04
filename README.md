
<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<h1 align="center">White Label Scheduler</h1>

<p align="center">
  Plataforma moderna e escalável para agendamentos multi-locais, construída com <a href="https://nestjs.com/" target="_blank">NestJS</a>, <a href="https://www.prisma.io/" target="_blank">Prisma</a> e TypeScript.
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="#"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License" /></a>
  <a href="#"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="#"><img src="https://img.shields.io/github/stars/EmmanuelStocco/Agendoou-backend ?style=social" alt="GitHub stars" /></a>
</p>

---

## 🚀 Descrição

Este é o backend de um projeto white-label de agendamento de locais, ideal para empreendedores que necessitam de uma plataforma de agendamento. Cada usuário pode criar seus próprios agendamentos como se fosse uma rede social.

## 🧱 Tecnologias Principais

- **[NestJS](https://nestjs.com/)** — Framework robusto Node.js para aplicações server-side
- **[Prisma](https://www.prisma.io/)** — ORM moderno e eficiente
- **TypeScript** — Tipagem estática para maior segurança
- **PostgreSQL** — Banco de dados relacional 

## 🛠️ Instalação

```bash
git clone https://github.com/EmmanuelStocco/Agendoou-backend.git
cd Agendoou-backend
npm install
```

## ▶️ Rodando o Projeto

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura
npm run test:cov
```
 
## 📂 Estrutura Base

```
src/
│
├── auth/
│   ├── dto/
│   ├── controller/
│   ├── module/
│   └── service/
│
├── user/
│   ├── dto/
│   ├── controller/
│   ├── module/
│   └── service/
│
├── entrepreneur/
│   ├── dto/
│   ├── controller/
│   ├── module/
│   └── service/
│
├── prisma/
│   └── schema.prisma
│
├── main.ts
└── app.module.ts
```

## 👨‍💻 Autor

Feito com 💻 por [Emmanuel Stocco](https://github.com/EmmanuelStocco)

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

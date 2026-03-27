<div align="center">

# ⚡ Racha+

**Plataforma de gerenciamento de times e partidas esportivas amadoras**

![Angular](https://img.shields.io/badge/Angular-21-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?style=flat-square&logo=springboot)

</div>

---

## Sobre o Projeto

O **Racha+** é uma aplicação web para organização de rachões e partidas amadoras. Permite criar times, agendar partidas, acompanhar estatísticas e dividir custos entre os jogadores.

---

## Stack

### Frontend
- **Angular 21** — standalone components, lazy loading, signals
- **Tailwind CSS 4** — utility-first, tema customizado via `@theme`
- **TypeScript 5.9** — tipagem estrita
- **RxJS** — chamadas HTTP e programação reativa

### Backend
- **Spring Boot 3.5** — API REST
- **Java 21**
- **Spring Security** — autenticação JWT stateless
- **Spring Data JPA + PostgreSQL**
- **Maven**

---

## Funcionalidades Implementadas

### Fase 1 — Autenticação
- [x] Tela de landing page
- [x] Login com JWT
- [x] Registro de usuário
- [x] Integração frontend ↔ backend
- [x] Validação de formulários
- [x] Indicador de força de senha
- [x] Persistência do token no `localStorage`

---

## Como Rodar

### Pré-requisitos
- Node.js 20+
- Java 21+
- PostgreSQL rodando localmente

### Backend

```bash
cd "racha-plus backend/racha-plus-backend-main/rachaplus-api"
./mvnw spring-boot:run
```

> Disponível em `http://localhost:8080`

### Frontend

```bash
npm install
npm start
```

> Disponível em `http://localhost:4200`

O proxy de desenvolvimento encaminha `/api/*` → `http://localhost:8080` automaticamente, sem necessidade de configurar CORS.

---

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/v1/auth/login` | Login — retorna JWT |
| `POST` | `/api/v1/users` | Registro de novo usuário |

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       └── auth.service.ts     # Integração com a API
│   ├── features/
│   │   ├── landing/                # Página inicial
│   │   └── auth/
│   │       ├── login/              # Tela de login
│   │       └── register/           # Tela de registro
│   ├── app.config.ts               # Providers globais
│   └── app.routes.ts               # Roteamento
├── styles.css                      # Tailwind + tema global
proxy.conf.json                     # Proxy dev → backend
```

---

## Documentação

- [`docs/fase-1-autenticacao.md`](docs/fase-1-autenticacao.md) — Detalhes da fase 1

---

<div align="center">
  Feito por <a href="https://github.com/RachaPlus">RachaPlus</a>
</div>

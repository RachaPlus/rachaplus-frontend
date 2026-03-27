# Racha+ — Fase 1: Autenticação

## Visão Geral

Primeira fase do projeto **Racha+**, plataforma de gerenciamento de times e partidas esportivas amadoras. Esta fase cobre a implementação das telas de autenticação no frontend e a integração com os endpoints de login e registro do backend.

---

## O que foi implementado

### Frontend

#### Telas
| Tela | Rota | Descrição |
|------|------|-----------|
| Landing | `/` | Página inicial com apresentação da plataforma, stats e call-to-action |
| Login | `/login` | Formulário de acesso com validação, toggle de senha e botão Google (placeholder) |
| Registro | `/register` | Formulário de cadastro com validação, força de senha e confirmação |

#### Componentes (`src/app/features/`)
- **`landing/landing.component.ts`** — Hero section, cards de funcionalidades, estatísticas (2.4K times, 18K jogadores, 94K partidas)
- **`auth/login/login.component.ts`** — Formulário reativo com campo e-mail/senha, animação tática de campo de futebol no painel esquerdo
- **`auth/register/register.component.ts`** — Formulário com nome/e-mail/senha/confirmação, indicador de força de senha, aceite de termos

#### Serviço de Autenticação
- **`src/app/core/services/auth.service.ts`** — Serviço Angular que encapsula as chamadas HTTP ao backend:
  - `login(email, senha)` → `POST /api/v1/auth/login`
  - `register(nome, email, senha)` → `POST /api/v1/users`
  - `saveToken(token)` / `getToken()` → persistência do JWT no `localStorage`

#### Roteamento
Lazy loading em todas as rotas:
```
/           → LandingComponent
/login      → LoginComponent
/register   → RegisterComponent
**          → redirect /login
```

---

## O que foi integrado

### Frontend ↔ Backend

| Ação | Endpoint | Método | Corpo da requisição | Resposta |
|------|----------|--------|---------------------|----------|
| Login | `/api/v1/auth/login` | POST | `{ email, senha }` | `{ token }` |
| Registro | `/api/v1/users` | POST | `{ nome, email, senha }` | `{ id, nome, email }` |

**Fluxo de login:**
1. Usuário preenche e-mail e senha
2. `AuthService.login()` chama o endpoint
3. JWT retornado é salvo no `localStorage`
4. Redirecionamento para `/`

**Fluxo de registro:**
1. Usuário preenche nome, e-mail, senha e confirma
2. `AuthService.register()` chama o endpoint
3. Mensagem de sucesso exibida
4. Redirecionamento automático para `/login` após 1.5s

**CORS** resolvido via proxy do Angular CLI (`proxy.conf.json`):
```
/api/* → http://localhost:8080
```
Sem necessidade de alterar configuração do backend.

---

## Tecnologias

### Frontend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Angular | 21.2.0 | Framework principal, standalone components |
| TypeScript | 5.9.2 | Linguagem |
| Tailwind CSS | 4.1.12 | Estilização (utility-first) |
| RxJS | 7.8.0 | Observables / chamadas HTTP |
| Angular Router | 21.2.0 | Navegação SPA com lazy loading |
| Angular Forms | 21.2.0 | Formulários reativos com validação |
| Angular HttpClient | 21.2.0 | Requisições HTTP ao backend |

### Backend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Spring Boot | 3.5.11 | Framework principal |
| Java | 21 | Linguagem |
| Spring Security | — | Autenticação JWT stateless |
| Spring Data JPA | — | Persistência |
| PostgreSQL | — | Banco de dados |
| Lombok | — | Redução de boilerplate |
| Maven | — | Build e gerenciamento de dependências |

---

## Estrutura de Pastas Relevante

```
racha-plus/                         ← Frontend
├── proxy.conf.json                 ← Proxy dev (CORS)
├── src/
│   ├── app/
│   │   ├── app.config.ts           ← Providers globais
│   │   ├── app.routes.ts           ← Rotas (lazy loading)
│   │   ├── core/
│   │   │   └── services/
│   │   │       └── auth.service.ts ← Integração HTTP
│   │   └── features/
│   │       ├── landing/
│   │       ├── auth/login/
│   │       └── auth/register/
│   └── styles.css                  ← Tailwind 4 + tema customizado

racha-plus backend/                 ← Backend
└── rachaplus-api/src/main/java/
    └── br/com/rachaplus/api/
        ├── infrastructure/
        │   ├── controller/
        │   │   ├── AutenticacaoController.java
        │   │   └── UsuarioController.java
        │   └── security/
        │       ├── SecurityConfig.java
        │       ├── SecurityFilter.java
        │       └── TokenService.java
        ├── application/
        │   ├── dto/
        │   └── service/
        └── domain/
```

---

## Como Rodar

```bash
# Backend (pasta rachaplus-api/)
./mvnw spring-boot:run

# Frontend (pasta racha-plus/)
npm start
```

Frontend disponível em `http://localhost:4200`
Backend disponível em `http://localhost:8080`

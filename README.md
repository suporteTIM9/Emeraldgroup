# Emerald Group — Website

Site institucional do Emerald Group. Frontend em React + Vite, servido por um único servidor Node/Express que também expõe uma mini API para o formulário de contacto.

## Stack

- **Frontend:** React 19, Vite, Tailwind CSS, wouter (routing)
- **Backend:** Express (`server/`), um único processo Node
- **Contacto:** `POST /api/contact` valida o input com Zod e envia o email via Nodemailer (SMTP)
- **Testes:** Vitest (`npm test`)
- **Deploy alvo:** Azure App Service (Linux, Node) — um único Web App, sem base de dados nem serviços adicionais

## A correr localmente

```bash
pnpm install        # ou npm install
cp .env.example .env
npm run dev         # http://localhost:3000, com Vite HMR
```

## Build e arranque em produção

```bash
npm run build       # vite build (client/) + esbuild do servidor -> dist/
npm start           # NODE_ENV=production node dist/index.js
```

`npm run build` produz:
- `dist/public/` — frontend estático
- `dist/index.js` — servidor Express "bundled" (único ficheiro, sem `node_modules` do próprio projeto)

## Variáveis de ambiente

Ver `.env.example`. As que importam para o servidor:

| Variável | Obrigatória | Descrição |
|---|---|---|
| `PORT` | não (default 3000) | Porta HTTP. O Azure App Service define isto automaticamente. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | sim, em produção | Servidor SMTP usado para enviar o email do formulário de contacto. |
| `SMTP_USER` / `SMTP_PASS` | sim, em produção | Credenciais SMTP. |
| `SMTP_FROM` | não | Remetente mostrado no email enviado. |
| `CONTACT_TO_EMAIL` | não (default `info@emeraldgroup-inc.com`) | Para onde é enviada cada submissão do formulário. |
| `VITE_ANALYTICS_ENDPOINT` / `VITE_ANALYTICS_WEBSITE_ID` | não | Opcional, só se um script de analytics for ativado em `client/index.html`. |

Sem `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` configurados, o site funciona normalmente mas o formulário de contacto devolve um erro tratado (não crasha o servidor).

## Deploy no Azure App Service

1. App Service Linux, runtime Node (versão alinhada com `engines`/`@types/node` do `package.json`).
2. Comandos de build/arranque: `npm run build` e `npm start` (ou configurar o Oryx build do Azure para correr `npm run build` automaticamente).
3. Definir no portal as env vars da tabela acima (`SMTP_*`, `CONTACT_TO_EMAIL`). `PORT` não precisa de ser definida manualmente.
4. Sem base de dados nem serviços externos a provisionar — o site não tem autenticação nem persistência própria.

## Estrutura

```
client/      frontend (React + Vite)
server/      servidor Express + API de contacto
```

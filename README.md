# Code With Me — tela de login

Primeira parte do projeto: cadastro, login (e-mail/senha + Google) e uma
página protegida (`/app`) só pra provar que a sessão funciona de ponta a
ponta. A partir daqui entra a trilha de exercícios.

Stack: **Next.js 14 (App Router) + Supabase (auth + Postgres) + Tailwind**.

## 1. Criar o projeto no Supabase

1. Crie uma conta em https://supabase.com e um novo projeto (gratuito).
2. Em **Project Settings → API**, copie:
   - `Project URL` → vai em `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → vai em `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. (Opcional, pro botão "Continuar com Google" funcionar) em
   **Authentication → Providers → Google**, ative e cole o Client ID e
   Client Secret de um projeto no Google Cloud Console. Em **Authentication
   → URL Configuration**, adicione:
   - `http://localhost:3000/auth/callback` (dev)
   - `https://SEU-DOMINIO.vercel.app/auth/callback` (produção, depois do deploy)

Se pular o Google por agora, o login por e-mail/senha já funciona sozinho —
o botão social só não vai completar o fluxo.

## 2. Rodar localmente

```bash
cp .env.local.example .env.local
# cole a URL e a anon key que você copiou no passo 1
npm install
npm run dev
```

Acesse `http://localhost:3000` — você cai direto em `/login`.

## 3. Colocar no ar pra testar com usuários de verdade

O jeito mais rápido é o Vercel (dono do Next.js, free tier ok pro seu caso):

1. Suba esse projeto pra um repositório no GitHub.
2. Em https://vercel.com, importe o repositório.
3. Em **Environment Variables**, adicione as mesmas duas variáveis do
   `.env.local`.
4. Deploy. Você recebe uma URL pública (`algo.vercel.app`) já testável.
5. Não esqueça de voltar no Supabase e adicionar essa URL nas **Redirect
   URLs** (passo 1) se for usar o login com Google.

## Estrutura

```
app/
  login/page.tsx        tela de login
  signup/page.tsx        tela de cadastro
  auth/callback/route.ts troca o código do OAuth/confirmação por sessão
  app/page.tsx            área logada (placeholder, protegida)
components/
  AuthShell.tsx           layout compartilhado (painel + formulário)
lib/supabase/            clientes Supabase (browser e servidor)
middleware.ts             mantém a sessão viva e protege /app
```

## Próximos passos sugeridos

- Trocar o placeholder de `/app` pela home real com a trilha de níveis.
- Modelar as tabelas do Supabase: usuários (perfil), trilhas, exercícios,
  progresso.
- Página de "esqueci a senha" (o link já existe em `/login`, falta a rota).

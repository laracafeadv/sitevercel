# Como publicar o site (passo a passo)

Este projeto tem duas partes que precisam ser publicadas **separadamente**:

- **`client`** (o site que os visitantes veem) → vai no **Netlify**.
- **`server`** (guarda os artigos do blog, mensagens de contato e o login do
  admin) → precisa ficar "ligado" o tempo todo, então vai no **Render**.

Siga nessa ordem: **primeiro o Render, depois o Netlify** — porque o site
precisa saber o endereço do backend para funcionar.

---

## 1. Publicar o backend no Render

1. Crie uma conta em https://render.com e conecte sua conta do GitHub.
2. Clique em **New +** → **Blueprint** e escolha o repositório `sitevercel`.
   O Render vai detectar o arquivo `render.yaml` na raiz do projeto e já
   configurar o serviço `lara-cafe-advocacia-api` automaticamente.
3. Durante a criação, o Render vai pedir para você preencher algumas
   variáveis (elas não têm valor padrão por segurança):
   - `CLIENT_ORIGIN` — a URL do site no Netlify (ex:
     `https://laracafeadvocacia.netlify.app`). Se você ainda não sabe essa
     URL, coloque um valor temporário e ajuste depois no painel do Render
     (Environment).
   - `ADMIN_EMAIL` — e-mail de login do painel administrativo.
   - `ADMIN_PASSWORD` — senha do painel administrativo (troque por uma
     senha forte).
4. **Importante — plano do serviço:** o `render.yaml` usa o plano
   **Starter** (pago, a partir de ~US$ 7/mês) porque o site guarda dados
   (artigos, mensagens de contato) em um disco (SQLite). No plano **Free**
   do Render o disco não fica disponível e os dados apagam a cada reinício
   — ou seja, mensagens de contato e artigos criados pelo admin seriam
   perdidos. Se quiser testar antes de pagar, você pode trocar `plan:
   starter` para `plan: free` no `render.yaml`, mas sabendo dessa limitação.
5. Depois do primeiro deploy, rode o comando para criar as tabelas e os
   dados iniciais (categorias, artigos de exemplo, usuário admin). No
   painel do Render, abra o **Shell** do serviço e execute:
   ```
   pnpm --filter server db:push
   pnpm --filter server db:seed
   ```
6. Copie a URL pública que o Render gerou para o serviço (algo como
   `https://lara-cafe-advocacia-api.onrender.com`). Você vai precisar dela
   no próximo passo.

## 2. Publicar o site no Netlify

1. Crie uma conta em https://netlify.com e conecte sua conta do GitHub.
2. Clique em **Add new site** → **Import an existing project** e escolha o
   repositório `sitevercel`. O Netlify vai ler o `netlify.toml` da raiz e
   já preencher o comando de build e a pasta de publicação — não precisa
   alterar nada nessa tela.
3. Antes de publicar, adicione uma variável de ambiente: em **Site
   configuration → Environment variables**, crie:
   - `BACKEND_URL` = a URL do Render que você copiou no passo anterior
     (sem barra `/` no final), ex: `https://lara-cafe-advocacia-api.onrender.com`
4. Clique em **Deploy site**.
5. Quando o deploy terminar, copie a URL do Netlify (ex:
   `https://laracafeadvocacia.netlify.app`) e volte no painel do Render
   para atualizar a variável `CLIENT_ORIGIN` com essa URL definitiva (isso
   evita que o navegador bloqueie a comunicação entre o site e o backend).
   Depois de salvar, o Render reinicia o serviço automaticamente.

## 3. Testar

- Acesse a URL do Netlify: a página inicial, o blog e o formulário de
  contato devem carregar normalmente.
- Acesse `SUA-URL-NETLIFY/admin/login` com o `ADMIN_EMAIL`/`ADMIN_PASSWORD`
  que você definiu no Render.
- Envie uma mensagem pelo formulário de contato e confira se ela aparece
  no painel admin, em "Mensagens".

## Aviso por e-mail quando alguém preenche o formulário de contato

Por padrão, mensagens do formulário de contato só aparecem no painel admin —
nada te avisa automaticamente. Para receber um e-mail (que também notifica
seu celular, se o Gmail estiver instalado) a cada nova mensagem:

1. Acesse https://myaccount.google.com/apppasswords com a conta
   `laracafe.adv@gmail.com` (pode pedir para ativar a verificação em duas
   etapas primeiro, caso ainda não esteja ativa — é obrigatório para gerar
   a senha de app).
2. Crie uma nova senha de app (dê um nome como "Site Lara Café") e copie o
   código gerado (16 letras, sem espaços).
3. No painel do Render, vá em **Environment** e adicione:
   - `EMAIL_USER` = `laracafe.adv@gmail.com`
   - `EMAIL_APP_PASSWORD` = o código de 16 letras que você copiou
   - `NOTIFICATION_EMAIL` = para onde o aviso deve ir (pode ser o mesmo
     `laracafe.adv@gmail.com`, ou outro e-mail seu)
4. Salve — o Render reinicia o serviço automaticamente e passa a enviar o
   aviso a partir da próxima mensagem recebida.

**Importante:** essa senha de app é diferente da senha normal da sua conta
Google — nunca coloque sua senha normal aqui. Se quiser desativar o aviso
depois, é só remover a senha de app em myaccount.google.com/apppasswords.

## Domínio próprio (opcional)

Depois que tudo estiver funcionando, você pode apontar seu domínio (ex:
`laracafeadvocacia.com.br`) para o site no Netlify, em **Domain
management**. Não é necessário mexer no Render para isso.

## Resumo do que cada arquivo faz

| Arquivo | Para quê serve |
| --- | --- |
| `netlify.toml` | Diz ao Netlify como construir e publicar o `client`. |
| `scripts/generate-redirects.mjs` | Gera as regras que encaminham `/api/*` e `/uploads/*` do Netlify para o backend no Render, usando a variável `BACKEND_URL`. |
| `render.yaml` | Diz ao Render como construir, rodar e persistir dados do `server`. |

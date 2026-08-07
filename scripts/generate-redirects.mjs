// Gera client/public/_redirects antes do build do Netlify, encaminhando
// /api/* e /uploads/* para o backend (Render) definido em BACKEND_URL.
// O código da aplicação usa URLs relativas (ex: "/api/trpc"), então esse
// redirecionamento de borda é o único ponto de configuração necessário
// para separar o front (Netlify) do back (Render) sem alterar o app.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.resolve(__dirname, "../client/public/_redirects");

const backendUrl = (process.env.BACKEND_URL || "").trim().replace(/\/+$/, "");

if (!backendUrl) {
  console.warn(
    "\n⚠️  Variável BACKEND_URL não definida no Netlify.\n" +
      "   O site vai publicar, mas o blog, o formulário de contato e o painel\n" +
      "   admin não vão funcionar até você definir BACKEND_URL com a URL do\n" +
      "   backend no Render (ex: https://lara-cafe-advocacia-api.onrender.com)\n" +
      "   em: Netlify > Site configuration > Environment variables.\n"
  );
}

const target = backendUrl || "https://REPLACE_WITH_YOUR_BACKEND_URL";

const contents = `/api/*  ${target}/api/:splat  200
/uploads/*  ${target}/uploads/:splat  200
/*  /index.html  200
`;

writeFileSync(outFile, contents);
console.log(`_redirects gerado em ${outFile} (backend: ${target})`);

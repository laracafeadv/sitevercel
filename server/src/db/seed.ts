import "dotenv/config";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { db, schema } from "./index.js";
import { slugify } from "../lib/slugify.js";

function generateRandomPassword() {
  return crypto.randomBytes(12).toString("base64url");
}

async function seed() {
  console.log("Seeding database...");

  const existingCategories = await db.select().from(schema.blogCategories);
  let categoryIds: Record<string, number> = {};

  if (existingCategories.length === 0) {
    const categoriesData = [
      {
        name: "Direito de Família",
        description:
          "Casamento, divórcio, união estável e mediação familiar.",
      },
      {
        name: "Sucessões",
        description:
          "Planejamento sucessório e patrimonial, testamentos, inventário e partilha de bens.",
      },
    ];

    for (const cat of categoriesData) {
      const [inserted] = await db
        .insert(schema.blogCategories)
        .values({ name: cat.name, slug: slugify(cat.name), description: cat.description })
        .returning();
      categoryIds[cat.name] = inserted.id;
    }
    console.log("Categories seeded.");
  } else {
    for (const cat of existingCategories) {
      categoryIds[cat.name] = cat.id;
    }
    console.log("Categories already exist, skipping.");
  }

  const existingArticles = await db.select().from(schema.blogArticles);
  if (existingArticles.length === 0) {
    const articlesData = [
      {
        title: "Divórcio Consensual: Como Funciona o Processo",
        category: "Direito de Família",
        imageUrl: "/assets/blog-cover-divorcio.jpg",
        excerpt:
          "Entenda as etapas do divórcio consensual e como um acordo bem construído evita desgaste e economiza tempo.",
        content: `<h2>O que é o divórcio consensual?</h2><p>Quando o casal está de acordo sobre a separação e seus termos — partilha de bens, uso do nome —, o divórcio pode ser resolvido de forma consensual, judicial ou extrajudicialmente em cartório.</p><h3>Requisitos para a via extrajudicial</h3><ul><li>Consenso entre as partes sobre todos os termos</li><li>Ausência de filhos menores ou incapazes</li><li>Assistência de advogado, obrigatória em qualquer modalidade</li></ul><p>Cada caso possui particularidades que devem ser avaliadas por um profissional especializado, garantindo que o acordo firmado realmente reflita a vontade das partes.</p><blockquote>Um acordo bem construído protege tanto quanto uma sentença — e custa muito menos em tempo e desgaste.</blockquote><h3>Quando buscar orientação jurídica</h3><p>Se você está considerando uma separação, procure orientação especializada antes de firmar qualquer acordo, mesmo que a relação com o outro cônjuge esteja amigável.</p>`,
      },
      {
        title: "União Estável: Direitos e Deveres do Casal",
        category: "Direito de Família",
        imageUrl: "/assets/blog-cover-uniao-estavel.jpg",
        excerpt:
          "Conheça os efeitos jurídicos da união estável e por que formalizar a relação protege ambas as partes.",
        content: `<h2>O que caracteriza a união estável?</h2><p>A união estável é reconhecida quando há convivência pública, contínua e duradoura, com o objetivo de constituir família — independentemente de contrato formal.</p><h3>Efeitos jurídicos</h3><ul><li>Regime de bens equivalente ao da comunhão parcial, salvo contrato em contrário</li><li>Direitos sucessórios entre os companheiros</li><li>Possibilidade de conversão em casamento</li></ul><p>Formalizar a união por meio de um contrato de convivência permite às partes escolher o regime de bens e evitar disputas futuras sobre o que foi ou não acordado.</p>`,
      },
      {
        title: "Testamento: Por Que Todo Mundo Deveria Ter Um",
        category: "Sucessões",
        imageUrl: "/assets/blog-cover-testamento.jpg",
        excerpt:
          "Planejar a sucessão em vida evita conflitos familiares e garante que sua vontade seja respeitada.",
        content: `<h2>A importância do testamento</h2><p>Muitas pessoas acreditam que testamento é assunto apenas para grandes fortunas, mas essa ferramenta é útil para qualquer patrimônio, por menor que seja.</p><h3>Vantagens do planejamento sucessório</h3><ul><li>Reduz conflitos entre herdeiros</li><li>Permite direcionar bens para pessoas ou causas específicas, dentro dos limites legais</li><li>Agiliza o processo de inventário</li></ul><p>Existem diferentes modalidades de testamento previstas em lei, cada uma com requisitos formais próprios. Um advogado especialista pode indicar a mais adequada ao seu caso.</p><blockquote>O planejamento que você faz hoje, protege o seu futuro amanhã.</blockquote>`,
      },
      {
        title: "Inventário Extrajudicial: Quando é Possível?",
        category: "Sucessões",
        imageUrl: "/assets/blog-cover-inventario.jpg",
        excerpt:
          "Conheça os requisitos para realizar o inventário em cartório, de forma mais rápida e econômica.",
        content: `<h2>Requisitos do inventário extrajudicial</h2><p>O inventário extrajudicial pode ser feito diretamente em cartório quando há consenso entre todos os herdeiros e nenhum deles é menor de idade ou incapaz.</p><h3>Vantagens</h3><ul><li>Processo mais rápido que o judicial</li><li>Menor custo com honorários e taxas processuais</li><li>Maior flexibilidade de agenda</li></ul><p>É indispensável a presença de um advogado para assessorar as partes durante todo o procedimento, garantindo a correta partilha dos bens.</p>`,
      },
      {
        title: "Como Proteger seu Patrimônio em uma União Estável",
        category: "Sucessões",
        imageUrl: "/assets/blog-cover-patrimonio-uniao.jpg",
        excerpt:
          "Contratos de convivência e planejamento patrimonial são aliados importantes para casais em união estável.",
        content: `<h2>Planejamento patrimonial na união estável</h2><p>A união estável gera efeitos patrimoniais entre os companheiros, semelhantes aos do casamento, salvo estipulação em contrário por meio de contrato de convivência.</p><h3>Ferramentas de proteção</h3><ul><li>Contrato de convivência com escolha do regime de bens</li><li>Cláusulas de incomunicabilidade patrimonial</li><li>Planejamento sucessório integrado</li></ul><p>Formalizar essas questões evita disputas futuras e garante segurança jurídica para ambos os parceiros.</p>`,
      },
      {
        title: "Contratos Imobiliários: Cuidados Essenciais Antes de Assinar",
        category: "Sucessões",
        imageUrl: "/assets/blog-cover-imobiliario.jpg",
        excerpt:
          "Veja os pontos de atenção antes de fechar negócio na compra, venda ou locação de imóveis.",
        content: `<h2>Antes de assinar o contrato</h2><p>Contratos imobiliários envolvem valores expressivos e riscos jurídicos que podem ser evitados com uma análise prévia cuidadosa.</p><h3>Pontos de atenção</h3><ul><li>Verificação de certidões do imóvel e das partes</li><li>Cláusulas de rescisão e multas</li><li>Condições de pagamento e reajuste</li></ul><p>A revisão contratual por um advogado especializado é um investimento que evita prejuízos muito maiores no futuro.</p>`,
      },
    ];

    for (const art of articlesData) {
      await db.insert(schema.blogArticles).values({
        title: art.title,
        slug: slugify(art.title),
        content: art.content,
        excerpt: art.excerpt,
        categoryId: categoryIds[art.category],
        author: "Lara Café",
        imageUrl: art.imageUrl,
        status: "published",
        publishedAt: new Date(),
      });
    }
    console.log("Articles seeded.");
  } else {
    console.log("Articles already exist, skipping.");
  }

  const siteContentDefaults: Record<string, Record<string, unknown>> = {
    hero: {
      quote: "Todo compromisso — construído ou desfeito — merece ser conduzido com o mesmo cuidado.",
      backgroundImage: "/assets/support-veil-embrace.jpg",
    },
    about: {
      eyebrow: "Sobre mim",
      heading: "Uma advocacia construída a partir de histórias, escolhas e decisões importantes.",
      photo: "/assets/lara-foto.png",
      bioParagraphs: [
        "Sou advogada com atuação dedicada ao Direito das Famílias e Sucessões, áreas em que o Direito encontra aspectos profundamente humanos: relações construídas ao longo da vida, patrimônios formados com esforço e decisões que podem transformar o futuro.",
        "Escolhi essa área por compreender que cada questão jurídica carrega uma história única. Mais do que analisar documentos ou apresentar caminhos processuais, é preciso compreender o contexto, os objetivos e aquilo que realmente importa para cada pessoa.",
        "Acredito que uma boa advocacia começa antes da solução jurídica. Ela nasce da escuta atenta, da compreensão das particularidades de cada caso e da construção de uma estratégia que respeite a realidade e os interesses envolvidos.",
        "Minha atuação é baseada na união entre conhecimento técnico, planejamento e cuidado. Cada orientação é desenvolvida de forma personalizada, buscando oferecer clareza e segurança para que decisões importantes sejam tomadas com mais tranquilidade.",
        "Meu compromisso é conduzir cada etapa com discrição, responsabilidade e estratégia, auxiliando meus clientes na proteção de suas relações, seus patrimônios e seus projetos de futuro.",
      ],
      sectionHeading: "O cuidado por trás de cada decisão",
      sectionText:
        "Cada caso possui suas próprias particularidades. Por isso, acredito em uma advocacia que não oferece respostas prontas, mas constrói caminhos jurídicos adequados à realidade de cada cliente.",
      pillars: [
        {
          title: "Estratégia",
          text: "Uma decisão bem orientada começa com uma análise completa do cenário, considerando os aspectos jurídicos, familiares e patrimoniais envolvidos.",
        },
        {
          title: "Discrição",
          text: "Questões familiares e patrimoniais exigem uma condução cuidadosa, baseada em confiança, confidencialidade e respeito.",
        },
        {
          title: "Clareza",
          text: "O Direito deve ser compreendido por quem precisa tomar decisões. Meu papel é traduzir questões complexas em orientações objetivas e seguras.",
        },
        {
          title: "Planejamento",
          text: "Antecipar cenários e estruturar soluções jurídicas permite preservar aquilo que foi construído e proporcionar mais segurança para o futuro.",
        },
      ],
    },
    specialties: {
      eyebrow: "Áreas de Atuação",
      heading: "Um índice da minha atuação",
      description:
        "Da formalização de uma união ao encerramento de um inventário, atuo em cada etapa que a vida em família pode exigir.",
      note: "Toque em qualquer item para conversar diretamente sobre o seu caso.",
      groups: [
        {
          label: "Família & União",
          items: [
            { title: "Divórcio", text: "Consensual ou litigioso, conduzido com estratégia e o menor desgaste possível." },
            { title: "Planejamento matrimonial", text: "Pactos e acordos que antecipam cenários antes que se tornem conflitos." },
            { title: "União estável", text: "Formalização da relação com todos os efeitos jurídicos garantidos." },
            { title: "Reconhecimento de união estável", text: "Comprovação e registro da relação para todos os efeitos legais." },
            { title: "Dissolução de união estável", text: "Encerramento conduzido com respeito e definição clara de direitos." },
          ],
        },
        {
          label: "Sucessões",
          items: [
            { title: "Inventário", text: "Judicial ou extrajudicial, para encerrar o processo com segurança." },
            { title: "Partilha de bens", text: "Divisão de patrimônio construída com clareza e critério técnico." },
            { title: "Planejamento sucessório", text: "Estruturas pensadas para proteger quem você deixa para trás." },
          ],
        },
      ],
    },
    how_it_works: {
      eyebrow: "Como Funciona",
      heading: "Um caminho claro, do primeiro contato à solução.",
      description: "Cada etapa é pensada para trazer segurança e transparência a um momento sensível.",
      ctaText: "Dar o Primeiro Passo",
      steps: [
        { number: "01", title: "Contato inicial", text: "Você apresenta a situação e eu avalio, com sigilo, se e como posso ajudar." },
        { number: "02", title: "Diagnóstico", text: "Análise aprofundada do caso, para mapear riscos, possibilidades e o melhor caminho jurídico." },
        { number: "03", title: "Acompanhamento", text: "Condução próxima de cada etapa, com atualizações claras sobre o andamento do caso." },
        { number: "04", title: "Solução", text: "Uma resposta jurídica sólida — construída para durar, não apenas para resolver o momento." },
      ],
    },
    editorial_band: {
      quote: "Decisões importantes merecem tempo, escuta e a orientação certa.",
    },
    footer: {
      description:
        "Advocacia estratégica em Direito de Família e Sucessões — orientação clara, sigilosa e humana, para clientes em todo o Brasil.",
    },
  };

  for (const [key, data] of Object.entries(siteContentDefaults)) {
    const [existing] = await db.select().from(schema.siteContent).where(eq(schema.siteContent.key, key));
    if (!existing) {
      await db.insert(schema.siteContent).values({ key, data });
    }
  }
  console.log("Site content seeded.");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@laracafeadvocacia.com.br";
  const generatedPassword = process.env.ADMIN_PASSWORD ? null : generateRandomPassword();
  const adminPassword = process.env.ADMIN_PASSWORD || generatedPassword!;
  const existingAdmin = await db
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, adminEmail));

  if (existingAdmin.length === 0) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await db.insert(schema.adminUsers).values({
      email: adminEmail,
      passwordHash,
      name: "Lara Café",
    });
    console.log(`Admin user created: ${adminEmail}`);
    if (generatedPassword) {
      console.log(
        `⚠️  ADMIN_PASSWORD não foi definido — gerei uma senha aleatória só para este login: "${generatedPassword}"\n` +
          `   Anote agora, ela não será exibida de novo. Para definir a sua própria senha, configure\n` +
          `   ADMIN_PASSWORD no ambiente e rode o seed de novo (apague o usuário admin antes, se já existir).`
      );
    }
  } else {
    console.log("Admin user already exists, skipping.");
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

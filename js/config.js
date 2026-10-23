/* =====================================================================
   CONFIGURAÇÃO DA LOJA — edite só este arquivo para cada cliente
   ===================================================================== */
const LOJA = {
  nome: "Tech Informática",
  sigla: "TC",                       // 2 letras no ícone do logo (usado quando "logo" está vazio)
  logo: "img/exemplos/logo.svg",     // imagem do logo (quadrada: PNG, SVG ou JPG). "" usa a sigla

  // Foto da loja no lugar da bancada da abertura (proporção 520×440, ex.: 1040×880 px).
  // "" mostra a bancada ilustrada. A legenda aparece num selo sobre a foto ("" esconde).
  fotoAbertura: "img/exemplos/abertura.jpg",
  fotoAberturaLegenda: "Nossa loja · São Paulo",
  whatsapp: "5511999990000",         // DDI + DDD + número, só dígitos
  whatsappExibicao: "(11) 99999-0000",
  mensagemPadrao: "Olá! Vim pelo site e gostaria de atendimento.",
  email: "contato@techinformatica.com.br", // deixe "" para esconder
  instagram: "@techinformatica",    // deixe "" para esconder
  facebook: "",                      // link completo, ex.: "https://facebook.com/sualoja" ("" esconde)
  endereco: "Rua das Palmeiras, 240 · Centro",
  cidade: "São Paulo - SP",
  // Mapa: deixe "" para gerar pelo endereço acima, ou cole o link de
  // Google Maps > Compartilhar > Incorporar um mapa (só o que está dentro de src="...")
  mapa: "",
  cnpj: "",                          // ex.: "00.000.000/0001-00"
  credito: "",                       // ex.: "Site por Sua Agência"

  // Cores de destaque (tema claro e tema escuro)
  cor: "#C2410C",
  corEscuro: "#FF8A50",
  seletorCores: true,                // botão de paleta no topo para testar cores (false ao entregar ao cliente)

  titulo: 'Seu computador em<br><em>boas mãos</em>, do upgrade<br>ao conserto.', // <br> = quebra de linha
  subtitulo: "Notebooks, computadores, peças e acessórios, com assistência técnica própria. Conte o que você precisa e a gente indica a melhor opção.",
  sobreTitulo: "Venha até a loja",
  sobreTexto: "Atendimento de especialista, perto de você.",
  // Fotos da loja em "Onde estamos" (proporção 4:3, ex.: 800×600 px). [] esconde a galeria
  galeriaTitulo: "Por dentro da loja",
  galeria: [
    { foto: "img/exemplos/loja-1.jpg", legenda: "Fachada" },
    { foto: "img/exemplos/loja-2.jpg", legenda: "Balcão de atendimento" },
    { foto: "img/exemplos/loja-3.jpg", legenda: "Bancada técnica" },
    { foto: "img/exemplos/loja-4.jpg", legenda: "Nossa equipe" }
  ],
  rodapeTexto: "Loja de informática e assistência técnica com diagnóstico transparente e garantia em todos os serviços.",

  // Horários: domingo a sábado. null = fechado
  horarios: [null, ["09:00","18:00"], ["09:00","18:00"], ["09:00","18:00"], ["09:00","18:00"], ["09:00","18:00"], ["09:00","13:00"]],

  // Marcas: texto simples, ou { nome: "...", fino: true } para letra fina e espaçada. [] esconde a faixa
  marcas: ["intel.", "AMD", "Logitech", { nome: "SAMSUNG", fino: true }, "kingston"],

  // Vitrine de destaques em slide, acima das categorias (fotos 4:3, ex.: 640×480 px). [] esconde
  vitrineTitulo: "Em destaque",
  vitrine: [
    { foto: "img/exemplos/destaque-1.jpg", nome: "Notebook gamer",   preco: "a partir de R$ 4.599", etiqueta: "Novo" },
    { foto: "img/exemplos/destaque-2.jpg", nome: "Monitor 27\" 165Hz", preco: "a partir de R$ 1.299" },
    { foto: "img/exemplos/destaque-3.jpg", nome: "SSD NVMe 1TB",     preco: "a partir de R$ 389", etiqueta: "-15%" },
    { foto: "img/exemplos/destaque-4.jpg", nome: "Teclado mecânico", preco: "a partir de R$ 249" },
    { foto: "img/exemplos/destaque-5.jpg", nome: "Headset sem fio",  preco: "a partir de R$ 329" },
    { foto: "img/exemplos/destaque-6.jpg", nome: "Roteador Wi-Fi 6", preco: "a partir de R$ 459" }
  ],

  // Categorias. Ícones disponíveis: notebook, desktop, monitor, perifericos, componentes, redes, impressora, acessorios
  // foto (opcional, proporção 16:10, ex.: 640×400 px): aparece no topo do card no lugar do ícone
  produtos: [
    { icone: "notebook",    titulo: "Notebooks", foto: "img/exemplos/produto-notebooks.jpg",               texto: "Para estudo, trabalho e jogos. Ajudamos a escolher pelo seu uso." },
    { icone: "desktop",     titulo: "Computadores e PC gamer", foto: "img/exemplos/produto-computadores.jpg", texto: "Máquinas prontas ou montadas sob medida, testadas na bancada." },
    { icone: "monitor",     titulo: "Monitores", foto: "img/exemplos/produto-monitores.jpg",               texto: "Do home office ao competitivo, com taxas de atualização de 60 a 240 Hz." },
    { icone: "componentes", titulo: "Peças e upgrades", foto: "img/exemplos/produto-pecas.jpg",        texto: "SSD, memória RAM, placas de vídeo, fontes e processadores." },
    { icone: "perifericos", titulo: "Periféricos", foto: "img/exemplos/produto-perifericos.jpg",             texto: "Teclados, mouses, webcams e caixas de som para todo bolso." },
    { icone: "redes",       titulo: "Redes e Wi-Fi", foto: "img/exemplos/produto-redes.jpg",           texto: "Roteadores, repetidores, cabos e instalação de rede." },
    { icone: "impressora",  titulo: "Impressoras", foto: "img/exemplos/produto-impressoras.jpg",             texto: "Impressoras, cartuchos, toners e manutenção." },
    { icone: "acessorios",  titulo: "Acessórios", foto: "img/exemplos/produto-acessorios.jpg",              texto: "Headsets, carregadores, cabos, mochilas e suportes." }
  ],

  // Selos exibidos acima dos serviços
  garantias: ["Orçamento sem custo", "Garantia em todos os serviços", "Diagnóstico em até 24h"],

  // Ícones disponíveis: formatacao, limpeza, upgrade, tela, montagem, dados
  servicos: [
    { icone: "formatacao", titulo: "Formatação e backup",              texto: "Sistema reinstalado com seus arquivos salvos e programas essenciais.", prazo: "1 dia útil" },
    { icone: "limpeza",    titulo: "Limpeza e troca de pasta térmica", texto: "Para o computador que esquenta, faz barulho ou desliga sozinho.", prazo: "No mesmo dia" },
    { icone: "upgrade",    titulo: "Upgrade de SSD e memória",         texto: "A forma mais barata de deixar um computador antigo rápido de novo.", prazo: "No mesmo dia" },
    { icone: "tela",       titulo: "Troca de tela e teclado",          texto: "Peças para os principais modelos de notebook do mercado.", prazo: "2 a 5 dias úteis" },
    { icone: "montagem",   titulo: "Montagem de PC",                   texto: "Escolhemos as peças com você, montamos, organizamos os cabos e testamos.", prazo: "1 a 2 dias úteis" },
    { icone: "dados",      titulo: "Recuperação de dados",             texto: "HD, SSD ou pen drive que parou de funcionar. Avaliação antes de tudo.", prazo: "Sob avaliação" }
  ],

  // Depoimentos: troque pelos comentários reais dos clientes. nota de 1 a 5
  depoimentos: [
    { nome: "Marina C.",  tipo: "Manutenção",      nota: 5, texto: "Levei meu notebook achando que era a placa-mãe. Era só a memória. Economizei e ainda ganhei uma limpeza completa." },
    { nome: "Rafael P.",  tipo: "Compra de PC",    nota: 5, texto: "Comprei um desktop montado sob medida para edição de vídeo. Chegou testado e com nota fiscal, sem dor de cabeça." },
    { nome: "Daniela S.", tipo: "Suporte técnico", nota: 5, texto: "A impressora da minha empresa parou do nada. Resolveram no mesmo dia e ainda deixaram um contato direto para emergências." }
  ],

  faq: [
    { p: "O orçamento é cobrado?", r: "Não. Avaliamos o equipamento e passamos o valor antes de qualquer serviço. Você só paga se aprovar." },
    { p: "Vocês têm garantia?", r: "Sim. Todos os serviços têm garantia e os produtos seguem a garantia do fabricante, com nosso suporte." },
    { p: "Quais formas de pagamento aceitam?", r: "Pix, dinheiro e cartões de débito e crédito, com parcelamento. Consulte as condições pelo WhatsApp." },
    { p: "Fazem entrega?", r: "Sim, entregamos na cidade e região. Também é possível retirar na loja." },
    { p: "Atendem empresas?", r: "Sim. Fazemos manutenção, montagem de rede e venda de equipamentos para escritórios e comércios." }
  ]
};

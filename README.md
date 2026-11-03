# 🇦🇴 ANGOLA TICKETS — Bilhética Desportiva Nacional

> **ANGOLAN HERITAGE — MODERN SPORTS**  
> Plataforma oficial de divulgação, reserva e emissão de bilhetes digitais para o desporto angolano.

---

## 📌 Sobre o Projecto

O **ANGOLA TICKETS** é uma plataforma front-end moderna, sóbria e institucional dedicada à promoção e bilhética de eventos desportivos em Angola. Reúne num só ecossistema os maiores campeonatos e recintos desportivos do país, como o **Girabola**, o **Unitel Basket**, a **Taça de Angola**, os jogos dos **Palancas Negras**, os torneios de andebol, hóquei em patins, atletismo (São Silvestre de Luanda), artes marciais e desportos motorizados.

A identidade visual foi reformulada com foco na sobriedade, no minimalismo institucional e no design editorial desportivo, eliminando reflexos neon, brilhos artificiais e saturações exageradas em favor de uma estética genuinamente angolana.

---

## 🎨 Identidade Visual & Paleta de Cores

Inspirada directamente na **Bandeira Nacional da República de Angola**, a paleta equilibra a força do vermelho institucional e a solidez do preto carvão, enriquecida por detalhes pontuais em dourado envelhecido e superfícies marfim:

| Cor | Código Hex | Aplicação Principal |
| :--- | :--- | :--- |
| **Vermelho Institucional** | `#A51F27` | Acentos primários, botões de acção, badges de destaque e estados activos |
| **Preto Carvão** | `#171717` | Cabeçalho sólido, rodapé, superfícies de contraste e modo escuro |
| **Preto Secundário** | `#222222` | Cards escuros, campos de pesquisa, divisores e painéis de elevação |
| **Dourado Envelhecido** | `#B08B42` | Detalhes nobres, insígnias de competições de elite e acentos discretos |
| **Branco Marfim** | `#E8E4DC` | Tipografia em superfícies escuras, cartões e elementos editoriais |
| **Cinza Neutro** | `#A5A29C` | Textos secundários, metadados (datas/locais) e bordas institucionais |
| **Fundo Claro Alternativo** | `#F0EEE9` | Superfície base do modo claro com textura suave e confortável |

### Princípios do Design:
- **Cores sólidas:** Botões e recipientes sem gradientes luminosos ou aparências plásticas.
- **Transições sutis:** Hover baseado em pequenas alterações de tonalidade sem elevações excessivas.
- **Sombras neutras e discretas:** Uso exclusivo de sombras acromáticas muito suaves para separação de planos.
- **Tipografia editorial:** Combinação entre [Manrope](https://fonts.google.com/specimen/Manrope) (títulos fortes) e [Inter](https://fonts.google.com/specimen/Inter) (textos de alta legibilidade).

---

## 🚀 Funcionalidades

- **Exploração e Pesquisa Rápida:**
  - Pesquisa por equipa (Petro, 1.º de Agosto, Kabuscorp, Sagrada Esperança...), recinto ou modalidade desportiva.
  - Acessos rápidos para Girabola, Unitel Basket, Palancas Negras e recintos emblemáticos.

- **Destaque Editorial (FeaturedBanner):**
  - Painel com o clássico nacional em evidência, contagem regressiva de metadados, localização e emblemas dos clubes com contraste límpido.

- **Calendário Geral de Jogos:**
  - Filtros instantâneos por modalidade (Futebol, Basquete, Andebol, Hóquei, Atletismo, Boxe, etc.).
  - Filtros por competição e província (Luanda, Benguela, Huambo, Huíla, Cabinda...).
  - Ordenação por data e preço.

- **Página de Detalhe do Jogo & Mapa de Sectores:**
  - Visualização gráfica interactiva do recinto desportivo (Bancada Geral Norte, Bancadas Centrais, Sector VIP/Tribuna).
  - Selector dinâmico de bilhetes por bancada com controlo de quantidade e limite por compra.

- **Carrinho de Compras:**
  - Gestão de itens em tempo real, actualização de quantidades, cálculo de subtotal, taxa de serviço e total formatado em Kwanzas (Kz).

- **Checkout Simulado Completo:**
  - Formulário com validação de dados do comprador (Nome, E-mail, Telefone, Província, NIF).
  - Três métodos de pagamento nacionais: **Multicaixa Express**, **Pagamento por Referência Multicaixa** e **Transferência Bancária Imediata**.
  - Simulação de processamento seguro EMIS.

- **Bilhete Digital com QR Code:**
  - Geração instantânea de bilhete digital com código QR único de validação nos torniquetes.
  - Estilização de talão destacável institucional.
  - Suporte completo a **Impressão e Exportação em PDF** (`Ctrl+P` / botão dedicado), com folha de estilo optimizada para impressão.

- **Área do Adepto (Meus Bilhetes):**
  - Histórico de encomendas e bilhetes emitidos guardados localmente com persistência em `localStorage`.

- **Lista de Favoritos:**
  - Marcação de jogos com persistência e acesso rápido no cabeçalho.

- **Tema Claro / Escuro (Light / Dark Mode):**
  - Alternador simples e persistente integrado nas variáveis globais CSS.

---

## 📁 Estrutura do Projecto

```text
bilhetes/
├── public/
│   ├── index.html            # Ponto de entrada HTML e metadados
│   ├── manifest.json         # Manifesto PWA
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── ScrollToTop.js        # Restaura a rolagem ao navegar
│   │   ├── home/
│   │   │   ├── HeroSection.js        # Secção principal com foto sóbria e pesquisa
│   │   │   ├── FeaturedBanner.js     # Banner do jogo principal (Clássico dos Clássicos)
│   │   │   └── HowItWorks.js         # Passos do processo de compra
│   │   ├── layout/
│   │   │   ├── Header.js             # Cabeçalho com fundo preto carvão e navegação
│   │   │   └── Footer.js             # Rodapé institucional angolano
│   │   ├── matches/
│   │   │   ├── MatchCard.js          # Cartão sóbrio de jogo e bilhetes
│   │   │   └── StadiumSectorMap.js   # Mapa SVG interactivo de bancadas
│   │   └── stadiums/
│   │       └── StadiumCard.js        # Cartão de recintos desportivos
│   ├── context/
│   │   ├── CartContext.js            # Estado global do carrinho
│   │   ├── FavoritesContext.js       # Estado global dos favoritos
│   │   ├── OrdersContext.js          # Histórico de bilhetes comprados
│   │   ├── ThemeContext.js           # Alternância Claro / Escuro
│   │   └── ToastContext.js           # Notificações visuais sóbrias
│   ├── data/
│   │   └── sportsData.js             # Base de dados estruturada do desporto angolano
│   ├── pages/
│   │   ├── HomePage.js               # Página Inicial
│   │   ├── MatchesPage.js            # Calendário e listagem filtrada de jogos
│   │   ├── MatchDetailPage.js        # Detalhes do jogo e selecção de lugares
│   │   ├── SportsPage.js             # Listagem de modalidades
│   │   ├── SportDetailPage.js        # Modalidade específica e seus eventos
│   │   ├── CompetitionsPage.js       # Listagem de competições
│   │   ├── CompetitionDetailPage.js  # Detalhes da competição
│   │   ├── StadiumsPage.js           # Listagem de estádios e pavilhões
│   │   ├── StadiumDetailPage.js      # Detalhes do recinto
│   │   ├── CartPage.js               # Carrinho de compras
│   │   ├── CheckoutPage.js           # Finalização e simulação de pagamento
│   │   ├── ConfirmationPage.js       # Confirmação e bilhete digital pronto para impressão
│   │   ├── UserTicketsPage.js        # Área do Adepto / Meus Bilhetes
│   │   ├── FavoritesPage.js          # Jogos marcados como favoritos
│   │   ├── ContactPage.js            # Contactos e perguntas frequentes (FAQ)
│   │   └── NotFoundPage.js           # Página 404
│   ├── App.js                        # Configuração de rotas (React Router)
│   ├── index.css                     # Sistema global de estilos e variáveis CSS
│   └── index.js                      # Ponto de entrada React
├── package.json
└── README.md
```

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/) (v19)** — Biblioteca para construção de interfaces reactivas.
- **[React Router DOM](https://reactrouter.com/) (v7)** — Gestão de rotas e navegação SPA.
- **[Lucide React](https://lucide.dev/)** — Ícones monocromáticos e modernos.
- **[qrcode.react](https://github.com/zpao/qrcode.react)** — Geração de QR Codes dinâmicos para validação de bilhetes.
- **CSS Variables nativas** — Sistema centralizado de estilos e alternância de temas instantânea.

---

## 💻 Como Executar o Projecto

### Pré-requisitos:
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- `npm` ou `yarn`

### 1. Clonar o repositório:
```bash
git clone https://github.com/EfraimBernardo/bilhetes.git
cd bilhetes
```

### 2. Instalar as dependências:
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento:
```bash
npm start
```
O projecto estará acessível no navegador em:  
👉 `http://localhost:3000`

### 4. Compilar para produção:
```bash
npm run build
```
Os ficheiros optimizados serão gerados no directório `build/`.

---

## 📄 Licença

Este projecto foi desenvolvido com dedicação ao desporto nacional angolano.  
Todos os direitos reservados © 2026 **Angola Sports Tickets**.

# ROL CONCEPT — Salão de Beleza na Vila Ema, São Paulo

[![HTML5](https://img.shields.io/badge/HTML5-Semântico-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Design%20System-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Status](https://img.shields.io/badge/Status-Produção%20Pronta-2ea44f?style=for-the-badge)]()
[![SEO](https://img.shields.io/badge/SEO-Local%20%2B%20Schema.org-8A2BE2?style=for-the-badge)]()

> *"Beleza é identidade, autoestima e confiança."*  
> **ROL CONCEPT — Um salão para todos.**

---

## 📌 Sobre o Projeto

O **ROL CONCEPT** é uma landing page comercial e institucional de alto padrão desenvolvida para o salão de beleza localizado na Vila Ema, São Paulo. O projeto foi arquitetado com estética editorial contemporânea, paleta refinada (*Preto profundo, Grafite, Off-white e Dourado Champagne*), efeitos modernos de **Glassmorphism**, micro-interações fluidas e foco total na conversão para agendamentos via **WhatsApp**.

---

## 🚀 Arquitetura & Stack Tecnológica

O projeto adota uma arquitetura **100% Vanilla Web**, priorizando performance máxima, zero dependências pesadas de terceiros e tempo de carregamento ultrarrápido (Core Web Vitals):

- **HTML5 Semântico:** Estrutura acessível com tags semânticas (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), acessibilidade ARIA e marcação de dados estruturados com **Schema.org** (`HairSalon`).
- **CSS3 Moderno:** Design System com Custom Properties (variáveis CSS), Flexbox, CSS Grid, tipografia fluida via Google Fonts (*Inter*), efeitos de Glassmorphism com `backdrop-filter`, sombras suaves e responsividade Mobile-First.
- **Vanilla JavaScript (ES6+):** Lógica orientada a eventos puros sem frameworks (sem React, sem Node.js em runtime), garantindo execução instantânea no navegador.

---

## ✨ Funcionalidades Principais

1. **Banner Rotativo Hero de 5 Segundos:**
   - 3 slides de alta definição com transição de opacidade e escala.
   - Abas indicadoras com barra de progresso visual em tempo real.
   - Controles de navegação (anterior, próximo, clique nas abas, teclado e swipe touch para celular).
   - Pausa automática ao posicionar o cursor do mouse (*hover*).

2. **Fluxo de Agendamento Interativo no WhatsApp:**
   - Modal de agendamento acionado diretamente pelos botões de CTA dos serviços.
   - Formulário na página com seleção de serviço, dia da semana, período do dia e observações.
   - Formatação automática de mensagem pré-definida e redirecionamento direto para a conversa oficial no WhatsApp: `(11) 98594-0916`.

3. **Filtro de Serviços por Categoria:**
   - Abas com botões pílula para filtrar: *Todos, Cortes, Coloração & Mechas, Tratamentos, Styling*.
   - Transições animadas suaves de entrada e saída dos cards.

4. **Experiência de Localização & Contato:**
   - Cópia do endereço para a área de transferência com um clique e feedback via **Toast Notification**.
   - Integração com o Google Maps via embed interativo e botão direto de rotas no app de navegação.

5. **Navegação & Usabilidade:**
   - Header fixo com efeito de vidro e sombra ao rolar a página (*sticky scroll*).
   - Destaque automático do link ativo do menu conforme o usuário percorre a página (*scroll spy*).
   - Menu drawer mobile responsivo com animação suave e bloqueio de rolagem do body.
   - Botão flutuante "Voltar ao Topo" posicionado no canto inferior direito.

6. **SEO Local & Performance:**
   - Meta tags Open Graph completas para pré-visualização refinada em WhatsApp e redes sociais.
   - Dados Estruturados Schema.org (`HairSalon`) para indexação no Google Local.
   - Arquivos `robots.txt` e `sitemap.xml` configurados.
   - Imagens otimizadas com atributos `loading="lazy"` e `fetchpriority="high"`.

---

## 📂 Estrutura de Diretórios

```plaintext
rol-concept/
├── assets/                  # Imagens de alta qualidade, logos e banners do salão
│   ├── dono.png
│   ├── hero-banner-glow.jpg
│   ├── hero-banner-salao.jpg
│   ├── hero-banner-welcome.jpg
│   ├── logo-novo.png
│   ├── logo.jpg
│   ├── modelo01.jpg
│   ├── modelo02.jpg
│   ├── paleta.png
│   ├── sala02.png
│   ├── salao01.png
│   ├── servico-coloracao.jpg
│   ├── servico-corte-fem.jpg
│   ├── servico-corte-masc.jpg
│   ├── servico-cronograma.jpg
│   ├── servico-mechas-glow.jpg
│   └── servico-styling.jpg
├── docs/                    # Especificações e dados institucionais
│   ├── SPEC.md
│   ├── info.txt
│   └── logo.jpg
├── .env.example             # Documentação de variáveis de ambiente recomendadas
├── .gitignore               # Proteção de credenciais, logs e temporários do OS
├── app.js                   # Lógica interativa Vanilla JS (Carrossel, WhatsApp, Modal)
├── index.html               # Estrutura HTML5 semântica e SEO
├── publish.ps1              # Script de automação e push para PowerShell (Windows)
├── publish.sh               # Script de automação e push para Bash (Linux/macOS)
├── README.md                # Documentação técnica e operacional do projeto
├── robots.txt               # Diretrizes para indexadores e buscadores
├── sitemap.xml              # Mapa do site para indexação no Google
└── styles.css               # Design System, Glassmorphism e estilos responsivos
```

---

## 💻 Como Executar Localmente

Como o projeto é construído exclusivamente em **HTML5, CSS3 e JavaScript Puro**, não há necessidade de compilação ou instalação de pacotes (`npm install`).

### Opção 1: Abrir diretamente no navegador
Basta dar um duplo clique no arquivo [`index.html`](index.html) ou abri-lo com qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

### Opção 2: Extensão Live Server (VS Code / Antigravity IDE)
1. Instale a extensão **Live Server**.
2. Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.
3. O projeto será iniciado em `http://127.0.0.1:5500`.

### Opção 3: Servidor HTTP simples (Python)
Se você tiver Python instalado no computador, execute no terminal:
```bash
# Python 3
python -m http.server 8080
```
E acesse `http://localhost:8080` no navegador.

---

## 🌐 Publicação no GitHub Pages

Este repositório está pronto para ser publicado gratuitamente pelo **GitHub Pages**:

1. Acesse o repositório no GitHub: [https://github.com/ofcrldesign-cpu/rolconcept](https://github.com/ofcrldesign-cpu/rolconcept)
2. Vá em **Settings** > **Pages** (no menu lateral esquerdo).
3. Na seção **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `/ (root)`
4. Clique em **Save**.
5. Em alguns instantes, o site estará disponível publicamente no link fornecido pelo GitHub (ex: `https://ofcrldesign-cpu.github.io/rolconcept/`).

---

## 📍 Informações do Salão

- **Nome Comercial:** ROL CONCEPT
- **Endereço:** R. Uhland, 641 - Vila Ema, São Paulo - SP, 03288-040
- **Telefone / WhatsApp:** [(11) 98594-0916](https://wa.me/5511985940916)
- **Instagram:** [@rolconceptsalao](https://www.instagram.com/rolconceptsalao/)
- **Avaliação:** ⭐ 4.9 / 5 (32 avaliações no Google)
- **Comodidades:** Estacionamento no local, Wi-Fi gratuito, Espaço LGBTQ+ Friendly, Banheiro neutro.

---

## 📄 Licença

Este projeto é de propriedade exclusiva do salão **ROL CONCEPT**. Todos os direitos reservados © 2026.

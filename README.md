# 📖 Marginalia — Rede Social Contemplativa para Leitores

> **A beleza do livro não está apenas no texto, mas nas conversas silenciosas travadas em suas margens.**

O **Marginalia** é uma plataforma intimista, minimalista e poética projetada para leitores ávidos registrarem anotações ("margens"), compartilharem trechos sob perspectivas estéticas sofisticadas e se conectarem por afinidades de sensibilidade e alma literária.

Este repositório contém a versão de **Demonstração Pública (Demo)** completa, projetada para ser estável, performática, segura e 100% pronta para deploy imediato.

---

## ✨ Principais Funcionalidades da Demo

* **📖 Diário de Linhas**: Um feed inteligente de reflexões literárias estruturado sob duas perspectivas: *Para Você* (curadoria de sintonia) e *Recentes*.
* **🏛️ O Museu das Margens**: Uma galeria curada das anotações mais melancólicas, amadas, intimistas ou noturnas criadas pelos próprios leitores da plataforma.
* **✨ Daily Opening Moment**: Um cartão acolhedor de boas-vindas exibido diariamente com provocações intelectuais ou rituais de sintonização rápida de acordo com o humor literário do usuário.
* **🤝 Coincidência Literária**: Micro-sinalizações que cruzam as pontes de suas anotações com as reflexões e livros compartilhados de outros leitores.
* **🎨 Share Studio Expandido**: Um estúdio fotográfico integrado para exportar suas margens em formatos elegantes com DPI de alta definição (`pixelRatio: 3`), prontos para as redes sociais (Instagram, Twitter).
* **🌌 Aura e Mapa da Alma**: Análise em tempo real de hábitos e sentimentos literários, renderizando uma aura de cores dinâmicas e uma constelação visual da alma leitora do usuário.
* **✉️ Carta para o Futuro**: Uma cápsula do tempo literária onde os leitores registram reflexões profundas sobre as suas leituras atuais para serem abertas posteriormente.
* **💬 Companheira de Leitura**: Uma IA de sensibilidade erudita (Google Gemini) no lado do servidor para conversar, analisar subtextos e propor discussões filosóficas.

---

## 🛠️ Requisitos Técnicos

* **Node.js**: v18.0.0 ou superior.
* **npm**: v9.0.0 ou superior.

---

## 🚀 Instalação e Execução

### 1. Clonar e Instalar as Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o exemplo de ambiente e preencha as variáveis correspondentes:
```bash
cp .env.example .env
```
*Insira sua `GEMINI_API_KEY` para ativar os recursos inteligentes no lado do servidor.*

### 3. Executar em Desenvolvimento
```bash
npm run dev
```
O servidor inicializa em `http://localhost:3000`, servindo o React de forma integrada com a API local em Express.

### 4. Executar Validação (Lint)
```bash
npm run lint
```

### 5. Compilar para Produção
```bash
npm run build
```
Isso gera a pasta estática `/dist` e compila o servidor TypeScript para o arquivo portátil `/dist/server.cjs` via `esbuild`.

### 6. Executar o Servidor em Produção
```bash
npm run start
```

---

## 🔒 Segurança e Hardening de Dados

* **Privacidade Absoluta**: Sem banco de dados externo ou monitoramento invasivo nesta demo. Os dados do leitor residem 100% em seu dispositivo através de um adaptador seguro de `localStorage`.
* **Proteção contra JSON Corrompido**: Toda leitura de armazenamento utiliza utilitários com mecanismos de try/catch robustos e fallbacks imediatos para evitar quebras da aplicação.
* **Chaves de API Ocultas**: A chave de API do Gemini reside de forma exclusiva e restrita no lado do servidor (`server.ts`). O frontend consome apenas rotas seguras de proxy `/api/*`.

---

## 🌍 Instruções de Deploy Imediato

Hospedar a sua versão de demonstração pública é simples e gratuito. Consulte o guia detalhado em:
👉 **[Guia de Deploy (docs/DEPLOYMENT.md)](docs/DEPLOYMENT.md)**

Para entender os rumos técnicos e tradeoffs de infraestrutura para o futuro, consulte:
👉 **[Plano de Infraestrutura Futura (docs/INFRASTRUCTURE_DECISION.md)](docs/INFRASTRUCTURE_DECISION.md)**

---

## 🎨 Voz do Produto e Identidade Visual

O design do Marginalia foi feito com respeito aos clássicos:
* **Tipografia**: O contraste impecável da semântica moderna da fonte **Inter** com os acentos poéticos da fonte serifada e retro **Space Grotesk** e **JetBrains Mono**.
* **Visual**: Tons quentes e sóbrios de papel envelhecido, café e grafite (`#FAF8F3`, `#BDAB9C`, `#1C1916`).
* **Interações**: Movimentos suaves de folhear páginas orientados pela biblioteca `motion`.

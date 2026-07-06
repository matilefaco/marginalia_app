# Guia de Deploy — Marginalia

Este documento orienta os engenheiros e administradores sobre como realizar o deploy seguro, estável e otimizado do **Marginalia** em ambientes de produção ou demonstração pública.

---

## 📖 Visão Geral do Marginalia

O **Marginalia** é uma rede social contemplativa e íntima para leitores ávidos, permitindo destacar trechos de livros, registrar anotações ("margens") e criar visualizações poéticas baseadas na alma leitora (Aura Literária, Mapa da Alma, Retrospectiva Anual).

- **Arquitetura Atual**: Aplicação Fullstack (React + Vite + Express).
- **Armazenamento**: Camada de persistência local segura via `localStorage` (ideal para demos, prototipação rápida e privacidade extrema do leitor).
- **Processamento de IA**: Integração com a API Gemini no lado do servidor (`server.ts`) para garantir segurança absoluta da chave de API e prevenir o vazamento de credenciais no frontend.

---

## 🛠️ Requisitos Mínimos

- **Runtime**: Node.js v18 ou superior.
- **Gerenciador de Pacotes**: npm v9 ou superior.
- **Serviços Externos**: Uma chave de API da Google Gemini (`GEMINI_API_KEY`) para habilitar recursos inteligentes de IA. Caso não seja fornecida, o sistema entra em modo de demonstração off-line de forma graciosa e poética, sem quebrar.

---

## 🔌 Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto contendo as seguintes definições (nunca comite chaves reais ao repositório):

```env
# Chave de API da Google Gemini (necessária para recursos de IA no servidor)
GEMINI_API_KEY="sua_chave_de_api_aqui"

# Porta onde o servidor irá escutar (a plataforma de nuvem geralmente define isso dinamicamente)
PORT=3000

# Variável de ambiente do Node para determinar o modo de otimização
NODE_ENV=production
```

---

## 💻 Comandos e Scripts de Construção

### 1. Instalação de Dependências
```bash
npm install
```

### 2. Executar em Modo de Desenvolvimento (Vite HMR + Express Dev API)
```bash
npm run dev
```

### 3. Executar o Linter e Verificação de Tipos
```bash
npm run lint
```

### 4. Compilar a Aplicação para Produção
```bash
npm run build
```
*Nota: Este comando executa duas tarefas essenciais:*
- `vite build`: Compila os recursos estáticos de React para a pasta `/dist`.
- `esbuild`: Empacota o servidor TypeScript (`server.ts`) em um único arquivo CJS (`dist/server.cjs`), garantindo portabilidade absoluta e reduzindo o tempo de inicialização (cold-start).

### 5. Iniciar o Servidor de Produção
```bash
npm run start
```

---

## 🗺️ Opções de Deploy e Comparativo Técnico

### Opção A: Render (Altamente Recomendado para a Demo)
* **Por que escolher**: Suporta perfeitamente aplicações fullstack em Node.js com uma interface simples.
* **Instruções**:
  1. Crie um novo **Web Service** conectado ao seu repositório Git.
  2. Configure os comandos:
     * **Build Command**: `npm install && npm run build`
     * **Start Command**: `npm run start`
  3. Adicione as variáveis de ambiente:
     * `GEMINI_API_KEY`: sua_chave
     * `NODE_ENV`: `production`
     * O Render injeta dinamicamente a porta através da variável `PORT`, a qual o nosso `server.ts` lê automaticamente.

### Opção B: Railway (Altamente Recomendado para Evolução)
* **Por que escolher**: Extremamente rápido de subir e facilita a adição posterior de banco de dados (PostgreSQL/Redis) com um clique.
* **Instruções**:
  1. Adicione um novo projeto e selecione "Deploy de repositório GitHub".
  2. O Railway detecta os scripts no `package.json` de forma nativa.
  3. Configure as variáveis de ambiente na aba "Variables".

### Opção C: Vercel ou Netlify (Apenas para Frontend Estático)
* **Limitação**: O Vercel foi projetado prioritariamente para aplicações serverless ou estáticas. Embora suporte APIs serverless em `/api`, o servidor contínuo Express (`server.ts`) não funcionará de forma nativa sem adaptações significativas e divisão da arquitetura.
* **Veredito**: Não é a primeira escolha para esta demonstração fullstack integrada.

### Opção D: Fly.io (Excelente para Ambientes de Baixa Latência)
* **Por que escolher**: Executa contêineres Docker leves diretamente na borda (Edge).
* **Limitação**: Requer configuração de CLI e um arquivo `fly.toml`, o que é ligeiramente mais técnico do que Render ou Railway.

---

## ⚠️ Limitações da Versão Demo e Boas Práticas

1. **Dados Locais**: Toda anotação criada e alteração de perfil residem no armazenamento do navegador (`localStorage`). Ao limpar os dados do navegador ou trocar de dispositivo, as margens personalizadas do leitor expiram.
2. **Aviso Sutil aos Usuários**: Caso decida hospedar publicamente, a UI do Marginalia já exibe sutilmente no rodapé a mensagem poética e transparente: *"Suas margens e alma leitora ficam guardadas com segurança no silêncio deste dispositivo."*
3. **Escalabilidade da IA**: A API do Gemini pode impor limites de requisições em chaves gratuitas. O servidor trata falhas graciosamente retornando modelos de preenchimento predefinidos de alto nível.

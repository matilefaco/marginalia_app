# Decisão de Infraestrutura e Arquitetura Futura — Marginalia

Este documento resume a arquitetura técnica atual do **Marginalia**, fundamenta as escolhas tecnológicas para o estágio de demonstração pública (Demo) e desenha o plano de migração de infraestrutura de alta confiabilidade para o lançamento de produção com usuários reais.

---

## 🏛️ 1. Arquitetura Atual (Estágio Demo)

A arquitetura de desenvolvimento e demo pública do Marginalia foi projetada para ter **zero dependência de infraestrutura complexa**, garantindo velocidade, segurança e facilidade de deploy:

```
┌────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Cliente)                 │
│                                                        │
│  ┌─────────────────┐             ┌──────────────────┐  │
│  │   UI em React   │             │   LocalStorage   │  │
│  │ (Inter & Mono)  │◄───────────►│ (Persistência)   │  │
│  └────────┬────────┘             └──────────────────┘  │
└───────────┼────────────────────────────────────────────┘
            │ 
            │ Chamadas de API (/api/*)
            ▼
┌────────────────────────────────────────────────────────┐
│                 SERVIDOR CLOUD RUN / RENDER            │
│                                                        │
│  ┌─────────────────┐             ┌──────────────────┐  │
│  │   Servidor CJS  │────────────►│  Google Gemini   │  │
│  │ (Express + Vite)│             │   (Flash 3.5)    │  │
│  └─────────────────┘             └──────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Atributos Técnicos Atuais:
* **Frontend**: React 19 + Tailwind CSS + Lucide Icons + Motion (para micro-animações fluidas e transições de página).
* **Backend**: Express em Node.js servindo a aplicação SPA e disponibilizando APIs de geração de inteligência literária.
* **Inteligência Artificial**: API do Gemini 3.5 Flash encapsulada no servidor. Chaves de API nunca transitam ou são salvas no lado do cliente.
* **Banco de Dados**: Nenhum. Persistência baseada em `localStorage` com versionamento de schema para evitar quebras ou dados corrompidos.
* **Exportação de Imagens**: Processamento client-side via biblioteca robusta `html-to-image` utilizando um helper centralizado com DPI triplo (`pixelRatio: 3`), livre de capturas de botões e falhas de fontes.

---

## 🚀 2. Recomendações para a Demo Pública (Curto Prazo)

Para a hospedagem da demonstração pública atual do produto para investidores ou feedbacks iniciais, a recomendação oficial é utilizar o **Render** ou **Railway**.

### Por que estas plataformas?
1. **Velocidade de Setup**: Conexão nativa com o repositório Git, reconhecimento de pacotes do Node e execução imediata através do script `build` unificado do `package.json`.
2. **Suporte a Portas Dinâmicas**: Ambas as plataformas expõem as variáveis `PORT` de forma automática, permitindo que o Express se adapte nativamente sem necessidade de configurações de proxy reverso manuais.
3. **Escalabilidade Gratuita/Baixo Custo**: Oferecem camadas generosas para demonstrações sem custos fixos iniciais abusivos.

---

## 🗺️ 3. Planejamento de Infraestrutura para Produção Real (Médio e Longo Prazo)

Quando o Marginalia transicionar para receber leitores reais que necessitam de sincronização multi-dispositivo, interações sociais reais no feed e segurança de dados, a infraestrutura local deve ser substituída por uma arquitetura robusta.

### Proposta de Linha do Tempo e Pilha Tecnológica:

| Componente | Opção Recomendada | Justificativa | Tradeoff |
| :--- | :--- | :--- | :--- |
| **Banco de Dados** | **Supabase (PostgreSQL)** | Relações complexas entre livros, autores, ecos e margens se adaptam perfeitamente ao modelo relacional. O Supabase fornece suporte instantâneo a conexões em tempo real. | Requer planejamento cuidadoso de migração de schema (Drizzle ORM ou similar). |
| **Autenticação** | **Supabase Auth** | Suporte integrado a login por e-mail/senha, Google e Apple, com segurança de ponta. | Acoplamento ao ecossistema Supabase (pode ser contornado usando Firebase Auth). |
| **Hospedagem API** | **Cloud Run (Google Cloud)** | Contêineres que escalam até zero quando não há requisições, eliminando custos ociosos. Suporte nativo à infraestrutura de IA da Google. | Levemente mais técnico do que o Render (resolvido com um pipeline simples de CI/CD via GitHub Actions). |
| **Análise de Dados** | **Plausible ou PostHog** | Analytics focado em privacidade absoluta do usuário, sem rastreamento de dados de leitura ou perfis íntimos sem consentimento. | Custo adicional mensal dependendo do tráfego. |
| **Rastreamento de Erros** | **Sentry** | Identificação em tempo real de falhas de renderização ou quebras na exportação de imagens de leitores em diferentes modelos de smartphones. | Configuração inicial consome esforço técnico. |

---

## 🛠️ 4. Próximos Passos Imediatos para Desenvolvimento

Antes de escrever o primeiro código de integração com banco de dados em produção, as seguintes tarefas devem ser preparadas:
1. **Estruturação de Schema Relacional**: Definir tabelas para `users`, `margins`, `comments` e `challenges` utilizando Drizzle ORM ou Prisma.
2. **Setup do Pipeline de Migração**: Adicionar scripts para exportar os dados legados de `localStorage` dos leitores pioneiros para o banco de dados principal no primeiro login autenticado.
3. **Controle de Rate-Limit na API Gemini**: Implementar um middleware de limitação no Express (`express-rate-limit`) para evitar abusos na chave de API e consumo financeiro inesperado.

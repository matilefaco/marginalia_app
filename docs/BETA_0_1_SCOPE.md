# Escopo do Marginalia — Beta 0.1

Este documento descreve o escopo oficial da versão **Beta 0.1** do **Marginalia**, orientando a transição de um protótipo com dados simulados para um produto honesto, confiável e focado na experiência do leitor.

---

## 1. Estágio Atual (Local-Preview)

O Marginalia está atualmente no estágio **Local-Preview**. Nesta fase, a aplicação funciona como uma experiência individual e totalmente local:
* **Persistência local**: Todos os dados gerados (perfil, novas margens, livros de origem adicionados) são salvos de forma segura no próprio dispositivo através do `localStorage`.
* **Sem nuvem**: Não há banco de dados centralizado ou servidores de sincronização ativos nesta fase.
* **Privacidade absoluta**: Suas anotações e reflexões literárias permanecem exclusivamente sob o seu controle no navegador local.

---

## 2. Recursos Disponíveis Agora (Núcleo Ativo)

Os seguintes recursos individuais constituem o núcleo do produto e continuam totalmente operacionais nesta versão local:
* **Onboarding Imersivo**: Fluxo de calibração para capturar afinidades de leitura, preferências de spoilers e dados de identidade.
* **Aura Literária**: Visualização cromática e representativa gerada com base nos sentimentos e hábitos do leitor.
* **DNA Literário**: Eixo estrutural de filamentos literários baseado nos Livros de Origem e autores influentes.
* **Livros de Origem**: Adição, remoção e personalização de obras fundamentais com o resíduo emocional deixado no leitor.
* **Captura de Trechos (OCR)**: Carregamento de imagens e simulação/processamento inteligente de textos literários para facilitar a digitação de citações.
* **Criação de Margens**: Registro de reflexões pessoais sobre trechos literários, com escolha de nível de spoiler, temas estéticos e conexões com sentimentos.
* **Share Studio**: Customização e exportação de belos cartões estilizados de margem ou assinatura poética para compartilhamento ou armazenamento pessoal.
* **Companheira de Leitura**: Diálogo poético e analítico com uma inteligência que caminha ao lado do leitor, oferecendo insights baseados exclusivamente nos dados locais disponíveis.
* **Mapa da Alma**: Constelação elegante de conexões entre suas leituras, autores, emoções e anotações pessoais reais.
* **Marginalia Wrapped**: Retrospectiva cronográfica e analítica do percurso literário do usuário.
* **Curadoria Marginalia (Descobertas & Ecos)**: Catálogo editorial de inspiração literária, oferecendo trechos de clássicos e territórios de emoções sem fingir atividade comunitária simulada.

---

## 3. Recursos Planejados para a Beta 0.1 Real

Para as próximas fases de desenvolvimento, o escopo de transição para uma beta integrada em nuvem inclui:
* **Autenticação Real**: Login seguro utilizando Firebase Authentication (Google, E-mail/Senha).
* **Persistência em Nuvem (Durable Cloud Storage)**: Armazenamento persistente no Firebase Firestore para sincronização transparente entre múltiplos dispositivos.
* **CRUD Completo de Margens**: Gerenciamento e edição em tempo real das anotações e sentimentos salvos na nuvem.
* **Perfis Públicos Reais**: Endereços públicos personalizáveis (`marginalia.app/username`) para que leitores compartilhem sua estante e Aura se desejarem.
* **Páginas de Margem Públicas**: Links permanentes e compartilháveis para margens específicas de usuários reais.
* **Feed Multiusuário Real**: Mural comunitário unificado alimentado exclusivamente por anotações e reflexões reais de leitores ativos na plataforma.
* **Reações e Ecos Reais**: Interações honestas entre leitores sobre as margens compartilhadas (sem números fictícios).
* **Comentários Reais**: Discussões poéticas e intelectuais e discussões em linha sobre citações.
* **Seguir Leitores**: Criação de redes de interesse e ressonância literária com outros usuários.
* **Ferramentas de Moderação**: Mecanismos de bloqueio, privacidade de perfil e denúncia de conteúdo impróprio para segurança do usuário.

---

## 4. Recursos Fora do Escopo Atual

Os seguintes recursos foram identificados como fictícios ou desnecessários para a Beta 0.1 e estão temporariamente ocultados, desativados ou totalmente descartados:
* **Feed Social Simulado**: Linhas do tempo contendo atividades de usuários fictícios que fingiam atividade comunitária.
* **Compatibilidade com Leitores Fictícios**: Sistema de match literário comparando o usuário com pessoas inexistentes da base de dados.
* **Streaks Artificiais**: Contadores de dias seguidos que incrementavam sem uma lógica cronológica real ou iniciavam artificialmente em 3 dias.
* **Notificações Simuladas**: Alertas falsos de likes ou novos comentários inventados por bots ou gerados manualmente para simular engajamento.
* **Números Comunitários Inventados**: Indicadores de milhares de membros ou margens em ecos temáticos que não correspondiam à realidade.
* **Museu Comunitário Falso**: Rankings e listas de popularidade compostas por dados codificados manualmente de forma estática.
* **Gamificação & Rankings**: Tabelas de classificação, pontuações de leitura competitivas e medalhas de engajamento forçado.
* **Monetização**: Planos de assinatura, barreiras de conteúdo pago (paywalls) ou vendas dentro do aplicativo.
* **Aplicativo Nativo**: Distribuição em lojas de aplicativos móveis (Apple App Store, Google Play Store) durante esta fase de visualização web.

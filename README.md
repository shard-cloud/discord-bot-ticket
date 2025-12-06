# Discord Bot Ticket

🎫 **Bot Discord completo para sistema de tickets de suporte**

Um bot Discord robusto desenvolvido em Node.js com Discord.js v14, oferecendo um sistema completo de gerenciamento de tickets com múltiplas categorias, painéis interativos, modais personalizados, transcrições automáticas e muito mais.

## 🎯 Visão Geral

Este bot Discord é uma solução completa para servidores que desejam implementar:

- **🎫 Sistema de Tickets** - Criação, gerenciamento e fechamento de tickets
- **📋 Múltiplas Categorias** - Diferentes tipos de tickets (suporte, report, vendas, etc.)
- **🎨 Painéis Interativos** - Botões ou menus dropdown para criar tickets
- **📝 Modais Personalizados** - Formulários com perguntas customizáveis
- **📄 Transcrições Automáticas** - Geração de transcrições HTML/TXT
- **⭐ Sistema de Feedback** - Avaliações e feedback dos atendimentos
- **🤖 Automações** - Auto-fechamento, auto-exclusão e muito mais

## 🚀 Funcionalidades Principais

### 🎫 Sistema de Tickets
- **Múltiplas Categorias** - Configure diferentes tipos de tickets
- **Painéis Interativos** - Botões ou menus para criar tickets
- **Modais Personalizados** - Formulários antes de criar o ticket
- **Sistema de Prioridades** - Defina prioridades (baixa, média, alta)
- **Sistema de Claim** - Staff pode reivindicar tickets para atendimento 1-on-1
- **Alertas e Notificações** - Ping automático de roles quando ticket é criado

### 🛠️ Comandos de Gerenciamento
- `/panel` - Criar painel de tickets
- `/close` - Fechar ticket
- `/delete` - Deletar ticket permanentemente
- `/reopen` - Reabrir ticket fechado
- `/claim` - Reivindicar ticket
- `/add` - Adicionar usuário ao ticket
- `/remove` - Remover usuário do ticket
- `/rename` - Renomear canal do ticket
- `/transcript` - Gerar transcrição
- E muitos outros...

### 🤖 Recursos Automatizados
- **Auto-fechamento** - Fecha tickets inativos automaticamente
- **Auto-exclusão** - Remove tickets fechados após tempo determinado
- **Auto-resposta** - Respostas automáticas para mensagens comuns
- **Blacklist automática** - Limpeza automática de blacklists expiradas
- **Canais de estatísticas** - Atualização automática de contadores

### 📊 Sistema de Estatísticas
- Total de tickets criados
- Tickets abertos em tempo real
- Sistema de reivindicações
- Sistema de avaliações
- Mensagens totais
- Estatísticas por usuário

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Node.js** | 20+ | Runtime JavaScript |
| **Discord.js** | 14.25.0 | API do Discord |
| **SQLite** | - | Banco de dados local |
| **QuickDB** | 9.1.7 | Wrapper para SQLite |
| **YAML** | 2.8.1 | Configuração |
| **discord-html-transcripts** | 3.2.0 | Geração de transcrições |

## 📋 Pré-requisitos

- **Node.js** 20 ou superior
- **Bot Discord** criado no Discord Developer Portal
- **Token do bot** configurado
- **Permissões** adequadas no servidor Discord

## 🚀 Instalação Rápida

### 1. Clone ou baixe o projeto

```bash
git clone <repositorio>
cd discord-bot-ticket
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

```bash
cp .env.example .env
nano .env
```

Adicione seu token:
```bash
BOT_TOKEN=seu-token-aqui
```

### 4. Configure o config.yml

Edite o arquivo `config.yml` com as configurações do seu servidor (IDs de categorias, roles, etc.)

### 5. Inicie o bot

```bash
npm start
```

## 📚 Documentação Completa

A documentação completa está disponível na pasta `docs/`:

- **[Introdução](docs/01-introducao.md)** - Visão geral e funcionalidades
- **[Configuração](docs/02-configuracao.md)** - Setup detalhado e configurações
- **[Executando](docs/03-rodando.md)** - Como rodar e testar o bot
- **[Deploy](docs/04-deploy.md)** - Deploy em produção

## 🎮 Comandos Principais

### Comandos de Tickets
```bash
/panel id:1 layout:Buttons    # Criar painel de tickets
/close reason:Resolvido        # Fechar ticket
/reopen                        # Reabrir ticket fechado
/claim                         # Reivindicar ticket
/add user:@usuario            # Adicionar usuário
/remove user:@usuario          # Remover usuário
/transcript                    # Gerar transcrição
```

### Comandos de Utilidade
```bash
/help                          # Lista de comandos
/ping                          # Ver latência
/stats                         # Estatísticas do bot
/blacklist add user:@usuario  # Adicionar à blacklist
```

## ⚙️ Configuração

Toda a configuração é feita através do arquivo `config.yml`. Principais seções:

- **Categorias de Tickets** - Configure diferentes tipos de tickets
- **Painéis** - Configure mensagens com botões/menus
- **Permissões** - Configure permissões por categoria
- **Automações** - Configure auto-fechamento e auto-exclusão
- **Sistema de Feedback** - Configure avaliações e feedback

Veja a [documentação de configuração](docs/02-configuracao.md) para mais detalhes.

## 🐳 Docker

### Build e Executar

```bash
# Construir imagem
docker build -t discord-bot-ticket .

# Executar container
docker run -d \
  --name ticket-bot \
  --restart unless-stopped \
  -e BOT_TOKEN=seu-token-aqui \
  -v $(pwd)/config.yml:/app/config.yml \
  -v $(pwd)/data:/app/data \
  discord-bot-ticket
```

## 📊 Estrutura do Projeto

```
discord-bot-ticket/
├── commands/          # Comandos do bot
│   ├── Tickets/       # Comandos de tickets
│   ├── Utility/       # Comandos de utilidade
│   └── ContextMenu/   # Comandos de menu de contexto
├── events/            # Eventos do Discord
├── utils/             # Utilitários e funções auxiliares
├── docs/              # Documentação completa
├── data/              # Bancos de dados SQLite (criado automaticamente)
├── config.yml         # Configuração principal
├── index.js           # Arquivo principal
└── package.json       # Dependências
```

## 🔒 Segurança

- Sistema de permissões granular por roles
- Blacklist de usuários para prevenir spam
- Cooldown de comandos e botões
- Validação de ações antes de executar
- Logs de erros para auditoria

## 📝 Licença

MIT License - Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📞 Suporte

Para suporte, abra uma issue no repositório ou consulte a [documentação completa](docs/).

## ✅ Checklist de Instalação

- [ ] Node.js 20+ instalado
- [ ] Bot criado no Discord Developer Portal
- [ ] Token do bot configurado no `.env`
- [ ] Dependências instaladas (`npm install`)
- [ ] `config.yml` configurado com IDs corretos
- [ ] Bot convidado para o servidor com permissões
- [ ] Bot iniciado e conectado
- [ ] Painel criado e testado

---

**Discord Bot Ticket** - Sistema completo de tickets para seu servidor Discord! 🎫✨

## 🚀 Configuração Rápida

### 1. Variáveis de Ambiente

Crie o arquivo `.env` baseado no exemplo:

```bash
cp .env.example .env
```

### 2. Configuração Mínima

```bash
# .env
BOT_TOKEN=seu-token-do-bot-aqui
```

## 📋 Variáveis Detalhadas

### 🔴 Obrigatórias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `BOT_TOKEN` | Token do bot do Discord | `MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GaBcDe.FgHiJkLmNoPqRsTuVwXyZ` |

### 🟡 Opcionais

Não há variáveis opcionais no `.env`. Toda a configuração é feita via `config.yml`.

## 🤖 Como Obter o Token do Bot

### 1. Criar Aplicação no Discord Developer Portal

1. Acesse [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique em **"New Application"**
3. Dê um nome para sua aplicação (ex: "Meu Bot de Tickets")
4. Clique em **"Create"**

### 2. Criar Bot

1. No menu lateral, clique em **"Bot"**
2. Clique em **"Add Bot"**
3. Confirme a criação
4. Em **"Token"**, clique em **"Reset Token"** ou **"Copy"** para copiar o token
5. **IMPORTANTE**: Guarde este token em local seguro. Não compartilhe!

### 3. Configurar Permissões do Bot

1. No menu lateral, clique em **"OAuth2"** → **"URL Generator"**
2. Em **"Scopes"**, selecione:
   - `bot`
   - `applications.commands`
3. Em **"Bot Permissions"**, selecione as permissões necessárias:
   - `View Channels`
   - `Send Messages`
   - `Embed Links`
   - `Attach Files`
   - `Read Message History`
   - `Manage Channels`
   - `Manage Messages`
   - `Manage Roles`
   - `Use External Emojis`
   - `Add Reactions`
   - `Use Slash Commands`
   - Ou simplesmente marque **"Administrator"** (recomendado para facilitar)

### 4. Convidar Bot para o Servidor

1. Copie a URL gerada em **"Generated URL"**
2. Cole no navegador e selecione o servidor
3. Autorize o bot

## ⚙️ Configuração do config.yml

O arquivo `config.yml` é onde toda a configuração do bot é feita. Vamos ver as principais seções:

### 📁 Estrutura Básica

```yaml
# Caminho do banco de dados
dbPath: "{root}/data"

# Roles que podem usar blacklist
rolesThatCanBlacklist: ["111111111111111111"]

# Configurações gerais
maxOpenTickets: "1"
commands_cooldown: "5"
buttons_cooldown: "5"
```

### 🎫 Configuração de Categorias de Tickets

Cada categoria define um tipo de ticket diferente:

```yaml
TicketCategories:
  - id: 1
    name: "suporte"
    nameEmoji: "🎫"
    categoryID: ["111111111111111111"]  # ID da categoria onde tickets serão criados
    closedCategoryID: ["111111111111111111"]  # ID da categoria para tickets fechados
    support_role_ids: ["000000000000000000"]  # Roles de staff
    permissions:
      ticketCreator:
        open:
          allow: ["ViewChannel", "SendMessages"]
          deny: []
        close:
          allow: []
          deny: ["SendMessages"]
```

**Como obter IDs de Categorias:**

1. No Discord, vá em **Configurações do Servidor** → **Canais**
2. Clique com botão direito na categoria → **Copiar ID**
3. Se não aparecer "Copiar ID", ative o **Modo Desenvolvedor**:
   - Discord → Configurações → Avançado → **Modo Desenvolvedor**

### 🎨 Configuração de Painéis

Os painéis são as mensagens com botões/menus para criar tickets:

```yaml
panels:
  - id: 1
    categories: ["1, 2"]  # IDs das categorias que aparecerão no painel
    maxButtonsPerRow: "5"
    menuPlaceholder: "Selecione uma categoria para abrir um ticket."
    panelEmbed:
      color: "#2FF200"
      title: "Suporte Tickets"
      description: "Clique em um dos botões abaixo para criar um ticket."
      timestamp: true
```

### 📝 Configuração de Modais

Modais são formulários que aparecem antes de criar o ticket:

```yaml
modal: true  # Habilitar modal
modalTitle: "Criar Ticket de Suporte"
questions:
  - label: "Qual é o seu problema?"
    placeholder: "Descreva seu problema aqui..."
    style: "Paragraph"  # Short ou Paragraph
    required: true
    minLength: 10
    maxLength: 1000
```

### ⚙️ Configurações Avançadas

#### Auto-fechamento de Tickets

```yaml
autoCloseTickets:
  enabled: true
  interval: "60"  # Verificar a cada 60 segundos
  time: "86400"  # Fechar após 24 horas de inatividade (em segundos)
  ignoreBots: false  # Ignorar mensagens de bots
```

#### Auto-exclusão de Tickets

```yaml
autoDeleteTickets:
  enabled: true
  interval: "60"  # Verificar a cada 60 segundos
  time: "86400"  # Deletar após 24 horas fechado (em segundos)
```

#### Sistema de Claim

```yaml
claimFeature: true  # Habilitar sistema de claim
claimRename: true  # Renomear ticket quando reivindicado
claimRenameName: "{category}-{username}"  # Formato do nome
claim1on1: false  # Apenas criador e staff podem conversar
```

#### Canais de Estatísticas

```yaml
statsChannels:
  enabled: true
  interval: "600"  # Atualizar a cada 10 minutos (mínimo)
  channels:
    - channelID: "111111111111111111"
      type: "totalTickets"  # Tipo: totalTickets, openTickets, totalClaims, etc.
      name: "Total de Tickets: {stats}"
```

#### Sistema de Feedback

```yaml
DMUserSettings:
  embed: true  # Enviar embed na DM
  transcript: true  # Enviar transcrição na DM
  ratingSystem:
    enabled: true
    menu:
      emoji: "⭐"
      placeholder: "Selecione uma Avaliação"
    modal: true
    modalTitle: "Feedback do Ticket"
    questions:
      - label: "Como foi seu atendimento?"
        placeholder: "Escreva seu feedback aqui..."
        style: "Paragraph"
        required: true
```

## 🔧 Configuração de Permissões

### Permissões do Bot no Discord

O bot precisa das seguintes permissões no servidor:

- **View Channels** - Ver canais
- **Send Messages** - Enviar mensagens
- **Embed Links** - Enviar embeds
- **Attach Files** - Anexar arquivos
- **Read Message History** - Ler histórico
- **Manage Channels** - Gerenciar canais (criar/deletar tickets)
- **Manage Messages** - Gerenciar mensagens
- **Manage Roles** - Gerenciar roles (para permissões de tickets)
- **Use External Emojis** - Usar emojis externos
- **Add Reactions** - Adicionar reações
- **Use Slash Commands** - Usar comandos slash

**Ou simplesmente:** Marque **"Administrator"** para facilitar.

### Configuração de Roles de Staff

No `config.yml`, configure os IDs das roles de staff:

```yaml
rolesThatCanBlacklist: ["111111111111111111"]  # Roles que podem usar blacklist

# Em cada categoria:
support_role_ids: ["000000000000000000", "111111111111111111"]  # Roles que podem acessar tickets desta categoria
```

**Como obter ID de Role:**

1. Discord → Configurações do Servidor → Roles
2. Clique com botão direito na role → **Copiar ID**
3. (Se não aparecer, ative Modo Desenvolvedor)

## 📊 Configuração de Banco de Dados

O bot usa SQLite localmente. Por padrão, os bancos ficam em `data/`:

```yaml
dbPath: "{root}/data"  # {root} é substituído pelo diretório do bot
```

Os arquivos criados serão:
- `data/main.sqlite` - Dados principais
- `data/tickets.sqlite` - Dados de tickets
- `data/blacklist.sqlite` - Dados de blacklist

**Importante:** Faça backup regular desta pasta!

## 🎨 Personalização Visual

### Cores dos Embeds

Use códigos hexadecimais:

```yaml
color: "#2FF200"  # Verde
color: "#FF0000"  # Vermelho
color: "#0066FF"  # Azul
```

### Emojis

Você pode usar emojis padrão ou customizados:

```yaml
nameEmoji: "🎫"  # Emoji padrão
nameEmoji: "<:custom:123456789>"  # Emoji customizado do servidor
```

### Textos Personalizados

Todos os textos podem ser personalizados no `config.yml`:

```yaml
panelEmbed:
  title: "Seu Título Aqui"
  description: "Sua descrição aqui\nUse \\n para quebras de linha"
  footer:
    text: "Texto do rodapé"
    iconURL: "URL da imagem"
```

## 🔐 Configuração de Segurança

### Blacklist de Usuários

```yaml
rolesThatCanBlacklist: ["111111111111111111"]  # Roles que podem usar blacklist
rolesOnBlacklist: []  # Roles adicionadas a usuários blacklistados (opcional)
blacklistCleanup: "120"  # Limpar blacklist expirada a cada 120 segundos
```

### Limites de Tickets

```yaml
maxOpenTickets: "1"  # Máximo de tickets abertos por usuário
preventNewTicket: false  # Prevenir novo ticket se tiver fechado (use com cuidado)
```

### Cooldowns

```yaml
commands_cooldown: "5"  # Cooldown de comandos em segundos
buttons_cooldown: "5"  # Cooldown de botões em segundos
```

## 🧪 Testando a Configuração

### 1. Verificar Token

```bash
# Verificar se o token está configurado
cat .env | grep BOT_TOKEN
```

### 2. Validar config.yml

O bot validará automaticamente o `config.yml` ao iniciar. Erros aparecerão no console.

### 3. Testar Comandos

Após iniciar o bot:
1. Use `/help` para ver comandos disponíveis
2. Use `/ping` para verificar latência
3. Use `/panel` para criar um painel de teste

## ⚠️ Problemas Comuns

### 1. Token Inválido

**Erro:** `An invalid token was provided`

**Solução:**
- Verifique se copiou o token completo
- Certifique-se de que não há espaços extras
- Gere um novo token no Discord Developer Portal

### 2. Permissões Insuficientes

**Erro:** `Missing Permissions`

**Solução:**
- Verifique se o bot tem permissões necessárias no servidor
- Certifique-se de que a role do bot está acima das roles que precisa gerenciar
- Considere dar permissão "Administrator" temporariamente para testes

### 3. IDs Inválidos

**Erro:** `Invalid channel` ou `Invalid role`

**Solução:**
- Verifique se os IDs estão corretos no `config.yml`
- Certifique-se de que os IDs existem no servidor
- Use Modo Desenvolvedor para copiar IDs corretamente

### 4. Categoria Não Encontrada

**Erro:** `Category not found`

**Solução:**
- Verifique se a categoria existe no servidor
- Certifique-se de que o bot tem permissão para ver a categoria
- Verifique se o ID está correto no `config.yml`

## ✅ Checklist de Configuração

- [ ] Token do bot obtido e configurado no `.env`
- [ ] Bot convidado para o servidor com permissões corretas
- [ ] Modo Desenvolvedor ativado no Discord
- [ ] IDs de categorias copiados e configurados
- [ ] IDs de roles de staff configurados
- [ ] `config.yml` configurado com suas preferências
- [ ] Permissões do bot verificadas no servidor
- [ ] Pasta `data/` criada (será criada automaticamente)
- [ ] Configuração testada localmente antes de produção

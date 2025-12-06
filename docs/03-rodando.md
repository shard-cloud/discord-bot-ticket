## 🚀 Início Rápido

### 1. Instalação das Dependências

```bash
# Instalar pacotes npm
npm install
```

### 2. Configuração do Ambiente

```bash
# Copiar arquivo de configuração
cp .env.example .env

# Editar com seu token do bot
nano .env  # ou use seu editor preferido
```

Adicione seu token:

```bash
BOT_TOKEN=seu-token-aqui
```

### 3. Configuração do config.yml

Edite o arquivo `config.yml` com as configurações do seu servidor:

```bash
nano config.yml  # ou use seu editor preferido
```

**Configurações mínimas necessárias:**
- IDs das categorias onde tickets serão criados
- IDs das roles de staff
- Configuração de pelo menos uma categoria de ticket

### 4. Iniciar o Bot

```bash
# Modo produção
npm start

# Ou diretamente com Node
node index.js
```

## 🛠️ Comandos Disponíveis

### Desenvolvimento

```bash
# Iniciar bot
npm start

# Ver logs em tempo real
# Os logs aparecem no console
```

### Verificação de Status

O bot mostrará no console quando estiver pronto:
- Comandos carregados
- Eventos registrados
- Bot conectado ao Discord

## 📡 Testando o Bot

### 1. Verificar Conexão

Após iniciar, você verá no console:
```
✅ Bot conectado como: NomeDoBot#1234
```

### 2. Testar Comandos Básicos

No Discord, use os seguintes comandos:

```bash
# Verificar se bot está respondendo
/ping

# Ver lista de comandos
/help

# Ver estatísticas
/stats
```

### 3. Criar Painel de Tickets

```bash
# Criar painel (requer permissão de admin/staff)
/panel id:1 layout:Buttons
```

O painel será enviado no canal onde você executou o comando.

### 4. Testar Criação de Ticket

1. Clique no botão/menu do painel
2. Se configurado modal, preencha o formulário
3. Um novo canal de ticket será criado
4. Teste os comandos dentro do ticket

## 🧪 Testes de Funcionalidades

### Teste de Comandos de Ticket

Dentro de um canal de ticket:

```bash
# Fechar ticket
/close reason:Teste de fechamento

# Reabrir ticket
/reopen

# Adicionar usuário
/add user:@usuario

# Remover usuário
/remove user:@usuario

# Renomear ticket
/rename name:novo-nome

# Definir prioridade
/priority priority:alta

# Gerar transcrição
/transcript
```

### Teste de Sistema de Claim

```bash
# Reivindicar ticket
/claim

# Verificar se foi reivindicado (nome do canal muda se configurado)

# Remover claim
/unclaim
```

### Teste de Blacklist

```bash
# Adicionar usuário à blacklist
/blacklist add user:@usuario reason:Spam

# Remover da blacklist
/blacklist remove user:@usuario

# Ver blacklist
/blacklist list
```

## 📊 Monitoramento

### Logs do Console

O bot exibe logs no console:

```
The slash command [panel.js] has been loaded!
The slash command [close.js] has been loaded!
...
✅ Bot conectado como: NomeDoBot#1234
```

### Logs de Erros

Erros são exibidos no console e podem ser logados em arquivo (se configurado):

```
[ERROR] Erro ao processar comando
[WARN] Aviso sobre permissões
```

### Verificar Status do Bot

```bash
# No Discord, use:
/ping  # Ver latência
/stats # Ver estatísticas do bot
```

## 🔧 Modo de Desenvolvimento

### Debugging

Para ver mais informações de debug:

```bash
# Executar com debug do Node.js
node --inspect index.js

# Ou adicionar console.log no código
```

### Hot Reload (Desenvolvimento)

Para recarregar comandos sem reiniciar o bot:

```bash
# No Discord, use:
/reload
```

**Nota:** Requer permissão de administrador.

### Verificar Configuração

O bot valida o `config.yml` ao iniciar. Erros de configuração aparecerão no console:

```
[ERROR] Categoria inválida: ID não encontrado
[WARN] Configuração de auto-close desabilitada
```

## 🐳 Executando com Docker

### Docker Build

```bash
# Construir imagem
docker build -t discord-bot-ticket .

# Executar container
docker run -d \
  --name ticket-bot \
  -e BOT_TOKEN=seu-token-aqui \
  -v $(pwd)/config.yml:/app/config.yml \
  -v $(pwd)/data:/app/data \
  discord-bot-ticket
```

### Docker Compose (se disponível)

```bash
# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

**Importante:** Certifique-se de montar o volume `data/` para persistir os bancos SQLite.

## 📈 Exemplos Práticos

### Exemplo 1: Configuração Básica

1. **Criar categoria no Discord:**
   - Nome: "Tickets"
   - Copiar ID da categoria

2. **Configurar no config.yml:**
```yaml
TicketCategories:
  - id: 1
    name: "suporte"
    categoryID: ["ID_DA_CATEGORIA_AQUI"]
    closedCategoryID: ["ID_DA_CATEGORIA_AQUI"]
    support_role_ids: ["ID_ROLE_STAFF"]
```

3. **Criar painel:**
```bash
/panel id:1 layout:Buttons
```

### Exemplo 2: Sistema com Múltiplas Categorias

```yaml
TicketCategories:
  - id: 1
    name: "suporte"
    # ... configuração
  - id: 2
    name: "report"
    # ... configuração
  - id: 3
    name: "vendas"
    # ... configuração

panels:
  - id: 1
    categories: ["1, 2, 3"]  # Todas as categorias no mesmo painel
```

### Exemplo 3: Auto-fechamento Configurado

```yaml
autoCloseTickets:
  enabled: true
  interval: "300"  # Verificar a cada 5 minutos
  time: "172800"  # Fechar após 48 horas de inatividade
```

## 🔍 Troubleshooting

### Problema: Bot não inicia

```bash
# Verificar se o token está configurado
cat .env | grep BOT_TOKEN

# Verificar se há erros no console
# Procurar por mensagens de erro
```

**Soluções:**
- Verificar se o token está correto
- Verificar se o bot foi convidado para o servidor
- Verificar permissões do bot

### Problema: Comandos não aparecem

**Soluções:**
- Aguardar alguns minutos (Discord pode demorar para atualizar)
- Verificar se o bot tem permissão "Use Slash Commands"
- Tentar reiniciar o bot
- Verificar logs do console para erros

### Problema: Tickets não são criados

**Soluções:**
- Verificar se as IDs das categorias estão corretas
- Verificar se o bot tem permissão "Manage Channels"
- Verificar se a categoria existe no servidor
- Verificar logs do console

### Problema: Staff não consegue acessar tickets

**Soluções:**
- Verificar IDs das roles de staff no `config.yml`
- Verificar se as roles existem no servidor
- Verificar permissões da role do bot (deve estar acima das roles de staff)

### Problema: Erro de permissões

**Soluções:**
- Dar permissão "Administrator" temporariamente para testes
- Verificar se a role do bot está acima das outras roles
- Verificar permissões específicas necessárias no `config.yml`

### Problema: Banco de dados não funciona

**Soluções:**
- Verificar se a pasta `data/` existe e tem permissões de escrita
- Verificar se o caminho em `dbPath` está correto
- Verificar logs do console para erros específicos

## 📝 Verificando Funcionalidades

### Checklist de Testes

- [ ] Bot conecta ao Discord
- [ ] Comandos aparecem no Discord
- [ ] `/ping` responde corretamente
- [ ] `/help` mostra lista de comandos
- [ ] Painel é criado com `/panel`
- [ ] Ticket é criado ao clicar no botão/menu
- [ ] Staff consegue acessar o ticket
- [ ] Comandos funcionam dentro do ticket
- [ ] Ticket é fechado com `/close`
- [ ] Transcrição é gerada ao fechar
- [ ] Ticket pode ser reaberto com `/reopen`
- [ ] Sistema de claim funciona (se habilitado)
- [ ] Auto-fechamento funciona (se habilitado)
- [ ] Blacklist funciona corretamente
- [ ] Estatísticas são atualizadas

## ✅ Checklist de Execução

- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` configurado com `BOT_TOKEN`
- [ ] `config.yml` configurado com IDs corretos
- [ ] Bot convidado para o servidor com permissões
- [ ] Bot iniciado (`npm start`)
- [ ] Bot conectado (verificado no console)
- [ ] Comandos aparecem no Discord
- [ ] Painel criado e funcionando
- [ ] Tickets são criados corretamente
- [ ] Comandos funcionam dentro dos tickets
- [ ] Sistema completo testado

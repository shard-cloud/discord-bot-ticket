## 🚀 Deploy em Produção

### Pré-requisitos
- Servidor com Node.js 20+
- Acesso SSH ao servidor
- Bot criado no Discord Developer Portal
- Token do bot configurado

## 🐳 Deploy com Docker (Recomendado)

### 1. Preparação do Servidor

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
```

### 2. Preparar Arquivos no Servidor

```bash
# Criar diretório do projeto
mkdir -p /opt/discord-bot-ticket
cd /opt/discord-bot-ticket

# Clonar repositório ou fazer upload dos arquivos
git clone <seu-repositorio> .
# OU fazer upload via SCP/SFTP
```

### 3. Configurar Ambiente

```bash
# Criar arquivo .env
nano .env
```

Adicione:
```bash
BOT_TOKEN=seu-token-do-bot-aqui
```

### 4. Configurar config.yml

```bash
# Editar configuração
nano config.yml
```

Configure com os IDs corretos do seu servidor de produção.

### 5. Build e Executar Docker

```bash
# Construir imagem
docker build -t discord-bot-ticket .

# Executar container
docker run -d \
  --name ticket-bot \
  --restart unless-stopped \
  -e BOT_TOKEN=$(cat .env | grep BOT_TOKEN | cut -d '=' -f2) \
  -v $(pwd)/config.yml:/app/config.yml \
  -v $(pwd)/data:/app/data \
  discord-bot-ticket

# Ver logs
docker logs -f ticket-bot
```

### 6. Gerenciar Container

```bash
# Parar bot
docker stop ticket-bot

# Iniciar bot
docker start ticket-bot

# Reiniciar bot
docker restart ticket-bot

# Ver logs
docker logs -f ticket-bot

# Remover container (cuidado!)
docker rm -f ticket-bot
```

## 🌐 Deploy Manual (Sem Docker)

### 1. Instalação do Node.js

```bash
# Instalar Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar versão
node --version
npm --version
```

### 2. Preparar Diretório

```bash
# Criar diretório
sudo mkdir -p /opt/discord-bot-ticket
cd /opt/discord-bot-ticket

# Clonar ou fazer upload dos arquivos
git clone <seu-repositorio> .
# OU fazer upload via SCP/SFTP

# Dar permissões
sudo chown -R $USER:$USER /opt/discord-bot-ticket
```

### 3. Instalar Dependências

```bash
# Instalar pacotes
npm install --production

# Ou instalar tudo (incluindo dev)
npm install
```

### 4. Configurar Ambiente

```bash
# Criar .env
nano .env
```

```bash
BOT_TOKEN=seu-token-do-bot-aqui
```

### 5. Configurar config.yml

```bash
# Editar configuração
nano config.yml
```

### 6. Instalar PM2 (Gerenciador de Processos)

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar bot com PM2
pm2 start index.js --name ticket-bot

# Salvar configuração do PM2
pm2 save

# Configurar PM2 para iniciar no boot
pm2 startup
# Execute o comando que aparecer no terminal
```

### 7. Gerenciar com PM2

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs ticket-bot

# Ver logs em tempo real
pm2 logs ticket-bot --lines 50

# Reiniciar bot
pm2 restart ticket-bot

# Parar bot
pm2 stop ticket-bot

# Remover do PM2
pm2 delete ticket-bot

# Monitoramento
pm2 monit
```

## 🔒 Configuração de Segurança

### 1. Firewall

```bash
# Configurar UFW (se necessário)
sudo ufw enable
sudo ufw allow ssh
# Não precisa abrir portas para o bot (ele se conecta ao Discord)
```

### 2. Proteger Arquivos Sensíveis

```bash
# Proteger .env
chmod 600 .env

# Proteger config.yml (se contiver informações sensíveis)
chmod 644 config.yml
```

### 3. Backup Automático

Crie script de backup:

```bash
# Criar script
nano /opt/discord-bot-ticket/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups/discord-bot-ticket"
mkdir -p $BACKUP_DIR

# Fazer backup da pasta data
tar -czf $BACKUP_DIR/data_$DATE.tar.gz /opt/discord-bot-ticket/data

# Manter apenas últimos 7 backups
find $BACKUP_DIR -name "data_*.tar.gz" -mtime +7 -delete

echo "Backup concluído: data_$DATE.tar.gz"
```

```bash
# Dar permissão de execução
chmod +x /opt/discord-bot-ticket/backup.sh

# Adicionar ao crontab (backup diário às 2h)
crontab -e
# Adicionar linha:
0 2 * * * /opt/discord-bot-ticket/backup.sh
```

## 📊 Monitoramento e Logs

### 1. Logs com PM2

```bash
# Ver logs em tempo real
pm2 logs ticket-bot

# Ver apenas erros
pm2 logs ticket-bot --err

# Ver apenas output
pm2 logs ticket-bot --out

# Limpar logs
pm2 flush
```

### 2. Logs com Docker

```bash
# Ver logs
docker logs ticket-bot

# Ver logs em tempo real
docker logs -f ticket-bot

# Ver últimas 100 linhas
docker logs --tail 100 ticket-bot
```

### 3. Configurar Rotação de Logs

```bash
# Criar configuração de logrotate
sudo nano /etc/logrotate.d/discord-bot-ticket
```

```
/opt/discord-bot-ticket/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        pm2 reloadLogs
    endscript
}
```

## 🔄 Atualizações

### Atualizar Bot (PM2)

```bash
# Parar bot
pm2 stop ticket-bot

# Fazer backup
/opt/discord-bot-ticket/backup.sh

# Atualizar código
cd /opt/discord-bot-ticket
git pull
# OU fazer upload dos novos arquivos

# Instalar novas dependências (se houver)
npm install --production

# Reiniciar bot
pm2 restart ticket-bot

# Verificar logs
pm2 logs ticket-bot
```

### Atualizar Bot (Docker)

```bash
# Parar container
docker stop ticket-bot

# Fazer backup
docker exec ticket-bot tar -czf /tmp/backup.tar.gz /app/data
docker cp ticket-bot:/tmp/backup.tar.gz ./backup_$(date +%Y%m%d).tar.gz

# Atualizar código
cd /opt/discord-bot-ticket
git pull
# OU fazer upload dos novos arquivos

# Rebuild imagem
docker build -t discord-bot-ticket .

# Remover container antigo
docker rm ticket-bot

# Criar novo container
docker run -d \
  --name ticket-bot \
  --restart unless-stopped \
  -e BOT_TOKEN=$(cat .env | grep BOT_TOKEN | cut -d '=' -f2) \
  -v $(pwd)/config.yml:/app/config.yml \
  -v $(pwd)/data:/app/data \
  discord-bot-ticket

# Verificar logs
docker logs -f ticket-bot
```

## 🔧 Manutenção

### Verificar Status

```bash
# PM2
pm2 status
pm2 show ticket-bot

# Docker
docker ps | grep ticket-bot
docker stats ticket-bot
```

### Limpar Dados Antigos

```bash
# Limpar tickets fechados antigos (se auto-delete não estiver configurado)
# Cuidado: isso é permanente!
# Faça backup antes

# Acessar banco SQLite
sqlite3 data/tickets.sqlite

# Ver tickets fechados
SELECT * FROM json WHERE json_extract(value, '$.status') = 'Closed';

# Deletar tickets fechados há mais de 30 dias (exemplo)
# (Execute com cuidado e faça backup antes!)
```

### Otimizar Banco de Dados

```bash
# Otimizar SQLite
sqlite3 data/tickets.sqlite "VACUUM;"
sqlite3 data/main.sqlite "VACUUM;"
sqlite3 data/blacklist.sqlite "VACUUM;"
```

## 🚨 Troubleshooting em Produção

### Problema: Bot desconecta frequentemente

**Soluções:**
- Verificar conexão de internet do servidor
- Verificar logs para erros de conexão
- Verificar se há rate limits do Discord
- Considerar usar reconnection automática (já implementada)

### Problema: Bot não responde

**Soluções:**
```bash
# Verificar se está rodando
pm2 status  # ou docker ps

# Verificar logs
pm2 logs ticket-bot --lines 100  # ou docker logs ticket-bot

# Reiniciar bot
pm2 restart ticket-bot  # ou docker restart ticket-bot
```

### Problema: Erro de memória

**Soluções:**
```bash
# Verificar uso de memória
pm2 monit  # ou docker stats

# Limpar logs antigos
pm2 flush

# Reiniciar bot periodicamente (adicionar ao crontab)
0 4 * * * pm2 restart ticket-bot
```

### Problema: Banco de dados corrompido

**Soluções:**
```bash
# Fazer backup imediato
cp -r data data_backup_$(date +%Y%m%d)

# Tentar reparar SQLite
sqlite3 data/tickets.sqlite "PRAGMA integrity_check;"

# Se corrompido, restaurar do backup
rm -rf data
cp -r data_backup_YYYYMMDD data
```

### Problema: Performance degradada

**Soluções:**
- Otimizar bancos SQLite (VACUUM)
- Limpar dados antigos
- Verificar se há muitos tickets abertos
- Considerar aumentar recursos do servidor

## 📈 Escalabilidade

### Múltiplas Instâncias (Não Recomendado)

**Nota:** Este bot não foi projetado para rodar múltiplas instâncias simultaneamente devido ao uso de SQLite local. Para escalar:

1. **Migrar para banco compartilhado** (PostgreSQL/MongoDB)
2. **Usar sistema de filas** para processar eventos
3. **Implementar sharding** do Discord.js

### Otimizações

```yaml
# No config.yml, otimizar intervalos:
autoCloseTickets:
  interval: "300"  # Verificar a cada 5 minutos (não muito frequente)

statsChannels:
  interval: "600"  # Mínimo 10 minutos (limite do Discord)
```

## 🔄 CI/CD com GitHub Actions

### Workflow de Deploy

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /opt/discord-bot-ticket
          git pull origin main
          npm install --production
          pm2 restart ticket-bot
```

### Secrets Necessários
- `HOST`: IP do servidor
- `USERNAME`: Usuário SSH
- `SSH_KEY`: Chave privada SSH

## ✅ Checklist de Deploy

- [ ] Servidor configurado com Node.js 20+
- [ ] Token do bot configurado no `.env`
- [ ] `config.yml` configurado com IDs de produção
- [ ] Bot convidado para servidor de produção
- [ ] Permissões do bot verificadas
- [ ] Bot rodando (PM2 ou Docker)
- [ ] Bot conectado ao Discord
- [ ] Logs sendo monitorados
- [ ] Backup automático configurado
- [ ] Rotação de logs configurada
- [ ] Monitoramento funcionando
- [ ] Testes em produção realizados
- [ ] Documentação atualizada

## 💡 Dicas de Produção

- **Sempre faça backup** antes de atualizar
- **Monitore os logs** regularmente
- **Teste em servidor de desenvolvimento** antes de produção
- **Mantenha o bot atualizado** com as últimas versões
- **Configure alertas** para quando o bot cair
- **Documente mudanças** na configuração
- **Tenha um plano de rollback** caso algo dê errado

---

**Deploy concluído!** Seu bot de tickets está rodando em produção! 🎉

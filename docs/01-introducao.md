## 📖 O que é este template?

O **Discord Bot Ticket** é um bot completo e avançado para gerenciamento de tickets no Discord, desenvolvido em Node.js (JavaScript) com Discord.js v14. Este bot oferece um sistema robusto de suporte com múltiplas categorias, painéis interativos, modais personalizados e muito mais.

## 🎯 O que este bot faz?

Este bot permite criar um sistema completo de tickets de suporte no seu servidor Discord, onde:

1. **Usuários criam tickets** através de botões ou menus interativos
2. **Staff gerencia tickets** com comandos avançados
3. **Sistema automatiza** fechamento, exclusão e outras ações
4. **Transcrições são geradas** automaticamente quando tickets são fechados
5. **Sistema de feedback** permite avaliação dos atendimentos

### Fluxo de Funcionamento:

```
Usuário clica no botão/menu do painel
           ↓
    Bot cria canal de ticket
           ↓
    Staff recebe notificação
           ↓
    Atendimento acontece
           ↓
    Ticket é fechado
           ↓
    Transcrição é gerada
           ↓
    Usuário recebe feedback (opcional)
```

## ✨ Funcionalidades Principais

### 🎫 Sistema de Tickets

*   **Múltiplas Categorias** - Configure diferentes tipos de tickets (suporte, report, vendas, etc.)
*   **Painéis Interativos** - Botões ou menus dropdown para criar tickets
*   **Modais Personalizados** - Formulários com perguntas customizáveis antes de criar o ticket
*   **Sistema de Prioridades** - Defina prioridades para tickets (baixa, média, alta)
*   **Sistema de Claim** - Staff pode "reivindicar" tickets para atendimento 1-on-1
*   **Alertas e Notificações** - Ping automático de roles quando ticket é criado

### 🛠️ Comandos de Gerenciamento

**Comandos de Tickets:**
*   `/panel` - Enviar painel de tickets no canal
*   `/close` - Fechar um ticket
*   `/delete` - Deletar um ticket permanentemente
*   `/reopen` - Reabrir um ticket fechado
*   `/claim` - Reivindicar um ticket para atendimento
*   `/unclaim` - Remover claim de um ticket
*   `/add` - Adicionar usuário ao ticket
*   `/remove` - Remover usuário do ticket
*   `/rename` - Renomear canal do ticket
*   `/topic` - Alterar tópico do ticket
*   `/move` - Mover ticket para outra categoria
*   `/priority` - Definir prioridade do ticket
*   `/slowmode` - Aplicar slowmode no ticket
*   `/pin` - Fixar mensagem no ticket
*   `/alert` - Enviar alerta no ticket
*   `/transcript` - Gerar transcrição do ticket
*   `/tickets` - Listar todos os tickets

**Comandos de Utilidade:**
*   `/blacklist` - Gerenciar blacklist de usuários
*   `/stats` - Ver estatísticas do bot
*   `/userinfo` - Informações sobre usuário
*   `/preference` - Configurar preferências
*   `/help` - Lista de comandos disponíveis
*   `/ping` - Ver latência do bot
*   `/reload` - Recarregar comandos (admin)

### 🤖 Recursos Automatizados

*   **Auto-fechamento** - Fecha tickets inativos automaticamente após período configurado
*   **Auto-exclusão** - Remove tickets fechados após tempo determinado
*   **Auto-resposta** - Respostas automáticas para mensagens comuns
*   **Blacklist automática** - Limpeza automática de blacklists expiradas
*   **Canais de estatísticas** - Atualização automática de contadores (total de tickets, tickets abertos, etc.)
*   **Ação ao sair** - Fecha ou deleta ticket quando usuário sai do servidor

### 📊 Sistema de Estatísticas

*   **Contadores de Tickets** - Total de tickets criados
*   **Tickets Abertos** - Quantidade atual de tickets abertos
*   **Sistema de Reivindicações** - Estatísticas de claims
*   **Sistema de Avaliações** - Média de avaliações dos atendimentos
*   **Mensagens Totais** - Contagem de mensagens em tickets
*   **Criadores de Tickets** - Estatísticas por usuário

### 📝 Sistema de Transcrições

*   **Transcrições HTML** - Geração automática de transcrições em HTML
*   **Transcrições TXT** - Opção de gerar transcrições em texto simples
*   **Salvamento de Imagens** - Opção de incluir imagens nas transcrições HTML
*   **Envio por DM** - Envio automático de transcrições para usuários

### ⭐ Sistema de Feedback

*   **Avaliações de 1 a 5** - Sistema de estrelas
*   **Formulário de Feedback** - Perguntas customizáveis após fechamento
*   **Estatísticas de Avaliações** - Média e total de avaliações

## 🏗️ Arquitetura

O bot foi desenvolvido com uma arquitetura modular que permite:

*   **Fácil Configuração** - Tudo configurável via `config.yml`
*   **Manutenção Simplificada** - Código organizado e bem estruturado
*   **Escalabilidade** - Suporte a múltiplos servidores e categorias
*   **Banco de Dados SQLite** - Armazenamento local eficiente com QuickDB

## 🎯 Casos de Uso

### Para Servidores Pequenos
*   Sistema básico de tickets
*   Uma ou duas categorias
*   Comandos essenciais

### Para Servidores Médios
*   Múltiplas categorias de tickets
*   Sistema de prioridades
*   Auto-fechamento configurado
*   Transcrições automáticas

### Para Servidores Grandes
*   Sistema completo com todas as funcionalidades
*   Múltiplos painéis
*   Sistema de claim para distribuição de trabalho
*   Canais de estatísticas em tempo real
*   Sistema de feedback e avaliações
*   Auto-respostas configuradas

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Propósito |
|------------|-----------|
| **Node.js** | Runtime JavaScript |
| **Discord.js v14** | Biblioteca para interação com Discord |
| **SQLite (better-sqlite3)** | Banco de dados local |
| **QuickDB** | Wrapper para SQLite |
| **YAML** | Configuração via arquivo YAML |
| **discord-html-transcripts** | Geração de transcrições HTML |
| **moment-timezone** | Manipulação de datas e horários |

## 🔒 Segurança e Confiabilidade

### Recursos de Segurança:
*   ✅ **Sistema de Permissões** - Controle granular de acesso por roles
*   ✅ **Blacklist de Usuários** - Prevenção de spam de tickets
*   ✅ **Cooldown de Comandos** - Prevenção de abuso
*   ✅ **Validação de Ações** - Verificação de permissões antes de executar comandos
*   ✅ **Logs de Erros** - Registro detalhado de problemas

### Confiabilidade:
*   ✅ **Tratamento de Erros** - Respostas consistentes em caso de erro
*   ✅ **Validação de Configuração** - Verificação de configurações válidas
*   ✅ **Backup Automático** - Dados salvos em SQLite local
*   ✅ **Recuperação de Estado** - Bot mantém estado após reinicialização

## 📈 Próximos Passos

Após entender esta introdução, você pode:

1. **[Configurar o bot](02-configuracao.md)** - Setup inicial e configuração
2. **[Executar localmente](03-rodando.md)** - Como rodar o bot
3. **[Fazer deploy](04-deploy.md)** - Colocar em produção

## 💡 Dicas Importantes

- **Configure cuidadosamente** o arquivo `config.yml` antes de iniciar
- **Teste em servidor de desenvolvimento** antes de usar em produção
- **Configure permissões corretas** para o bot no Discord
- **Monitore os logs** para identificar problemas
- **Faça backup regular** da pasta `data/` onde ficam os bancos SQLite
- **Use o sistema de blacklist** para prevenir abuso

---

**Discord Bot Ticket** - Sistema completo de tickets para seu servidor Discord! 🎫✨

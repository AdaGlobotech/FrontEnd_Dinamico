# FrontEnd_Dinamico
Projeto desenvolvido para o módulo FrontEnd Dinamico do Bootcamp Ada GloboTech - Grupo 5
<img width="1036" height="667" alt="Captura de Tela 2025-09-18 às 13 14 36" src="https://github.com/user-attachments/assets/db461c7a-e21a-41be-8a26-d3bb59ea631c" />

Um sistema completo de gerenciamento de tarefas desenvolvido com HTML, CSS e JavaScript puro (Vanilla JS), sem dependências de frameworks externos. O projeto oferece uma interface moderna e responsiva para organização pessoal e profissional.

## Modulo 6
Professor **Dannyel Kayke**

## Equipe 5✨(grupo 4)

-  Bernardo Soutelo
-  Iane Gomes
-  Ren Wrobleski
  

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação
- **Login seguro** com validação de credenciais
- **Cadastro de novos usuários** com validação de dados
- **Recuperação de senha** via email (simulado)
- **Sessão persistente** no navegador
- **Usuários de teste** para demonstração

### 📊 Dashboard Inteligente
- **Resumo geral** com estatísticas em tempo real
- **Contadores dinâmicos**: Total de listas, tarefas, concluídas e pendentes
- **Criação rápida** de novas listas
- **Navegação intuitiva** entre listas
- **Visualização de progresso** por lista

### ✅ Gerenciamento de Tarefas
- **Múltiplas listas** independentes (Trabalho, Pessoal, Estudos + listas customizadas)
- **Prioridades visuais** (Alta, Média, Baixa) com cores diferenciadas
- **Atribuição de responsáveis** para tarefas
- **Marcação de conclusão** com feedback visual
- **Remoção individual** ou em massa de tarefas concluídas
- **Estatísticas por lista** em tempo real

### 🎨 Interface Moderna
- **Design responsivo** para desktop e mobile
- **Gradientes e efeitos visuais** modernos
- **Glassmorphism** com blur e transparências
- **Animações suaves** e transições
- **Tipografia otimizada** e hierarquia visual clara
- **Notificações** de feedback para ações do usuário

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização moderna com Flexbox/Grid
- **JavaScript Vanilla** - Lógica de aplicação sem frameworks
- **Bootstrap 5** - Componentes UI (apenas CSS)
- **LocalStorage** - Persistência de dados no navegador
- **JSON** - Formato de dados para armazenamento

## 📁 Estrutura do Projeto

```
ADA_Front_Est-tico/
├── 📄 login.html          # Página de login
├── 📄 cadastro.html       # Página de cadastro
├── 📄 esqueci.html        # Página de recuperação de senha
├── 📄 dashboard.html      # Dashboard principal
├── 📄 todo.html           # Gerenciador de tarefas
├── 🎨 style.css           # Estilos globais
├── ⚙️ script.js           # Lógica da aplicação
└── 📖 README.md           # Documentação
```

## 🎯 Como Usar

### 1. Instalação
```bash
# Clone o repositório
git clone https://github.com/AdaGlobotech/FrontEnd_Dinamico/

# Entre no diretório
cd ADA_Front_Est-tico

# Abra o index.html ou configure um servidor local
```

### 2. Acesso Rápido
**Usuários de teste disponíveis:**
- **Email:** `admin@teste.com` **Senha:** `123456`
- **Email:** `user@teste.com` **Senha:** `password`

### 3. Fluxo de Uso
1. **Faça login** ou **cadastre-se** se for novo usuário
2. **Explore o dashboard** para ver o resumo geral
3. **Acesse uma lista** (Trabalho, Pessoal, Estudos) ou **crie uma nova**
4. **Adicione tarefas** com título, responsável e prioridade
5. **Marque como concluída** quando finalizar
6. **Gerencie suas listas** e acompanhe o progresso

## 🔧 Funcionalidades Técnicas

### Sistema de Dados
- **Persistência local** via localStorage
- **Estrutura JSON** organizada por entidades
- **IDs únicos** para listas e tarefas
- **Validação de integridade** automática
- **Backup automático** a cada operação

### Classes JavaScript
- **`AuthManager`** - Gerenciamento de usuários e autenticação
- **`TaskManager`** - Controle de listas e tarefas
- **Sistema de eventos** para atualizações em tempo real
- **Validações robustas** de entrada de dados

### Responsividade
- **Mobile-first** design approach
- **Breakpoints otimizados** para diferentes telas
- **Touch-friendly** para dispositivos móveis
- **Navegação adaptativa** por contexto

## 🎨 Design System

### Cores Principais
- **Primary:** `#667eea` → `#764ba2` (Gradiente azul-roxo)
- **Success:** `#10b981` (Verde para ações positivas)
- **Warning:** `#f59e0b` (Laranja para alertas)
- **Danger:** `#ef4444` (Vermelho para ações destrutivas)

### Prioridades de Tarefas
- 🔴 **Alta:** Borda vermelha (`#ef4444`)
- 🟡 **Média:** Borda laranja (`#f59e0b`)
- 🟢 **Baixa:** Borda verde (`#10b981`)

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

### Dispositivos
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## 🔒 Segurança

- **Validação client-side** de todos os inputs
- **Sanitização** de dados de entrada
- **Estrutura defensiva** contra XSS
- **Senhas hasheadas** (simulação para demonstração)
- **Sessões limitadas** por navegador

## 🚀 Possíveis Melhorias Futuras

### Backend Integration
- [ ] API RESTful para persistência em servidor
- [ ] Autenticação JWT
- [ ] Sincronização multi-dispositivo
- [ ] Backup em nuvem

### Funcionalidades Avançadas
- [ ] Colaboração em tempo real
- [ ] Anexos de arquivo
- [ ] Lembretes e notificações
- [ ] Relatórios e analytics
- [ ] Temas personalizáveis
- [ ] Integração com calendário

### Performance
- [ ] Service Workers para offline
- [ ] Lazy loading de listas
- [ ] Compressão de dados
- [ ] Cache otimizado

## 👥 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add: AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

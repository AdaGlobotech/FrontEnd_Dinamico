/**
 * @file script.js
 * @brief Sistema de autenticação e gerenciamento de tarefas usando localStorage
 * @details Gerencia cadastro, login, recuperação de senha e lista de tarefas
 * @author GloboTech Team 5
 * @version 1.0
 */

class AuthManager {
    constructor() {
        this.users = this.loadUsers();
    }

    // Carrega a lista de usuários salva no navegador
    loadUsers() {
        const users = localStorage.getItem('ada_users');
        return users ? JSON.parse(users) : [];
    }

    // Salva a lista de usuários no navegador
    saveUsers() {
        localStorage.setItem('ada_users', JSON.stringify(this.users));
    }

    // Cadastra um novo usuário no sistema
    register(email, password, fullName = '') {
        if (this.findUserByEmail(email)) {
            return { success: false, message: 'Email já cadastrado!' };
        }

        const newUser = {
            id: Date.now(),
            email: email.toLowerCase(),
            password: password,
            fullName: fullName,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();

        return { success: true, message: 'Usuário cadastrado com sucesso!' };
    }

    // Faz o login do usuário verificando email e senha
    login(email, password) {
        const user = this.findUserByEmail(email);
        
        if (!user) {
            return { success: false, message: 'Email não encontrado!' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Senha incorreta!' };
        }

        // Salva sessão do usuário logado no navegador
        localStorage.setItem('ada_current_user', JSON.stringify({
            id: user.id,
            email: user.email,
            loginAt: new Date().toISOString()
        }));

        return { success: true, message: 'Login realizado com sucesso!' };
    }

    // Procura um usuário pelo email na lista de usuários
    findUserByEmail(email) {
        return this.users.find(user => user.email === email.toLowerCase());
    }

    // Simula o envio de email para recuperar senha
    forgotPassword(email) {
        const user = this.findUserByEmail(email);
        
        if (!user) {
            return { success: false, message: 'Email não encontrado!' };
        }

        // Simula envio de email de recuperação
        console.log(`Email de recuperação enviado para: ${email}`);
        return { 
            success: true, 
            message: 'Email de recuperação enviado! Verifique sua caixa de entrada.' 
        };
    }

    // Verifica se existe um usuário logado no sistema
    getCurrentUser() {
        const user = localStorage.getItem('ada_current_user');
        return user ? JSON.parse(user) : null;
    }

    // Remove o usuário logado do sistema (faz logout)
    logout() {
        localStorage.removeItem('ada_current_user');
    }

    // Cria usuários de teste para facilitar o desenvolvimento
    createTestUsers() {
        const testUsers = [
            { email: 'admin@teste.com', password: '123456' },
            { email: 'user@teste.com', password: 'password' }
        ];

        testUsers.forEach(user => {
            if (!this.findUserByEmail(user.email)) {
                this.register(user.email, user.password);
            }
        });
    }
}

// Sistema de gerenciamento de listas e tarefas
class TaskManager {
    constructor() {
        this.lists = this.loadLists();
        this.tasks = this.loadTasks();
        this.currentListId = this.getCurrentListId();
        this.initializeDefaultLists();
    }

    // Carrega as listas salvas no navegador
    loadLists() {
        const lists = localStorage.getItem('ada_lists');
        return lists ? JSON.parse(lists) : [];
    }

    // Salva as listas no navegador
    saveLists() {
        localStorage.setItem('ada_lists', JSON.stringify(this.lists));
    }

    // Carrega a lista de tarefas salva no navegador
    loadTasks() {
        const tasks = localStorage.getItem('ada_tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Salva a lista de tarefas no navegador
    saveTasks() {
        localStorage.setItem('ada_tasks', JSON.stringify(this.tasks));
        // Dispara evento para atualizar estatísticas no dashboard
        this.notifyStatsUpdate();
    }

    // Notifica sobre mudanças para atualizar estatísticas
    notifyStatsUpdate() {
        // Dispara evento customizado para atualizar estatísticas
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('tasksUpdated'));
        }
    }

    // Obtém o ID da lista atual (da URL ou padrão)
    getCurrentListId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('list') || 'trabalho';
    }

    // Salva o ID da lista atual
    setCurrentListId(listId) {
        this.currentListId = listId;
        localStorage.setItem('ada_current_list', listId);
    }

    // Cria listas padrão se não existirem
    initializeDefaultLists() {
        if (this.lists.length === 0) {
            const defaultLists = [
                { id: 'trabalho', name: 'Trabalho', icon: '💼', status: 'active' },
                { id: 'pessoal', name: 'Pessoal', icon: '🏠', status: 'active' },
                { id: 'estudos', name: 'Estudos', icon: '📚', status: 'active' }
            ];
            
            this.lists = defaultLists;
            this.saveLists();
        }
    }

    // Cria tarefas de exemplo se não existirem
    createSampleTasks() {
        // Só cria tarefas de exemplo se não houver nenhuma tarefa OU se não existir flag de inicialização
        const hasBeenInitialized = localStorage.getItem('ada_sample_tasks_created');
        if (this.tasks.length === 0 && !hasBeenInitialized) {
            const sampleTasks = [
                // Tarefas de Trabalho
                { id: Date.now() + 1, title: 'Revisar documentação do projeto', priority: 'high', completed: true, listId: 'trabalho', assignee: 'João Silva', createdAt: new Date().toISOString(), completedAt: new Date().toISOString() },
                { id: Date.now() + 2, title: 'Implementar nova funcionalidade', priority: 'medium', completed: false, listId: 'trabalho', assignee: 'Maria Santos', createdAt: new Date().toISOString() },
                { id: Date.now() + 3, title: 'Fazer backup dos dados', priority: 'medium', completed: false, listId: 'trabalho', createdAt: new Date().toISOString() },
                { id: Date.now() + 4, title: 'Reunião com cliente', priority: 'high', completed: true, listId: 'trabalho', assignee: 'Pedro Lima', createdAt: new Date().toISOString(), completedAt: new Date().toISOString() },
                { id: Date.now() + 5, title: 'Atualizar servidor de produção', priority: 'high', completed: false, listId: 'trabalho', createdAt: new Date().toISOString() },

                // Tarefas Pessoais
                { id: Date.now() + 6, title: 'Comprar mantimentos', priority: 'medium', completed: true, listId: 'pessoal', createdAt: new Date().toISOString(), completedAt: new Date().toISOString() },
                { id: Date.now() + 7, title: 'Marcar consulta médica', priority: 'high', completed: false, listId: 'pessoal', createdAt: new Date().toISOString() },
                { id: Date.now() + 8, title: 'Organizar armário', priority: 'low', completed: false, listId: 'pessoal', createdAt: new Date().toISOString() },
                { id: Date.now() + 9, title: 'Pagar contas do mês', priority: 'high', completed: true, listId: 'pessoal', createdAt: new Date().toISOString(), completedAt: new Date().toISOString() },

                // Tarefas de Estudos
                { id: Date.now() + 10, title: 'Ler capítulo 5 do livro de JavaScript', priority: 'medium', completed: false, listId: 'estudos', createdAt: new Date().toISOString() },
                { id: Date.now() + 11, title: 'Assistir curso de React', priority: 'medium', completed: true, listId: 'estudos', createdAt: new Date().toISOString(), completedAt: new Date().toISOString() },
                { id: Date.now() + 12, title: 'Fazer exercícios de CSS', priority: 'low', completed: false, listId: 'estudos', createdAt: new Date().toISOString() },
                { id: Date.now() + 13, title: 'Estudar para certificação', priority: 'high', completed: false, listId: 'estudos', assignee: 'Ana Costa', createdAt: new Date().toISOString() },
                { id: Date.now() + 14, title: 'Preparar apresentação final', priority: 'high', completed: false, listId: 'estudos', createdAt: new Date().toISOString() },
                { id: Date.now() + 15, title: 'Revisar anotações da aula', priority: 'low', completed: true, listId: 'estudos', createdAt: new Date().toISOString(), completedAt: new Date().toISOString() }
            ];

            this.tasks = sampleTasks;
            this.saveTasks();
            
            // Marca que as tarefas de exemplo já foram criadas
            localStorage.setItem('ada_sample_tasks_created', 'true');
        }
    }

    // Cria uma nova lista
    createList(name, icon = '📋') {
        if (!name.trim()) {
            return { success: false, message: 'Nome da lista é obrigatório!' };
        }

        const listId = name.toLowerCase()
            .replace(/[àáâãäå]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') + '_' + Date.now();

        const newList = {
            id: listId,
            name: name.trim(),
            icon: icon,
            status: 'active',
            createdAt: new Date().toISOString()
        };

        this.lists.push(newList);
        this.saveLists();

        return { success: true, message: 'Lista criada com sucesso!', list: newList };
    }

    // Remove uma lista e todas suas tarefas
    removeList(listId) {
        if (listId === 'trabalho' || listId === 'pessoal' || listId === 'estudos') {
            return { success: false, message: 'Não é possível remover listas padrão!' };
        }

        const listIndex = this.lists.findIndex(l => l.id === listId);
        if (listIndex === -1) {
            return { success: false, message: 'Lista não encontrada!' };
        }

        // Remove a lista
        const removedList = this.lists.splice(listIndex, 1)[0];
        
        // Remove todas as tarefas desta lista
        this.tasks = this.tasks.filter(t => t.listId !== listId);
        
        this.saveLists();
        this.saveTasks();

        return { success: true, message: 'Lista removida com sucesso!', list: removedList };
    }

    // Obtém todas as listas
    getAllLists() {
        return this.lists;
    }

    // Obtém uma lista específica
    getListById(listId) {
        return this.lists.find(l => l.id === listId);
    }

    // Adiciona uma nova tarefa à lista atual
    addTask(title, priority = 'medium') {
        if (!title.trim()) {
            return { success: false, message: 'Título da tarefa é obrigatório!' };
        }

        const newTask = {
            id: Date.now(),
            title: title.trim(),
            priority: priority,
            completed: false,
            listId: this.currentListId,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();

        return { success: true, message: 'Tarefa adicionada com sucesso!', task: newTask };
    }

    // Marca uma tarefa como concluída ou não concluída
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) {
            return { success: false, message: 'Tarefa não encontrada!' };
        }

        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        this.saveTasks();

        return { success: true, message: 'Status da tarefa atualizado!', task: task };
    }

    // Remove uma tarefa da lista
    removeTask(taskId) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            return { success: false, message: 'Tarefa não encontrada!' };
        }

        const removedTask = this.tasks.splice(taskIndex, 1)[0];
        this.saveTasks();

        return { success: true, message: 'Tarefa removida com sucesso!', task: removedTask };
    }

    // Remove todas as tarefas concluídas da lista atual
    removeCompletedTasks() {
        const currentListTasks = this.tasks.filter(t => t.listId === this.currentListId);
        const completedCount = currentListTasks.filter(t => t.completed).length;
        
        this.tasks = this.tasks.filter(t => !(t.listId === this.currentListId && t.completed));
        this.saveTasks();

        return { 
            success: true, 
            message: `${completedCount} tarefa(s) concluída(s) removida(s)!`,
            removedCount: completedCount
        };
    }

    // Retorna todas as tarefas da lista atual
    getAllTasks() {
        return this.tasks.filter(t => t.listId === this.currentListId);
    }

    // Retorna todas as tarefas de todas as listas (para estatísticas globais)
    getAllTasksGlobal() {
        return this.tasks;
    }

    // Retorna tarefas pendentes da lista atual
    getPendingTasks() {
        return this.tasks.filter(t => t.listId === this.currentListId && !t.completed);
    }

    // Retorna tarefas concluídas da lista atual
    getCompletedTasks() {
        return this.tasks.filter(t => t.listId === this.currentListId && t.completed);
    }

    // Retorna estatísticas de uma lista específica
    getListStats(listId) {
        const listTasks = this.tasks.filter(t => t.listId === listId);
        const completedCount = listTasks.filter(t => t.completed).length;
        const totalCount = listTasks.length;
        
        return {
            total: totalCount,
            completed: completedCount,
            pending: totalCount - completedCount
        };
    }

    // Limpa dados inconsistentes (tarefas duplicadas e órfãs)
    cleanupInconsistentData() {
        // Remove tarefas duplicadas por ID
        const uniqueTasks = [];
        const seenIds = new Set();
        
        this.tasks.forEach(task => {
            if (!seenIds.has(task.id)) {
                uniqueTasks.push(task);
                seenIds.add(task.id);
            } else {
                console.warn('Removendo tarefa duplicada:', task);
            }
        });
        
        // Remove tarefas órfãs (sem lista válida)
        const validListIds = this.lists.map(l => l.id);
        const validTasks = uniqueTasks.filter(task => {
            if (!validListIds.includes(task.listId)) {
                console.warn('Removendo tarefa órfã:', task);
                return false;
            }
            return true;
        });
        
        // Atualiza tarefas se houve limpeza
        if (this.tasks.length !== validTasks.length) {
            console.log(`Limpeza realizada: ${this.tasks.length} → ${validTasks.length} tarefas`);
            this.tasks = validTasks;
            this.saveTasks();
        }
    }
}

// Instância global do gerenciador de autenticação
const authManager = new AuthManager();

// Instância global do gerenciador de tarefas
const taskManager = new TaskManager();

// Cria usuários de teste automaticamente
authManager.createTestUsers();

// Cria tarefas de exemplo automaticamente
taskManager.createSampleTasks();
// Selecionando os elementos
const submitButton = document.getElementById('submit-button');
const pageTitle = document.getElementById('header-title'); // Título do cabeçalho (alterado para 'header-title')
const todoTitle = document.getElementById('todo-title'); // Título específico para o todo-list
const languageDropdown = document.getElementById('language-dropdown'); // Dropdown para seleção do idioma

// Objeto contendo as traduções
const translations = {
    en: {
        'page-title': 'My plans',
        'todo-title': 'What do we have for today?',
        'Go to my tasks': 'Go to my tasks',
    },
    es: {
        'page-title': 'Mis planes',
        'todo-title': '¿Cuáles son los planes para hoy?',
        'Go to my tasks': 'Ir a mis tareas',
    },
    pt: {
        'page-title': 'Meus planos',
        'todo-title': 'Quais os planos para hoje?',
        'Go to my tasks': 'Ir para minhas tarefas',
    },
};

// Função para atualizar o título e o texto do botão
function updateText(language) {
    // Traduzindo o título da página (page-title), o título específico (todo-title) e o texto do botão
    const pageTitleText = translations[language]['page-title']; // Traduz o 'page-title'
    const todoTitleText = translations[language]['todo-title']; // Traduz o 'todo-title'
    const buttonText = translations[language]['Go to my tasks']; // Traduz o texto do botão

    // Atualizando o conteúdo
    pageTitle.innerText = pageTitleText;  // Atualiza o título da página
    todoTitle.innerText = todoTitleText;  // Atualiza o título 'todo-title'
    submitButton.innerText = buttonText;  // Atualiza o texto do botão
}

// Função para alterar o idioma com base no dropdown
function handleLanguageChange() {
    const selectedLanguage = languageDropdown.value; // Obtém o idioma selecionado
    document.documentElement.lang = selectedLanguage; // Atualiza o atributo lang da página
    updateText(selectedLanguage); // Atualiza o conteúdo com o idioma selecionado
}

// Atualiza o texto de acordo com o idioma selecionado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Define o idioma como 'en' (inglês) por padrão se não houver um idioma definido
    const language = document.documentElement.lang || 'en'; // Se não tiver idioma, usa 'en'
    languageDropdown.value = language; // Define o valor do dropdown como o idioma
    updateText(language); // Atualiza os textos de acordo com o idioma
});

// Escuta as mudanças no dropdown de idiomas
languageDropdown.addEventListener('change', handleLanguageChange);

// Funcionalidade do botão de redirecionamento
submitButton.addEventListener('click', () => {
    // Redireciona para a página tasks.html ao clicar no botão
    window.location.href = 'tasks.html';
});

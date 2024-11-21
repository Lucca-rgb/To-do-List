// Selecting elements
const submitButton = document.getElementById('submit-button');
const pageTitle = document.getElementById('header-title'); // Header title (changed to 'header-title')
const todoTitle = document.getElementById('todo-title'); // Specific title for the to-do list
const languageDropdown = document.getElementById('language-dropdown'); // Dropdown for language selection

// Object containing translations
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

// Function to update the title and button text
function updateText(language) {
    // Translating the page title (page-title), specific title (todo-title), and button text
    const pageTitleText = translations[language]['page-title']; // Translates 'page-title'
    const todoTitleText = translations[language]['todo-title']; // Translates 'todo-title'
    const buttonText = translations[language]['Go to my tasks']; // Translates button text

    // Updating the content
    pageTitle.innerText = pageTitleText;  // Updates the page title
    todoTitle.innerText = todoTitleText;  // Updates the 'todo-title'
    submitButton.innerText = buttonText;  // Updates the button text
}

// Function to change the language based on the dropdown selection
function handleLanguageChange() {
    const selectedLanguage = languageDropdown.value; // Gets the selected language
    document.documentElement.lang = selectedLanguage; // Updates the page's lang attribute
    updateText(selectedLanguage); // Updates the content with the selected language
}

// Updates text according to the selected language when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Set default language to 'en' (English) if no language is defined
    const language = document.documentElement.lang || 'en'; // If no language, defaults to 'en'
    languageDropdown.value = language; // Sets the dropdown value to the selected language
    updateText(language); // Updates text according to the language
});

// Listens for changes in the language dropdown
languageDropdown.addEventListener('change', handleLanguageChange);

// Redirect button functionality
submitButton.addEventListener('click', () => {
    // Redirects to the tasks.html page when the button is clicked
    window.location.href = 'tasks.html';
});

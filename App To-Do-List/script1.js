// Selecting the post-its and the overlay
const postits = document.querySelectorAll('.postit');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Creating the "Add Post-it" button next to the post-its
document.addEventListener('DOMContentLoaded', () => {
    const postItContainer = document.querySelector('.postit-container');

    // Container for the post-its and the add button
    const addPostItContainer = document.createElement('div');
    addPostItContainer.classList.add('add-postit-container');
    postItContainer.parentNode.insertBefore(addPostItContainer, postItContainer);

    // Creating the add post-it button
    const addButton = document.createElement('button');
    addButton.classList.add('add-postit-button');
    addButton.setAttribute('data-translate', 'Add Post-it'); // Adding translation attribute
    addButton.innerText = '+ Add Post-it';
    addButton.addEventListener('click', () => {
        createPostIt({}); // Creates an empty post-it when the button is clicked
    });

    addPostItContainer.appendChild(addButton);

    // Language change dropdown
    const languageDropdown = document.createElement('select');
    languageDropdown.classList.add('language-dropdown');
    languageDropdown.innerHTML = `
        <option value="en">English</option>
        <option value="pt">Português</option>
        <option value="es">Español</option>
    `;

    // Adding the language change event
    languageDropdown.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });

    // Add the language dropdown to the body
    document.body.appendChild(languageDropdown);

    // Load saved post-its from localStorage when the page starts
    const savedPostIts = JSON.parse(localStorage.getItem('postits')) || [];
    savedPostIts.forEach(postItData => {
        createPostIt(postItData);
    });

    // Set the initial language
    changeLanguage('en');  // Here, change to the default language, e.g., 'pt' for Portuguese.
});

// Function to change the language
function changeLanguage(language) {
    const translations = {
        en: {
            'My Tasks': 'My Tasks',
            'Voltar': 'Back',
            'Save': 'Save',
            'Delete': 'Delete',
            'Task': 'Task',
            'Content': 'Write your note here...',
            'Link' : 'Add Link (optional)',
            'Add Post-it': 'Add Post-it',
            'Save Post-it': 'Save',
        },
        es: {
            'My Tasks': 'Mis Tareas',
            'Voltar': 'Regresar',
            'Save': 'Guardar',
            'Delete': 'Eliminar',
            'Task': 'Tarea',
            'Add Post-it': 'Añadir Post-it',
            'Save Post-it': 'Guardar',
            'What do we have for today?': '¿Qué tenemos para hoy?',
        },
        pt: {
            'My Tasks': 'Minhas Tarefas',
            'Voltar': 'Voltar',
            'Save': 'Salvar',
            'Delete': 'Excluir',
            'Task': 'Tarefa',
            'Add Post-it': 'Adicionar Post-it',
            'Save Post-it': 'Salvar',
            'What do we have for today?': 'O que temos para hoje?',
        },
    };

    // Change the page texts according to the selected language
    const translateElements = document.querySelectorAll('[data-translate]');
    translateElements.forEach((element) => {
        const key = element.getAttribute('data-translate');
        const translation = translations[language][key];
        if (element.tagName === 'BUTTON' || element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
            if (element.placeholder) {
                element.placeholder = translation || element.placeholder; // For placeholders
            } else if (element.value) {
                element.value = translation || element.value; // For input values
            } else {
                element.innerText = translation || element.innerText; // For normal text
            }
        } else {
            element.innerText = translation || element.innerText; // For other text elements
        }
    });

    // Update the post-its after language change
    const postits = document.querySelectorAll('.postit');
    postits.forEach(postit => {
        updatePostItTranslation(postit, language);
    });
}

// Function to update the translation of a post-it
function updatePostItTranslation(postit, language) {
    const translations = {
        en: {
            'Task': 'Task',
            'Write your note here...': 'Write your note here...',
            'Add Link (optional)': 'Add Link (optional)',
        },
        es: {
            'Task': 'Tarea',
            'Write your note here...': 'Escribe tu nota aquí...',
            'Add Link (optional)': 'Agregar enlace (opcional)',
        },
        pt: {
            'Task': 'Tarefa',
            'Write your note here...': 'Escreva sua nota aqui...',
            'Add Link (optional)': 'Adicionar link (opcional)',
        },
    };

    // Update placeholders inside the post-it
    const title = postit.querySelector('.postit-title');
    const content = postit.querySelector('.postit-content');
    const link = postit.querySelector('.postit-link');

    if (title) title.placeholder = translations[language]['Task'];
    if (content) content.placeholder = translations[language]['Write your note here...'];
    if (link) link.placeholder = translations[language]['Add Link (optional)'];
}

// Set translations to default language (Portuguese) when the page loads
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('en');
});

// Function to toggle (expand or collapse) the post-it
function togglePostIt(postit) {
    const isExpanded = postit.classList.contains('expanded');

    // If the post-it is already expanded, return to original size
    if (isExpanded) {
        postit.classList.remove('expanded');
        overlay.style.display = 'none'; // Hide the overlay
    } else {
        // Expand the post-it and show the overlay
        postit.classList.add('expanded');
        overlay.style.display = 'block'; // Show the overlay
    }
}

// Function to save the post-it data to localStorage
function savePostIt(postit) {
    const titulo = postit.querySelector('.postit-title').value;
    const conteudo = postit.querySelector('.postit-content').value;
    const link = postit.querySelector('.postit-link').value;
    const file = postit.querySelector('.postit-file').files[0]; // Get file (if any)

    // Retrieve saved post-its or initialize a new array
    const savedPostIts = JSON.parse(localStorage.getItem('postits')) || [];
    
    // Update or add the post-it to the array
    const postItIndex = savedPostIts.findIndex(p => p.titulo === titulo); // Find index with the same title (optional)
    if (postItIndex >= 0) {
        savedPostIts[postItIndex] = { titulo, conteudo, link, file: file ? file.name : null };
    } else {
        savedPostIts.push({ titulo, conteudo, link, file: file ? file.name : null });
    }

    // Save back to localStorage
    localStorage.setItem('postits', JSON.stringify(savedPostIts));

    alert(`Post-it saved!\nTitle: ${titulo}\nContent: ${conteudo}\nLink: ${link}\nFile: ${file ? file.name : 'No file'}`);
}

// Function to create a new post-it with editable content
function createPostIt({ titulo = '', conteudo = '', link = '', file = null }) {
    const postItContainer = document.querySelector('.postit-container');
    const novoPostIt = document.createElement('div');
    novoPostIt.classList.add('postit');

    // Adding initial content to the post-it
    novoPostIt.innerHTML = `
        <input type="text" class="postit-title" value="${titulo}" placeholder="Task">
        <textarea class="postit-content" placeholder="Write your note here...">${conteudo}</textarea>
        <input type="url" class="postit-link" placeholder="Add link (optional)" value="${link}">
        <input type="file" class="postit-file">
        <button class="save-button" data-translate="Save">Save</button>
        <button class="delete-button" data-translate="Delete">Delete</button>
    `;

    // Add the new post-it to the container
    postItContainer.appendChild(novoPostIt);

    // Event to save the data when clicking the "Save" button
    novoPostIt.querySelector('.save-button').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the click from propagating and closing the post-it
        savePostIt(novoPostIt);
    });

    // Event to delete the post-it
    novoPostIt.querySelector('.delete-button').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the click from propagating and closing the post-it
        novoPostIt.remove(); // Removes the post-it from the page
        removePostItFromLocalStorage(novoPostIt.querySelector('.postit-title').value); // Removes from localStorage
    });

    // Event to expand or collapse the post-it when clicked
    novoPostIt.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the click from propagating to the overlay
        togglePostIt(novoPostIt);
    });

    // Updates the translations of the new post-it after creation
    changeLanguage(document.querySelector('.language-dropdown').value);
}

// Function to remove a post-it from localStorage
function removePostItFromLocalStorage(titulo) {
    const savedPostIts = JSON.parse(localStorage.getItem('postits')) || [];
    const updatedPostIts = savedPostIts.filter(postIt => postIt.titulo !== titulo); // Filter out the post-it with the given title
    localStorage.setItem('postits', JSON.stringify(updatedPostIts)); // Update localStorage
}

// Event for clicking on the overlay to close any expanded post-it
overlay.addEventListener('click', () => {
    const expandedPostit = document.querySelector('.postit.expanded');
    if (expandedPostit) {
        expandedPostit.classList.remove('expanded');
        overlay.style.display = 'none'; // Hide the overlay
    }
});

// Function to clear localStorage (optional)
function clearLocalStorage() {
    localStorage.removeItem('postits');
    alert('All post-its have been removed.');
}

// Selecionando os post-its e o overlay
const postits = document.querySelectorAll('.postit');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Criação do botão "Adicionar Post-it" ao lado dos post-its
document.addEventListener('DOMContentLoaded', () => {
    const postItContainer = document.querySelector('.postit-container');

    // Container para os post-its e o botão de adicionar
    const addPostItContainer = document.createElement('div');
    addPostItContainer.classList.add('add-postit-container');
    postItContainer.parentNode.insertBefore(addPostItContainer, postItContainer);

    // Criando o botão de adicionar post-it
    const addButton = document.createElement('button');
    addButton.classList.add('add-postit-button');
    addButton.setAttribute('data-translate', 'Add Post-it'); // Adicionando o atributo de tradução
    addButton.innerText = '+ Add Post-it';
    addButton.addEventListener('click', () => {
        createPostIt({}); // Cria um post-it vazio ao clicar no botão
    });

    addPostItContainer.appendChild(addButton);

    // Função de mudança de idioma
    const languageDropdown = document.createElement('select');
    languageDropdown.classList.add('language-dropdown');
    languageDropdown.innerHTML = `
        <option value="en">English</option>
        <option value="pt">Português</option>
        <option value="es">Español</option>
    `;

    // Adiciona o evento de troca de idioma
    languageDropdown.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });

    // Adiciona o dropdown de idiomas ao body
    document.body.appendChild(languageDropdown);

    // Carregar os post-its salvos do localStorage ao iniciar a página
    const savedPostIts = JSON.parse(localStorage.getItem('postits')) || [];
    savedPostIts.forEach(postItData => {
        createPostIt(postItData);
    });

    // Definir o idioma inicial
    changeLanguage('en');  // Aqui, altere conforme o idioma padrão desejado, por exemplo 'pt' para português.
});

// Função para mudar o idioma
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

    // Alterar os textos da página de acordo com o idioma selecionado
    const translateElements = document.querySelectorAll('[data-translate]');
    translateElements.forEach((element) => {
        const key = element.getAttribute('data-translate');
        const translation = translations[language][key];
        if (element.tagName === 'BUTTON' || element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
            if (element.placeholder) {
                element.placeholder = translation || element.placeholder; // Para placeholders
            } else if (element.value) {
                element.value = translation || element.value; // Para valores de input
            } else {
                element.innerText = translation || element.innerText; // Para texto normal
            }
        } else {
            element.innerText = translation || element.innerText; // Para outros elementos de texto
        }
    });

    // Atualiza os post-its após a mudança de idioma
    const postits = document.querySelectorAll('.postit');
    postits.forEach(postit => {
        updatePostItTranslation(postit, language);
    });
}

// Função para atualizar a tradução de um post-it
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

    // Atualizar os placeholders dos campos dentro do post-it
    const title = postit.querySelector('.postit-title');
    const content = postit.querySelector('.postit-content');
    const link = postit.querySelector('.postit-link');

    if (title) title.placeholder = translations[language]['Task'];
    if (content) content.placeholder = translations[language]['Write your note here...'];
    if (link) link.placeholder = translations[language]['Add Link (optional)'];
}

// Ao carregar a página, setar as traduções para o idioma padrão (português)
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('en');
});

// Função para expandir ou fechar o post-it
function togglePostIt(postit) {
    const isExpanded = postit.classList.contains('expanded');

    // Se o post-it já estiver expandido, volta ao tamanho original
    if (isExpanded) {
        postit.classList.remove('expanded');
        overlay.style.display = 'none'; // Oculta o overlay
    } else {
        // Expande o post-it e exibe o overlay
        postit.classList.add('expanded');
        overlay.style.display = 'block'; // Exibe o overlay
    }
}

// Função para salvar os dados do post-it no localStorage
function savePostIt(postit) {
    const titulo = postit.querySelector('.postit-title').value;
    const conteudo = postit.querySelector('.postit-content').value;
    const link = postit.querySelector('.postit-link').value;
    const file = postit.querySelector('.postit-file').files[0]; // Obter arquivo (se houver)

    // Recuperar post-its salvos ou inicializar um novo array
    const savedPostIts = JSON.parse(localStorage.getItem('postits')) || [];
    
    // Atualizar ou adicionar o post-it ao array
    const postItIndex = savedPostIts.findIndex(p => p.titulo === titulo); // Encontre o índice com o mesmo título (opcional)
    if (postItIndex >= 0) {
        savedPostIts[postItIndex] = { titulo, conteudo, link, file: file ? file.name : null };
    } else {
        savedPostIts.push({ titulo, conteudo, link, file: file ? file.name : null });
    }

    // Salvar de volta no localStorage
    localStorage.setItem('postits', JSON.stringify(savedPostIts));

    alert(`Post-it salvo!\nTítulo: ${titulo}\nConteúdo: ${conteudo}\nLink: ${link}\nArquivo: ${file ? file.name : 'Nenhum arquivo'}`);
}

// Função para criar um novo post-it com conteúdo editável
function createPostIt({ titulo = '', conteudo = '', link = '', file = null }) {
    const postItContainer = document.querySelector('.postit-container');
    const novoPostIt = document.createElement('div');
    novoPostIt.classList.add('postit');

    // Adicionando o conteúdo inicial ao post-it
    novoPostIt.innerHTML = `
        <input type="text" class="postit-title" value="${titulo}" placeholder="Task">
        <textarea class="postit-content" placeholder="Write your note here...">${conteudo}</textarea>
        <input type="url" class="postit-link" placeholder="Add link (optional)" value="${link}">
        <input type="file" class="postit-file">
        <button class="save-button" data-translate="Save">Salvar</button>
        <button class="delete-button" data-translate="Delete">Excluir</button>
    `;

    // Adiciona o novo post-it ao container
    postItContainer.appendChild(novoPostIt);

    // Evento para salvar os dados quando clicar no botão "Salvar"
    novoPostIt.querySelector('.save-button').addEventListener('click', (e) => {
        e.stopPropagation(); // Impede o clique no botão de propagar e fechar o post-it
        savePostIt(novoPostIt);
    });

    // Evento para excluir o post-it
    novoPostIt.querySelector('.delete-button').addEventListener('click', (e) => {
        e.stopPropagation(); // Impede o clique no botão de propagar e fechar o post-it
        novoPostIt.remove(); // Remove o post-it da página
        removePostItFromLocalStorage(novoPostIt.querySelector('.postit-title').value); // Remove do localStorage
    });

    // Evento de clique para expandir ou recolher o post-it
    novoPostIt.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede que o clique se propague para o overlay
        togglePostIt(novoPostIt);
    });

    // Atualiza as traduções do novo post-it após sua criação
    changeLanguage(document.querySelector('.language-dropdown').value);
}

// Função para remover um post-it do localStorage
function removePostItFromLocalStorage(titulo) {
    const savedPostIts = JSON.parse(localStorage.getItem('postits')) || [];
    const updatedPostIts = savedPostIts.filter(postIt => postIt.titulo !== titulo); // Filtra o post-it com o título dado
    localStorage.setItem('postits', JSON.stringify(updatedPostIts)); // Atualiza o localStorage
}

// Evento de clique no overlay para fechar qualquer post-it expandido
overlay.addEventListener('click', () => {
    const expandedPostit = document.querySelector('.postit.expanded');
    if (expandedPostit) {
        expandedPostit.classList.remove('expanded');
        overlay.style.display = 'none'; // Oculta o overlay
    }
});

// Função para limpar o localStorage (opcional)
function clearLocalStorage() {
    localStorage.removeItem('postits');
    alert('Todos os post-its foram removidos.');
}

document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.icon');
    const windows = document.querySelectorAll('.window');
    const langSelect = document.getElementById('lang-select');
    let highestZIndex = 10;

    // --- Variáveis globais para o arrasto ---
    let draggedElement = null; // Pode ser um ícone ou uma janela
    let offsetX = 0; // Offset do cursor em relação ao elemento arrastado
    let offsetY = 0;
    let isMoving = false; // Flag para detectar se houve movimento (arrasto)

    // --- Função auxiliar para obter coordenadas de evento (mouse ou toque) ---
    function getCoords(e) {
        if (e.touches && e.touches.length > 0) {
            return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
        }
        return { clientX: e.clientX, clientY: e.clientY };
    }

    // --- Definição dos textos para cada idioma ---
    const translations = {
        pt: {
            // Títulos das janelas
            'sobre-title': 'Sobre Mim',
            'cursos-title': 'Cursos',
            'email-title': 'Email',
            'image-title': 'foto_praia.jpg',

            // Textos dos ícones
            'icon-sobre': 'sobre mim',
            'icon-cursos': 'cursos e<br>formações',
            'icon-email': 'e-mail',
            'icon-image': 'minha<br>foto.jpg',

            // Conteúdo das janelas
            'sobre-content-p1': 'Olá! meu nome é Pedro Antenor, um desenvolvedor web, com foco em UX apaixonado por tecnologia, música e interfaces. Adoro criar landing pages que combinem funcionalidades com recursos web com um toque de arte. Explore meu portfólio para conhecer meus projetos e um pouco mais sobre minha jornada! Você pode acessar o meu Github no link que está no rodapé da página',
            'cursos-content-h3-1': 'Experiência Profissional:',
            'cursos-content-li-1-1': 'Assistente Administrativo - Tudo é Acessibilidade, 2022 - 2023',
            'cursos-content-li-1-2': 'Designer Trainee - Tudo é Acessibilidade, 2023 - Até Hoje',
            'cursos-content-h3-2': 'Formação Acadêmica:',
            'cursos-content-li-2-1': 'Tecnólogo em Mecatrônica - ETEC Basilides de Godoy, 2019 - 2021',
            'cursos-content-li-2-2': 'Bacharelado em Ciência e Tecnologia - UFABC, 2022 - Até Hoje',
            'cursos-content-h3-3': 'Cursos e Certificações:',
            'cursos-content-li-3-1': 'Intuitive Pixel - Andrey Knabbenn, 2025',
            'cursos-content-li-3-2': 'AccessBoost - Marcelo Sales, 2022',
            'email-content-p1': 'Se você tem alguma dúvida, proposta ou apenas quer conversar, sinta-se à vontade para me enviar um e-mail!',
            'email-content-p2': 'Contato:',
            'footer-instagram': 'instagram',
            'footer-github': 'github',
            'footer-lomography': 'lomography'
        },
        en: {
            'sobre-title': 'About Me',
            'cursos-title': 'Courses',
            'email-title': 'Email',
            'image-title': 'beach_photo.jpg',

            'icon-sobre': 'about me',
            'icon-cursos': 'courses &<br>education',
            'icon-email': 'e-mail',
            'icon-image': 'my<br>photo.jpg',

            'sobre-content-p1': 'Hello! My name is Pedro Antenor, a web developer with a focus on UX, passionate about technology, music, and interfaces. I love creating landing pages that combine functionality with web features and a touch of art. Explore my portfolio to learn about my projects and a bit more about my journey! You can access my Github on the footer of this page',
            'cursos-content-h3-1': 'Professional Experience:',
            'cursos-content-li-1-1': 'Administrative Assistant - Tudo é Acessibilidade, 2022 - 2023',
            'cursos-content-li-1-2': 'Trainee Designer - Tudo é Acessibilidade, 2023 - Present',
            'cursos-content-h3-2': 'Academic Education:',
            'cursos-content-li-2-1': 'Technologist in Mechatronics - ETEC Basilides de Godoy, 2019 - 2021',
            'cursos-content-li-2-2': 'Bachelor\'s in Science and Technology - UFABC, 2022 - Present',
            'cursos-content-h3-3': 'Courses and Certifications:',
            'cursos-content-li-3-1': 'Intuitive Pixel - Andrey Knabbenn, 2025',
            'cursos-content-li-3-2': 'AccessBoost - Marcelo Sales, 2022',
            'email-content-p1': 'If you have any questions, proposals, or just want to chat, feel free to send me an email!',
            'email-content-p2': 'Contact:',
            'footer-instagram': 'instagram',
            'footer-github': 'github',
            'footer-lomography': 'lomography'
        },
        es: {
            'sobre-title': 'Sobre mí',
            'cursos-title': 'Cursos',
            'email-title': 'Correo electrónico',
            'image-title': 'foto_playa.jpg',

            'icon-sobre': 'sobre mí',
            'icon-cursos': 'cursos y<br>formaciones',
            'icon-email': 'correo<br>electrónico',
            'icon-image': 'mi<br>foto.jpg',

            'sobre-content-p1': '¡Hola! Mi nombre es Pedro Antenor, un desarrollador web con enfoque en UX, apasionado por la tecnología, la música y las interfaces. Me encanta crear páginas de destino que combinen funcionalidad con características web y un toque de arte. ¡Explora mi portafolio para conocer mis proyectos y un poco más sobre mi trayectoria! Puedes acceder a mi Github en el enlace al final de la página.',
            'cursos-content-h3-1': 'Experiencia Profesional:',
            'cursos-content-li-1-1': 'Asistente Administrativo - Tudo é Acessibilidade, 2022 - 2023',
            'cursos-content-li-1-2': 'Diseñador Trainee - Tudo é Acessibilidade, 2023 - Presente',
            'cursos-content-h3-2': 'Educación Académica:',
            'cursos-content-li-2-1': 'Tecnólogo en Mecatrónica - ETEC Basilides de Godoy, 2019 - 2021',
            'cursos-content-li-2-2': 'Licenciatura en Ciencia y Tecnología - UFABC, 2022 - Presente',
            'cursos-content-h3-3': 'Cursos y Certificaciones:',
            'cursos-content-li-3-1': 'Intuitive Pixel - Andrey Knabbenn, 2025',
            'cursos-content-li-3-2': 'AccessBoost - Marcelo Sales, 2022',
            'email-content-p1': 'Si tienes alguna pregunta, propuesta o simplemente quieres charlar, ¡no dudes en enviarme un correo electrónico!',
            'email-content-p2': 'Contacto:',
            'footer-instagram': 'instagram',
            'footer-github': 'github',
            'footer-lomography': 'lomography'
        }
    };

    // --- Função para aplicar o idioma selecionado ---
    function applyLanguage(lang) {
        const currentTranslations = translations[lang];

        if (!currentTranslations) {
            console.error(`Tradução para o idioma '${lang}' não encontrada.`);
            return;
        }

        // Atualiza títulos das janelas
        const sobreTitle = document.querySelector('#sobre .title-bar span');
        if (sobreTitle) sobreTitle.textContent = currentTranslations['sobre-title'];

        const cursosTitle = document.querySelector('#cursos .title-bar span');
        if (cursosTitle) cursosTitle.textContent = currentTranslations['cursos-title'];

        const emailTitle = document.querySelector('#email .title-bar span');
        if (emailTitle) emailTitle.textContent = currentTranslations['email-title'];

        const imageTitle = document.querySelector('#minhaImagem .title-bar span');
        if (imageTitle) imageTitle.textContent = currentTranslations['image-title'];

        // Atualiza textos dos ícones
        const iconSobre = document.querySelector('.icon[data-window="sobre"] span');
        if (iconSobre) iconSobre.innerHTML = currentTranslations['icon-sobre'];

        const iconCursos = document.querySelector('.icon[data-window="cursos"] span');
        if (iconCursos) iconCursos.innerHTML = currentTranslations['icon-cursos'];

        const iconEmail = document.querySelector('.icon[data-window="email"] span');
        if (iconEmail) iconEmail.innerHTML = currentTranslations['icon-email'];

        const iconImage = document.querySelector('.icon[data-window="minhaImagem"] span');
        if (iconImage) iconImage.innerHTML = currentTranslations['icon-image'];

        // Conteúdo das janelas

        // Sobre Mim
        const sobreContentP = document.querySelector('#sobre .window-content p');
        if (sobreContentP) sobreContentP.innerHTML = currentTranslations['sobre-content-p1'];
        
        // Cursos e Formações
        const cursosH3_1 = document.querySelector('#cursos .window-content h3:nth-of-type(1)');
        if (cursosH3_1) cursosH3_1.textContent = currentTranslations['cursos-content-h3-1'];

        const cursosProfissionalListItems = document.querySelectorAll('#cursos .window-content ul:nth-of-type(1) li');
        if (cursosProfissionalListItems[0]) cursosProfissionalListItems[0].textContent = currentTranslations['cursos-content-li-1-1'];
        if (cursosProfissionalListItems[1]) cursosProfissionalListItems[1].textContent = currentTranslations['cursos-content-li-1-2'];


        const cursosH3_2 = document.querySelector('#cursos .window-content h3:nth-of-type(2)');
        if (cursosH3_2) cursosH3_2.textContent = currentTranslations['cursos-content-h3-2'];
        const cursosAcademicaListItems = document.querySelectorAll('#cursos .window-content ul:nth-of-type(2) li');
        if (cursosAcademicaListItems[0]) cursosAcademicaListItems[0].textContent = currentTranslations['cursos-content-li-2-1'];
        if (cursosAcademicaListItems[1]) cursosAcademicaListItems[1].textContent = currentTranslations['cursos-content-li-2-2'];


        const cursosH3_3 = document.querySelector('#cursos .window-content h3:nth-of-type(3)');
        if (cursosH3_3) cursosH3_3.textContent = currentTranslations['cursos-content-h3-3'];
        const cursosCertificacoesListItems = document.querySelectorAll('#cursos .window-content ul:nth-of-type(3) li');
        if (cursosCertificacoesListItems[0]) cursosCertificacoesListItems[0].textContent = currentTranslations['cursos-content-li-3-1'];
        if (cursosCertificacoesListItems[1]) cursosCertificacoesListItems[1].textContent = currentTranslations['cursos-content-li-3-2'];


        // Email
        const emailContentP1 = document.querySelector('#email .window-content p:first-of-type');
        if (emailContentP1) emailContentP1.innerHTML = currentTranslations['email-content-p1'];

        const emailContentP2 = document.querySelector('#email .window-content p:last-of-type');
        if (emailContentP2) {
            const tempSpan = document.createElement('span');
            tempSpan.textContent = currentTranslations['email-content-p2'] + ' ';
            
            const emailLink = emailContentP2.querySelector('a');
            
            emailContentP2.innerHTML = '';
            emailContentP2.appendChild(tempSpan);
            if (emailLink) {
                emailContentP2.appendChild(emailLink);
            }
        }


        // Rodapé
        const footerLinks = document.querySelectorAll('.fixed-footer a');
        if (footerLinks[0]) footerLinks[0].textContent = currentTranslations['footer-instagram'];
        if (footerLinks[1]) footerLinks[1].textContent = currentTranslations['footer-github'];
        if (footerLinks[2]) footerLinks[2].textContent = currentTranslations['footer-lomography'];

        // Atualiza o atributo lang do HTML
        document.documentElement.lang = lang;
    }

    // --- Event listener para a troca de idioma ---
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
        });
    }

    // --- Aplica o idioma padrão ao carregar a página (Português) ---
    if (langSelect) {
        applyLanguage(langSelect.value);
    } else {
        console.warn("Elemento #lang-select não encontrado. A tradução não será aplicada automaticamente.");
    }

    // --- Abertura e fechamento de janelas e Lógica de arrastar (unificada) ---

    // Listener para o evento "down" (mousedown ou touchstart) nos ícones
    icons.forEach(icon => {
        icon.addEventListener('mousedown', handleDownEvent);
        icon.addEventListener('touchstart', handleDownEvent);

        // Adiciona listener para teclas Enter/Espaço para abrir janela (apenas para desktop/teclado)
        icon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Simula um clique para ativar a lógica de abertura da janela
                icon.dispatchEvent(new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    button: 0
                }));
                // Pequeno atraso antes do mouseup para simular um clique mais natural
                setTimeout(() => {
                    icon.dispatchEvent(new MouseEvent('mouseup', {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                        button: 0
                    }));
                }, 50);
            }
        });
    });

    // Listener para o evento "down" (mousedown ou touchstart) nas barras de título das janelas
    windows.forEach(win => {
        const titleBar = win.querySelector('.title-bar');
        titleBar.addEventListener('mousedown', handleDownEvent);
        titleBar.addEventListener('touchstart', handleDownEvent);

        // Evento para trazer a janela para frente ao clicar em qualquer parte dela (mouse e touch)
        win.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // Apenas botão esquerdo
            highestZIndex++;
            win.style.zIndex = highestZIndex;
        });
        win.addEventListener('touchstart', (e) => {
             highestZIndex++;
             win.style.zIndex = highestZIndex;
        });
    });

    // --- Funções globais de manipuladores de evento ---
    let initialClickX, initialClickY; // Usado para detectar se houve um 'movimento' significativo

    function handleDownEvent(e) {
        // Ignora botão direito do mouse
        if (e.type === 'mousedown' && e.button !== 0) return;
        
        const targetElement = e.target.closest('.icon') || e.target.closest('.title-bar');
        if (!targetElement) return; // Não é um ícone ou barra de título

        draggedElement = targetElement.closest('.icon') || targetElement.closest('.window'); // O elemento real a ser arrastado
        
        const coords = getCoords(e);
        initialClickX = coords.clientX; // Guarda a posição inicial do clique/toque
        initialClickY = coords.clientY;
        isMoving = false; // Reseta a flag de movimento

        // Calcula o offset para arrastar
        const rect = draggedElement.getBoundingClientRect();
        offsetX = coords.clientX - rect.left;
        offsetY = coords.clientY - rect.top;

        // Adiciona feedback visual e muda cursor
        if (draggedElement.classList.contains('icon')) {
            draggedElement.style.cursor = 'grabbing';
            draggedElement.classList.add('is-dragging'); // Borda para ícones
        } else if (draggedElement.classList.contains('window')) {
            draggedElement.querySelector('.title-bar').style.cursor = 'grabbing';
            draggedElement.classList.add('is-dragging'); // Opacidade para janelas
        }
        
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
        e.preventDefault(); // Impede o comportamento padrão do navegador
    }

    // Handler global para movimento (mousemove ou touchmove)
    document.addEventListener('mousemove', handleMoveEvent);
    document.addEventListener('touchmove', handleMoveEvent);

    function handleMoveEvent(e) {
        if (!draggedElement) return;

        const coords = getCoords(e);
        
        // Detecta se houve movimento significativo para considerar como arrasto
        if (Math.abs(coords.clientX - initialClickX) > 5 || Math.abs(coords.clientY - initialClickY) > 5) {
            isMoving = true;
        }

        const newX = coords.clientX - offsetX;
        const newY = coords.clientY - offsetY;

        // Limites de arrasto (viewport)
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const elemWidth = draggedElement.offsetWidth;
        const elemHeight = draggedElement.offsetHeight;
        const footerHeight = 50; // Altura do rodapé para não cobrir

        const boundedX = Math.max(0, Math.min(newX, viewportWidth - elemWidth));
        const boundedY = Math.max(0, Math.min(newY, viewportHeight - elemHeight - footerHeight));

        draggedElement.style.left = `${boundedX}px`;
        draggedElement.style.top = `${boundedY}px`;
        
        e.preventDefault(); // Impede a rolagem da página em mobile durante o arrasto
    }

    // Handler global para "up" (mouseup ou touchend)
    document.addEventListener('mouseup', handleUpEvent);
    document.addEventListener('touchend', handleUpEvent);

    function handleUpEvent(e) {
        if (!draggedElement) return; // Se não tem elemento arrastado, sai

        // Reseta o cursor e feedback visual
        if (draggedElement.classList.contains('icon')) {
            draggedElement.style.cursor = 'pointer';
            draggedElement.classList.remove('is-dragging');
        } else if (draggedElement.classList.contains('window')) {
            draggedElement.querySelector('.title-bar').style.cursor = 'grab';
            draggedElement.classList.remove('is-dragging');
        }
        
        document.body.style.userSelect = '';
        document.body.style.cursor = '';

        // Se não houve movimento significativo, trata como clique/tap
        if (!isMoving) {
            // Se for um ícone, abre a janela correspondente
            if (draggedElement.classList.contains('icon')) {
                const targetId = draggedElement.dataset.window;
                const targetWindow = document.getElementById(targetId);

                // Fecha outras janelas
                windows.forEach(win => {
                    if (win !== targetWindow) {
                        win.style.display = 'none';
                        win.classList.remove('is-visible');
                    }
                });

                // Abre a janela clicada
                targetWindow.style.display = 'block';
                targetWindow.classList.add('is-visible');
                highestZIndex++;
                targetWindow.style.zIndex = highestZIndex;
                centerWindow(targetWindow);
            }
            // Se for uma janela (e não foi arrastada), apenas a traz para frente (já tratado no mousedown/touchstart da janela)
        }
        
        // Zera o elemento arrastado
        draggedElement = null;
        isMoving = false; // Reseta a flag de movimento

        // Previne o evento default, útil para mobile para evitar cliques fantasma
        if (e.type === 'touchend') {
            e.preventDefault();
        }
    }


    // --- Lógica de fechamento de janelas ---
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const closedWindow = e.target.closest('.window');
            closedWindow.style.display = 'none';
            closedWindow.classList.remove('is-visible');
        });
    });

    // --- Posicionamento aleatório dos ícones ao carregar a página ---
    const positionIconsRandomly = () => {
        const desktopWidth = window.innerWidth;
        const desktopHeight = window.innerHeight - 80; // Subtrai espaço para o rodapé

        icons.forEach(icon => {
            const iconWidth = icon.offsetWidth;
            const iconHeight = icon.offsetHeight;

            const padding = 20;
            const maxX = desktopWidth - iconWidth - padding;
            const maxY = desktopHeight - iconHeight - padding;

            const x = Math.max(padding, Math.min(Math.random() * maxX, maxX));
            const y = Math.max(padding, Math.min(Math.random() * maxY, maxY));

            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
        });
    };

    // NOVO: Chama a função de posicionamento aleatório quando a página carrega
    window.addEventListener('load', positionIconsRandomly);


    // Função para centralizar janela
    function centerWindow(win) {
        const windowWidth = win.offsetWidth;
        const windowHeight = win.offsetHeight;
        const x = (window.innerWidth - windowWidth) / 2;
        const y = (window.innerHeight - windowHeight) / 2;
        win.style.left = `${x}px`;
        win.style.top = `${y}px`;
    }

    // Centralizar janelas abertas ao redimensionar a tela
    window.addEventListener('resize', () => {
        windows.forEach(win => {
            if (win.style.display === 'block') {
                centerWindow(win);
            }
        });
        positionIconsRandomly(); // Reposiciona os ícones ao redimensionar
    });
});
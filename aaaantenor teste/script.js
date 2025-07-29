document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.icon');
    const windows = document.querySelectorAll('.window');
    const langSelect = document.getElementById('lang-select');
    let highestZIndex = 10;

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

    // Abertura e fechamento de janelas
    icons.forEach(icon => {
        icon.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;

            let moved = false;
            const startX = e.clientX;
            const startY = e.clientY;

            const onMouseMove = (moveEvent) => {
                if (Math.abs(moveEvent.clientX - startX) > 5 || Math.abs(moveEvent.clientY - startY) > 5) {
                    moved = true;
                }
            };

            const onMouseUp = (upEvent) => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                if (!moved) {
                    const targetId = icon.dataset.window;
                    const targetWindow = document.getElementById(targetId);

                    windows.forEach(win => {
                        if (win !== targetWindow) {
                            win.style.display = 'none';
                            win.classList.remove('is-visible');
                        }
                    });

                    targetWindow.style.display = 'block';
                    targetWindow.classList.add('is-visible'); // Adiciona a classe is-visible
                    highestZIndex++;
                    targetWindow.style.zIndex = highestZIndex;
                    centerWindow(targetWindow);
                } else {
                    upEvent.preventDefault();
                }
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            e.preventDefault();
        });

        // Adiciona listener para teclas Enter/Espaço para abrir janela
        icon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                icon.dispatchEvent(new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    button: 0
                }));
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

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const closedWindow = e.target.closest('.window');
            closedWindow.style.display = 'none';
            closedWindow.classList.remove('is-visible'); // Remove a classe is-visible
        });
    });

    // Posicionamento aleatório dos ícones ao carregar a página
    const positionIconsRandomly = () => {
        const desktopWidth = window.innerWidth;
        const desktopHeight = window.innerHeight - 80;

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

    window.addEventListener('load', positionIconsRandomly);

    // Lógica de arrastar ícones
    let draggedIcon = null;
    let iconOffsetX = 0;
    let iconOffsetY = 0;

    icons.forEach(icon => {
        icon.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            
            draggedIcon = icon;
            iconOffsetX = e.clientX - icon.getBoundingClientRect().left;
            iconOffsetY = e.clientY - icon.getBoundingClientRect().top;

            icon.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
            document.body.cursor = 'grabbing'; // Corrigido de 'cursor' para 'style.cursor'
            e.preventDefault();
            draggedIcon.classList.add('is-dragging');
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (draggedIcon) {
            const newX = e.clientX - iconOffsetX;
            const newY = e.clientY - iconOffsetY;

            const desktopWidth = window.innerWidth;
            const desktopHeight = window.innerHeight;
            const iconWidth = draggedIcon.offsetWidth;
            const iconHeight = draggedIcon.offsetHeight;
            
            const footerHeight = 50;

            const boundedX = Math.max(0, Math.min(newX, desktopWidth - iconWidth));
            const boundedY = Math.max(0, Math.min(newY, desktopHeight - iconHeight - footerHeight)); 

            draggedIcon.style.left = `${boundedX}px`;
            draggedIcon.style.top = `${boundedY}px`;
        }
    });

    // Lógica de arrastar janelas e trazer para frente
    let draggedWindow = null;
    let windowOffsetX = 0, windowOffsetY = 0;

    windows.forEach(win => {
        const titleBar = win.querySelector('.title-bar');

        titleBar.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            
            draggedWindow = win;
            const rect = win.getBoundingClientRect();
            windowOffsetX = e.clientX - rect.left;
            windowOffsetY = e.clientY - rect.top;

            highestZIndex++;
            win.style.zIndex = highestZIndex;

            titleBar.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
            document.body.cursor = 'grabbing'; // Corrigido de 'cursor' para 'style.cursor'
            e.preventDefault();
            draggedWindow.classList.add('is-dragging');
        });

        win.addEventListener('mousedown', () => {
            highestZIndex++;
            win.style.zIndex = highestZIndex;
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (draggedWindow) {
            const newX = e.clientX - windowOffsetX;
            const newY = e.clientY - windowOffsetY;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const winWidth = draggedWindow.offsetWidth;
            const winHeight = draggedWindow.offsetHeight;

            const boundedX = Math.max(0, Math.min(newX, viewportWidth - winWidth));
            const boundedY = Math.max(0, Math.min(newY, viewportHeight - winHeight - 50)); 

            draggedWindow.style.left = `${boundedX}px`;
            draggedWindow.style.top = `${boundedY}px`;
        }
    });
    
    // Evento global de mouseup para soltar ÍCONES e JANELAS
    document.addEventListener('mouseup', () => {
        if (draggedIcon) {
            draggedIcon.style.cursor = 'pointer';
            document.body.style.userSelect = '';
            document.body.cursor = ''; // Corrigido de 'cursor' para 'style.cursor'
            draggedIcon.classList.remove('is-dragging');
            draggedIcon = null;
        }
        if (draggedWindow) {
            draggedWindow.querySelector('.title-bar').style.cursor = 'grab';
            document.body.style.userSelect = '';
            document.body.cursor = ''; // Corrigido de 'cursor' para 'style.cursor'
            draggedWindow.classList.remove('is-dragging');
            draggedWindow = null;
        }
    });

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
        positionIconsRandomly();
    });
});
// ===== Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initAnimations();
});

// ===== Navigation =====
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// ===== Scroll Effects =====
function initScrollEffects() {
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Scroll Animations =====
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.feature-card, .game-card, .about__card, .stat'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animated class styles
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// ===== Controle de Autenticação (Login/Logout) =====
document.addEventListener('DOMContentLoaded', () => {
    // 1. Olha a gaveta do navegador
    const usuarioSalvo = localStorage.getItem("user");

    // 2. Se achar alguém salvo lá...
    if (usuarioSalvo) {
        const user = JSON.parse(usuarioSalvo);

        // 3. Procura a div dos botões (Lembra do id="auth-actions" no HTML!)
        const authContainer = document.getElementById("auth-actions");

        if (authContainer) {
            // 4. Troca os botões pelo nome do usuário
            // encapsula a opcao de ir para home, e sair dentro do icon de perfil mencionado
            authContainer.innerHTML = `
                <div class="user-profile-menu">
                    <span class="user-greeting">Olá, ${user.nome}!</span>
                    <div class="profile-dropdown-container">
                        <img src="assets/icons/menu_rodape_usuario.png" alt="Perfil" class="profile-icon-btn" onclick="toggleProfileDropdown(event)" title="Opções de Perfil">
                        <div class="profile-dropdown" id="profileDropdown">
                            <a href="home.html" class="dropdown-item" style="display:flex; align-items:center; gap:8px;">
                                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                Ir para Home
                            </a>
                            <button onclick="fazerLogout()" class="dropdown-item" style="display:flex; align-items:center; gap:8px;">
                                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
});

// ===== Funções do Perfil e Logout =====
window.toggleProfileDropdown = function(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
};

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown && dropdown.classList.contains('active')) {
        const menu = document.querySelector('.user-profile-menu');
        if (!menu || !menu.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    }
});

function fazerLogout() {
    localStorage.removeItem("user"); // Limpa a gaveta
    window.location.reload(); // Atualiza a página
}
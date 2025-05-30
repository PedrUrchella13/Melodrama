// JavaScript para a página de Contato

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initScrollAnimations();
    initHoverEffects();
    initParallaxEffects();
    initContactInteractions();
    
    console.log('Página de Contato Melodrama carregada! 🎵');
});

// Função para animações de scroll
function initScrollAnimations() {
    // Adiciona classe fade-in aos elementos
    const elementsToAnimate = [
        document.querySelector('.contact-info'),
        document.querySelector('.contact-image')
    ];
    
    elementsToAnimate.forEach(element => {
        if (element) {
            element.classList.add('fade-in');
        }
    });
    
    // Configura o Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observa todos os elementos fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Anima elementos iniciais com delay
    setTimeout(() => {
        document.querySelector('.contact-info')?.classList.add('visible');
        setTimeout(() => {
            document.querySelector('.contact-image')?.classList.add('visible');
        }, 300);
    }, 500);
}

// Função para efeitos de hover
function initHoverEffects() {
    // Efeito hover na imagem de contato
    const contactImg = document.querySelector('.contact-img');
    const imageContainer = document.querySelector('.image-container');
    
    if (contactImg && imageContainer) {
        imageContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            contactImg.style.transform = 'scale(1.05)';
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            contactImg.style.transform = 'scale(1)';
        });
    }
    
    // Efeito hover nos links de contato
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.textShadow = '0 0 10px rgba(138, 43, 226, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.textShadow = 'none';
        });
    });
    
    // Efeito hover no botão de instalar app
    const installBtn = document.querySelector('.install-app');
    
    if (installBtn) {
        installBtn.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #9932cc, #8a2be2)';
            this.style.transform = 'translateY(-3px)';
        });
        
        installBtn.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(45deg, #8a2be2, #9932cc)';
            this.style.transform = 'translateY(-2px)';
        });
    }
}

// Função para efeitos de parallax
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax na imagem de contato
        const contactImg = document.querySelector('.contact-img');
        if (contactImg) {
            contactImg.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Parallax nos efeitos de fundo
        const bgEffect1 = document.querySelector('.bg-effect-1');
        const bgEffect2 = document.querySelector('.bg-effect-2');
        const bgEffect3 = document.querySelector('.bg-effect-3');
        
        if (bgEffect1) {
            bgEffect1.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        if (bgEffect2) {
            bgEffect2.style.transform = `translateY(${scrolled * -0.2}px)`;
        }
        if (bgEffect3) {
            bgEffect3.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Função para interações de contato
function initContactInteractions() {
    // Copia email para clipboard ao clicar
    const emailLink = document.querySelector('a[href^="mailto:"]');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent.trim();
            
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copiado para a área de transferência!');
                // Ainda abre o cliente de email
                window.location.href = this.href;
            }).catch(() => {
                // Se falhar, apenas abre o cliente de email
                window.location.href = this.href;
            });
        });
    }
    
    // Copia telefone para clipboard ao clicar
    const phoneLink = document.querySelector('a[href^="tel:"]');
    
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            const phone = this.textContent.trim();
            
            navigator.clipboard.writeText(phone).then(() => {
                showNotification('Telefone copiado para a área de transferência!');
            }).catch(() => {
                console.log('Não foi possível copiar o telefone');
            });
        });
    }
    
    // Efeito de clique no link social
    const socialLink = document.querySelector('.social-link');
    
    if (socialLink) {
        socialLink.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                showNotification('Redirecionando para as redes sociais...');
            }, 150);
        });
    }
}

// Função para mostrar notificações
function showNotification(message) {
    // Remove notificação existente se houver
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #8a2be2, #9932cc);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(138, 43, 226, 0.4);
        z-index: 9999;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Anima a entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Função para smooth scroll nos links de navegação
function initSmoothScroll() {
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

// Inicializa smooth scroll
initSmoothScroll();

// Efeito de mudança no header ao fazer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 26, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(138, 43, 226, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 26, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Adiciona efeito de loading
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Efeito de partículas musicais (opcional)
function createMusicParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Cria notas musicais flutuantes
    const musicNotes = ['♪', '♫', '♬', '♩', '♭', '♯'];
    
    for (let i = 0; i < 10; i++) {
        const note = document.createElement('div');
        note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)];
        note.style.cssText = `
            position: absolute;
            color: rgba(138, 43, 226, 0.3);
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatMusic ${Math.random() * 15 + 10}s linear infinite;
        `;
        
        particlesContainer.appendChild(note);
    }
    
    // CSS para animação das notas musicais
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatMusic {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Ativa as partículas musicais
createMusicParticles();

console.log('Todos os efeitos da página de contato carregados! 🎵✨');
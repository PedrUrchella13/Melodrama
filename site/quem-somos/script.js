// JavaScript para a página Quem Somos

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initScrollAnimations();
    initHoverEffects();
    initParallaxEffects();
    
    console.log('Página Quem Somos carregada!');
});

// Função para animações de scroll
function initScrollAnimations() {
    // Adiciona classe fade-in aos elementos
    const elementsToAnimate = [
        ...document.querySelectorAll('.hero-text p'),
        ...document.querySelectorAll('.team-member'),
        document.querySelector('.hero-image')
    ];
    
    elementsToAnimate.forEach(element => {
        if (element) {
            element.classList.add('fade-in');
        }
    });
    
    // Configura o Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
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
        document.querySelectorAll('.hero-text .fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 300);
}

// Função para efeitos de hover
function initHoverEffects() {
    // Efeito hover nas fotos dos membros
    const memberPhotos = document.querySelectorAll('.member-photo');
    
    memberPhotos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.borderColor = '#90caf9';
            this.style.boxShadow = '0 12px 30px rgba(100, 181, 246, 0.6)';
            this.style.borderRadius = '20px';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.borderColor = '#64b5f6';
            this.style.boxShadow = '0 8px 20px rgba(100, 181, 246, 0.4)';
            this.style.borderRadius = '15px';
        });
    });
    
    // Efeito hover nos membros da equipe
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
            
            // Adiciona um brilho sutil ao fundo
            this.style.background = 'rgba(100, 181, 246, 0.05)';
            this.style.borderRadius = '10px';
            this.style.padding = '15px 20px';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = 'transparent';
            this.style.padding = '0 20px';
        });
    });
}

// Função para efeitos de parallax
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax na imagem principal
        const mainImage = document.querySelector('.main-image');
        if (mainImage) {
            mainImage.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax nos efeitos de fundo
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrolled * 0.2}px`;
        }
        
        // Parallax sutil nas fotos dos membros
        const memberPhotos = document.querySelectorAll('.member-photo');
        memberPhotos.forEach((photo, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            photo.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Função para smooth scroll nos links
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

// Adiciona efeito de loading
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Função para adicionar efeito de brilho nas fotos
function addPhotoGlowEffect() {
    const memberPhotos = document.querySelectorAll('.member-photo');
    
    memberPhotos.forEach((photo, index) => {
        // Adiciona um brilho aleatório ocasional
        setInterval(() => {
            if (Math.random() > 0.7) {
                photo.style.boxShadow = '0 8px 25px rgba(100, 181, 246, 0.8)';
                setTimeout(() => {
                    photo.style.boxShadow = '0 8px 20px rgba(100, 181, 246, 0.4)';
                }, 1000);
            }
        }, 3000 + (index * 1000));
    });
}

// Ativa o efeito de brilho
addPhotoGlowEffect();

// Adiciona efeito de digitação no texto (opcional)
function typeWriterEffect() {
    const heroTexts = document.querySelectorAll('.hero-text p');
    
    heroTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < originalText.length) {
                    text.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 30);
        }, index * 2000);
    });
}

// Descomenta para ativar o efeito de digitação
// typeWriterEffect();

// Adiciona efeito de partículas flutuantes
function createFloatingParticles() {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(container);
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(100, 181, 246, 0.6);
            border-radius: 2px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
        `;
        
        container.appendChild(particle);
    }
    
    // CSS para animação das partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
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

// Ativa as partículas flutuantes
createFloatingParticles();

console.log('Todos os efeitos carregados com sucesso! ✨');
// JavaScript para a página Quem Somos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initScrollAnimations();
    initHoverEffects();
    initParallaxEffects();
    
    console.log('Página Quem Somos carregada!');
});

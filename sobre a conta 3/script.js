// Funções de navegação
function goBack() {
    console.log('Voltando para a tela anterior');
    
    // Efeito visual no botão
    const backBtn = document.querySelector('.back-btn');
    backBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        backBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Animação de saída
    animatePageExit();
    
    // Simular navegação
    setTimeout(() => {
        // window.history.back();
        console.log('Navegação executada');
    }, 300);
}

function openProfile() {
    console.log('Abrindo perfil do usuário');
    
    // Efeito visual no botão
    const profileBtn = document.querySelector('.profile-btn');
    profileBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        profileBtn.style.transform = 'scale(1)';
    }, 150);
    
    showToast('Abrindo perfil...', 'info');
}

function openArticle(articleId) {
    console.log(`Abrindo artigo: ${articleId}`);
    addClickEffect(event.currentTarget);
    
    // Mapear IDs para títulos de artigos
    const articleTitles = {
        'melodrama': 'Sobre o melodrama',
        'voice': 'Como gravar sua voz',
        'login': 'Problemas para entrar',
        'devices': 'Listas de despositivos',
        'chat': 'Chat'
    };
    
    showToast(`Abrindo artigo: ${articleTitles[articleId]}`, 'primary');
    
    // Simular carregamento
    setTimeout(() => {
        // Implementar abertura do artigo
        console.log(`Artigo ${articleTitles[articleId]} carregado`);
    }, 800);
}

function logout() {
    // Confirmação personalizada
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        console.log('Usuário confirmou logout');
        
        addClickEffect(event.currentTarget);
        showToast('Saindo da conta...', 'warning');
        
        // Animação de logout
        const logoutItem = document.querySelector('.logout-item');
        logoutItem.style.transform = 'scale(0.95)';
        
        // Simular processo de logout
        setTimeout(() => {
            showToast('Logout realizado com sucesso!', 'success');
            
            // Animação de saída da página
            animatePageExit();
            
            setTimeout(() => {
                // window.location.href = '/login';
                console.log('Redirecionado para página de login');
            }, 1000);
        }, 1500);
    }
}

// Função para busca
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Pesquisando por: ${query}`);
            showToast(`Pesquisando por: ${query}`, 'info');
            
            // Simular pesquisa
            searchInput.blur();
            
            // Adicionar efeito de carregamento
            searchBtn.innerHTML = '<i class="bi bi-hourglass-split"></i>';
            searchBtn.disabled = true;
            
            setTimeout(() => {
                // Restaurar botão
                searchBtn.innerHTML = '<i class="bi bi-search"></i>';
                searchBtn.disabled = false;
                
                // Mostrar resultados
                showToast(`Encontrados 5 resultados para "${query}"`, 'success');
            }, 1500);
        } else {
            showToast('Digite algo para pesquisar', 'warning');
        }
    }
});

// Função para adicionar efeito de clique
function addClickEffect(element) {
    element.style.transform = 'translateX(8px)';
    element.style.background = 'rgba(255, 255, 255, 0.15)';
    
    setTimeout(() => {
        element.style.transform = '';
        element.style.background = '';
    }, 200);
}

// Função para animação de saída da página
function animatePageExit() {
    const container = document.querySelector('.main-container');
    container.style.transform = 'translateX(-100%)';
    container.style.opacity = '0.5';
    
    setTimeout(() => {
        container.style.transform = '';
        container.style.opacity = '';
    }, 500);
}

// Função para mostrar toast notifications
function showToast(message, type = 'info') {
    // Criar toast container se não existir
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    const toastId = 'toast-' + Date.now();
    const bgClass = {
        'warning': 'bg-warning text-dark',
        'success': 'bg-success text-white',
        'primary': 'bg-primary text-white',
        'info': 'bg-info text-white'
    }[type] || 'bg-info text-white';
    
    const toastHTML = `
        <div id="${toastId}" class="toast ${bgClass}" role="alert">
            <div class="toast-body d-flex align-items-center">
                <i class="bi bi-info-circle me-2"></i>
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Remover toast após ser escondido
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Adicionar efeitos de interação para todos os itens
    menuItems.forEach(item => {
        // Efeito de toque para mobile
        item.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98) translateX(3px)';
        }, { passive: true });
        
        item.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
        
        // Efeito de mouse para desktop
        item.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98) translateX(3px)';
        });
        
        item.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Efeito de ripple nos itens do menu
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // Animação de entrada da página
    setTimeout(() => {
        document.querySelector('.main-container').style.opacity = '1';
    }, 100);
});

// Função para criar efeito ripple
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// CSS para efeito ripple (adicionado dinamicamente)
const rippleCSS = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
        z-index: 1;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .menu-item {
        position: relative;
        overflow: hidden;
    }
`;

// Adicionar CSS do ripple ao documento
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);
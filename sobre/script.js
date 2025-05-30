document.addEventListener('DOMContentLoaded', function() {
    // Adicionar efeito de clique nos botões
    const menuButtons = document.querySelectorAll('.btn-menu');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Adiciona classe para efeito visual
            this.classList.add('btn-active');
            
            // Simula ação baseada no texto do botão
            const buttonText = this.textContent.trim();
            
            switch(buttonText) {
                case 'Sobre a Conta':
                    showAlert('Informações da conta');
                    break;
                case 'Fale conosco':
                    showAlert('Abrindo chat de suporte');
                    break;
                case 'Configuração Vocal':
                    showAlert('Configurações de voz');
                    break;
                case 'Sair':
                    showConfirm('Tem certeza que deseja sair?');
                    break;
            }
            
            // Remove a classe após a animação
            setTimeout(() => {
                this.classList.remove('btn-active');
            }, 200);
        });
    });
    
    // Botão de voltar
    const backButton = document.querySelector('.back-button .btn');
    backButton.addEventListener('click', function() {
        showAlert('Voltando para a tela anterior');
    });
    
    // Funções auxiliares
    function showAlert(message) {
        alert(message);
    }
    
    function showConfirm(message) {
        if(confirm(message)) {
            alert('Saindo da aplicação...');
        }
    }
    
    // Adicionar efeito de hover nos botões para dispositivos móveis
    if ('ontouchstart' in window) {
        menuButtons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
        });
    }
});

// Adicionar estilo CSS para o efeito de clique
const style = document.createElement('style');
style.textContent = `
    .btn-active {
        transform: scale(0.98);
        opacity: 0.9;
    }
`;
document.head.appendChild(style);
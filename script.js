// Data alvo: 27 de janeiro de 2026 às 17:15
const targetDate = new Date(2026, 0, 27, 17, 15, 0).getTime();

// Elementos do DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const progressFill = document.getElementById('progressFill');
const statusText = document.getElementById('statusText');
const messageText = document.getElementById('messageText');

// Array de mensagens motivacionais
const messages = [
    'Prepare-se para o fim! 🚀',
    'Quase lá! Você consegue! 💪',
    'O final está chegando! 🎯',
    'Último esforço! 🔥',
    'Você vai conseguir! ⚡',
    'Foco total! 👁️',
    'Que vem valendo! 🎮',
    'Vai dar bom! 😎',
    'Código é vida! 💚',
    'Dev até o fim! 👨‍💻'
];

let messageIndex = 0;
let lastSecond = 0;

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    if (timeRemaining < 0) {
        // Countdown finalizado
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        statusText.textContent = 'FINALIZADO!';
        statusText.style.color = '#00ff41';
        statusText.style.animation = 'none';
        messageText.textContent = '🎉 Parabéns! O curso foi concluído! 🎉';
        progressFill.style.width = '100%';
        document.body.style.background = 'linear-gradient(135deg, rgba(0, 255, 65, 0.2) 0%, rgba(0, 255, 65, 0.1) 100%), linear-gradient(135deg, #0a0e27 0%, #050812 100%)';
        
        // Efeito de celebração
        createConfetti();
        return;
    }

    // Calcula dias, horas, minutos e segundos
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Formata números com zero à esquerda
    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Atualiza elementos com animação se o valor mudou
    updateElement(daysElement, formattedDays);
    updateElement(hoursElement, formattedHours);
    updateElement(minutesElement, formattedMinutes);
    updateElement(secondsElement, formattedSeconds);

    // Atualiza barra de progresso
    const totalTime = targetDate - new Date(2026, 0, 1, 0, 0, 0).getTime();
    const elapsedTime = now - new Date(2026, 0, 1, 0, 0, 0).getTime();
    const progressPercentage = (elapsedTime / totalTime) * 100;
    progressFill.style.width = Math.max(0, Math.min(progressPercentage, 100)) + '%';

    // Muda mensagem a cada 10 segundos
    if (seconds % 10 === 0 && seconds !== lastSecond) {
        lastSecond = seconds;
        messageIndex = (messageIndex + 1) % messages.length;
        messageText.style.animation = 'none';
        setTimeout(() => {
            messageText.textContent = messages[messageIndex];
            messageText.style.animation = 'messageFloat 3s ease-in-out infinite, fadeIn 0.5s ease-out';
        }, 10);
    }

    // Atualiza status
    if (days === 0 && hours === 0 && minutes < 5) {
        statusText.textContent = '⚠️ ÚLTIMAS HORAS!';
        statusText.style.color = '#ff0000';
    } else if (days === 0 && hours === 0) {
        statusText.textContent = 'HOJE! 🎯';
    } else if (days === 1) {
        statusText.textContent = 'AMANHÃ! ⏰';
    } else {
        statusText.textContent = 'EM ANDAMENTO';
    }
}

function updateElement(element, newValue) {
    if (element.textContent !== newValue) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.textContent = newValue;
            element.style.animation = 'countChange 0.6s ease-in-out';
        }, 10);
    }
}

// Cria efeito de confete quando o countdown termina
function createConfetti() {
    const confettiPieces = 50;
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = Math.random() > 0.5 ? '#00ff41' : '#39ff14';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.boxShadow = '0 0 10px currentColor';
        document.body.appendChild(confetti);

        const duration = 2 + Math.random() * 1;
        const xMove = (Math.random() - 0.5) * 300;
        
        let top = -10;
        let opacity = 1;
        const startTime = Date.now();

        function animateConfetti() {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = elapsed / duration;

            if (progress < 1) {
                top = -10 + (window.innerHeight + 30) * progress;
                opacity = 1 - progress;
                confetti.style.top = top + 'px';
                confetti.style.left = (parseInt(confetti.style.left) + xMove * 0.02) + 'px';
                confetti.style.opacity = opacity;
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }

        animateConfetti();
    }
}

// Inicia o countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// Efeito de scroll parallax nos stars
document.addEventListener('mousemove', (e) => {
    const starsBackground = document.querySelector('.stars');
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    starsBackground.style.transform = `translate(${x}px, ${y}px)`;
});

// Adiciona som opcional ao mudar de segundo
function playSound() {
    // Cria um padrão de áudio usando Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 400;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Toca som a cada 10 segundos (opcional - descomente se quiser)
let lastSoundSecond = 0;
const originalUpdateCountdown = updateCountdown;
setInterval(() => {
    const now = new Date().getTime();
    const timeRemaining = Math.max(0, targetDate - now);
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    if (seconds % 10 === 0 && seconds !== lastSoundSecond && timeRemaining > 0) {
        lastSoundSecond = seconds;
        try {
            playSound();
        } catch (e) {
            // Som pode não funcionar em alguns navegadores/contextos
        }
    }
}, 1000);

// Detecta se é mobile
const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isSmallMobile = window.innerWidth <= 480;

// Efeito de interação ao clicar (desabilitado em mobile)
if (!isMobile) {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'radial-gradient(circle, #00ff41, transparent)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        document.body.appendChild(ripple);

        let size = 10;
        let opacity = 1;
        const interval = setInterval(() => {
            size += 5;
            opacity -= 0.05;
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - size / 2) + 'px';
            ripple.style.top = (e.clientY - size / 2) + 'px';
            ripple.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(interval);
                ripple.remove();
            }
        }, 20);
    });
}

// Efeito hover nos displays numéricos (apenas desktop)
if (!isMobile) {
    const timeDisplays = document.querySelectorAll('.time-display');
    timeDisplays.forEach(display => {
        display.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotateZ(2deg)';
        });
        
        display.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateZ(0deg)';
        });
    });
}

// Parallax otimizado para desktop
if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        const starsBackground = document.querySelector('.stars');
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        starsBackground.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Previne seleção de texto
document.addEventListener('selectstart', (e) => {
    if (e.target.closest('.container')) {
        e.preventDefault();
    }
});

// Otimiza performance reduzindo animações em mobile
if (isMobile) {
    // Desabilita efeito parallax no fundo para economizar bateria
    const starsBackground = document.querySelector('.stars');
    if (starsBackground) {
        starsBackground.style.animation = 'starTwinkle 12s ease-in-out infinite';
    }
}

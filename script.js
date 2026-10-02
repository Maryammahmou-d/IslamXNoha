// Target: Saturday, 28 November 2026 at 3:00 PM (Egypt/Cairo time, UTC+2)
const WEDDING_DATE = new Date('2026-11-28T15:00:00+02:00');

function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}


let splashOpened = false;
let bgMusic = null;

function openInvitation() {
    if (splashOpened) return;
    splashOpened = true;

    const splash = document.getElementById('splash');
    if (splash) {
        splash.classList.add('hidden');
    }

    bgMusic = new Audio();
    bgMusic.src = 'song.mp3';
    bgMusic.loop = true;
    bgMusic.volume = 1;
    bgMusic.preload = 'auto';

    var playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.then(function () {
            console.log('Audio playing');
        }).catch(function (err) {
            console.log('Audio play failed:', err);
            // Fallback: try again after a short delay
            setTimeout(function () { bgMusic.play(); }, 300);
        });
    }

    const embed = document.getElementById('music-embed');
    if (embed) {
        embed.innerHTML = '<p class="now-playing">&#9835; Now Playing</p>';
    }
}

function initSplash() {
    const splash = document.getElementById('splash');
    const openBtn = document.getElementById('open-invitation');

    if (openBtn) {
        openBtn.addEventListener('click', openInvitation);
    }

    if (splash) {
        splash.addEventListener('click', (event) => {
            if (event.target === splash) {
                openInvitation();
            }
        });
    }
}

function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach((el) => observer.observe(el));
}

function initFlowers() {
    const container = document.getElementById('flowers-bg');
    if (!container) return;

    const colors = [
        'rgba(168, 196, 155, 0.7)',
        'rgba(122, 155, 106, 0.6)',
        'rgba(196, 214, 184, 0.65)',
        'rgba(107, 142, 94, 0.5)',
        'rgba(249, 241, 200, 0.7)',
        'rgba(232, 213, 195, 0.65)',
        'rgba(61, 90, 58, 0.3)',
    ];

    const count = 45;

    for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 18 + 8;
        const left = Math.random() * 100;
        const duration = Math.random() * 18 + 12;
        const delay = Math.random() * 15;
        const color = colors[Math.floor(Math.random() * colors.length)];

        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = left + '%';
        petal.style.backgroundColor = color;
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = delay + 's';

        container.appendChild(petal);
    }
}

function init() {
    initCountdown();
    initSplash();
    initReveal();
    initFlowers();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

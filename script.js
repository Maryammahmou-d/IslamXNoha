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

function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Coordinates for Fairy Garden Greenery, Cairo, Egypt.
    const venueLat = 29.9636844;
    const venueLng = 31.0415557;

    const map = L.map('map', {
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        zoomControl: false,
    }).setView([venueLat, venueLng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map);

    L.marker([venueLat, venueLng])
        .addTo(map)
        .bindPopup('<b>Fairy Garden Greenery</b><br>Cairo, Egypt')
        .openPopup();
}

let splashOpened = false;
const bgMusic = new Audio('song.mp3');
bgMusic.loop = true;
bgMusic.volume = 1;

function openInvitation() {
    if (splashOpened) return;
    splashOpened = true;

    const splash = document.getElementById('splash');
    if (splash) {
        splash.classList.add('hidden');
    }

    bgMusic.play();

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

function init() {
    initCountdown();
    initMap();
    initSplash();
    initReveal();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Funkcja do przewijania do sekcji
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Funkcja do przewijania do kategorii
function scrollToCategory(categoryId) {
    document.getElementById(categoryId).scrollIntoView({ behavior: 'smooth' });
}

// Funkcja do przełączania motywu ciemnego
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const themeButton = document.getElementById('themeButton');
    if (body.classList.contains('dark-mode')) {
        themeButton.textContent = "☀️ Jasny motyw";
    } else {
        themeButton.textContent = "🌙 Ciemny motyw";
    }
}

// Funkcja do pokazywania stopki po przewinięciu na dół
function handleScroll() {
    const footer = document.getElementById('footer');
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;

    if (scrollPosition >= documentHeight - 50) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
}

// Funkcja do aktualizacji statusu restauracji
function updateStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Niedziela, 1 = Poniedziałek, ..., 6 = Sobota
    const hour = now.getHours();
    const statusButton = document.getElementById('statusButton');
    const statusText = document.getElementById('statusText');

    let isOpen = false;

    if (day === 0) { // Niedziela
        isOpen = hour >= 12 && hour < 24; // 12:00 - 00:00
    } else if (day === 5 || day === 6) { // Piątek lub Sobota
        if (hour >= 10 || hour < 2) { // 10:00 - 02:00 (następnego dnia)
            isOpen = true;
        }
    } else { // Pozostałe dni (Poniedziałek - Czwartek)
        isOpen = hour >= 10 && hour < 24; // 10:00 - 00:00
    }

    if (isOpen) {
        statusButton.textContent = "Otwarte";
        statusButton.className = "status-open";
    } else {
        statusButton.textContent = "Zamknięte";
        statusButton.className = "status-closed";
    }
}

// Nasłuchiwanie na przewijanie strony
window.addEventListener('scroll', handleScroll);

// Aktualizuj status przy załadowaniu strony
updateStatus();

// Aktualizuj status co minutę
setInterval(updateStatus, 60000); // 60000 ms = 1 minuta
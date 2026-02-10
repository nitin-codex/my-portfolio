/* ==================== TYPING ANIMATION ==================== */
const typingText = document.getElementById('typing-text');
const words = ['Computer Science Student', 'AI & Tech Enthusiast', 'Developer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

/* ==================== STICKY NAVBAR ==================== */
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scroll-header');
    } else {
        navbar.classList.remove('scroll-header');
    }
});

/* ==================== MOBILE MENU TOGGLE ==================== */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.classList.remove('open');
    });
});

/* ==================== SCROLL REVEAL ANIMATION ==================== */
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
checkReveal(); // Check on load

/* ==================== ACTIVE LINK ON SCROLL ==================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

/* ==================== SKILL BAR ANIMATION ==================== */
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.skill-fill');
let showedSkills = false;

function showSkills() {
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionTop < screenPosition && !showedSkills) {
        progressBars.forEach(progressBar => {
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = width + '%';
        });
        showedSkills = true;
    }
}

window.addEventListener('scroll', showSkills);

/* ==================== NUMBER COUNTER ANIMATION ==================== */
const counters = document.querySelectorAll('.stat-value');
let showedCounters = false;

function startCounters() {
    const heroSection = document.querySelector('.hero');
    const sectionTop = heroSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionTop < screenPosition && !showedCounters) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 20); // 20ms refresh rate

            let currentCount = 0;
            const updateCounter = () => {
                currentCount += increment;
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
        showedCounters = true;
    }
}

// Start counters after a slight delay for initial load
setTimeout(startCounters, 1000);

/* ==================== CONTACT FORM SUBMIT ==================== */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simple visual feedback
        const btn = this.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>Message Sent!</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        btn.style.backgroundColor = 'var(--first-color-alt)';

        this.reset();

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 3000);
    });
}

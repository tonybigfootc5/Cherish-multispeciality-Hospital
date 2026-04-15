/* ============================================
   CHERISH HOSPITAL — PREMIUM PORTAL SCRIPTS
   Theme · Departments · UI
   ============================================ */

// ==========================================
// DATA — Departments & Doctors
// ==========================================
const DEPARTMENTS = [
    { id: 'cardiology', name: 'Cardiology', icon: 'fa-heart-pulse', category: 'medical', desc: 'Expert cardiac care with advanced diagnostics and interventional procedures.', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80' },
    { id: 'orthopedics', name: 'Orthopedics', icon: 'fa-bone', category: 'surgical', desc: 'Joint replacements, sports medicine and fracture management.', img: 'https://images.unsplash.com/photo-1516069677018-378515003435?auto=format&fit=crop&w=600&q=80' },
    { id: 'neurology', name: 'Neurology', icon: 'fa-brain', category: 'medical', desc: 'Comprehensive treatment for brain, spine and nervous system disorders.', img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80' },
    { id: 'pediatrics', name: 'Pediatrics', icon: 'fa-baby', category: 'medical', desc: 'Gentle, specialized healthcare for infants, children and adolescents.', img: 'https://images.unsplash.com/photo-1632052999447-e542d08d4f7d?auto=format&fit=crop&w=600&q=80' },
    { id: 'gynecology', name: 'Gynecology', icon: 'fa-person-pregnant', category: 'specialty', desc: 'Complete women\'s health — from routine care to complex surgeries.', img: 'https://images.unsplash.com/photo-1706065264583-55f1a8549769?auto=format&fit=crop&w=600&q=80' },
    { id: 'ent', name: 'ENT', icon: 'fa-ear-listen', category: 'specialty', desc: 'Treatment for ear, nose and throat conditions with precision surgery.', img: 'https://images.unsplash.com/photo-1576765974930-2ebbfbd6dd20?auto=format&fit=crop&w=600&q=80' },
    { id: 'dermatology', name: 'Dermatology', icon: 'fa-hand-dots', category: 'specialty', desc: 'Advanced skin care, cosmetic treatments and allergy management.', img: 'https://images.unsplash.com/photo-1713085085470-fba013d67e65?auto=format&fit=crop&w=600&q=80' },
    { id: 'general-surgery', name: 'General Surgery', icon: 'fa-syringe', category: 'surgical', desc: 'Minimally invasive and open surgical procedures by expert surgeons.', img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80' }
];

const DOCTORS = [
    { name: 'Dr. Indra Mohan', dept: 'general-surgery', specialty: 'Chief Surgeon & Director', exp: '20+ years' },
    { name: 'Dr. Arjun Mehta', dept: 'cardiology', specialty: 'Interventional Cardiologist', exp: '15 years' },
    { name: 'Dr. Kavitha Rao', dept: 'cardiology', specialty: 'Cardiac Electrophysiologist', exp: '12 years' },
    { name: 'Dr. Sameer Joshi', dept: 'orthopedics', specialty: 'Joint Replacement Surgeon', exp: '18 years' },
    { name: 'Dr. Neha Gupta', dept: 'orthopedics', specialty: 'Sports Medicine Specialist', exp: '10 years' },
    { name: 'Dr. Rakesh Verma', dept: 'neurology', specialty: 'Neurophysician', exp: '14 years' },
    { name: 'Dr. Deepa Nair', dept: 'neurology', specialty: 'Neurosurgeon', exp: '16 years' },
    { name: 'Dr. Pooja Sharma', dept: 'pediatrics', specialty: 'Pediatric Intensivist', exp: '11 years' },
    { name: 'Dr. Sunil Reddy', dept: 'gynecology', specialty: 'Obstetrician & Gynecologist', exp: '13 years' },
    { name: 'Dr. Meera Iyer', dept: 'ent', specialty: 'ENT & Head-Neck Surgeon', exp: '9 years' },
    { name: 'Dr. Anil Kapoor', dept: 'dermatology', specialty: 'Cosmetic Dermatologist', exp: '8 years' },
    { name: 'Dr. Priya Das', dept: 'general-surgery', specialty: 'Laparoscopic Surgeon', exp: '12 years' }
];

// ==========================================
// THEME — Dark / Light Mode
// ==========================================
function initTheme() {
    const saved = localStorage.getItem('cherishTheme');
    if (saved) {
        setTheme(saved);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('cherishTheme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('cherishTheme', next);
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderDepartments();
    initNavScroll();
    initSmoothScroll();
    // Testimonials use pure CSS marquee, no JS init needed
    initDeptFilters();
    initBackToTop();
    initSectionReveal();
    initHeroVideoLoop();
});

// ==========================================
// HERO VIDEO — SEAMLESS LOOP
// ==========================================
function initHeroVideoLoop() {
    const video = document.getElementById('heroVideo');
    if (!video) return;

    // Fade in video once it starts playing to prevent poster flash
    video.addEventListener('playing', () => {
        video.classList.add('loaded');
    }, { once: true });

    // Jump back to start just before the end to avoid the last-frame stutter
    video.addEventListener('timeupdate', () => {
        if (video.duration && video.currentTime > video.duration - 0.3) {
            video.currentTime = 0;
        }
    });
}

// ==========================================
// DEPARTMENTS RENDERING
// ==========================================
function renderDepartments() {
    const grid = document.getElementById('deptGrid');
    grid.innerHTML = DEPARTMENTS.map(dept => `
        <a href="departments/${dept.id}.html" class="dept-card glass-card" data-category="${dept.category}"
             role="link" tabindex="0"
             aria-label="Learn more about ${dept.name}">
            <div class="dept-card-img">
                <img src="${dept.img}" alt="${dept.name}" loading="lazy">
                <div class="dept-card-img-overlay"></div>
            </div>
            <div class="dept-card-content">
                <div class="dept-icon"><i class="fa-solid ${dept.icon}"></i></div>
                <h4>${dept.name}</h4>
                <p>${dept.desc}</p>
                <span class="dept-link-arrow"><i class="fa-solid fa-arrow-right"></i></span>
            </div>
        </a>
    `).join('');
}

function initDeptFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const cards = document.querySelectorAll('.dept-card');
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==========================================
// SCROLL TO CONTACT SECTION
// ==========================================
function scrollToBooking() {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${icons[type]}"></i><span>${message}</span>`;
    container.appendChild(toast);

    // Remove after animation completes
    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 4000);
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
function initNavScroll() {
    const navbar = document.getElementById('navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            // Ignore bare "#" anchors (social links, placeholders, etc.)
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile nav if open
                document.getElementById('navLinks')?.classList.remove('open');
                document.getElementById('hamburger')?.classList.remove('active');
            }
        });
    });
}

// ==========================================
// MOBILE NAV
// ==========================================
function toggleMobileNav() {
    document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('active');
}

// ==========================================
// TESTIMONIALS — Pure CSS marquee, no JS needed
// ==========================================

// ==========================================
// MODAL OVERLAY CLICK-TO-CLOSE
// ==========================================
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            // Close the overlay
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
});

// ESC key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            if (!overlay.classList.contains('hidden')) {
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// CHATBOT POPUP
// ==========================================
function showChatbotPopup() {
    const popup = document.getElementById('chatbotPopup');
    if (popup) {
        popup.classList.toggle('hidden');
    }
}

function closeChatbotPopup() {
    const popup = document.getElementById('chatbotPopup');
    if (popup) popup.classList.add('hidden');
}

// Close chatbot popup on outside click
document.addEventListener('click', (e) => {
    const popup = document.getElementById('chatbotPopup');
    const chatBtn = document.querySelector('.float-chat');
    if (popup && !popup.contains(e.target) && chatBtn && !chatBtn.contains(e.target)) {
        popup.classList.add('hidden');
    }
});

// ==========================================
// SECTION REVEAL ON SCROLL
// ==========================================
function initSectionReveal() {
    const sections = document.querySelectorAll('.reveal');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    sections.forEach(s => observer.observe(s));
}



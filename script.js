/* ============================================
   CHERISH HOSPITAL — PREMIUM PORTAL SCRIPTS
   Auth · Booking Engine · Dashboard · UI
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

const MORNING_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
const AFTERNOON_SLOTS = ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];

const LS_USER_KEY = 'cherishUser';
const LS_APPOINTMENTS_KEY = 'cherishAppointments';

// ==========================================
// STATE
// ==========================================
let bookingState = {
    step: 1,
    department: '',
    doctor: '',
    doctorName: '',
    date: '',
    time: '',
    patientName: '',
    phone: '',
    email: '',
    notes: ''
};

let confirmAction = null; // for reschedule/cancel confirm tooltip

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
    initAuth();
    renderDepartments();
    populateDeptSelect();
    initDatePicker();
    renderSlots();
    initNavScroll();
    initSmoothScroll();
    initStatsCounter();
    // Testimonials use pure CSS marquee, no JS init needed
    initDeptFilters();
    updateBookingButtons();
    initBackToTop();
    initPhoneFilter();
    initSectionReveal();
    updateApptBadge();
    initOTPInputs();
    initBookingValidation();
    initHeroVideoLoop();
});

// ==========================================
// HERO VIDEO — SEAMLESS LOOP
// ==========================================
function initHeroVideoLoop() {
    const video = document.getElementById('heroVideo');
    if (!video) return;

    // Jump back to start just before the end to avoid the last-frame stutter
    video.addEventListener('timeupdate', () => {
        if (video.duration && video.currentTime > video.duration - 0.3) {
            video.currentTime = 0;
        }
    });
}

// ==========================================
// AUTH MANAGER
// ==========================================
function getUser() {
    try {
        const data = localStorage.getItem(LS_USER_KEY);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

function saveUser(user) {
    localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
}

function clearUser() {
    localStorage.removeItem(LS_USER_KEY);
}

function isLoggedIn() {
    return !!getUser();
}

function initAuth() {
    const user = getUser();
    if (user) {
        switchToPatientView(user);
    } else {
        switchToGuestView();
    }
}

function switchToPatientView(user) {
    const guestActions = document.getElementById('guestActions');
    const patientActions = document.getElementById('patientActions');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownEmail = document.getElementById('dropdownEmail');

    guestActions.classList.add('hidden');
    patientActions.classList.remove('hidden');

    const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';
    userAvatar.textContent = initial;
    userName.textContent = user.name.split(' ')[0];
    dropdownName.textContent = user.name;
    dropdownEmail.textContent = user.email;

    // Update dropdown avatar
    const dropdownAvatars = patientActions.querySelectorAll('.dropdown-header .avatar-circle');
    dropdownAvatars.forEach(a => a.textContent = initial);

    updateBookingButtons();
}

function switchToGuestView() {
    document.getElementById('guestActions').classList.remove('hidden');
    document.getElementById('patientActions').classList.add('hidden');
    closeProfileDropdown();
    updateBookingButtons();
}

function updateBookingButtons() {
    // New OTP-based flow doesn't require Google sign-in gate
    const confirmGoogle = document.getElementById('confirmGoogleBtn');
    const confirmBooking = document.getElementById('confirmBookingBtn');
    if (confirmGoogle && confirmBooking) {
        if (isLoggedIn()) {
            confirmGoogle.classList.add('hidden');
            confirmBooking.classList.remove('hidden');
        } else {
            confirmGoogle.classList.remove('hidden');
            confirmBooking.classList.add('hidden');
        }
    }
}

function handleGoogleSignIn() {
    const authContent = document.getElementById('authContent');
    const authLoading = document.getElementById('authLoading');

    authContent.classList.add('hidden');
    authLoading.classList.remove('hidden');

    setTimeout(() => {
        const mockUser = {
            name: 'Tony Stark',
            email: 'tony.stark@gmail.com',
            avatar: null
        };
        saveUser(mockUser);
        switchToPatientView(mockUser);
        closeAuthModal();

        // Reset auth modal state for future use
        authContent.classList.remove('hidden');
        authLoading.classList.add('hidden');

        showToast('Login Successful! Welcome, ' + mockUser.name.split(' ')[0], 'success');
    }, 1500);
}

function handleSignOut() {
    clearUser();
    switchToGuestView();
    showToast('Signed out successfully', 'info');
}

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const toggle = document.getElementById('profileToggle');
    const isOpen = !dropdown.classList.contains('hidden');

    if (isOpen) {
        closeProfileDropdown();
    } else {
        dropdown.classList.remove('hidden');
        toggle.classList.add('open');
    }
}

function closeProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const toggle = document.getElementById('profileToggle');
    if (dropdown) dropdown.classList.add('hidden');
    if (toggle) toggle.classList.remove('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.profile-dropdown-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        closeProfileDropdown();
    }
});

// ==========================================
// AUTH MODAL
// ==========================================
function openAuthModal() {
    document.getElementById('authModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
    document.body.style.overflow = '';
    // Reset state
    document.getElementById('authContent').classList.remove('hidden');
    document.getElementById('authLoading').classList.add('hidden');
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

/** Click handler for dept cards — scrolls to booking and pre-selects the dept. */
function bookInDept(deptId) {
    scrollToBooking();
    setTimeout(() => {
        goToStep(2);
        bookingState.department = deptId;
        document.querySelectorAll('.b-dept-chip').forEach(c => {
            c.classList.toggle('active', c.dataset.dept === deptId);
        });
        renderDoctorSelection(deptId);
    }, 500);
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
// BOOKING ENGINE — OTP VERIFIED FLOW
// ==========================================
let generatedOTP = '';
let otpTimerInterval = null;

function populateDeptSelect() {
    // Now renders department chips instead of <select>
    const container = document.getElementById('deptChips');
    if (!container) return;
    container.innerHTML = DEPARTMENTS.map(dept => `
        <button class="b-dept-chip" data-dept="${dept.id}" onclick="handleDeptChipClick('${dept.id}', this)">
            <i class="fa-solid ${dept.icon}"></i> ${dept.name}
        </button>
    `).join('');
}

function handleDeptChipClick(deptId, el) {
    document.querySelectorAll('.b-dept-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    bookingState.department = deptId;
    bookingState.doctor = '';
    bookingState.doctorName = '';
    document.getElementById('step2Next').disabled = true;
    renderDoctorSelection(deptId);
}

function handleDeptChange() {
    // kept for bookWithDoctor compatibility
    const deptId = bookingState.department;
    renderDoctorSelection(deptId);
}

function renderDoctorSelection(deptId) {
    const grid = document.getElementById('doctorsGrid');
    if (!deptId) {
        grid.innerHTML = `<div class="b-placeholder"><i class="fa-solid fa-hand-pointer"></i><p>Select a department above to see available doctors</p></div>`;
        return;
    }

    const deptDoctors = DOCTORS.filter(d => d.dept === deptId);
    if (deptDoctors.length === 0) {
        grid.innerHTML = `<div class="b-placeholder"><i class="fa-solid fa-user-xmark"></i><p>No doctors available for this department</p></div>`;
        return;
    }

    grid.innerHTML = deptDoctors.map(doc => {
        const initials = doc.name.replace('Dr. ', '').split(' ').map(w => w[0]).join('');
        return `
        <button class="b-doctor-card" onclick="selectDoctor('${doc.name}', this)">
            <div class="b-doc-avatar">${initials}</div>
            <div class="b-doc-info">
                <div class="b-doc-name">${doc.name}</div>
                <div class="b-doc-meta">${doc.specialty} · ${doc.exp}</div>
            </div>
            <div class="b-doc-check"><i class="fa-solid fa-check"></i></div>
        </button>`;
    }).join('');
}

function selectDoctor(name, el) {
    document.querySelectorAll('.b-doctor-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    bookingState.doctorName = name;
    bookingState.doctor = name;
    document.getElementById('step2Next').disabled = false;
}

function initDatePicker() {
    const dateInput = document.getElementById('dateSelect');
    if (!dateInput) return;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);
    const maxYYYY = maxDate.getFullYear();
    const maxMM = String(maxDate.getMonth() + 1).padStart(2, '0');
    const maxDD = String(maxDate.getDate()).padStart(2, '0');
    dateInput.max = `${maxYYYY}-${maxMM}-${maxDD}`;
}

function handleDateChange() {
    bookingState.date = document.getElementById('dateSelect').value;
    bookingState.time = '';
    renderSlots();
    updateStep3Next();
}

function renderSlots() {
    const morningGrid = document.getElementById('morningSlots');
    const afternoonGrid = document.getElementById('afternoonSlots');

    morningGrid.innerHTML = MORNING_SLOTS.map(slot => {
        const hash = simpleHash(bookingState.date + slot);
        const unavailable = hash % 5 === 0 && bookingState.date;
        return `<button class="b-slot ${unavailable ? 'unavailable' : ''}"
            onclick="${unavailable ? '' : `selectSlot('${slot}', this)`}"
            ${unavailable ? 'disabled' : ''}>${slot}</button>`;
    }).join('');

    afternoonGrid.innerHTML = AFTERNOON_SLOTS.map(slot => {
        const hash = simpleHash(bookingState.date + slot);
        const unavailable = hash % 7 === 0 && bookingState.date;
        return `<button class="b-slot ${unavailable ? 'unavailable' : ''}"
            onclick="${unavailable ? '' : `selectSlot('${slot}', this)`}"
            ${unavailable ? 'disabled' : ''}>${slot}</button>`;
    }).join('');
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function selectSlot(time, el) {
    document.querySelectorAll('.b-slot').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    bookingState.time = time;
    updateStep3Next();
}

function updateStep3Next() {
    const btn = document.getElementById('step3Next');
    if (btn) btn.disabled = !(bookingState.date && bookingState.time);
}

// Step Navigation
function goToStep(step) {
    // Validate before moving forward
    if (step === 2 && bookingState.step === 1) {
        if (!validateStep1()) return;
    }

    bookingState.step = step;

    // Update progress bar
    const fill = document.getElementById('progressFill');
    const percentages = { 1: '12.5%', 2: '37.5%', 3: '62.5%', 4: '87.5%' };
    if (fill) fill.style.width = percentages[step] || '12.5%';

    // Update progress step indicators
    document.querySelectorAll('.p-step').forEach(el => {
        const s = parseInt(el.dataset.step);
        el.classList.remove('active', 'completed');
        if (s === step) el.classList.add('active');
        if (s < step) el.classList.add('completed');
    });

    // Show correct step
    document.querySelectorAll('.b-step').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(`bStep${step}`);
    if (target) target.classList.add('active');

    // Step 4: populate review & OTP phone
    if (step === 4) {
        populateReview();
        resetOTPState();
    }
}

function validateStep1() {
    let valid = true;
    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();

    const nameError = document.getElementById('nameError');
    if (!name || name.length < 2) {
        nameError.textContent = 'Please enter your full name';
        document.getElementById('patientName').classList.add('error');
        valid = false;
    } else {
        nameError.textContent = '';
        document.getElementById('patientName').classList.remove('error');
    }

    const phoneError = document.getElementById('phoneError');
    if (!/^\d{10}$/.test(phone)) {
        phoneError.textContent = 'Enter a valid 10-digit phone number';
        document.getElementById('patientPhone').classList.add('error');
        valid = false;
    } else {
        phoneError.textContent = '';
        document.getElementById('patientPhone').classList.remove('error');
    }

    return valid;
}

function populateReview() {
    const dept = DEPARTMENTS.find(d => d.id === bookingState.department);
    document.getElementById('reviewPatient').textContent = document.getElementById('patientName').value.trim();
    document.getElementById('reviewPhone').textContent = '+91 ' + document.getElementById('patientPhone').value.trim();
    document.getElementById('reviewDoctor').textContent = bookingState.doctorName;
    document.getElementById('reviewDept').textContent = dept ? dept.name : '—';
    document.getElementById('reviewDate').textContent = bookingState.date ? formatDate(bookingState.date) : '—';
    document.getElementById('reviewTime').textContent = bookingState.time || '—';

    const phone = document.getElementById('patientPhone').value.trim();
    const masked = phone.slice(0, 2) + '••••••' + phone.slice(-2);
    document.getElementById('otpPhoneDisplay').textContent = '+91 ' + masked;
}

function resetOTPState() {
    generatedOTP = '';
    if (otpTimerInterval) clearInterval(otpTimerInterval);

    const otpSection = document.getElementById('otpSection');
    const otpInput = document.getElementById('otpInputSection');
    const sendBtn = document.getElementById('sendOtpBtn');
    const confirmBtn = document.getElementById('confirmBookingBtn');

    if (otpSection) otpSection.classList.remove('hidden');
    if (otpInput) otpInput.classList.add('hidden');
    if (sendBtn) sendBtn.disabled = false;
    if (confirmBtn) confirmBtn.disabled = true;

    document.querySelectorAll('.b-otp-box').forEach(box => {
        box.value = '';
        box.classList.remove('filled');
    });
    document.getElementById('otpError').textContent = '';
}

// OTP System
function sendOTP() {
    const sendBtn = document.getElementById('sendOtpBtn');
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
        // Generate 4-digit OTP
        generatedOTP = String(Math.floor(1000 + Math.random() * 9000));

        // Show OTP in toast (simulate SMS)
        showToast(`Your OTP is: ${generatedOTP} (demo mode)`, 'info');

        // Switch views
        document.getElementById('otpSection').classList.add('hidden');
        document.getElementById('otpInputSection').classList.remove('hidden');

        const phone = document.getElementById('patientPhone').value.trim();
        document.getElementById('otpSentPhone').textContent = '+91 ' + phone;

        // Focus first OTP box
        const firstBox = document.querySelector('.b-otp-box[data-index="0"]');
        if (firstBox) firstBox.focus();

        // Start resend timer
        startOTPTimer();

        sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send OTP';
        sendBtn.disabled = false;
    }, 1200);
}

function resendOTP() {
    document.querySelectorAll('.b-otp-box').forEach(box => {
        box.value = '';
        box.classList.remove('filled');
    });
    document.getElementById('otpError').textContent = '';
    document.getElementById('confirmBookingBtn').disabled = true;
    sendOTP();
}

function startOTPTimer() {
    let seconds = 30;
    const timerEl = document.getElementById('otpTimer');
    const resendBtn = document.getElementById('resendOtpBtn');
    resendBtn.disabled = true;

    if (otpTimerInterval) clearInterval(otpTimerInterval);

    otpTimerInterval = setInterval(() => {
        seconds--;
        timerEl.textContent = `(${seconds}s)`;
        if (seconds <= 0) {
            clearInterval(otpTimerInterval);
            resendBtn.disabled = false;
            timerEl.textContent = '';
        }
    }, 1000);
}

function initOTPInputs() {
    document.querySelectorAll('.b-otp-box').forEach(box => {
        box.addEventListener('input', (e) => {
            const val = e.target.value.replace(/\D/g, '');
            e.target.value = val;

            if (val) {
                e.target.classList.add('filled');
                const next = e.target.nextElementSibling;
                if (next && next.classList.contains('b-otp-box')) next.focus();
            } else {
                e.target.classList.remove('filled');
            }

            verifyOTPInput();
        });

        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value) {
                const prev = e.target.previousElementSibling;
                if (prev && prev.classList.contains('b-otp-box')) {
                    prev.focus();
                    prev.value = '';
                    prev.classList.remove('filled');
                }
            }
        });

        box.addEventListener('paste', (e) => {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 4);
            const boxes = document.querySelectorAll('.b-otp-box');
            paste.split('').forEach((char, i) => {
                if (boxes[i]) {
                    boxes[i].value = char;
                    boxes[i].classList.add('filled');
                }
            });
            if (boxes[paste.length - 1]) boxes[paste.length - 1].focus();
            verifyOTPInput();
        });
    });
}

function verifyOTPInput() {
    const boxes = document.querySelectorAll('.b-otp-box');
    const entered = Array.from(boxes).map(b => b.value).join('');
    const errorEl = document.getElementById('otpError');
    const confirmBtn = document.getElementById('confirmBookingBtn');

    if (entered.length === 4) {
        if (entered === generatedOTP) {
            errorEl.textContent = '';
            confirmBtn.disabled = false;
            boxes.forEach(b => b.classList.add('filled'));
        } else {
            errorEl.textContent = 'Invalid OTP. Please try again.';
            confirmBtn.disabled = true;
        }
    } else {
        errorEl.textContent = '';
        confirmBtn.disabled = true;
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
}

// ==========================================
// FORM VALIDATION (real-time)
// ==========================================
function validatePatientForm() {
    return validateStep1();
}

function initBookingValidation() {
    ['patientName', 'patientPhone'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                el.classList.remove('error');
                const errorEl = el.parentElement.querySelector('.b-error') || el.closest('.b-field').querySelector('.b-error');
                if (errorEl) errorEl.textContent = '';
            });
        }
    });
}

// ==========================================
// BOOKING CONFIRMATION
// ==========================================
function confirmBooking() {
    if (isDuplicateBooking()) {
        showToast('You already have an appointment with this doctor at the same date & time.', 'warning');
        return;
    }

    const dept = DEPARTMENTS.find(d => d.id === bookingState.department);
    const appointment = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        doctor: bookingState.doctorName,
        department: dept ? dept.name : bookingState.department,
        date: bookingState.date,
        time: bookingState.time,
        patientName: document.getElementById('patientName').value.trim(),
        phone: document.getElementById('patientPhone').value.trim(),
        notes: document.getElementById('patientNotes').value.trim(),
        status: 'Confirmed',
        bookedAt: new Date().toISOString()
    };

    // Disable button, show loading
    const btn = document.getElementById('confirmBookingBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirming...';

    setTimeout(() => {
        saveAppointment(appointment);
        updateApptBadge();
        showSuccessOverlay(appointment);
        showToast('Appointment confirmed! SMS confirmation sent.', 'success');
        resetWizard();

        btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Confirm Booking';
    }, 1200);
}

function saveAppointment(appt) {
    const appointments = getAppointments();
    appointments.push(appt);
    localStorage.setItem(LS_APPOINTMENTS_KEY, JSON.stringify(appointments));
}

function getAppointments() {
    try {
        const data = localStorage.getItem(LS_APPOINTMENTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch { return []; }
}

function resetWizard() {
    bookingState = {
        step: 1, department: '', doctor: '', doctorName: '',
        date: '', time: '', patientName: '', phone: '', email: '', notes: ''
    };

    document.getElementById('patientName').value = '';
    document.getElementById('patientPhone').value = '';
    document.getElementById('patientNotes').value = '';
    document.getElementById('dateSelect').value = '';
    document.getElementById('step2Next').disabled = true;
    document.getElementById('step3Next').disabled = true;

    // Reset dept chips
    document.querySelectorAll('.b-dept-chip').forEach(c => c.classList.remove('active'));
    document.getElementById('doctorsGrid').innerHTML = `<div class="b-placeholder"><i class="fa-solid fa-hand-pointer"></i><p>Select a department above to see available doctors</p></div>`;

    // Clear errors
    document.querySelectorAll('.b-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.b-input').forEach(el => el.classList.remove('error'));

    resetOTPState();
    goToStep(1);
}

// ==========================================
// SUCCESS OVERLAY
// ==========================================
function showSuccessOverlay(appointment) {
    const overlay = document.getElementById('successOverlay');

    document.getElementById('successDoctor').textContent = appointment.doctor;
    document.getElementById('successDept').textContent = appointment.department;
    document.getElementById('successPatient').textContent = appointment.patientName;
    document.getElementById('successDate').textContent = formatDate(appointment.date);
    document.getElementById('successTime').textContent = appointment.time;

    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Re-trigger animation
    const svg = overlay.querySelector('.checkmark-svg');
    svg.style.display = 'none';
    void svg.offsetHeight;
    svg.style.display = '';
}

function closeSuccessOverlay() {
    document.getElementById('successOverlay').classList.add('hidden');
    document.body.style.overflow = '';
}

// ==========================================
// APPOINTMENTS DASHBOARD
// ==========================================
function openAppointmentsDashboard() {
    closeProfileDropdown();
    renderAppointmentsList();
    document.getElementById('appointmentsModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAppointmentsDashboard() {
    document.getElementById('appointmentsModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function renderAppointmentsList() {
    const body = document.getElementById('appointmentsBody');
    const appointments = getSortedAppointments();

    if (appointments.length === 0) {
        body.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fa-regular fa-calendar-xmark"></i>
                </div>
                <h4>No Appointments Found</h4>
                <p>You haven't booked any appointments yet.<br>Start your health journey today!</p>
                <button class="btn btn-accent" style="margin-top: 1rem;" onclick="closeAppointmentsDashboard(); scrollToBooking();">
                    <i class="fa-solid fa-calendar-plus"></i> Book Your First Visit
                </button>
            </div>
        `;
        return;
    }

    body.innerHTML = appointments.map(appt => `
        <div class="appointment-item" data-id="${appt.id}">
            <div class="appt-info">
                <h4>${appt.doctor}</h4>
                <p>${appt.department} · ${formatDate(appt.date)} · ${appt.time}</p>
            </div>
            <span class="appt-status status-${appt.status.toLowerCase()}">${appt.status}</span>
            <div class="appt-actions">
                <button class="btn btn-sm btn-outline" onclick="showConfirmTooltip(event, 'reschedule', '${appt.id}')">
                    <i class="fa-solid fa-clock-rotate-left"></i> Reschedule
                </button>
                <button class="btn btn-sm btn-danger" onclick="showConfirmTooltip(event, 'cancel', '${appt.id}')">
                    <i class="fa-solid fa-xmark"></i> Cancel
                </button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// CONFIRM TOOLTIP (Reschedule / Cancel)
// ==========================================
function showConfirmTooltip(event, action, apptId) {
    const tooltip = document.getElementById('confirmTooltip');
    const text = document.getElementById('confirmTooltipText');
    const rect = event.target.closest('button').getBoundingClientRect();

    if (action === 'reschedule') {
        text.textContent = 'Mark this appointment as Pending for rescheduling?';
    } else {
        text.textContent = 'Cancel this appointment? This cannot be undone.';
    }

    confirmAction = { action, apptId };

    tooltip.style.top = (rect.bottom + 8) + 'px';
    tooltip.style.left = Math.max(10, rect.left - 40) + 'px';
    tooltip.classList.remove('hidden');
}

function cancelConfirmAction() {
    document.getElementById('confirmTooltip').classList.add('hidden');
    confirmAction = null;
}

function executeConfirmAction() {
    if (!confirmAction) return;

    const { action, apptId } = confirmAction;
    let appointments = getAppointments();

    if (action === 'reschedule') {
        appointments = appointments.map(a =>
            a.id === apptId ? { ...a, status: 'Pending' } : a
        );
        localStorage.setItem(LS_APPOINTMENTS_KEY, JSON.stringify(appointments));
        showToast('Appointment marked as Pending for rescheduling', 'warning');
    } else if (action === 'cancel') {
        appointments = appointments.filter(a => a.id !== apptId);
        localStorage.setItem(LS_APPOINTMENTS_KEY, JSON.stringify(appointments));
        showToast('Appointment cancelled successfully', 'info');
    }

    cancelConfirmAction();
    renderAppointmentsList();
    updateApptBadge();
}

// Close tooltip on outside click
document.addEventListener('click', (e) => {
    const tooltip = document.getElementById('confirmTooltip');
    if (tooltip && !tooltip.contains(e.target) && !e.target.closest('.appt-actions button')) {
        cancelConfirmAction();
    }
});

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
// HELPER: Book with specific doctor
// ==========================================
function bookWithDoctor(doctorName, deptName) {
    const dept = DEPARTMENTS.find(d => d.name === deptName);
    if (dept) {
        scrollToBooking();
        setTimeout(() => {
            // Go to step 2 (dept/doctor)
            goToStep(2);
            bookingState.department = dept.id;

            // Select the dept chip
            document.querySelectorAll('.b-dept-chip').forEach(c => {
                c.classList.toggle('active', c.dataset.dept === dept.id);
            });
            renderDoctorSelection(dept.id);

            // Select the doctor after rendering
            setTimeout(() => {
                const cards = document.querySelectorAll('.b-doctor-card');
                cards.forEach(card => {
                    if (card.querySelector('.b-doc-name').textContent === doctorName) {
                        selectDoctor(doctorName, card);
                    }
                });
            }, 100);
        }, 500);
    }
}

function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
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
// STATS COUNTER ANIMATION
// ==========================================
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(eased * target);

        el.textContent = current.toLocaleString('en-IN') + '+';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
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
        cancelConfirmAction();
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
// PHONE INPUT — DIGIT-ONLY FILTER
// ==========================================
function initPhoneFilter() {
    const phoneInput = document.getElementById('patientPhone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    });
}

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

// ==========================================
// APPOINTMENT BADGE UPDATER
// ==========================================
function updateApptBadge() {
    const badge = document.getElementById('apptBadge');
    if (!badge) return;

    const count = getAppointments().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
}

// ==========================================
// DUPLICATE BOOKING PREVENTION
// ==========================================
function isDuplicateBooking() {
    const appointments = getAppointments();
    return appointments.some(a =>
        a.doctor === bookingState.doctorName &&
        a.date === bookingState.date &&
        a.time === bookingState.time &&
        a.status !== 'Cancelled'
    );
}

// ==========================================
// SORT APPOINTMENTS BY DATE (newest first)
// ==========================================
function getSortedAppointments() {
    return getAppointments().sort((a, b) => {
        const dateA = new Date(a.date + 'T' + convertTo24(a.time));
        const dateB = new Date(b.date + 'T' + convertTo24(b.time));
        return dateB - dateA;
    });
}

function convertTo24(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
}

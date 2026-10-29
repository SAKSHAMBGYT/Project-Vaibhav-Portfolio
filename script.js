// ==========================================================================
// VAIBHAV SHARMA : THE SYSTEMATIC GRAPHIC ATELIER
// Modular Vanilla Client Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Smooth internal jump navigation with offset calculation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Discipline Filter Handler
function filterDiscipline(category, btn) {
    // Update tab active states and aria attributes
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });

    if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
    }

    // Filter showcase cards
    const cards = document.querySelectorAll('.showcase-card');
    cards.forEach(card => {
        const cardDiscipline = card.getAttribute('data-discipline');
        if (category === 'all' || cardDiscipline === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 1-Click Clipboard Email Copy with Fallback
function copyEmailAddress() {
    const email = 'vaibhavsharma9053@gmail.com';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
            .then(() => triggerCopySuccess())
            .catch(() => fallbackCopy(email));
    } else {
        fallbackCopy(email);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        triggerCopySuccess();
    } catch (err) {
        console.error('Clipboard copy failed', err);
    }
    document.body.removeChild(textarea);
}

function triggerCopySuccess() {
    const navText = document.getElementById('nav-email-text');
    if (navText) {
        const originalText = navText.textContent;
        navText.textContent = 'Copied to clipboard!';
        setTimeout(() => {
            navText.textContent = originalText;
        }, 2200);
    }

    const toast = document.getElementById('toast-notice');
    if (toast) {
        toast.classList.add('visible');
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 2600);
    }
}

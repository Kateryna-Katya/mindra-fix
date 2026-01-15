document.addEventListener('DOMContentLoaded', () => {
    
    // 1. УПРАВЛЕНИЕ ХЕДЕРОМ И МОБИЛЬНЫМ МЕНЮ
    const header = document.querySelector('.header');
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(253, 252, 251, 0.8)';
        }
    });

    const toggleMenu = () => {
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
        document.body.style.overflow = nav.classList.contains('is-active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (nav.classList.contains('is-active')) toggleMenu();
    }));


    // 2. GSAP АНИМАЦИЯ (Только для Hero)
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        heroTl
            .from(".animate-item", { y: 40, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.5 })
            .from(".animate-visual", { x: 100, opacity: 0, duration: 1.2, scale: 0.95 }, "-=1");

        gsap.to(".visual-card", {
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
            y: -50
        });
    }


    // 3. НАТИВНАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach((el, index) => {
        revealObserver.observe(el);
        // Stagger эффект для сеток
        if (el.classList.contains('benefit-card') || el.classList.contains('blog-card')) {
            el.style.transitionDelay = `${(index % 3) * 0.15}s`;
        }
    });


    // 4. КОНТАКТНАЯ ФОРМА (Валидация и Капча)
    const form = document.getElementById('main-form');
    if (form) {
        const phoneInput = document.getElementById('phone-input');
        const captchaQuestion = document.getElementById('captcha-question');
        const captchaInput = document.getElementById('captcha-input');
        const successMessage = document.getElementById('form-success');

        // Рандомная капча
        let n1 = Math.floor(Math.random() * 10) + 1;
        let n2 = Math.floor(Math.random() * 10) + 1;
        let result = n1 + n2;
        captchaQuestion.textContent = `${n1} + ${n2} = ?`;

        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== result) {
                alert('Ошибка в капче!');
                return;
            }
            
            const btn = form.querySelector('button');
            btn.disabled = true;
            btn.textContent = 'Отправка...';

            setTimeout(() => {
                successMessage.style.display = 'flex';
                form.reset();
            }, 1500);
        });
    }


    // 5. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieBtn = document.getElementById('cookie-accept');

    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('is-show');
        }, 2000);
    }

    cookieBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        cookiePopup.classList.remove('is-show');
    });


    // Инициализация иконок Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
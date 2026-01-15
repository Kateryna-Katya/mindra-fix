// Базовая логика хедера
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('nav-menu');

  // Изменение фона хедера при скролле
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.style.padding = '12px 0';
          header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
      } else {
          header.style.padding = '20px 0';
          header.style.boxShadow = 'none';
      }
  });

  // Логика мобильного меню (заготовка)
  burger.addEventListener('click', () => {
      // Здесь будет анимация открытия меню
      console.log('Меню открыто');
  });
  // ... (предыдущий код хедера)

    // =========================
    // GSAP ANIMATIONS
    // =========================

    // Регистрация плагина
    gsap.registerPlugin(ScrollTrigger);

    // Анимация Hero секции
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
        .from(".animate-item", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2, // Поочередное появление элементов
            delay: 0.3
        })
        .from(".animate-visual", {
            x: 100,
            opacity: 0,
            duration: 1.2,
            scale: 0.95
        }, "-=1"); // Запускаем за 1 секунду до окончания предыдущей анимации

    // Небольшой параллакс эффект для визуала при скролле
    gsap.to(".visual-card", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: -50 // Двигаем изображение вверх при скролле вниз
    });

    // Обновляем иконки Lucide после добавления новых элементов
    lucide.createIcons();
// }); (закрывающая скобка DOMContentLoaded, если она у вас в конце файла)
// НАТИВНАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ (Intersection Observer)
const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          // Прекращаем наблюдение после активации
          observer.unobserve(entry.target);
      }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, {
  threshold: 0.15 // Секция активируется, когда 15% её площади в зоне видимости
});

// Находим все элементы для анимации
const elementsToReveal = document.querySelectorAll('.reveal-left, .reveal-right');
elementsToReveal.forEach(el => revealObserver.observe(el));

});
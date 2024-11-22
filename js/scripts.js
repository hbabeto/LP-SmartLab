document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const animateElement = (element, animation) => {
    element.style.opacity = '0';
    element.style.animation = 'none';
    void element.offsetWidth; 
    element.style.animation = animation; // Aplicando animação definida no CSS
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        let animation = 'fadeIn 1s forwards';

        if (element.classList.contains('hero')) {
          animation = 'slideInFromTop 1s forwards';
        } else if (element.classList.contains('feature-card')) {
          animation = `slideInFromLeft 1s forwards ${element.dataset.delay || '0s'}`;
        } else if (element.classList.contains('exam-card')) {
          animation = 'zoomIn 1s forwards';
        } else if (element.classList.contains('model-card')) {
          animation = 'flipIn 1s forwards';
        } else if (element.classList.contains('investment-card')) {
          animation = 'slideInFromBottom 1s forwards';
        } else if (element.classList.contains('intro-text')) {
          animation = 'slideInFromLeft 1s forwards';
        } else if (element.classList.contains('intro-image')) {
          animation = 'slideInFromRight 1s forwards';
        } else if (element.classList.contains('cta')) {
          animation = 'pulseIn 1s forwards';
        } else if (element.classList.contains('additional-info-banner')) {
          animation = 'fadeInUp 1s forwards'; // Nova animação para o banner
        }

        animateElement(element, animation);
        observer.unobserve(element);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  document.querySelectorAll('.hidden, .feature-card, .exam-card, .model-card, .investment-card, .intro-text, .intro-image, .cta, .additional-info-banner').forEach((element, index) => {
    if (element.classList.contains('feature-card')) {
      element.dataset.delay = `${index * 0.2}s`;
    }
    observer.observe(element);
  });

  console.log('Animations have been set up successfully!');
});

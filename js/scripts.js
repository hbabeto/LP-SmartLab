document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const animateElement = (element, animation) => {
      element.style.opacity = '0';
      element.style.animation = 'none';
      void element.offsetWidth; // Trigger reflow
      element.style.animation = animation;
    };
  
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
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
          }

  
          animateElement(element, animation);
          observer.unobserve(element);
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    // Observe elements
    document.querySelectorAll('.hidden, .feature-card, .exam-card, .model-card, .investment-card, .intro-text, .intro-image').forEach((element, index) => {
      if (element.classList.contains('feature-card')) {
        element.dataset.delay = `${index * 0.2}s`;
      }
      observer.observe(element);
    });
  
    // Add these animations to your CSS file
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideInFromTop {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes slideInFromLeft {
        from { transform: translateX(-50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideInFromRight {
        from { transform: translateX(50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes zoomIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes flipIn {
        from { transform: perspective(400px) rotateY(90deg); opacity: 0; }
        to { transform: perspective(400px) rotateY(0deg); opacity: 1; }
      }
      @keyframes slideInFromBottom {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes pulseIn {
        0% { transform: scale(0.9); opacity: 0; }
        50% { transform: scale(1.05); opacity: 0.5; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes bounceIn {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-30px); }
        60% { transform: translateY(-15px); }
      }
    `;
    document.head.appendChild(style);
  
    console.log('Animations have been set up successfully!');
  });
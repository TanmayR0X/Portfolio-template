  // DOM Elements
  const header = document.querySelector('.header');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const burger = document.querySelector('.burger');
  const backToTop = document.querySelector('.back-to-top');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const typingEffect = document.querySelector('.typing-effect');

  // Mobile Navigation
  burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    burger.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      burger.classList.remove('active');
    });
  });

  // Active Navigation on Scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Header shadow on scroll
    if (scrollPos > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (scrollPos > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
    
    // Active navigation link
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button click event
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Dark mode toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeIcon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    }
  });

  // Check for saved theme preference
  window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeIcon.className = 'fas fa-sun';
    }
  });

  // Typing effect
  const typing = () => {
    const words = ['Web Developer', 'UI/UX Designer', 'Frontend Developer', 'React Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    const type = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingEffect.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typingEffect.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1000; 
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; 
      }
      
      setTimeout(type, typeSpeed);
    };
    
    type();
  };
  
  typing();

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form data filled by user
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Displaying data we got from user

    console.log('Form submitted:', { name, email, subject, message });
    
    // reset 
    contactForm.reset();
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
  });

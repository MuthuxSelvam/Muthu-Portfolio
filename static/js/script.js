<<<<<<< HEAD
// ============================================
// ADVANCED PORTFOLIO WEBSITE - INTERACTIVE JS
// ============================================

// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const skillBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('section[id]');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// ===== Smooth Scrolling =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Typing Effect =====
const typingTexts = [
  'AI Intern',
  'Python Developer',
  'ML Researcher',
  'Data Scientist'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;

function typeEffect() {
  const currentText = typingTexts[currentTextIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
    currentCharIndex++;
  }
  
  if (!isDeleting && currentCharIndex === currentText.length) {
    // Pause at end of word
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && currentCharIndex === 0) {
    // Move to next word
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    setTimeout(typeEffect, 500);
  } else {
    // Continue typing/deleting
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
  }
}

// Start typing effect when page loads
if (typingElement) {
  setTimeout(typeEffect, 1000);
}

// ===== Skill Bar Animation =====
const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width;
  });
};

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      
      // Animate skill bars when skills section is visible
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});

// ===== Back to Top Button =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Active Nav Link on Scroll =====
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== Project Card Hover Effects =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ===== Form Submission =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    
    // Simple validation
    if (!name || !email) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Success message (replace with actual form submission logic)
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  }
});

// ===== Add animation on scroll for elements =====
const animatedElements = document.querySelectorAll('.project-card, .stat-item, .contact-item, .timeline-item');
const elementsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      elementsObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  elementsObserver.observe(el);
});

// ===== Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      animateCounter(entry.target);
      entry.target.classList.add('counted');
    }
  });
}, {
  threshold: 0.5
});

statNumbers.forEach(stat => {
  statsObserver.observe(stat);
});

function animateCounter(element) {
  const text = element.textContent;
  const number = parseInt(text.replace(/\D/g, ''));
  const hasPlus = text.includes('+');
  const hasPercent = text.includes('%');
  
  if (isNaN(number)) return;
  
  let start = 0;
  const duration = 2000;
  const increment = number / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= number) {
      element.textContent = number + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
    }
  }, 16);
}

// ===== Set current year in footer =====
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer .container p');
if (footerYear) {
  footerYear.innerHTML = `&copy; ${currentYear} Muthu Selvam. All rights reserved.`;
}

// ===== Console Message =====
console.log('%c👋 Hello! Welcome to my portfolio!', 'color: #6c5ce7; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore and reach out!', 'color: #00b894; font-size: 14px;');

// ===== AI Chatbot Functionality =====
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.getElementById('sendButton');
const suggestionChips = document.querySelectorAll('.suggestion-chip');

// Send message function
async function sendChatMessage(message) {
  if (!message.trim()) return;

  // Add user message to chat
  addMessageToChat('user', message);
  
  // Clear input
  if (chatInput) chatInput.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message })
    });
    
    const data = await response.json();
    removeTypingIndicator();
    addMessageToChat('bot', data.reply);
  } catch (error) {
    console.error('Error:', error);
    removeTypingIndicator();
    addMessageToChat('bot', "I'm sorry, I'm having trouble responding right now. Please try again!");
  }
}

// Add message to chat UI
function addMessageToChat(type, message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${type}-message`;
  
  if (type === 'bot') {
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">${escapeHtml(message)}</div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="message-content">${escapeHtml(message)}</div>
      <div class="message-avatar">
        <i class="fas fa-user"></i>
      </div>
    `;
  }
  
  chatMessages.appendChild(messageDiv);
  scrollChatToBottom();
}

// Show typing indicator
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.id = 'typingIndicator';
  typingDiv.className = 'chat-message bot-message typing-message';
  typingDiv.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-robot"></i>
    </div>
    <div class="message-content">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  scrollChatToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Scroll chat to bottom
function scrollChatToBottom() {
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Event listeners
if (sendButton) {
  sendButton.addEventListener('click', () => {
    if (chatInput && chatInput.value.trim()) {
      sendChatMessage(chatInput.value);
    }
  });
}

if (chatInput) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage(chatInput.value);
    }
  });
}

// Suggestion chips
if (suggestionChips) {
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) {
        sendChatMessage(query);
      }
    });
  });
}

=======
// ============================================
// ADVANCED PORTFOLIO WEBSITE - INTERACTIVE JS
// ============================================

// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const skillBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('section[id]');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// ===== Smooth Scrolling =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Typing Effect =====
const typingTexts = [
  'AI Intern',
  'Python Developer',
  'ML Researcher',
  'Data Scientist'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;

function typeEffect() {
  const currentText = typingTexts[currentTextIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
    currentCharIndex++;
  }
  
  if (!isDeleting && currentCharIndex === currentText.length) {
    // Pause at end of word
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && currentCharIndex === 0) {
    // Move to next word
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    setTimeout(typeEffect, 500);
  } else {
    // Continue typing/deleting
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
  }
}

// Start typing effect when page loads
if (typingElement) {
  setTimeout(typeEffect, 1000);
}

// ===== Skill Bar Animation =====
const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width;
  });
};

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      
      // Animate skill bars when skills section is visible
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});

// ===== Back to Top Button =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Active Nav Link on Scroll =====
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== Project Card Hover Effects =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ===== Form Submission =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    
    // Simple validation
    if (!name || !email) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Success message (replace with actual form submission logic)
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  }
});

// ===== Add animation on scroll for elements =====
const animatedElements = document.querySelectorAll('.project-card, .stat-item, .contact-item, .timeline-item');
const elementsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      elementsObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  elementsObserver.observe(el);
});

// ===== Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      animateCounter(entry.target);
      entry.target.classList.add('counted');
    }
  });
}, {
  threshold: 0.5
});

statNumbers.forEach(stat => {
  statsObserver.observe(stat);
});

function animateCounter(element) {
  const text = element.textContent;
  const number = parseInt(text.replace(/\D/g, ''));
  const hasPlus = text.includes('+');
  const hasPercent = text.includes('%');
  
  if (isNaN(number)) return;
  
  let start = 0;
  const duration = 2000;
  const increment = number / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= number) {
      element.textContent = number + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
    }
  }, 16);
}

// ===== Set current year in footer =====
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer .container p');
if (footerYear) {
  footerYear.innerHTML = `&copy; ${currentYear} Muthu Selvam. All rights reserved.`;
}

// ===== Console Message =====
console.log('%c👋 Hello! Welcome to my portfolio!', 'color: #6c5ce7; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore and reach out!', 'color: #00b894; font-size: 14px;');

// ===== AI Chatbot Functionality =====
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.getElementById('sendButton');
const suggestionChips = document.querySelectorAll('.suggestion-chip');

// Send message function
async function sendChatMessage(message) {
  if (!message.trim()) return;

  // Add user message to chat
  addMessageToChat('user', message);
  
  // Clear input
  if (chatInput) chatInput.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message })
    });
    
    const data = await response.json();
    removeTypingIndicator();
    addMessageToChat('bot', data.reply);
  } catch (error) {
    console.error('Error:', error);
    removeTypingIndicator();
    addMessageToChat('bot', "I'm sorry, I'm having trouble responding right now. Please try again!");
  }
}

// Add message to chat UI
function addMessageToChat(type, message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${type}-message`;
  
  if (type === 'bot') {
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">${escapeHtml(message)}</div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="message-content">${escapeHtml(message)}</div>
      <div class="message-avatar">
        <i class="fas fa-user"></i>
      </div>
    `;
  }
  
  chatMessages.appendChild(messageDiv);
  scrollChatToBottom();
}

// Show typing indicator
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.id = 'typingIndicator';
  typingDiv.className = 'chat-message bot-message typing-message';
  typingDiv.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-robot"></i>
    </div>
    <div class="message-content">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  scrollChatToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Scroll chat to bottom
function scrollChatToBottom() {
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Event listeners
if (sendButton) {
  sendButton.addEventListener('click', () => {
    if (chatInput && chatInput.value.trim()) {
      sendChatMessage(chatInput.value);
    }
  });
}

if (chatInput) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage(chatInput.value);
    }
  });
}

// Suggestion chips
if (suggestionChips) {
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) {
        sendChatMessage(query);
      }
    });
  });
}

>>>>>>> 17a042b8ee19a0bf3b5d9b3072bd6365f4798061

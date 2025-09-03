// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.2)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.2)';
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Chatbot functionality
    class SimpleChatbot {
        constructor() {
            this.isOpen = false;
            this.responses = {
                greetings: [
                    "¡Hola! Soy Arya, tu asistente virtual de L y B. ¿En qué puedo ayudarte hoy?",
                    "¡Bienvenido! Soy Arya, estoy aquí para resolver tus dudas sobre nuestros servicios.",
                    "¡Hola! Soy Arya. ¿Tienes alguna pregunta sobre diseño web, SEO o mantenimiento?"
                ],
                services: {
                    "diseño web": "Ofrecemos diseño web profesional y moderno. Creamos sitios responsivos, rápidos y optimizados para SEO. ¿Te interesa conocer más detalles o solicitar una cotización?",
                    "seo": "Nuestros servicios de SEO incluyen optimización on-page, link building, análisis de keywords y reportes mensuales. ¿Quieres saber cómo podemos mejorar tu posicionamiento?",
                    "mantenimiento": "Ofrecemos mantenimiento web completo: actualizaciones, backups, seguridad y soporte técnico 24/7. ¿Necesitas que cuidemos tu sitio web?",
                    "precio": "Los precios varían según el proyecto. Para darte una cotización precisa, me gustaría conectarte con nuestro equipo. ¿Te parece si continuamos por WhatsApp?",
                    "tiempo": "Los tiempos de desarrollo dependen de la complejidad: sitios básicos (2-4 semanas), corporativos (4-8 semanas), e-commerce (6-12 semanas)."
                },
                contact: "He analizado tu consulta. Para brindarte la atención especializada que mereces, te conectaré con nuestro equipo de L y B vía WhatsApp. Estarán encantados de ayudarte con una propuesta personalizada.",
                fallback: [
                    "Entiendo tu consulta pero creo que nuestro equipo especializado puede brindarte una respuesta más precisa y personalizada.",
                    "Para ofrecerte la mejor atención posible, te recomiendo contactar directamente con nuestro equipo de L y B.",
                    "Tu consulta es importante y merece atención especializada de nuestro equipo de L y B."
                ]
            };
            this.conversationCount = 0;
            this.name = "Arya";
            this.company = "L y B";
            this.init();
        }

        init() {
            this.createChatInterface();
            this.bindEvents();
        }

        createChatInterface() {
            const chatContainer = document.createElement('div');
            chatContainer.className = 'chat-container';
            chatContainer.id = 'chatContainer';
            chatContainer.innerHTML = `
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-avatar">
                    <img src="logo arya.png" alt="Arya" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                </div>
                        <div class="chat-title">
                            <h4>Arya - L y B</h4>
                            <span class="chat-status">En línea</span>
                        </div>
                    </div>
                    <button class="chat-close" id="chatClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot-message">
                        <div class="message-content">
                            ${this.getRandomResponse('greetings')}
                        </div>
                        <div class="message-time">${this.getCurrentTime()}</div>
                    </div>
                </div>
                <div class="chat-input-container">
                    <div class="quick-responses" id="quickResponses">
                        <button class="quick-btn" data-message="Diseño web">🎨 Diseño Web</button>
                        <button class="quick-btn" data-message="SEO">📈 SEO</button>
                        <button class="quick-btn" data-message="Mantenimiento">🔧 Mantenimiento</button>
                        <button class="quick-btn" data-message="Precios">💰 Precios</button>
                    </div>
                    <div class="chat-input">
                        <input type="text" id="chatInput" placeholder="Escribe tu mensaje..." maxlength="200">
                        <button id="chatSend">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(chatContainer);
        }

        bindEvents() {
            const chatButton = document.getElementById('chatbotButton');
            const chatContainer = document.getElementById('chatContainer');
            const chatClose = document.getElementById('chatClose');
            const chatInput = document.getElementById('chatInput');
            const chatSend = document.getElementById('chatSend');
            const quickResponses = document.querySelectorAll('.quick-btn');

            chatButton.addEventListener('click', () => this.toggleChat());
            chatClose.addEventListener('click', () => this.closeChat());
            chatSend.addEventListener('click', () => this.sendMessage());
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });

            quickResponses.forEach(btn => {
                btn.addEventListener('click', () => {
                    const message = btn.getAttribute('data-message');
                    this.sendUserMessage(message);
                    document.getElementById('quickResponses').style.display = 'none';
                });
            });
        }

        toggleChat() {
            const chatContainer = document.getElementById('chatContainer');
            this.isOpen = !this.isOpen;
            chatContainer.classList.toggle('chat-open', this.isOpen);
            
            if (this.isOpen) {
                document.getElementById('chatInput').focus();
            }
        }

        closeChat() {
            this.isOpen = false;
            document.getElementById('chatContainer').classList.remove('chat-open');
        }

        sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            if (message) {
                this.sendUserMessage(message);
                input.value = '';
            }
        }

        sendUserMessage(message) {
            this.addMessage(message, 'user');
            this.conversationCount++;
            
            // Simulate typing delay
            setTimeout(() => {
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, 1000 + Math.random() * 1000);
        }

        addMessage(content, sender) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            if (sender === 'bot' && content.includes('WhatsApp')) {
                messageDiv.innerHTML = `
                    <div class="message-content">${content}</div>
                    <div class="whatsapp-button">
                        <a href="https://wa.me/541155714614?text=Hola, vengo del sitio web de L y B y me interesa conocer más sobre sus servicios" target="_blank" class="whatsapp-link">
                            <i class="fab fa-whatsapp"></i> Continuar en WhatsApp
                        </a>
                    </div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="message-content">${content}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                `;
            }
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        generateResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Preguntas sobre identidad
            if (lowerMessage.includes('quien eres') || lowerMessage.includes('que eres') || 
                lowerMessage.includes('tu nombre') || lowerMessage.includes('como te llamas')) {
                return `Soy ${this.name}, tu asistente virtual de ${this.company}. Estoy aquí para ayudarte con información sobre nuestros servicios de diseño web, SEO y mantenimiento.`;
            }
            
            // Check for service-related keywords
            for (const [key, response] of Object.entries(this.responses.services)) {
                if (lowerMessage.includes(key)) {
                    if (this.conversationCount >= 2 || key === 'precio') {
                        return this.responses.contact;
                    }
                    return response;
                }
            }
            
            // Check for contact intent
            if (lowerMessage.includes('contacto') || lowerMessage.includes('hablar') || 
                lowerMessage.includes('cotizar') || lowerMessage.includes('presupuesto') ||
                lowerMessage.includes('contratar') || lowerMessage.includes('interesa')) {
                return this.responses.contact;
            }
            
            // Manejo de consultas fuera del algoritmo con seguridad
            if (lowerMessage.includes('hack') || lowerMessage.includes('virus') || 
                lowerMessage.includes('malware') || lowerMessage.includes('ataque') || 
                lowerMessage.includes('password') || lowerMessage.includes('contraseña')) {
                return `Me enfoco exclusivamente en brindar información sobre nuestros servicios profesionales. Para consultas de seguridad informática, nuestro equipo especializado puede asesorarte mejor.`;
            }
            
            // After 3 interactions, always redirect to WhatsApp
            if (this.conversationCount >= 3) {
                return this.responses.contact;
            }
            
            // Fallback responses
            return this.getRandomResponse('fallback');
        }

        getRandomResponse(category) {
            const responses = this.responses[category];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        getCurrentTime() {
            return new Date().toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
    }

    // Initialize chatbot when DOM is loaded
    const chatbot = new SimpleChatbot();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature-item, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Floating cards animation enhancement
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.05)';
            } else {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Counter animation for stats (if added later)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Form validation (for contact page)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            const errorElement = input.parentNode.querySelector('.error-message');
            
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Este campo es requerido';
                }
            } else {
                input.classList.remove('error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
            
            // Email validation
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'Por favor ingresa un email válido';
                    }
                }
            }
        });
        
        return isValid;
    }

    // Add form validation to contact forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Here you would typically send the form data
                console.log('Form is valid, ready to submit');
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = '¡Mensaje enviado correctamente! Te contactaremos pronto.';
                successMessage.style.cssText = `
                    background: #10b981;
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                    text-align: center;
                `;
                
                this.appendChild(successMessage);
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Loading screen (optional)
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <h2>L y B</h2>
                <span>Digital Solutions</span>
            </div>
            <div class="loading-spinner"></div>
        </div>
    `;
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    // Add loading screen styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-content {
            text-align: center;
        }
        .loading-logo h2 {
            font-size: 2rem;
            font-weight: 700;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: -5px;
        }
        .loading-logo span {
            font-size: 0.9rem;
            color: var(--text-secondary);
            font-weight: 500;
        }
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 2rem auto 0;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(loadingStyles);
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
                loadingStyles.remove();
            }, 500);
        }, 1000);
    });

    console.log('L y B Website - JavaScript loaded successfully!');
});
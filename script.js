// Matrix Background Animation
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
function setCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasDimensions();

// Matrix characters
const letters = "01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101";
const lettersArray = letters.split('');

const fontSize = 14;
let columns = canvas.width / fontSize;

let drops = [];
for(let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    // Semi-transparent black rectangle for trailing effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text color and font
    ctx.fillStyle = '#FF6B00';
    ctx.font = `${fontSize}px monospace`;
    
    // Draw characters
    for(let i = 0; i < drops.length; i++) {
        const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset drop when it reaches bottom with some randomness
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function toggleTheme() {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark');
    
    if(body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Day Mode';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Night Mode';
    }
    
    // Add glitch animation effect
    themeToggle.classList.add('glitch');
    setTimeout(() => {
        themeToggle.classList.remove('glitch');
    }, 500);
}

themeToggle.addEventListener('click', toggleTheme);

// Interactive Button Effects
const buttons = document.querySelectorAll('.btn, .contact-link');

function addButtonEffects() {
    buttons.forEach(button => {
        // Mouse enter effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = `0 0 25px ${getComputedStyle(document.documentElement).getPropertyValue('--accent-glow')}`;
        });
        
        // Mouse leave effect
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '';
        });
        
        // Mouse down effect
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        // Mouse up effect
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        // Touch events for mobile
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', () => {
            button.style.transform = 'scale(1)';
        });
    });
}

// WhatsApp Form Submission
const messageForm = document.getElementById('message-form');

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Format WhatsApp message
    const whatsappMessage = `*New Message from Portfolio*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
    
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/201025844231?text=${whatsappMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappLink, '_blank');
    
    // Show success effect
    const submitBtn = messageForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    const originalBg = submitBtn.style.backgroundColor;
    const originalColor = submitBtn.style.color;
    
    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.backgroundColor = '#00ff00';
    submitBtn.style.color = '#000';
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = originalBg;
        submitBtn.style.color = originalColor;
    }, 3000);
    
    // Reset form
    messageForm.reset();
}

messageForm.addEventListener('submit', handleFormSubmit);

// Terminal Typing Effect
const terminalLines = document.querySelectorAll('.terminal-line');

function initTerminalEffect() {
    terminalLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 2}s`;
    });
}

// Random Glitch Effect
function randomGlitchEffect() {
    const hackerText = document.querySelector('.hacker-text');
    if (hackerText) {
        hackerText.classList.add('glitch');
        
        setTimeout(() => {
            hackerText.classList.remove('glitch');
        }, 300);
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Window Resize Handler
function handleResize() {
    setCanvasDimensions();
    columns = canvas.width / fontSize;
    
    // Reinitialize drops array
    drops = [];
    for(let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}

// Initialize all functions
function initPortfolio() {
    // Start matrix animation
    setInterval(drawMatrix, 50);
    
    // Initial draw
    drawMatrix();
    
    // Initialize effects
    addButtonEffects();
    initTerminalEffect();
    initSmoothScrolling();
    
    // Start random glitch effect
    setInterval(randomGlitchEffect, 5000);
    
    // Add window resize listener
    window.addEventListener('resize', handleResize);
    
    console.log('Portfolio initialized successfully!');
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initPortfolio);

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        handleFormSubmit,
        initPortfolio
    };
}
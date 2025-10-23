// DOM Elements
const header = document.querySelector('.header');
const productCards = document.querySelectorAll('.product-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartModal = document.querySelector('.cart-modal');
const scrollProgress = document.querySelector('.scroll-progress');

// Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');

// Intersection Observer for fade animations
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    {
        threshold: 0.1
    }
);

fadeElements.forEach(element => {
    observer.observe(element);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
    
    // Header Background
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Product Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-filter');
        filterProducts(category);
    });
});

function filterProducts(category) {
    productCards.forEach(card => {
        const productCategory = card.getAttribute('data-category');
        
        if (category === 'all' || category === productCategory) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Cart Functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCart();
    showNotification('Product added to cart!');
}

function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Product removed from cart!');
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Product Image Hover Effect
productCards.forEach(card => {
    const image = card.querySelector('.product-image');
    
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        image.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1) translate(0, 0)';
    });
});

// Dynamic Background Animation
const hero = document.querySelector('.hero');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    hero.style.setProperty('--mouse-x', mouseX);
    hero.style.setProperty('--mouse-y', mouseY);
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});
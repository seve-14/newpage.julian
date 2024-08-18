document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const productsSection = document.getElementById('products-section');
    const productsContainer = document.getElementById('products-container');
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const themeToggle = document.getElementById('theme-toggle');
    const cartLink = document.getElementById('cart-link');
    const cartCount = document.getElementById('cart-count');
    const cartSection = document.getElementById('cart-section');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const payButton = document.getElementById('pay-button');
    let cart = [];

    // Menú hamburguesa
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Cambiar tema
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Mostrar formulario de registro
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });

    // Mostrar formulario de inicio de sesión
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Registro de usuario
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registro exitoso. Por favor, inicia sesión.');
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            alert('Inicio de sesión exitoso');
            loginSection.style.display = 'none';
            productsSection.style.display = 'block';
            loadProducts();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    // Cargar productos
    function loadProducts() {
        const products = [
            { name: 'Netflix', price: 15, image: 'netflix.png' },
            { name: 'Disney+', price: 10, image: 'disneyplus.png' },
            { name: 'Amazon Prime', price: 12, image: 'amazonprimevideo.png' },
            { name: 'HBO Max', price: 14, image: 'hbomax.png' },
            { name: 'Star+', price: 9, image: 'starplus.png' },
            { name: 'Hulu', price: 11, image: 'hulu.png' },
            { name: 'ESPN+', price: 8, image: 'espn.png' },
            { name: 'Apple TV+', price: 7, image: 'appletv.png' },
            { name: 'Spotify', price: 10, image: 'spotify.png' },
            { name: 'IPTV', price: 20, image: 'iptv.png' }
        ];

        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product', 'fadeIn');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="buy-btn" data-product="${product.name}" data-price="${product.price}">Añadir al carrito</button>
            `;
            productsContainer.appendChild(productElement);
        });

        // Evento de añadir al carrito
        const buyButtons = document.querySelectorAll('.buy-btn');
        buyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = e.target.getAttribute('data-product');
                const productPrice = parseFloat(e.target.getAttribute('data-price'));
                addToCart(productName, productPrice);
                updateCartCount();
            });
        });
    }

    // Función para añadir al carrito
    function addToCart(productName, productPrice) {
        cart.push({ name: productName, price: productPrice });
        alert(`${productName} añadido al carrito`);
        updateCart();
    }

    // Función para actualizar el contador del carrito
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Función para actualizar el carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);
        updateCartCount();

        // Evento para eliminar items del carrito
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Evento de clic en el carrito
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        productsSection.style.display = 'none';
        cartSection.style.display = 'block';
        updateCart();
    });

    // Evento de clic en el botón de pago
    payButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        
        let message = 'Hola, quiero comprar los siguientes productos:\n\n';
        let total = 0;
        cart.forEach(item => {
            message += `- ${item.name}: $${item.price}\n`;
            total += item.price;
        });
        message += `\nTotal: $${total.toFixed(2)}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.location.href = `https://wa.me/573227669390?text=${encodedMessage}`;
    });
});
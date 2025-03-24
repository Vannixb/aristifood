document.addEventListener("DOMContentLoaded", () => {
    let cart = [];
    const cartIcon = document.querySelector(".cart-icon");
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartTab = document.getElementById("cart-tab");

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} x${item.quantity}</span>
                    <button onclick="removeFromCart(${item.id})">❌</button>
                </div>
            `;
        });
        cartCount.innerText = cart.length;
        totalPriceElement.innerText = `Rp ${total.toLocaleString()}`;
    }

    window.addToCart = (id, name, price) => {
        let found = cart.find(item => item.id === id);
        if (found) {
            found.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCart();
    };

    window.removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    };

    function toggleCart() {
        cartTab.classList.toggle("active");
    }
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            let item = e.target.closest(".menu-item");
            addToCart(
                parseInt(item.dataset.id),
                item.dataset.name,
                parseInt(item.dataset.price)
            );
        });
    });

    window.toggleCart = toggleCart;
});

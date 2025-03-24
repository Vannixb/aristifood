let cart = [];

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        let name = this.getAttribute("data-name");
        let price = parseInt(this.getAttribute("data-price"));

        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    });
});

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - Rp ${item.price.toLocaleString()} x ${item.quantity}
            <div class="cart-buttons">
                <button class="subtract-item" onclick="changeQuantity(${index}, -1)">-</button>
                <button class="add-item" onclick="changeQuantity(${index}, 1)">+</button>
                <button class="remove-item" onclick="removeItem(${index})">Hapus</button>
            </div>
        `;
        cartList.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    cartTotal.textContent = `Rp ${totalPrice.toLocaleString()}`;
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById("checkout").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let message = "Halo, saya ingin memesan:\n";
    cart.forEach(item => {
        message += `- ${item.name} x${item.quantity} Rp ${item.price.toLocaleString()}\n`;
    });

    let whatsappLink = `https://wa.me/6289637728503?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
});

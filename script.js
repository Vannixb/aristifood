let cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout-button");

// Fungsi menambahkan item ke keranjang
function addToCart(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Fungsi memperbarui tampilan keranjang
function updateCart() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const div = document.createElement("div");
        div.innerHTML = `<p>${item.name} x${item.quantity} - Rp ${item.price * item.quantity}</p>`;
        cartItemsContainer.appendChild(div);
    });

    totalPriceElement.textContent = totalPrice;
}

// Fungsi checkout ke WhatsApp
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let orderMessage = "Halo Aristi Food, saya ingin pesan:\n";
    cart.forEach(item => {
        orderMessage += `- ${item.name} x${item.quantity} (Rp ${item.price * item.quantity})\n`;
    });

    orderMessage += `\nTotal Harga: Rp ${totalPriceElement.textContent}`;
    const whatsappLink = `https://wa.me/6289637728503?text=${encodeURIComponent(orderMessage)}`;
    window.location.href = whatsappLink;
});

// Event listener untuk tombol tambah ke keranjang
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        addToCart(button.dataset.name, parseInt(button.dataset.price));
    });
});

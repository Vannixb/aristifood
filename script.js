let cart = [];
let totalPrice = 0;

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        let name = this.getAttribute("data-name");
        let price = parseInt(this.getAttribute("data-price"));

        cart.push({ name, price });
        totalPrice += price;

        updateCart();
    });
});

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    
    cartList.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;
        cartList.appendChild(li);
    });

    cartTotal.textContent = `Rp ${totalPrice.toLocaleString()}`;
}

document.getElementById("checkout").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let message = "Halo, saya ingin memesan:\n";
    cart.forEach(item => {
        message += `- ${item.name} Rp ${item.price.toLocaleString()}\n`;
    });
    message += `Total: Rp ${totalPrice.toLocaleString()}`;

    let whatsappLink = `https://wa.me/6289637728503?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
});

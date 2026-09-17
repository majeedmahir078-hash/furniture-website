const menuButton = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


const featuredProducts = document.querySelector("#featured-products");

if (featuredProducts) {

    const featured = products.slice(0, 4);

    featuredProducts.innerHTML = featured.map(product => {

        return `
            <article class="product-card">

                <a href="product.html?id=${product.id}" class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </a>

                <div class="product-info">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3>
                        <a href="product.html?id=${product.id}">
                            ${product.name}
                        </a>
                    </h3>

                    <p class="product-price">
                        $${product.price}
                    </p>

                </div>

            </article>
        `;

    }).join("");
}

function updateCartCount() {

    const cartCount = document.querySelector("#cart-count");

    if (!cartCount) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalQuantity = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
}

updateCartCount();
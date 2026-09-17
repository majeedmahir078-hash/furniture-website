const productDetails = document.querySelector("#product-details-content");

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find(item => item.id === productId);


if (product) {

    productDetails.innerHTML = `

        <div class="product-details-layout">

            <div class="product-details-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-details-info">

                <p class="product-details-category">
                    ${product.category}
                </p>

                <h1>
                    ${product.name}
                </h1>

                <p class="product-details-price">
                    $${product.price}
                </p>

                <p class="product-details-description">
                    Beautifully designed furniture made to bring
                    comfort, quality, and character into your home.
                    This piece combines modern design with practical
                    everyday comfort.
                </p>


                <!-- Quantity -->

                <div class="product-quantity">

                    <span class="quantity-label">
                        Quantity
                    </span>

                    <div class="quantity-controls">

                        <button
                            type="button"
                            id="decrease-quantity"
                            class="quantity-control"
                        >
                            −
                        </button>

                        <span id="product-quantity">
                            1
                        </span>

                        <button
                            type="button"
                            id="increase-quantity"
                            class="quantity-control"
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- Add to Cart -->

                <button
                    type="button"
                    class="add-to-cart"
                    id="add-to-cart"
                >
                    Add to Cart
                </button>


                <a
                    href="shop.html"
                    class="continue-shopping"
                >
                    ← Continue Shopping
                </a>


                <p
                    id="cart-message"
                    class="cart-message"
                ></p>

            </div>

        </div>

    `;
}


// ==================== QUANTITY ====================

let quantity = 1;

const quantityDisplay =
    document.querySelector("#product-quantity");

const decreaseButton =
    document.querySelector("#decrease-quantity");

const increaseButton =
    document.querySelector("#increase-quantity");


if (increaseButton) {

    increaseButton.addEventListener("click", () => {

        quantity++;

        quantityDisplay.textContent =
            quantity;

    });

}


if (decreaseButton) {

    decreaseButton.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            quantityDisplay.textContent =
                quantity;

        }

    });

}


// ==================== ADD TO CART ====================

const addToCartButton =
    document.querySelector("#add-to-cart");

const cartMessage =
    document.querySelector("#cart-message");


if (addToCartButton) {

    addToCartButton.addEventListener("click", () => {

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];


        const existingProduct =
            cart.find(item => item.id === productId);


        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.push({
                id: productId,
                quantity: quantity
            });

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        // Update navbar count

        updateCartCount();


        // Show message

        cartMessage.textContent =
            `${quantity} item${quantity > 1 ? "s" : ""} added to your cart.`;

        cartMessage.style.display =
            "block";


        // Reset quantity

        quantity = 1;

        quantityDisplay.textContent =
            quantity;

    });

}

// ==================== RELATED PRODUCTS ====================

const relatedProducts =
    document.querySelector("#related-products");


if (relatedProducts && product) {

    const related =
        products
            .filter(item => {
                return (
                    item.category === product.category &&
                    item.id !== product.id
                );
            })
            .slice(0, 4);


    relatedProducts.innerHTML =
        related.map(item => {

            return `

                <article class="product-card">

                    <a
                        href="product.html?id=${item.id}"
                        class="product-image"
                    >

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                    </a>


                    <div class="product-info">

                        <p class="product-category">
                            ${item.category}
                        </p>

                        <h3>

                            <a
                                href="product.html?id=${item.id}"
                            >
                                ${item.name}
                            </a>

                        </h3>

                        <p class="product-price">
                            $${item.price}
                        </p>

                    </div>

                </article>

            `;

        }).join("");

}
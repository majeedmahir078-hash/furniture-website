const cartContent = document.querySelector("#cart-content");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    if (cart.length === 0) {

       cartContent.innerHTML = `
    <div class="empty-cart">

        <div class="empty-cart-icon">
            🛒
        </div>

        <p class="section-label">
            YOUR SHOPPING CART
        </p>

        <h2>
            Your cart is empty
        </h2>

        <p>
            You haven't added any furniture yet.
            Explore our collection and find something
            perfect for your home.
        </p>

        <a href="shop.html" class="btn btn-primary">
            Explore Furniture
        </a>

    </div>
`;

        return;
    }


    let cartItemsHTML = "";

    let subtotal = 0;


    cart.forEach(cartItem => {

        const product = products.find(item => {
            return item.id === cartItem.id;
        });


        if (!product) {
            return;
        }


        const itemTotal = product.price * cartItem.quantity;

        subtotal += itemTotal;


        cartItemsHTML += `

            <article class="cart-item">

                <a
                    href="product.html?id=${product.id}"
                    class="cart-item-image"
                >
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >
                </a>


                <div class="cart-item-info">

                    <p class="cart-item-category">
                        ${product.category}
                    </p>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="cart-item-price">
                        $${product.price}
                    </p>


                    <div class="cart-item-controls">

                        <button
                            class="quantity-btn decrease-btn"
                            data-id="${product.id}"
                        >
                            −
                        </button>

                        <span class="quantity">
                            ${cartItem.quantity}
                        </span>

                        <button
                            class="quantity-btn increase-btn"
                            data-id="${product.id}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-btn"
                        data-id="${product.id}"
                    >
                        Remove
                    </button>

                </div>


                <strong>
                    $${itemTotal}
                </strong>

            </article>

        `;

    });


    cartContent.innerHTML = `

        <div class="cart-layout">

            <div class="cart-items">

                ${cartItemsHTML}

            </div>


            <aside class="cart-summary">

                <h2>
                    Order Summary
                </h2>

                <div class="summary-row">

                    <span>
                        Subtotal
                    </span>

                    <span>
                        $${subtotal}
                    </span>

                </div>


                <div class="summary-row">

                    <span>
                        Shipping
                    </span>

                    <span>
                        Free
                    </span>

                </div>


                <div class="summary-total">

                    <span>
                        Total
                    </span>

                    <span>
                        $${subtotal}
                    </span>

                </div>


                <a href="checkout.html" class="checkout-btn">
                    Proceed to Checkout
                </a>

            </aside>

        </div>

    `;


    addCartEvents();
}


function addCartEvents() {

    const increaseButtons =
        document.querySelectorAll(".increase-btn");


    const decreaseButtons =
        document.querySelectorAll(".decrease-btn");


    const removeButtons =
        document.querySelectorAll(".remove-btn");


    increaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);


            const cartItem =
                cart.find(item => item.id === productId);


            if (cartItem) {

                cartItem.quantity += 1;

                saveCart();

            }

        });

    });


    decreaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);


            const cartItem =
                cart.find(item => item.id === productId);


            if (cartItem) {

                cartItem.quantity -= 1;


                if (cartItem.quantity <= 0) {

                    cart =
                        cart.filter(item => item.id !== productId);

                }


                saveCart();

            }

        });

    });


    removeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productId = Number(button.dataset.id);

        const product = products.find(item => item.id === productId);

        if (!product) {
            return;
        }

        const confirmed = confirm(
            `Remove "${product.name}" from your cart?`
        );

        if (confirmed) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
        }
    });
});

}


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();

}


displayCart();
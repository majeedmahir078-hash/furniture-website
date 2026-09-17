const checkoutItems = document.querySelector("#checkout-items");
const checkoutSubtotal = document.querySelector("#checkout-subtotal");
const checkoutTotal = document.querySelector("#checkout-total");
const checkoutForm = document.querySelector("#checkout-form");


// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Display checkout items
function displayCheckout() {

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="empty-checkout">

                <h3>Your cart is empty</h3>

                <p>
                    Add some furniture before checking out.
                </p>

                <a href="shop.html" class="btn btn-primary">
                    Continue Shopping
                </a>

            </div>
        `;

        checkoutSubtotal.textContent = "$0";
        checkoutTotal.textContent = "$0";

        return;
    }


    let itemsHTML = "";
    let subtotal = 0;


    cart.forEach(cartItem => {

        const product = products.find(
            item => item.id === cartItem.id
        );


        if (!product) {
            return;
        }


        const itemTotal =
            product.price * cartItem.quantity;


        subtotal += itemTotal;


        itemsHTML += `
            <div class="checkout-item">

                <a
                    href="product.html?id=${product.id}"
                    class="checkout-item-image"
                >

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </a>


                <div class="checkout-item-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Qty: ${cartItem.quantity}
                    </p>

                </div>


                <span class="checkout-item-price">
                    $${itemTotal}
                </span>

            </div>
        `;
    });


    checkoutItems.innerHTML = itemsHTML;


    checkoutSubtotal.textContent = `$${subtotal}`;
    checkoutTotal.textContent = `$${subtotal}`;
}


// Handle order submission
if (checkoutForm) {

    checkoutForm.addEventListener("submit", event => {

        event.preventDefault();


        // Don't allow an empty cart
        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product before placing an order."
            );

            return;
        }


        // Get customer information
        const customerName =
            document.querySelector("#full-name").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const phone =
            document.querySelector("#phone").value.trim();

        const address =
            document.querySelector("#address").value.trim();

        const city =
            document.querySelector("#city").value.trim();

        const country =
            document.querySelector("#country").value.trim();


        // Calculate total
        let total = 0;

        cart.forEach(cartItem => {

            const product = products.find(
                item => item.id === cartItem.id
            );

            if (product) {
                total += product.price * cartItem.quantity;
            }

        });


        // Generate order number
        const orderNumber =
            "NF-" +
            Date.now().toString().slice(-6);


        // Create order object
        const order = {

            orderNumber: orderNumber,

            customer: {
                name: customerName,
                email: email,
                phone: phone,
                address: address,
                city: city,
                country: country
            },

            items: cart,

            total: total,

            date: new Date().toISOString()

        };


        // Save order
        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );


        // Clear cart
        localStorage.removeItem("cart");


        // Go to confirmation page
        window.location.href =
            "order-success.html";
    });
}


// Display checkout
displayCheckout();
const orderNumberElement =
    document.querySelector("#order-number");


const lastOrder =
    JSON.parse(localStorage.getItem("lastOrder"));


if (lastOrder && orderNumberElement) {

    orderNumberElement.textContent =
        `#${lastOrder.orderNumber}`;

}
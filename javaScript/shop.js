const shopProducts = document.querySelector("#shop-products");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.querySelector("#search-input");
const productCount = document.querySelector("#product-count");
const sortSelect = document.querySelector("#sort-select");
const params = new URLSearchParams(window.location.search);
let currentCategory = params.get("category") || "all";
let currentSearch = "";
const pagination = document.querySelector("#pagination");
const productsPerPage = 12;
let currentPage = 1;

const mobileFilterButton =
    document.querySelector("#mobile-filter-btn");

const filterPanel =
    document.querySelector("#filter-panel");

const closeFilterButton =
    document.querySelector("#close-filter");


if (mobileFilterButton && filterPanel) {

    mobileFilterButton.addEventListener("click", () => {
        filterPanel.classList.add("active");
    });

}


if (closeFilterButton && filterPanel) {

    closeFilterButton.addEventListener("click", () => {
        filterPanel.classList.remove("active");
    });

}



function displayProducts(productList) {

    const startIndex =
        (currentPage - 1) * productsPerPage;

    const endIndex =
        startIndex + productsPerPage;

    const productsToDisplay = productList.slice(startIndex, endIndex);

if (productList.length === 0) {
    shopProducts.innerHTML = `
        <div class="no-results">
            <p class="section-label">NO PRODUCTS FOUND</p>
            <h2>Nothing matched your search</h2>
            <p>
                We couldn't find any furniture matching your search.
                Try another search or browse our collection.
            </p>
            <button type="button" id="clear-search" class="btn btn-primary">
                View All Products
            </button>
        </div>
    `;

    productCount.textContent = "0 Products";
    pagination.innerHTML = "";

    const clearSearchButton = document.querySelector("#clear-search");

    clearSearchButton.addEventListener("click", () => {
        searchInput.value = "";
        currentSearch = "";
        currentCategory = "all";
        currentPage = 1;

        filterButtons.forEach(button => {
            button.classList.remove("active");

            if (button.dataset.category === "all") {
                button.classList.add("active");
            }
        });

        filterProducts();
    });

    return;
}

shopProducts.innerHTML = productsToDisplay.map(product => {

        return `
            <article class="product-card">

                <a
                    href="product.html?id=${product.id}"
                    class="product-image"
                >

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

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


    productCount.textContent =
        `${productList.length} Products`;


    displayPagination(productList.length);
}

function displayPagination(totalProducts) {

    const totalPages =
        Math.ceil(totalProducts / productsPerPage);


    pagination.innerHTML = "";


    if (totalPages <= 1) {
        return;
    }


    const previousButton =
        document.createElement("button");

    previousButton.textContent = "←";

    previousButton.className = "pagination-btn";

    previousButton.disabled = currentPage === 1;


    previousButton.addEventListener("click", () => {

        if (currentPage > 1) {

            currentPage--;

            filterProducts();

        }

    });


    pagination.appendChild(previousButton);


    for (let page = 1; page <= totalPages; page++) {

        const pageButton =
            document.createElement("button");


        pageButton.textContent = page;

        pageButton.className = "pagination-btn";


        if (page === currentPage) {
            pageButton.classList.add("active");
        }


        pageButton.addEventListener("click", () => {

            currentPage = page;

            filterProducts();

        });


        pagination.appendChild(pageButton);

    }


    const nextButton =
        document.createElement("button");

    nextButton.textContent = "→";

    nextButton.className = "pagination-btn";

    nextButton.disabled =
        currentPage === totalPages;


    nextButton.addEventListener("click", () => {

        if (currentPage < totalPages) {

            currentPage++;

            filterProducts();

        }

    });


    pagination.appendChild(nextButton);
}


function filterProducts() {

    let filteredProducts = [...products];


    // Category filter

    if (currentCategory !== "all") {

        filteredProducts = filteredProducts.filter(product => {
            return product.category === currentCategory;
        });

    }


    // Search filter

    if (currentSearch !== "") {

        filteredProducts = filteredProducts.filter(product => {

            return product.name
                .toLowerCase()
                .includes(currentSearch);

        });

    }


    // Sorting

    if (sortSelect.value === "price-low") {

        filteredProducts.sort((a, b) => {
            return a.price - b.price;
        });

    }

    else if (sortSelect.value === "price-high") {

        filteredProducts.sort((a, b) => {
            return b.price - a.price;
        });

    }

    else if (sortSelect.value === "name") {

        filteredProducts.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

    }
    
    if (currentPage > Math.ceil(filteredProducts.length / productsPerPage)) {
    currentPage = 1;
}

    displayProducts(filteredProducts);
}

filterButtons.forEach(button => {

    if (button.dataset.category === currentCategory) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }

});

filterProducts();


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentCategory = button.dataset.category;
        currentPage = 1;
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterProducts();

    });

});


searchInput.addEventListener("input", () => {

    currentSearch = searchInput.value.toLowerCase().trim();
    
    currentPage = 1;
    filterProducts();

});

sortSelect.addEventListener("change", () => {
    
    currentPage = 1;
    filterProducts();

});
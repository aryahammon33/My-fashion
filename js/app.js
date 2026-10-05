/* =========================================
   HARIYO — SHOPPING SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       CART STORAGE
    ========================================= */

    let cart = JSON.parse(
        localStorage.getItem("hariyoCart")
    ) || [];


    function saveCart() {

        localStorage.setItem(
            "hariyoCart",
            JSON.stringify(cart)
        );

    }


    /* =========================================
       CART COUNT
    ========================================= */

    function updateCartCount() {

        const cartCount =
            document.getElementById("cart-count");

        if (!cartCount) return;

        const totalItems = cart.reduce(
            function (total, item) {
                return total + item.quantity;
            },
            0
        );

        cartCount.textContent = totalItems;

    }


    /* =========================================
       PRODUCT PAGE
    ========================================= */

    const addToCartButton =
        document.getElementById("add-to-cart");


    if (addToCartButton) {

        let selectedSize = null;

        let quantity = 1;


        /* -----------------------------
           SIZE SELECTION
        ----------------------------- */

        const sizeButtons =
            document.querySelectorAll(
                ".size-options button"
            );


        sizeButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    sizeButtons.forEach(
                        function (btn) {
                            btn.classList.remove("selected");
                        }
                    );

                    button.classList.add("selected");

                    selectedSize =
                        button.textContent.trim();

                }
            );

        });


        /* -----------------------------
           QUANTITY
        ----------------------------- */

        const quantityDisplay =
            document.getElementById("quantity");


        const increaseButton =
            document.getElementById(
                "increase-quantity"
            );


        const decreaseButton =
            document.getElementById(
                "decrease-quantity"
            );


        if (increaseButton) {

            increaseButton.addEventListener(
                "click",
                function () {

                    quantity++;

                    quantityDisplay.textContent =
                        quantity;

                }
            );

        }


        if (decreaseButton) {

            decreaseButton.addEventListener(
                "click",
                function () {

                    if (quantity > 1) {

                        quantity--;

                        quantityDisplay.textContent =
                            quantity;

                    }

                }
            );

        }


        /* -----------------------------
           ADD TO CART
        ----------------------------- */

        addToCartButton.addEventListener(
            "click",
            function () {

                if (!selectedSize) {

                    alert(
                        "Please select a size first."
                    );

                    return;

                }


                const product = {

                    id: "hariyo-essential-tee",

                    name: "HARIYO Essential Tee",

                    price: 18000,

                    size: selectedSize,

                    quantity: quantity,

                    image:
                        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"

                };


                const existingProduct =
                    cart.find(function (item) {

                        return (
                            item.id === product.id &&
                            item.size === product.size
                        );

                    });


                if (existingProduct) {

                    existingProduct.quantity +=
                        product.quantity;

                } else {

                    cart.push(product);

                }


                saveCart();

                updateCartCount();


                alert(
                    "HARIYO Essential Tee has been added to your cart."
                );

            }
        );

    }


    /* =========================================
       CART PAGE
    ========================================= */

    const cartItemsContainer =
        document.getElementById("cart-items");


    if (cartItemsContainer) {

        renderCart();

    }


    function renderCart() {

        if (cart.length === 0) {

            cartItemsContainer.innerHTML = `

                <div class="empty-cart">

                    <h2>
                        Your cart is empty.
                    </h2>

                    <p>
                        Discover something you love
                        from the HARIYO collection.
                    </p>

                    <a
                        href="shop.html"
                        class="button button-dark"
                    >
                        Continue Shopping
                    </a>

                </div>

            `;


            updateCartTotals();

            return;

        }


        cartItemsContainer.innerHTML = "";


        cart.forEach(function (item, index) {

            const cartItem =
                document.createElement("div");


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <p class="product-category">
                        HARIYO
                    </p>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Size: ${item.size}
                    </p>

                    <strong>
                        ₦${item.price.toLocaleString()}
                    </strong>


                    <div class="cart-item-controls">

                        <button
                            class="cart-minus"
                            data-index="${index}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="cart-plus"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-item"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItemsContainer.appendChild(
                cartItem
            );

        });


        /* -----------------------------
           PLUS BUTTONS
        ----------------------------- */

        document
            .querySelectorAll(".cart-plus")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );

                        cart[index].quantity++;

                        saveCart();

                        renderCart();

                        updateCartCount();

                    }
                );

            });


        /* -----------------------------
           MINUS BUTTONS
        ----------------------------- */

        document
            .querySelectorAll(".cart-minus")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        if (
                            cart[index].quantity > 1
                        ) {

                            cart[index].quantity--;

                        } else {

                            cart.splice(index, 1);

                        }


                        saveCart();

                        renderCart();

                        updateCartCount();

                    }
                );

            });


        /* -----------------------------
           REMOVE
        ----------------------------- */

        document
            .querySelectorAll(".remove-item")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );

                        cart.splice(index, 1);

                        saveCart();

                        renderCart();

                        updateCartCount();

                    }
                );

            });


        updateCartTotals();

    }


    /* =========================================
       CART TOTALS
    ========================================= */

    function updateCartTotals() {

        const subtotal =
            cart.reduce(
                function (total, item) {

                    return total +
                        item.price *
                        item.quantity;

                },
                0
            );


        const subtotalElement =
            document.getElementById(
                "cart-subtotal"
            );


        const totalElement =
            document.getElementById(
                "cart-total"
            );


        if (subtotalElement) {

            subtotalElement.textContent =
                "₦" +
                subtotal.toLocaleString();

        }


        if (totalElement) {

            totalElement.textContent =
                "₦" +
                subtotal.toLocaleString();

        }

    }


    /* =========================================
       CHECKOUT PAGE
    ========================================= */

    const checkoutItems =
        document.getElementById(
            "checkout-items"
        );


    if (checkoutItems) {

        renderCheckout();

    }


    function renderCheckout() {

        checkoutItems.innerHTML = "";


        if (cart.length === 0) {

            checkoutItems.innerHTML = `

                <p>
                    Your cart is empty.
                </p>

                <a href="shop.html">
                    Return to shop
                </a>

            `;

            updateCheckoutTotal();

            return;

        }


        cart.forEach(function (item) {

            const itemElement =
                document.createElement("div");


            itemElement.className =
                "checkout-item";


            itemElement.innerHTML = `

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        Size: ${item.size}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                </div>


                <strong>
                    ₦${(
                        item.price *
                        item.quantity
                    ).toLocaleString()}
                </strong>

            `;


            checkoutItems.appendChild(
                itemElement
            );

        });


        updateCheckoutTotal();

    }


    function updateCheckoutTotal() {

        const total =
            cart.reduce(
                function (sum, item) {

                    return sum +
                        item.price *
                        item.quantity;

                },
                0
            );


        const subtotalElement =
            document.getElementById(
                "checkout-subtotal"
            );


        const totalElement =
            document.getElementById(
                "checkout-total"
            );


        if (subtotalElement) {

            subtotalElement.textContent =
                "₦" +
                total.toLocaleString();

        }


        if (totalElement) {

            totalElement.textContent =
                "₦" +
                total.toLocaleString();

        }

    }


    /* =========================================
       CHECKOUT FORM
    ========================================= */

    const checkoutForm =
        document.getElementById(
            "checkout-form"
        );


    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    return;

                }


                alert(
                    "Your HARIYO order has been received. Payment integration will be connected soon."
                );


                /*

                   We will replace this
                   with real order creation
                   and payment processing
                   later.

                */

            }
        );

    }


    /* =========================================
       INITIAL UPDATE
    ========================================= */

    updateCartCount();

});


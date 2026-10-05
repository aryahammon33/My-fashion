/* =================================
   HARIYO — MAIN JAVASCRIPT
================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------
       CART COUNT
    -------------------------------- */

    let cart = JSON.parse(localStorage.getItem("hariyoCart")) || [];

    const cartCount = document.getElementById("cart-count");

    function updateCartCount() {

        if (!cartCount) return;

        const totalItems = cart.reduce(function (total, item) {
            return total + item.quantity;
        }, 0);

        cartCount.textContent = totalItems;
    }

    updateCartCount();


    /* -------------------------------
       NEWSLETTER
    -------------------------------- */

    const newsletterForm =
        document.querySelector(".newsletter-form");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const emailInput =
                newsletterForm.querySelector("input");

            if (!emailInput.value.trim()) {
                return;
            }

            alert(
                "Thank you for joining the HARIYO community!"
            );

            emailInput.value = "";

        });

    }

});

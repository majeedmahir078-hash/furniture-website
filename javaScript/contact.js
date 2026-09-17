const contactForm = document.querySelector("#contact-form");

const formMessage = document.querySelector("#form-message");


if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        formMessage.textContent =
            "Thank you! Your message has been received.";

        formMessage.style.display = "block";


        contactForm.reset();

    });

}
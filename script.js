document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen = document.querySelector(".loading-screen");
    const site = document.querySelector(".site");

    // Wait for the loading animation
    setTimeout(() => {

        loadingScreen.classList.add("loaded");

        site.classList.add("visible");

    }, 2000);

});
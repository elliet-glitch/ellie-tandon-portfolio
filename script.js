
/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE LOADING
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen = document.getElementById("loadingScreen");

    if (!loadingScreen) {
        return;
    }

    const percent = document.getElementById("loaderPercent");
    const progress = document.querySelector(".loader-progress");

    let current = 0;

    const interval = setInterval(() => {

        current += Math.floor(Math.random() * 8) + 4;

        if (current >= 100) {

            current = 100;

            clearInterval(interval);

            if (percent) {
                percent.textContent = "100%";
            }

            if (progress) {
                progress.style.width = "100%";
            }

            setTimeout(() => {

                loadingScreen.style.opacity = "0";
                loadingScreen.style.transition = "opacity .5s ease";

                setTimeout(() => {
                    loadingScreen.style.display = "none";
                }, 500);

            }, 300);

            return;
        }

        if (percent) {
            percent.textContent = current + "%";
        }

        if (progress) {
            progress.style.width = current + "%";
        }

    }, 80);

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-top, .home-project, .about-interest, .directory-item, .tool, .design-project, .marketing-list > div"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.1
    }
);


revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";

    revealObserver.observe(element);

});


/* =========================================================
   IMAGE FADE-IN
========================================================= */

const images = document.querySelectorAll("img");

images.forEach((image) => {

    image.style.opacity = "0";
    image.style.transition = "opacity .6s ease";

    if (image.complete) {

        image.style.opacity = "1";

    } else {

        image.addEventListener("load", () => {
            image.style.opacity = "1";
        });

    }

});


/* =========================================================
   CURRENT PAGE
========================================================= */

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

const navigationLinks =
    document.querySelectorAll("nav a");

navigationLinks.forEach((link) => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.style.opacity = "0.45";

    }

});


/* =========================================================
   EXTERNAL LINKS
========================================================= */

document.querySelectorAll('a[target="_blank"]').forEach((link) => {

    link.setAttribute("rel", "noopener noreferrer");

});


/* =========================================================
   CURSOR MOVEMENT
========================================================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        const loadingScreen =
            document.getElementById("loadingScreen");

        if (loadingScreen) {
            loadingScreen.style.display = "none";
        }

    }

});


/* =========================================================
   PREVENT BROKEN IMAGE ICONS
========================================================= */

document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

        image.style.display = "none";

    });

});


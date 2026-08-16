document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen = document.getElementById("loadingScreen");
    const site = document.getElementById("site");
    const progress = document.querySelector(".loader-progress");
    const percent = document.getElementById("loaderPercent");

    let loadingProgress = 0;


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    const loadingInterval = setInterval(() => {

        loadingProgress += Math.floor(Math.random() * 8) + 3;

        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(loadingInterval);
        }

        progress.style.width = `${loadingProgress}%`;
        percent.textContent = `${loadingProgress}%`;

    }, 100);


    function finishLoading() {

        progress.style.width = "100%";
        percent.textContent = "100%";

        setTimeout(() => {

            loadingScreen.classList.add("hidden");
            site.classList.add("visible");

        }, 350);
    }


    /* Never leave the site stuck behind the loader */
    window.addEventListener("load", () => {

        setTimeout(() => {
            finishLoading();
        }, 500);

    });


    /* Backup in case an image/font takes too long */
    setTimeout(() => {

        if (!loadingScreen.classList.contains("hidden")) {
            finishLoading();
        }

    }, 3000);



    /* =====================================================
       FOLDER MOUSE MOVEMENT
    ===================================================== */

    const folders = document.querySelectorAll("[data-folder]");

    folders.forEach(folder => {

        folder.addEventListener("mousemove", (event) => {

            const rect = folder.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            const baseRotation =
                folder.classList.contains("folder-design")
                    ? -7
                    : 7;

            folder.style.transform = `
                translate(${x * 12}px, ${y * 12}px)
                rotate(${baseRotation + x * 5}deg)
                scale(1.035)
            `;

        });


        folder.addEventListener("mouseleave", () => {

            const rotation =
                folder.classList.contains("folder-design")
                    ? -7
                    : 7;

            folder.style.transform =
                `rotate(${rotation}deg)`;

        });

    });



    /* =====================================================
       HERO NAME MOUSE MOVEMENT
    ===================================================== */

    const heroName = document.getElementById("heroName");

    document.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 700) return;

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);

        heroName.style.transform = `
            translate(${x * 8}px, ${y * 5}px)
        `;

    });



    /* =====================================================
       PARALLAX DECORATIONS
    ===================================================== */

    const crosses =
        document.querySelectorAll(".cross");

    document.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 700) return;

        const x =
            event.clientX / window.innerWidth - 0.5;

        const y =
            event.clientY / window.innerHeight - 0.5;

        crosses.forEach((cross, index) => {

            const amount = (index + 1) * 8;

            cross.style.transform = `
                translate(
                    ${x * amount}px,
                    ${y * amount}px
                )
            `;

        });

    });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems = document.querySelectorAll(
        ".about-grid, .cityline-wrap, .area-item, .contact-content"
    );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealItems.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(item);

    });


    /* Add the revealed state dynamically */
    const revealStyle = document.createElement("style");

    revealStyle.textContent = `

        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

    `;

    document.head.appendChild(revealStyle);



    /* =====================================================
       PREVENT BROKEN FOLDER FEEL
    ===================================================== */

    folders.forEach(folder => {

        folder.addEventListener("click", () => {

            folder.style.pointerEvents = "none";

            folder.style.transition =
                "transform .25s ease, opacity .25s ease";

            folder.style.opacity = ".7";

        });

    });

});
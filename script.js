/* =========================================================
   ELLIE PORTFOLIO — EXPERIMENTAL INTERACTIONS
   ========================================================= */


/* =========================================================
   LOADING SCREEN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.querySelector(".loading-screen");
    const loadingText = document.querySelector(".loading-text");
    const loadingBar = document.querySelector(".loading-bar-fill");
    const loadingPercent = document.querySelector(".loading-percent");

    if (loader) {

        const messages = [
            "INITIALIZING PORTFOLIO...",
            "LOADING DESIGN FILES...",
            "LOADING CREATIVE MEDIA...",
            "LOADING MARKETING FILES...",
            "CONNECTING...",
            "WELCOME, ELLIE."
        ];

        let progress = 0;
        let messageIndex = 0;

        const loadingInterval = setInterval(() => {

            progress += Math.floor(Math.random() * 8) + 3;

            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);

                setTimeout(() => {
                    loader.classList.add("loaded");
                    document.body.classList.remove("loading");
                }, 600);
            }

            if (loadingBar) {
                loadingBar.style.width = `${progress}%`;
            }

            if (loadingPercent) {
                loadingPercent.textContent = `${progress}%`;
            }

            if (
                loadingText &&
                progress > messageIndex * 18
            ) {
                loadingText.textContent =
                    messages[Math.min(messageIndex, messages.length - 1)];

                messageIndex++;
            }

        }, 180);

    }


    /* =====================================================
       FOLDER INTERACTIONS
       ===================================================== */

    const folders = document.querySelectorAll(".folder");

    folders.forEach(folder => {

        folder.addEventListener("mouseenter", () => {
            folder.classList.add("folder-hover");
        });

        folder.addEventListener("mouseleave", () => {
            folder.classList.remove("folder-hover");
        });

        folder.addEventListener("click", () => {

            const target = folder.dataset.folder;

            if (!target) return;

            const section = document.getElementById(target);

            if (section) {

                section.classList.add("folder-opening");

                setTimeout(() => {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 150);

                setTimeout(() => {
                    section.classList.remove("folder-opening");
                }, 900);

            }

        });

    });


    /* =====================================================
       MOUSE MOVEMENT
       ===================================================== */

    const floatingElements =
        document.querySelectorAll(".floating-element");

    document.addEventListener("mousemove", (event) => {

        const mouseX =
            (event.clientX / window.innerWidth - 0.5);

        const mouseY =
            (event.clientY / window.innerHeight - 0.5);

        floatingElements.forEach((element, index) => {

            const intensity = 8 + index * 3;

            const x = mouseX * intensity;
            const y = mouseY * intensity;

            element.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    });


    /* =====================================================
       RANDOM FLOATING MOVEMENT
       ===================================================== */

    const movingObjects =
        document.querySelectorAll(".floating-object");

    movingObjects.forEach((object, index) => {

        const duration = 5 + (index % 4);
        const delay = index * 0.4;

        object.style.animationDuration = `${duration}s`;
        object.style.animationDelay = `${delay}s`;

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       CUSTOM CURSOR
       ===================================================== */

    const cursor =
        document.querySelector(".custom-cursor");

    const cursorDot =
        document.querySelector(".cursor-dot");

    if (cursor || cursorDot) {

        document.addEventListener("mousemove", (event) => {

            if (cursor) {
                cursor.style.left = `${event.clientX}px`;
                cursor.style.top = `${event.clientY}px`;
            }

            if (cursorDot) {
                cursorDot.style.left = `${event.clientX}px`;
                cursorDot.style.top = `${event.clientY}px`;
            }

        });


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .folder, .project-card"
            );

        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                if (cursor) {
                    cursor.classList.add("cursor-hover");
                }

            });

            element.addEventListener("mouseleave", () => {

                if (cursor) {
                    cursor.classList.remove("cursor-hover");
                }

            });

        });

    }


    /* =====================================================
       PROJECT IMAGE HOVER
       ===================================================== */

    const projects =
        document.querySelectorAll(".featured-project");

    projects.forEach(project => {

        const image = project.querySelector("img");

        if (!image) return;

        project.addEventListener("mouseenter", () => {
            image.classList.add("image-hover");
        });

        project.addEventListener("mouseleave", () => {
            image.classList.remove("image-hover");
        });

    });


    /* =====================================================
       ESCAPE KEY — CLOSE OPEN WINDOWS
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            document
                .querySelectorAll(".open-window")
                .forEach(windowElement => {
                    windowElement.classList.remove("open-window");
                });

        }

    });

});
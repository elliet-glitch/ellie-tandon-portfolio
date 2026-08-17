document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    const loadingScreen = document.getElementById("loadingScreen");
    const site = document.getElementById("site");
    const progress = document.querySelector(".loader-progress");
    const percent = document.getElementById("loaderPercent");

    let loadingProgress = 0;

    if (loadingScreen) {

        const loadingInterval = setInterval(() => {

            loadingProgress += Math.floor(Math.random() * 8) + 3;

            if (loadingProgress >= 100) {
                loadingProgress = 100;
                clearInterval(loadingInterval);
            }

            if (progress) {
                progress.style.width = `${loadingProgress}%`;
            }

            if (percent) {
                percent.textContent = `${loadingProgress}%`;
            }

        }, 100);

        function finishLoading() {

            if (progress) {
                progress.style.width = "100%";
            }

            if (percent) {
                percent.textContent = "100%";
            }

            setTimeout(() => {

                if (loadingScreen) {
                    loadingScreen.classList.add("hidden");
                }

                if (site) {
                    site.classList.add("visible");
                }

            }, 350);
        }

        window.addEventListener("load", () => {
            setTimeout(finishLoading, 500);
        });

        setTimeout(() => {

            if (
                loadingScreen &&
                !loadingScreen.classList.contains("hidden")
            ) {
                finishLoading();
            }

        }, 3000);
    }


    /* =====================================================
       FOLDER MOUSE MOVEMENT
       Only runs on pages that actually have folders
    ===================================================== */

    const folders = document.querySelectorAll("[data-folder]");

    folders.forEach(folder => {

        folder.addEventListener("mousemove", (event) => {

            const rect = folder.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - 0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height - 0.5;

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

        folder.addEventListener("click", () => {

            folder.style.transition =
                "transform .25s ease, opacity .25s ease";

            folder.style.opacity = ".7";

        });

    });


    /* =====================================================
       HERO NAME MOUSE MOVEMENT
    ===================================================== */

    const heroName = document.getElementById("heroName");

    if (heroName) {

        document.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 700) return;

            const x =
                event.clientX /
                window.innerWidth - 0.5;

            const y =
                event.clientY /
                window.innerHeight - 0.5;

            heroName.style.transform = `
                translate(${x * 8}px, ${y * 5}px)
            `;

        });

    }


    /* =====================================================
       PARALLAX DECORATIONS
    ===================================================== */

    const crosses = document.querySelectorAll(".cross");

    if (crosses.length > 0) {

        document.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 700) return;

            const x =
                event.clientX /
                window.innerWidth - 0.5;

            const y =
                event.clientY /
                window.innerHeight - 0.5;

            crosses.forEach((cross, index) => {

                const amount = (index + 1) * 8;

                cross.style.transform = `
                    translate(${x * amount}px, ${y * amount}px)
                `;

            });

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems = document.querySelectorAll(
        ".about-grid, .cityline-wrap, .area-item, .contact-content"
    );

    if (revealItems.length > 0) {

        const observer = new IntersectionObserver(
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

            item.style.transform =
                "translateY(30px)";

            item.style.transition =
                "opacity .8s ease, transform .8s ease";

            observer.observe(item);

        });

    }


    /* =====================================================
       PROJECT FILTERS
       Only runs on the Projects page
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const projectItems =
        document.querySelectorAll(".work-item");

    const projectCount =
        document.getElementById("projectCount");


    if (
        filterButtons.length > 0 &&
        projectItems.length > 0
    ) {

        function updateProjectCount() {

            const visibleProjects =
                document.querySelectorAll(
                    ".work-item:not(.filter-hidden)"
                );

            if (projectCount) {

                projectCount.textContent =
                    String(visibleProjects.length).padStart(2, "0");

            }

        }


        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const filter =
                    button.getAttribute("data-filter");


                /* Active filter */

                filterButtons.forEach(btn => {

                    btn.classList.remove("active");

                });

                button.classList.add("active");


                /* Show / hide projects */

                projectItems.forEach(project => {

                    const category =
                        project.getAttribute("data-category");


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        project.classList.remove(
                            "filter-hidden"
                        );

                    } else {

                        project.classList.add(
                            "filter-hidden"
                        );

                    }

                });


                updateProjectCount();

            });

        });


        updateProjectCount();

    }

});

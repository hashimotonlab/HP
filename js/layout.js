async function loadHTML(id, file) {
    const target = document.getElementById(id);
    if (!target) return;

    const response = await fetch(file);
    const html = await response.text();
    target.innerHTML = html;
}

async function initLayout() {
    await loadHTML("site-header", "/HP/parts/header.html");
    // await loadHTML("site-footer", "/parts/footer.html");

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("overlay");

    if (menuBtn && mobileMenu && overlay) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("translate-x-full");
            overlay.classList.remove("hidden");
            overlay.classList.add("opacity-100");
        });

        overlay.addEventListener("click", () => {
            mobileMenu.classList.add("translate-x-full");
            overlay.classList.add("hidden");
        });
    }
}

initLayout();

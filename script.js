const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

const particleContainer = document.getElementById("particles");
const particleCount = 70;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = (8 + Math.random() * 15) + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";

    const size = 1 + Math.random() * 3;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particleContainer.appendChild(particle);
}

const revealElements = document.querySelectorAll(
    ".project-card, .hobby-card, .info-card, .about-text"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);
});

console.log(
    "%c PROFIL AKBAR ",
    "color:#00f5ff;font-size:20px;font-weight:bold;"
);
console.log(
    "Welcome to Muhammad Rafie Akbar's website."
);

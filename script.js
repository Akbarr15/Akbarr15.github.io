const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        if (window.scrollY >= sectionTop) current = section.getAttribute("id");
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });

    const scrollLine = document.querySelector(".reveal-line");
    if (scrollLine) {
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = pageHeight > 0 ? window.scrollY / pageHeight : 0;
        scrollLine.style.transform = `scaleX(${Math.min(progress, 1)})`;
    }
}, { passive: true });

const particleContainer = document.getElementById("particles");
const particleCount = window.innerWidth < 700 ? 38 : 70;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = (8 + Math.random() * 15) + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";

    const size = 1 + Math.random() * 3;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.opacity = (0.2 + Math.random() * 0.6).toFixed(2);

    particleContainer.appendChild(particle);
}

// Futuristic cursor glow
const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

if (!reduceMotion) {
    window.addEventListener("pointermove", (event) => {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
        document.body.classList.add("cursor-active");
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
        document.body.classList.remove("cursor-active");
    });
}

// Scroll progress bar
const revealLine = document.createElement("div");
revealLine.className = "reveal-line";
document.body.appendChild(revealLine);

// Scroll reveal
const revealElements = document.querySelectorAll(
    ".project-card, .hobby-card, .info-card, .about-text, .contact-card"
);

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = reduceMotion
        ? "opacity 0.2s ease"
        : "opacity 0.8s ease, transform 0.8s cubic-bezier(.2,.8,.2,1)";
    revealObserver.observe(element);
});

// Interactive 3D tilt for cards on desktop.
if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    const tiltCards = document.querySelectorAll(".project-card, .hobby-card, .hero-card");

    tiltCards.forEach(card => {
        card.addEventListener("pointermove", event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            const maxRotate = card.classList.contains("hero-card") ? 7 : 5;
            const rotateY = x * maxRotate;
            const rotateX = -y * maxRotate;
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

// Typewriter effect for the hero role line.
const heroRole = document.querySelector(".hero h2");
if (heroRole && !reduceMotion) {
    const originalText = heroRole.textContent.trim();
    heroRole.textContent = "";
    heroRole.classList.add("typing-cursor");

    let index = 0;
    const typeNext = () => {
        if (index <= originalText.length) {
            heroRole.textContent = originalText.slice(0, index);
            index += 1;
            setTimeout(typeNext, index < 10 ? 55 : 28);
        }
    };
    setTimeout(typeNext, 650);
}

// Subtle parallax on the hero background layer.
if (!reduceMotion) {
    window.addEventListener("scroll", () => {
        const hero = document.querySelector(".hero");
        if (!hero) return;
        const offset = Math.min(window.scrollY * 0.12, 90);
        hero.style.setProperty("--hero-offset", `${offset}px`);
    }, { passive: true });
}

console.log(
    "%c PROFIL AKBAR // FUTURE MODE ",
    "color:#00f5ff;font-size:18px;font-weight:bold;letter-spacing:1px;"
);
console.log("Welcome to Muhammad Rafie Akbar's futuristic profile.");

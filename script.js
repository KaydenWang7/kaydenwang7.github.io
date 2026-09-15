const nav = document.getElementById("nav");
const progress = document.querySelector(".progress span");
const toggle = document.querySelector(".nav-toggle");
const mobileNav = document.getElementById("mobile-nav");
const heroTilt = document.querySelector(".hero-tilt");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

document.querySelectorAll(".reveal[data-delay]").forEach((el) => {
  el.style.setProperty("--delay", el.dataset.delay);
});

const onScroll = () => {
  const scrolled = window.scrollY;
  nav.classList.toggle("is-scrolled", scrolled > 8);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (scrolled / max) * 100 : 0}%`;
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

toggle.addEventListener("click", () => {
  const open = mobileNav.hasAttribute("hidden");
  mobileNav.toggleAttribute("hidden", !open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", "false");
  });
});

if (heroTilt && !window.matchMedia("(pointer: coarse)").matches) {
  const stage = heroTilt.parentElement;
  stage.addEventListener("mousemove", (event) => {
    const box = stage.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    heroTilt.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;
  });
  stage.addEventListener("mouseleave", () => {
    heroTilt.style.transform = "";
  });
}

const openShot = (src, alt) => {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.showModal();
};

document.querySelectorAll("[data-full]").forEach((btn) => {
  btn.addEventListener("click", () => openShot(btn.dataset.full, btn.dataset.alt));
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) lightbox.close();
});

const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("is-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton?.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];
const sectionObserver = new IntersectionObserver((entries) => {
  const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!active) return;
  links.forEach((link) => link.toggleAttribute("aria-current", link.getAttribute("href") === `#${active.target.id}`));
}, { rootMargin: "-35% 0px -55%", threshold: [0, 0.25, 0.5] });
sections.forEach((section) => sectionObserver.observe(section));


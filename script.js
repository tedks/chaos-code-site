document.documentElement.classList.add("js");

const hero = document.querySelector("[data-hero]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let animationFrame;

const setGlow = (x, y) => {
  if (!hero) return;
  cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(() => {
    hero.style.setProperty("--mouse-x", `${x}px`);
    hero.style.setProperty("--mouse-y", `${y}px`);
  });
};

const resetGlow = () => {
  if (!hero) return;
  cancelAnimationFrame(animationFrame);
  animationFrame = undefined;
  hero.style.removeProperty("--mouse-x");
  hero.style.removeProperty("--mouse-y");
};

const moveGlow = (event) => {
  if (!hero || reducedMotion.matches) return;
  const bounds = hero.getBoundingClientRect();
  setGlow(event.clientX - bounds.left, event.clientY - bounds.top);
};

if (hero) {
  hero.addEventListener("pointermove", moveGlow);
  hero.addEventListener("pointerleave", resetGlow);
}

reducedMotion.addEventListener("change", ({ matches }) => {
  if (matches) resetGlow();
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
  { threshold: 0.13 }
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const recipes = [
  { title: "Arroz con pollo rápido", emoji: "🍲", time: 35, match: 94, color: "#f1a084" },
  { title: "Bowl criollo de aguacate", emoji: "🥑", time: 18, match: 91, color: "#a9c99e" },
  { title: "Pollo guisado express", emoji: "🍗", time: 30, match: 88, color: "#e9bf69" },
  { title: "Ensalada fresca de tomate", emoji: "🥗", time: 12, match: 86, color: "#89b9a1" },
];
let recipeIndex = 0;

const renderRecipe = () => {
  const recipe = recipes[recipeIndex];
  const emoji = document.querySelector("#recipe-emoji");
  document.querySelector("#recipe-title").textContent = recipe.title;
  document.querySelector("#recipe-time").textContent = recipe.time;
  document.querySelector("#match-value").textContent = `${recipe.match}%`;
  document.querySelector("#match-bar").style.width = `${recipe.match}%`;
  emoji.textContent = recipe.emoji;
  emoji.style.background = recipe.color;
};

document.querySelector("#demo-generate")?.addEventListener("click", () => {
  recipeIndex = (recipeIndex + 1) % recipes.length;
  renderRecipe();
});

const ingredientButtons = [...document.querySelectorAll("[data-ingredient]")];
ingredientButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const active = ingredientButtons.filter((item) => item.classList.contains("active")).length;
    document.querySelector("#saved-count").textContent = active;
    recipeIndex = Math.max(0, Math.min(recipes.length - 1, active - 1));
    renderRecipe();
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

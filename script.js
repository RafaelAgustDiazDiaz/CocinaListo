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
  { title: "Arroz con pollo rápido", emoji: "🍲", time: 35, color: "#f1a084", ingredients: ["pollo", "arroz", "tomate"], copy: "Una comida completa, sabrosa y fácil de preparar." },
  { title: "Pollo guisado express", emoji: "🍗", time: 30, color: "#e9bf69", ingredients: ["pollo", "tomate", "cebolla"], copy: "Pollo jugoso con una salsa criolla sencilla." },
  { title: "Bowl criollo de aguacate", emoji: "🥑", time: 18, color: "#a9c99e", ingredients: ["aguacate", "arroz", "tomate"], copy: "Fresco, rápido y perfecto para aprovechar el arroz." },
  { title: "Ensalada fresca de tomate", emoji: "🥗", time: 12, color: "#89b9a1", ingredients: ["tomate", "aguacate", "cebolla"], copy: "Una opción ligera con ingredientes de todos los días." },
  { title: "Arroz con habichuelas fácil", emoji: "🫘", time: 28, color: "#d79a77", ingredients: ["arroz", "habichuelas", "ajo"], copy: "Sabor de casa con pocos ingredientes y mucho rendimiento." },
  { title: "Desayuno de huevo y plátano", emoji: "🍳", time: 20, color: "#efc96f", ingredients: ["huevo", "platano", "cebolla"], copy: "Un desayuno completo y resuelto en pocos minutos." },
];

const normalizeIngredient = (value) => value
  .trim()
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

const chips = document.querySelector(".demo-chips");
const ingredientInput = document.querySelector("#ingredient-input");
const ingredientForm = document.querySelector("#demo-form");
const generateButton = document.querySelector("#demo-generate");
const demoStatus = document.querySelector("#demo-status");

const activeIngredients = () => [...document.querySelectorAll("[data-ingredient].active")]
  .map((button) => normalizeIngredient(button.dataset.ingredient));

const ingredientsMatch = (available, required) => available.some((item) =>
  item.includes(required) || required.includes(item)
);

const renderRecipe = (recipe, match) => {
  const emoji = document.querySelector("#recipe-emoji");
  document.querySelector("#recipe-title").textContent = recipe.title;
  document.querySelector("#recipe-time").textContent = recipe.time;
  document.querySelector("#recipe-copy").textContent = recipe.copy;
  document.querySelector("#match-value").textContent = `${match}%`;
  document.querySelector("#match-bar").style.width = `${match}%`;
  emoji.textContent = recipe.emoji;
  emoji.style.background = recipe.color;
};

const updateIngredientCount = () => {
  document.querySelector("#saved-count").textContent = activeIngredients().length;
};

const createRecipe = () => {
  const available = activeIngredients();
  if (!available.length) {
    ingredientForm.classList.add("has-error");
    demoStatus.textContent = "Agrega por lo menos un ingrediente para comenzar.";
    ingredientInput.focus();
    setTimeout(() => ingredientForm.classList.remove("has-error"), 400);
    return;
  }

  const ranked = recipes.map((recipe) => {
    const hits = recipe.ingredients.filter((item) => ingredientsMatch(available, item)).length;
    return { recipe, hits };
  }).sort((a, b) => b.hits - a.hits || a.recipe.time - b.recipe.time);

  const best = ranked[0];
  const match = Math.min(98, 68 + best.hits * 10 + Math.min(available.length, 3));
  renderRecipe(best.recipe, match);
  demoStatus.textContent = `Receta creada con ${available.length} ingrediente${available.length === 1 ? "" : "s"}.`;
  generateButton.classList.add("is-ready");
  generateButton.firstChild.textContent = "¡Receta lista! ";
  setTimeout(() => {
    generateButton.classList.remove("is-ready");
    generateButton.firstChild.textContent = "Crear mi receta ";
  }, 1500);
};

const addIngredient = (rawValue) => {
  const value = normalizeIngredient(rawValue);
  if (!value) return;
  const existing = [...document.querySelectorAll("[data-ingredient]")]
    .find((button) => normalizeIngredient(button.dataset.ingredient) === value);
  if (existing) {
    existing.classList.add("active");
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "active";
  button.dataset.ingredient = value;
  button.append(document.createTextNode(`${rawValue.trim()} `));
  const remove = document.createElement("span");
  remove.textContent = "×";
  button.append(remove);
  chips.append(button);
};

ingredientForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = ingredientInput.value.split(",").map((item) => item.trim()).filter(Boolean);
  if (!values.length) {
    createRecipe();
    return;
  }
  values.forEach(addIngredient);
  ingredientInput.value = "";
  updateIngredientCount();
  createRecipe();
});

chips?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-ingredient]");
  if (!button) return;
  button.classList.toggle("active");
  updateIngredientCount();
  demoStatus.textContent = button.classList.contains("active")
    ? `${button.dataset.ingredient} agregado.`
    : `${button.dataset.ingredient} quitado.`;
});

generateButton?.addEventListener("click", createRecipe);

document.querySelectorAll(".try-link").forEach((link) => {
  link.addEventListener("click", () => setTimeout(() => ingredientInput?.focus(), 450));
});

updateIngredientCount();
renderRecipe(recipes[0], 94);
document.querySelector("#year").textContent = new Date().getFullYear();

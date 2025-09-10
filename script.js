const grid = document.querySelector("#grid");
let openCard = null;
const container = document.querySelector(".container");
// Expand on click
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;

  // If clicking the same open card -> collapse
  if (card === openCard) {
    collapse();
    return;
  }

  expand(card);
});

// Close button inside expanded card
function injectClose(card) {
  const btn = document.createElement("button");
  btn.className = "close";
  btn.setAttribute("aria-label", "Close");
  btn.textContent = "×";
  btn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    collapse();
  });
  card.appendChild(btn);
}

function expand(card) {
  // Reset any previous
  collapse();

  openCard = card;
  injectClose(card);
  grid.classList.add("dim");
  card.classList.add("expanded");

  // Optional: scroll into view
  card.scrollIntoView({ behavior: "smooth", block: "center" });
}

function collapse() {
  if (!openCard) return;
  const btn = openCard.querySelector(".close");
  if (btn) btn.remove();
  openCard.classList.remove("expanded");
  grid.classList.remove("dim");
  openCard = null;
}

// ESC to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") collapse();
});

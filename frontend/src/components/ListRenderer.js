/**
 * Renders a list of items as buttons into .lesson-grid
 * @param {Array} items - Array of objects with at least { id, name }
 * @param {Function} onItemClick - Callback receiving the item's id
 * @param {string} emptyMessage - Message when items array is empty
 */
export function renderList(items, onItemClick, emptyMessage = "No items available.") {
  const container = document.querySelector(".lesson-grid");
  container.innerHTML = "";

  if (!Array.isArray(items) || items.length === 0) {
    const message = document.createElement("p");
    message.textContent = emptyMessage;
    message.setAttribute("role", "status");
    container.appendChild(message);
    return;
  }

  items.forEach((item) => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = item.name;
    button.dataset.id = String(item.id);
    button.addEventListener("click", () => onItemClick(item.id));
    container.appendChild(button);
  });
}

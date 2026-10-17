export function moveGridFocus(event, size) {
  const index = Number(event.target.closest("[data-cell]")?.dataset.cell);
  if (!Number.isInteger(index)) return;
  const row = Math.floor(index / size),
    col = index % size;
  const next = {
    ArrowLeft: row * size + Math.max(0, col - 1),
    ArrowRight: row * size + Math.min(size - 1, col + 1),
    ArrowUp: Math.max(0, row - 1) * size + col,
    ArrowDown: Math.min(size - 1, row + 1) * size + col,
    Home: row * size,
    End: row * size + size - 1,
  }[event.key];
  if (next === undefined) return;
  event.preventDefault();
  event.currentTarget.querySelector(`[data-cell="${next}"]`)?.focus();
}

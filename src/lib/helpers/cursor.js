export const changeCursorOnHover = (hovered) => {
  if (hovered) {
    if (document.body.style.cursor !== "pointer") document.body.style.cursor = "pointer";
  } else {
    if (document.body.style.cursor !== "auto") document.body.style.cursor = "auto";
  }
}
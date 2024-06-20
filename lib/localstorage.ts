import { Redirect } from "./drizzle";

export function addItemToLocalStorage(item: Redirect) {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  items.unshift(item);
  localStorage.setItem("items", JSON.stringify(items));
  window.dispatchEvent(new Event("storage"));
}

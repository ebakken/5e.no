import { Redirect } from "./drizzle";

export function addItemToLocalStorage(item: Redirect) {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  window.dispatchEvent(new Event("storage"));
}

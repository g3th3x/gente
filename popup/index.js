const buttonEl = document.querySelector(".button");

buttonEl.addEventListener("click", () => {
  document.querySelector("span").textContent = "test!";
});

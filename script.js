const tabs = document.querySelectorAll(".tab");
const screens = document.querySelectorAll(".screen");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;
    if (!target) return;
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    screens.forEach((screen) => screen.classList.toggle("is-active", screen.id === target));
  });
});

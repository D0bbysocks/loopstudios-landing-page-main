const burgerMenu = document.querySelector(".burger-menu");
const navBackdrop = document.querySelector(".nav__backdrop");
const navMenuPanel = document.querySelector(".nav__menu-panel");
const body = document.body;
const creations = document.querySelectorAll(".creations__grid .creations__tile a");


burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("is-active");
  const isOpen = burgerMenu.getAttribute("aria-expanded") === "true";
  burgerMenu.setAttribute("aria-expanded", String(!isOpen));
  navBackdrop.hidden = !navBackdrop.hidden;
  navMenuPanel.hidden = !navMenuPanel.hidden;
  body.classList.toggle("is-nav-open");
});


creations.forEach(creation => {

  creation.addEventListener("mouseenter", () => {

    creations.forEach(item => {
      item.classList.add("is-active");
    });

    creation.classList.remove("is-active");
  });

  creation.addEventListener("mouseleave", () => {

    creations.forEach(item => {
      item.classList.remove("is-active");
    });

  });

});
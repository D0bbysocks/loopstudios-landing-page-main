const burgerMenu = document.querySelector(".burger-menu");
const navBackdrop = document.querySelector(".nav__backdrop");
const navMenuPanel = document.getElementById("nav-menu"); // statt querySelector
const body = document.body;
const creations = document.querySelectorAll(".creations__grid .creations__tile a");

let lastFocusedEl = null;

function getFocusable(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
}

function openMenu() {
  lastFocusedEl = document.activeElement;

  burgerMenu.classList.add("is-active");
  burgerMenu.setAttribute("aria-expanded", "true");

  navBackdrop.hidden = false;
  navMenuPanel.hidden = false;
  body.classList.add("is-nav-open");

  // Fokus ins Menü 
  const focusables = getFocusable(navMenuPanel);
  (focusables[0] || navMenuPanel).focus();

  document.addEventListener("keydown", handleMenuKeydown);
}

function closeMenu() {
  burgerMenu.classList.remove("is-active");
  burgerMenu.setAttribute("aria-expanded", "false");

  navBackdrop.hidden = true;
  navMenuPanel.hidden = true;
  body.classList.remove("is-nav-open");

  document.removeEventListener("keydown", handleMenuKeydown);

  // Fokus zurück auf den Auslöser
  (lastFocusedEl || burgerMenu).focus();
}

function handleMenuKeydown(e) {
  // nur wenn offen
  const isOpen = burgerMenu.getAttribute("aria-expanded") === "true";
  if (!isOpen) return;

  if (e.key === "Escape") {
    e.preventDefault();
    closeMenu();
    return;
  }

  if (e.key !== "Tab") return;

  const focusables = getFocusable(navMenuPanel);
  if (focusables.length === 0) {
    e.preventDefault();
    navMenuPanel.focus();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  // Shift+Tab vom ersten -> zum letzten
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  }
  // Tab vom letzten -> zum ersten
  else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

burgerMenu.addEventListener("click", () => {
  const isOpen = burgerMenu.getAttribute("aria-expanded") === "true";
  isOpen ? closeMenu() : openMenu();
});

navBackdrop.addEventListener("click", () => {
  const isOpen = burgerMenu.getAttribute("aria-expanded") === "true";
  if (isOpen) closeMenu();
});


creations.forEach((creation) => {
  creation.addEventListener("mouseenter", () => {
    creations.forEach((item) => item.classList.add("is-active"));
    creation.classList.remove("is-active");
  });

  creation.addEventListener("mouseleave", () => {
    creations.forEach((item) => item.classList.remove("is-active"));
  });
});
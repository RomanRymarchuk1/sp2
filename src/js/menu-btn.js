const menuBtn = document.querySelector(".header__menu-btn");
const mobileMenu = document.querySelector(".header__menu-list");
const openMenuSvg = document.querySelector(".header__open-menu-svg");
const closeMenuSvg = document.querySelector(".header__close-menu-svg");
let menuStatus = false;

menuBtn.addEventListener("click", (e) => {
  if (!menuStatus) {
    menuStatus = true;
    mobileMenu.classList.remove("none");
    openMenuSvg.classList.add("none");
    closeMenuSvg.classList.remove("none");
  } else {
    menuStatus = false;
    mobileMenu.classList.add("none");
    openMenuSvg.classList.remove("none");
    closeMenuSvg.classList.add("none");
  }
});

document.addEventListener("click", (e) => {
  if (
    e.target !== mobileMenu &&
    e.target !== menuBtn &&
    e.target !== openMenuSvg
  ) {
    menuStatus = false;
    mobileMenu.classList.add("none");
    openMenuSvg.classList.remove("none");
    closeMenuSvg.classList.add("none");
  }
});

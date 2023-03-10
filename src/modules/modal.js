import { animate } from "./helpers";

const modal = () => {
  const buttons = document.querySelectorAll(".popup-btn");
  const modal = document.querySelector(".popup");
  const popupContent = document.querySelector(".popup-content");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = `block`;
      animate({
        duration: 500,
        timing(x, timeFraction) {
          return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
        },
        draw(progress) {
          modal.style.opacity = progress;
        },
      });
    });
  });

  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".popup-content") || e.target.classList.contains("popup-close")) {
      modal.style.display = `none`;
    }
  });
};

export default modal;

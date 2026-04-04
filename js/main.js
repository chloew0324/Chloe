const navLinks = document.querySelectorAll(".nav-link");
const panels = document.querySelectorAll(".panel");
const projectSlots = document.querySelectorAll(".project-slot[data-stars]");
const gridStars = document.querySelectorAll(".grid-star");

function setActivePanel(panelName) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.panel === panelName);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === panelName);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActivePanel(link.dataset.panel);
  });
});

function clearActiveStars() {
  gridStars.forEach((star) => {
    star.classList.remove("is-active");
  });
}

projectSlots.forEach((slot) => {
  const starIds = slot.dataset.stars?.split(" ") ?? [];

  const activate = () => {
    clearActiveStars();
    starIds.forEach((id) => {
      document.querySelector(`.grid-star[data-star="${id}"]`)?.classList.add("is-active");
    });
  };

  const deactivate = () => {
    clearActiveStars();
  };

  slot.addEventListener("mouseenter", activate);
  slot.addEventListener("focusin", activate);
  slot.addEventListener("mouseleave", deactivate);
  slot.addEventListener("focusout", deactivate);
});

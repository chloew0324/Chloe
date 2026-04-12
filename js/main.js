const navLinks = document.querySelectorAll(".nav-link");
const panels = document.querySelectorAll(".panel");
const panelSubnavs = document.querySelectorAll("[data-panel-subnav]");
const otherCategoryLinks = document.querySelectorAll("[data-other-category]");
const otherCategoryPanels = document.querySelectorAll("[data-other-category-panel]");
const projectSlots = document.querySelectorAll(".project-slot[data-stars]");
const gridStars = document.querySelectorAll(".grid-star");
const zoomableImages = Array.from(
  document.querySelectorAll(".project-tile img, .other-page img, .mini-grid img"),
).filter((image) => !image.closest("[data-project-link]"));
const lightbox = document.querySelector("#image-lightbox");
const lightboxBackdrop = lightbox?.querySelector(".lightbox-backdrop");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const validPanels = new Set(["work", "other", "about"]);

function setActiveOtherCategory(categoryName = "illustration") {
  otherCategoryLinks.forEach((link) => {
    link.classList.toggle("is-current", link.dataset.otherCategory === categoryName);
  });

  otherCategoryPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.otherCategoryPanel === categoryName);
  });
}

function setActivePanel(panelName) {
  if (!validPanels.has(panelName)) return;

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.panel === panelName);
    if (link.dataset.panel === "other") {
      link.setAttribute("aria-expanded", String(panelName === "other"));
    }
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === panelName);
  });

  panelSubnavs.forEach((subnav) => {
    subnav.classList.toggle("is-active", subnav.dataset.panelSubnav === panelName);
  });

  if (panelName === "other") {
    const currentCategory =
      document.querySelector("[data-other-category].is-current")?.dataset.otherCategory ??
      "illustration";
    setActiveOtherCategory(currentCategory);
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActivePanel(link.dataset.panel);
    window.history.replaceState(null, "", `#${link.dataset.panel}`);
  });
});

otherCategoryLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveOtherCategory(link.dataset.otherCategory);
  });
});

function openLightbox(image) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt ?? "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
  lightboxImage.alt = "";
  document.body.style.overflow = "";
}

zoomableImages.forEach((image) => {
  image.addEventListener("click", () => {
    openLightbox(image);
  });
});

lightboxBackdrop?.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
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

const initialPanel = window.location.hash.slice(1);

if (validPanels.has(initialPanel)) {
  setActivePanel(initialPanel);
}

window.addEventListener("hashchange", () => {
  const nextPanel = window.location.hash.slice(1);
  if (validPanels.has(nextPanel)) {
    setActivePanel(nextPanel);
  }
});

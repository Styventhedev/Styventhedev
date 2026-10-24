
/* ==========================================
   STYVENTHEDEV — MAIN.JS
   Animations, filtres et fenêtres de projets
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Année automatique
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Animation du texte d'accueil
  const typed = document.getElementById("typed");
  const words = ["apps", "jeux", "outils", "launchers"];

  if (
    typed &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const word = words[wordIndex];

      charIndex += deleting ? -1 : 1;
      typed.textContent = word.slice(0, charIndex);

      let delay = deleting ? 50 : 110;

      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
      }

      window.setTimeout(typeEffect, delay);
    }

    typeEffect();
  }

  // Bouton retour en haut
  const topButton = document.querySelector(".top");

  if (topButton) {
    const updateTopButton = () => {
      topButton.classList.toggle("show", window.scrollY > 500);
    };

    window.addEventListener("scroll", updateTopButton, {
      passive: true
    });

    topButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    updateTopButton();
  }

  // Données des projets
  const projects = {
    "AllInfo": {
      title: "AllInfo",
      category: "Outil web",
      description:
        "Un projet web de Styventhedev consacré aux informations et aux outils numériques.",
      status: "Disponible",
      link: "https://styventhedev.github.io/Allinfo/"
    },

    "PlombierTool": {
      title: "PlombierTool",
      category: "Application",
      description:
        "Une application pensée pour les apprentis et les professionnels de la plomberie et du chauffage. Objectif : centraliser les outils utiles, gratuitement et hors ligne.",
      status: "En développement",
      link: ""
    },

    "StyvenShop": {
      title: "StyvenShop",
      category: "Boutique",
      description:
        "L'espace Ko-fi associé aux projets Styventhedev.",
      status: "En ligne",
      link: "https://ko-fi.com/styvenshop"
    },

    "STYVEN Glass": {
      title: "STYVEN Glass",
      category: "Interface",
      description:
        "Un concept d'interface au style transparent et futuriste.",
      status: "Projet",
      link: ""
    },

    "Cyber Toolkit": {
      title: "Cyber Toolkit",
      category: "Outils",
      description:
        "Un concept de boîte à outils numérique au style cyberpunk.",
      status: "En développement",
      link: ""
    },

    "RAVYX": {
      title: "RAVYX",
      category: "Bot Discord",
      description:
        "Un bot Discord multifonction conçu autour du projet RAVYX.",
      status: "En développement",
      link: ""
    }
  };

  // Fenêtres détaillées des projets
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("mbody");

  function openModal(projectName) {
    const project = projects[projectName];

    if (!project || !modal || !modalBody) return;

    modalBody.replaceChildren();

    const title = document.createElement("h2");
    title.textContent = project.title;

    const category = document.createElement("p");
    category.textContent = project.category;

    const description = document.createElement("p");
    description.textContent = project.description;

    const status = document.createElement("p");
    status.textContent = "Statut : " + project.status;

    modalBody.append(title, category, description, status);

    if (project.link) {
      const link = document.createElement("a");
      link.href = project.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Découvrir le projet ↗";
      link.className = "project-link";
      modalBody.appendChild(link);
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  // Clic sur les cartes de projets
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const name =
        card.dataset.project ||
        card.dataset.name ||
        card.querySelector("h3")?.textContent?.trim();

      if (name) openModal(name);
    });

    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });

  // Fermeture de la fenêtre
  if (modal) {
    modal.querySelectorAll("[data-close], .close, .modal-close")
      .forEach((button) => {
        button.addEventListener("click", closeModal);
      });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  // Filtres de projets
  const filters = document.getElementById("filters");

  if (filters) {
    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;

      const filter = button.dataset.filter;

      filters.querySelectorAll("[data-filter]").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute(
          "aria-pressed",
          item === button ? "true" : "false"
        );
      });

      document.querySelectorAll(".card").forEach((card) => {
        const category = (
          card.dataset.category ||
          card.dataset.filter ||
          ""
        ).toLowerCase();

        const show =
          filter === "all" ||
          category === filter.toLowerCase();

        card.hidden = !show;
      });
    });
  }

  // Apparition progressive des éléments
  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
  } else {
    document
      .querySelectorAll(".reveal")
      .forEach((element) => element.classList.add("visible"));
  }
});

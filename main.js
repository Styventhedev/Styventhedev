
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==========================================
  // 1. ANNÉE AUTOMATIQUE
  // ==========================================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 2. TEXTE ANIMÉ
  // ==========================================

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

      typed.textContent = word.substring(0, charIndex);

      if (!deleting) {
        charIndex++;

        if (charIndex > word.length) {
          deleting = true;
          setTimeout(typeEffect, 1000);
          return;
        }
      } else {
        charIndex--;

        if (charIndex < 0) {
          charIndex = 0;
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(typeEffect, deleting ? 50 : 100);
    }

    typeEffect();
  }

  // ==========================================
  // 3. BOUTON RETOUR EN HAUT
  // ==========================================

  const topButton = document.querySelector(".top");

  if (topButton) {
    window.addEventListener("scroll", () => {
      topButton.classList.toggle("show", window.scrollY > 300);
    });

    topButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ==========================================
  // 4. CATÉGORIES DES PROJETS
  // ==========================================

  const projectCategories = {
    "AllInfo": ["web", "outil"],
    "PlombierTool": ["mobile"],
    "StyvenShop": ["web"],
    "STYVEN Glass": ["mobile"],
    "Cyber Toolkit": ["outil"],
    "RAVYX": ["discord"]
  };

  // ==========================================
  // 5. FILTRES DES PROJETS
  // ==========================================

  const filters = document.getElementById("filters");
  const cards = document.querySelectorAll(".grid .card");

  if (filters) {
    const buttons = filters.querySelectorAll("button");

    function applyFilter(filter) {
      buttons.forEach(button => {
        button.classList.toggle(
          "on",
          (button.dataset.f || "all").toLowerCase() === filter
        );
      });

      cards.forEach(card => {
        const title = card.querySelector("h3")
          ?.textContent.trim();

        const categories = projectCategories[title] || [];

        const show =
          filter === "all" || categories.includes(filter);

        card.hidden = !show;
        card.style.display = show ? "" : "none";
      });
    }

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = (button.dataset.f || "all").toLowerCase();
        applyFilter(filter);
      });
    });

    // Afficher tous les projets au chargement
    applyFilter("all");
  }

  // ==========================================
  // 6. INFORMATIONS DES PROJETS
  // ==========================================

  const projects = {
    "AllInfo": {
      category: "Web • Outils",
      description:
        "Un site qui centralise des informations et des ressources.",
      status: "Disponible",
      link: "https://styventhedev.github.io/Allinfo/"
    },

    "PlombierTool": {
      category: "Mobile",
      description:
        "Une application Android destinée aux apprentis et aux professionnels de la plomberie, avec un objectif de simplicité et de fonctionnement hors ligne.",
      status: "Projet en développement",
      link: ""
    },

    "StyvenShop": {
      category: "Web",
      description:
        "Un projet de boutique en ligne de l'univers Styventhedev.",
      status: "En développement",
      link: ""
    },

    "STYVEN Glass": {
      category: "Mobile • Launcher",
      description:
        "Un projet de launcher Android avec une interface personnalisée.",
      status: "En développement",
      link: ""
    },

    "Cyber Toolkit": {
      category: "Outils",
      description:
        "Un projet d'outils numériques avec une interface inspirée de l'univers cyberpunk.",
      status: "En développement",
      link: ""
    },

    "RAVYX": {
      category: "Discord",
      description:
        "Un bot Discord multifonction développé avec Bot Designer For Discord.",
      status: "En développement",
      link: ""
    }
  };

  // ==========================================
  // 7. FENÊTRE DE DÉTAILS
  // ==========================================

  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("mbody");

  function openModal(projectName) {
    if (!modal || !modalBody) return;

    const project = projects[projectName];

    if (!project) return;

    modalBody.replaceChildren();

    const title = document.createElement("h2");
    title.textContent = projectName;

    const category = document.createElement("p");
    category.textContent = "Catégorie : " + project.category;

    const description = document.createElement("p");
    description.textContent = project.description;

    const status = document.createElement("p");
    status.textContent = "Statut : " + project.status;

    modalBody.append(
      title,
      category,
      description,
      status
    );

    if (project.link) {
      const link = document.createElement("a");

      link.href = project.link;
      link.textContent = "Visiter le projet";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      modalBody.appendChild(link);
    }

    modal.hidden = false;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
  }

  // ==========================================
  // 8. CLIC SUR LES CARTES
  // ==========================================

  cards.forEach(card => {
    const title = card.querySelector("h3")
      ?.textContent.trim();

    if (!title) return;

    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("click", event => {
      // Ne pas bloquer les liens présents dans les cartes
      if (event.target.closest("a, button")) return;

      openModal(title);
    });

    card.addEventListener("keydown", event => {
      if (event.target !== card) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(title);
      }
    });
  });

  // ==========================================
  // 9. FERMETURE DE LA FENÊTRE
  // ==========================================

  if (modal) {
    modal
      .querySelectorAll(
        "[data-close], .close, .modal-close, .mx"
      )
      .forEach(button => {
        button.addEventListener("click", closeModal);
      });

    modal.addEventListener("click", event => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // ==========================================
  // 10. ANIMATION D'APPARITION DES CARTES
  // ==========================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible", "in");
          observer.unobserve(entry.target);
        }
      });
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible", "in");
    });
  }

});

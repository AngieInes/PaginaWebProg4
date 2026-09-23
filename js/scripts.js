// =========================================================
// MAD MEN — JavaScript
// Menú responsive + comportamiento básico del formulario
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      toggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Modificamos esto para que NO cierre el menú si haces clic en el dropdown de temporadas
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", (e) => {
        // Si el enlace pertenece al submenú de temporadas o es el botón principal del dropdown en mobile:
        if (window.innerWidth <= 820 && link.closest(".nav-dropdown")) {
          const dropdown = link.closest(".nav-dropdown");
          
          // Si hicieron clic en el botón principal ("Temporadas")
          if (link.classList.contains("season-nav-link")) {
            e.preventDefault(); // Evita que navegue o cierre el menú
            dropdown.classList.toggle("is-open"); // Abre o cierra el acordeón
            return;
          }
        }

        // Para el resto de los enlaces normales, el menú se cierra con normalidad
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  const form = document.querySelector("#contactForm");
  const message = document.querySelector("#formMessage");

  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      message.textContent = "Mensaje preparado. En una versión con backend, aquí se enviaría el formulario.";
      form.reset();
    });
  }
});


// =========================================================
// Fichas interactivas de personajes
// =========================================================
const characterData = {
  don: {
    name: "Don Draper",
    role: "Director creativo",
    eyebrow: "El protagonista",
    label: "Sterling Cooper · Director creativo",
    image: "img/don-draper.webp",
    alt: "Don Draper sentado en su oficina",
    initials: "DD",
    paragraphs: [
      "Don Draper es el protagonista central de <strong>Mad Men</strong>. Un hombre brillante, carismático y enigmático, cuya identidad y pasado tienen tanto peso como las campañas que crea.",
      "Como director creativo de Sterling Cooper, ocupa un lugar central en el mundo de la publicidad de Madison Avenue, mientras intenta mantener separadas su vida profesional, su familia y los secretos que lo acompañan."
    ],
    quote: "“La publicidad es, en esencia, una forma de persuadir.”"
  },
  peggy: {
    name: "Peggy Olson", 
    role: "Redactora publicitaria", 
    eyebrow: "Sterling Cooper", 
    label: "Sterling Cooper · Redactora publicitaria", 
    image: "img/peggy.jpg",
    initials: "PO",
    paragraphs: [
      "Peggy comienza su historia como secretaria y poco a poco encuentra su lugar dentro del departamento creativo.", 
      "Su recorrido muestra los cambios profesionales y sociales de la época, mientras desarrolla una voz propia como redactora."
    ], 
    quote: "“No puedes ser una mujer en esta oficina y esperar que nadie te subestime.”"
  },
  joan: {
    name: "Joan Holloway", 
    role: "Jefa de secretarias", 
    eyebrow: "Sterling Cooper", 
    label: "Sterling Cooper · Jefa de secretarias", 
    image: "img/joan.jpg",
    initials: "JH",
    paragraphs: [
      "Joan conoce cada rincón de la oficina y entiende las reglas sociales que mantienen funcionando a Sterling Cooper.", 
      "Su influencia va mucho más allá de su puesto: es una figura clave en las relaciones, decisiones y cambios que atraviesan la agencia."
    ], 
    quote: "“Hay una diferencia entre ser una mujer en una oficina y ser una mujer de negocios.”"
  },
  roger: {
    name: "Roger Sterling", 
    role: "Socio de la agencia", 
    eyebrow: "Sterling Cooper", 
    label: "Sterling Cooper · Socio",
    image: "img/roger.jpg", 
    initials: "RS",
    paragraphs: [
      "Roger es uno de los socios de la agencia y representa la tradición, el privilegio y el estilo de vida de Madison Avenue.", 
      "Carismático y mordaz, combina momentos de gran lucidez con una tendencia constante a buscar diversión y escapar de sus responsabilidades."
    ], 
    quote: "“Cuando Dios cierra una puerta, abre una botella.”"
  },
  pete: {
    name: "Pete Campbell", 
    role: "Ejecutivo de cuentas", 
    eyebrow: "Sterling Cooper", 
    label: "Sterling Cooper · Ejecutivo de cuentas", 
    image: "img/pete.jpg", 
    initials: "PC",
    paragraphs: [
      "Pete es un ejecutivo de cuentas ambicioso, competitivo y profundamente preocupado por su posición social.", 
      "Su evolución está marcada por la búsqueda de reconocimiento, poder y una identidad profesional propia dentro de la agencia."
    ], 
    quote: "“La gente quiere que le digan lo que quiere oír.”"
  },
  bert: {
    name: "Bertram “Bert” Cooper", 
    role: "Socio principal", 
    eyebrow: "Sterling Cooper", 
    label: "Sterling Cooper · Socio principal", 
    image: "img/bert.jpg", // <--- Añade esta línea con la ruta de tu imagen
    initials: "BC",
    paragraphs: [
      "Bert Cooper es uno de los fundadores y socios principales de Sterling Cooper.", 
      "Su mirada empresarial y su gusto por la cultura, el arte y la innovación aportan una perspectiva diferente al funcionamiento de la agencia."
    ], 
    quote: "“La tecnología es una herramienta. La gente es el verdadero negocio.”"
},
  ken: {
      name: "Ken Cosgrove", role: "Ejecutivo de cuentas", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Ejecutivo de cuentas", 
      image: "img/ken.jpg", 
      initials: "KC",
      paragraphs: ["Ken trabaja como ejecutivo de cuentas y desarrolla una faceta creativa inesperada fuera de la oficina.", "Su personaje conecta el mundo empresarial de la agencia con una sensibilidad literaria que mantiene en secreto durante buena parte de la serie."], quote: "“Hay más de una manera de tener una vida.”"
  },
  harry: {
      name: "Harry Crane", role: "Encargado de medios", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Medios", 
      image: "img/Harry.jpg", 
      initials: "HC",
      paragraphs: ["Harry comienza ocupándose de los medios y gana importancia a medida que la televisión transforma la publicidad.", "Su crecimiento profesional refleja cómo las nuevas tecnologías y formas de medición modifican el negocio publicitario."], quote: "“La televisión no es el futuro. Ya es el presente.”"
  },
  paul: {
      name: "Paul Kinsey", role: "Redactor publicitario", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Redactor", 
      image: "img/paul.jpg", 
      initials: "PK",
      paragraphs: ["Paul es redactor publicitario y compañero de Peggy durante las primeras temporadas.", "Intelectual y algo pretencioso, busca diferenciarse dentro de un ambiente creativo donde las ideas y la personalidad compiten constantemente."], quote: "“Una buena idea necesita una buena historia.”"
  },
  sal: {
      name: "Salvatore Romano", role: "Director de arte", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Director de arte", 
      image: "img/romano.jpg", 
      initials: "SR",
      paragraphs: ["Salvatore Romano dirige el área de arte durante las primeras temporadas y aporta una mirada visual muy cuidada a las campañas.", "Su historia personal y profesional muestra las tensiones entre la imagen pública y la vida privada en la sociedad de la época."], quote: "“Lo que vemos no siempre cuenta toda la historia.”"
  },
  betty: {
      name: "Betty Draper", role: "Ex esposa de Don", eyebrow: "Familia y vida personal", label: "Familia · Ex esposa",
      image: "img/betty.jpg",
      initials: "BD",
      paragraphs: ["Betty es la primera esposa de Don y madre de sus tres hijos, viviendo bajo la aparente perfección suburbana de los años 60.", "A lo largo de los años, su personaje evoluciona enfrentándose a las limitaciones de su rol tradicional y buscando su propia identidad."], quote: "“Hay cosas que una familia no dice en voz alta.”"
  },
  sally: {
      name: "Sally Draper", role: "Hija mayor", eyebrow: "Familia y vida personal", label: "Familia · Hija",
      image: "img/sally.jpg",
      initials: "SD",
      paragraphs: ["Sally crece a lo largo de la serie siendo testigo directo de las complejidades, infidelidades y contradicciones del mundo de los adultos.", "Su transición de niña a adolescente refleja los cambios culturales profundos de la época."], quote: "“Los niños siempre saben más de lo que los adultos creen.”"
  },
  bobby: {
      name: "Bobby Draper", role: "Hijo mediano", eyebrow: "Familia y vida personal", label: "Familia · Hijo mediano",
      image: "img/bobby.jpg",
      initials: "BD",
      paragraphs: ["Bobby es el hijo del medio de Don y Betty, presente en las dinámicas familiares tanto en la casa de Ossining como en etapas posteriores."], quote: "“A veces los adultos tienen problemas que los niños no pueden arreglar.”"
  },
  gene: {
      name: "Gene Draper", role: "Hijo menor", eyebrow: "Familia y vida personal", label: "Familia · Hijo menor",
      image: "img/gene.jpg",
      initials: "GD",
      paragraphs: ["Gene es el hijo menor de Don y Betty, nombrado en honor al padre de Betty, manteniendo vivo el vínculo familiar con el legado anterior."], quote: "“Una familia también está hecha de recuerdos.”"
  },
  megan: {
      name: "Megan Draper", role: "Segunda esposa", eyebrow: "Familia y vida personal", label: "Familia · Esposa",
      image: "img/Megan.jpg",
      initials: "MD",
      paragraphs: ["Megan comienza trabajando en la agencia y rápidamente se convierte en la segunda esposa de Don, introduciéndolo a una nueva energía creativa y moderna.", "Su carrera como actriz y su juventud marcan una etapa de fuerte contraste con el pasado de Don."], quote: "“Quiero una vida que sea realmente mía.”"
  },
};

function initCharacterSelector() {
  const feature = document.querySelector("#characterFeature");
  if (!feature) return;

  const cards = document.querySelectorAll("[data-character]");
  const image = document.querySelector("#featureImage");
  const placeholder = document.querySelector("#featurePlaceholder");
  const label = document.querySelector("#featureLabel");
  const eyebrow = document.querySelector("#featureEyebrow");
  const name = document.querySelector("#characterName");
  const role = document.querySelector("#characterRole");
  const description = document.querySelector("#characterDescription");
  const quote = document.querySelector("#characterQuote");
  const portrait = document.querySelector("#featureVisual");

  function selectCharacter(key, moveToFeature = true) {
    const character = characterData[key];
    if (!character) return;

    feature.classList.add("is-switching");

    window.setTimeout(() => {
      name.textContent = character.name;
      role.textContent = character.role;
      eyebrow.textContent = character.eyebrow;
      label.textContent = character.label;
      description.innerHTML = character.paragraphs.map(p => `<p>${p}</p>`).join("");
      quote.textContent = character.quote;

      if (character.image) {
        image.src = character.image;
        image.alt = character.alt || character.name;
        image.style.display = "block";
        placeholder.textContent = "";
        portrait.classList.remove("is-placeholder");
      } else {
        image.removeAttribute("src");
        image.alt = "";
        placeholder.textContent = character.initials;
        portrait.classList.add("is-placeholder");
      }

      cards.forEach(card => {
        const active = card.dataset.character === key;
        card.classList.toggle("is-active", active);
        card.setAttribute("aria-pressed", String(active));
      });

      feature.classList.remove("is-switching");

      if (moveToFeature && window.matchMedia("(max-width: 820px)").matches) {
        feature.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  }

  cards.forEach(card => {
    card.addEventListener("click", () => selectCharacter(card.dataset.character));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCharacter(card.dataset.character);
      }
    });
  });

  selectCharacter("don", false);
}

document.addEventListener("DOMContentLoaded", initCharacterSelector);


// =========================================================
// Lightbox interactivo con navegación
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const lightboxDownload = lightbox.querySelector(".lightbox-download");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  const galleryItems = document.querySelectorAll(".gallery-item");

  let currentIndex = 0;

  // Función para actualizar la imagen mostrada en el lightbox según su índice
  const updateLightboxContent = (index) => {
    const item = galleryItems[index];
    const fullSrc = item.getAttribute("data-full");
    const captionText = item.getAttribute("data-caption");

    lightboxImg.src = fullSrc;
    lightboxCaption.textContent = captionText;
    lightboxDownload.href = fullSrc;
    currentIndex = index;
  };

  // Abrir lightbox al hacer clic en una tarjeta específica
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      updateLightboxContent(index);
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Evita el scroll de la página de fondo
    });
  });

  // Funciones de navegación
  const showPrevImage = () => {
    const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent(newIndex);
  };

  const showNextImage = () => {
    const newIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxContent(newIndex);
  };

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrevImage();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNextImage();
  });

  // Función para cerrar el lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restaura el scroll
    setTimeout(() => {
      lightboxImg.src = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeLightbox);

  // Cerrar haciendo clic fuera del contenido
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navegación y cierre mediante el teclado (Escape y Flechas)
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    }
  });
});


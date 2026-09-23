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

    const seasonDropdown = nav.querySelector(".nav-dropdown");
    const seasonLink = nav.querySelector(".season-nav-link");

    if (seasonDropdown && seasonLink) {
      seasonLink.addEventListener("click", (event) => {
        if (!window.matchMedia("(max-width: 820px)").matches) return;

        const isOpen = seasonDropdown.classList.contains("is-open");

        if (!isOpen) {
          event.preventDefault();
          seasonDropdown.classList.add("is-open");
          seasonLink.setAttribute("aria-expanded", "true");
          return;
        }

        nav.classList.remove("open");
        seasonDropdown.classList.remove("is-open");
        seasonLink.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    }

    nav.querySelectorAll("a").forEach(link => {
      if (link === seasonLink) return;

      link.addEventListener("click", () => {
        nav.classList.remove("open");
        seasonDropdown?.classList.remove("is-open");
        seasonLink?.setAttribute("aria-expanded", "false");
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
    name: "Peggy Olson", role: "Redactora publicitaria", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Redactora publicitaria", initials: "PO",
    paragraphs: ["Peggy comienza su historia como secretaria y poco a poco encuentra su lugar dentro del departamento creativo.", "Su recorrido muestra los cambios profesionales y sociales de la época, mientras desarrolla una voz propia como redactora."], quote: "“No puedes ser una mujer en esta oficina y esperar que nadie te subestime.”"
  },
  joan: {
    name: "Joan Holloway", role: "Jefa de secretarias", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Jefa de secretarias", initials: "JH",
    paragraphs: ["Joan conoce cada rincón de la oficina y entiende las reglas sociales que mantienen funcionando a Sterling Cooper.", "Su influencia va mucho más allá de su puesto: es una figura clave en las relaciones, decisiones y cambios que atraviesan la agencia."], quote: "“Hay una diferencia entre ser una mujer en una oficina y ser una mujer de negocios.”"
  },
  roger: {
    name: "Roger Sterling", role: "Socio de la agencia", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Socio", initials: "RS",
    paragraphs: ["Roger es uno de los socios de la agencia y representa la tradición, el privilegio y el estilo de vida de Madison Avenue.", "Carismático y mordaz, combina momentos de gran lucidez con una tendencia constante a buscar diversión y escapar de sus responsabilidades."], quote: "“Cuando Dios cierra una puerta, abre una botella.”"
  },
  pete: {
    name: "Pete Campbell", role: "Ejecutivo de cuentas", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Ejecutivo de cuentas", initials: "PC",
    paragraphs: ["Pete es un ejecutivo de cuentas ambicioso, competitivo y profundamente preocupado por su posición social.", "Su evolución está marcada por la búsqueda de reconocimiento, poder y una identidad profesional propia dentro de la agencia."], quote: "“La gente quiere que le digan lo que quiere oír.”"
  },
  bert: {
    name: "Bertram “Bert” Cooper", role: "Socio principal", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Socio principal", initials: "BC",
    paragraphs: ["Bert Cooper es uno de los fundadores y socios principales de Sterling Cooper.", "Su mirada empresarial y su gusto por la cultura, el arte y la innovación aportan una perspectiva diferente al funcionamiento de la agencia."], quote: "“La tecnología es una herramienta. La gente es el verdadero negocio.”"
  },
  ken: {
    name: "Ken Cosgrove", role: "Ejecutivo de cuentas", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Ejecutivo de cuentas", initials: "KC",
    paragraphs: ["Ken trabaja como ejecutivo de cuentas y desarrolla una faceta creativa inesperada fuera de la oficina.", "Su personaje conecta el mundo empresarial de la agencia con una sensibilidad literaria que mantiene en secreto durante buena parte de la serie."], quote: "“Hay más de una manera de tener una vida.”"
  },
  harry: {
    name: "Harry Crane", role: "Encargado de medios", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Medios", initials: "HC",
    paragraphs: ["Harry comienza ocupándose de los medios y gana importancia a medida que la televisión transforma la publicidad.", "Su crecimiento profesional refleja cómo las nuevas tecnologías y formas de medición modifican el negocio publicitario."], quote: "“La televisión no es el futuro. Ya es el presente.”"
  },
  paul: {
    name: "Paul Kinsey", role: "Redactor publicitario", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Redactor", initials: "PK",
    paragraphs: ["Paul es redactor publicitario y compañero de Peggy durante las primeras temporadas.", "Intelectual y algo pretencioso, busca diferenciarse dentro de un ambiente creativo donde las ideas y la personalidad compiten constantemente."], quote: "“Una buena idea necesita una buena historia.”"
  },
  sal: {
    name: "Salvatore Romano", role: "Director de arte", eyebrow: "Sterling Cooper", label: "Sterling Cooper · Director de arte", initials: "SR",
    paragraphs: ["Salvatore Romano dirige el área de arte durante las primeras temporadas y aporta una mirada visual muy cuidada a las campañas.", "Su historia personal y profesional muestra las tensiones entre la imagen pública y la vida privada en la sociedad de la época."], quote: "“Lo que vemos no siempre cuenta toda la historia.”"
  },
  betty: {
    name: "Betty Draper", role: "Primera esposa de Don", eyebrow: "Familia Draper", label: "Familia Draper · Primera esposa", initials: "BD",
    paragraphs: ["Betty es la primera esposa de Don y madre de sus tres hijos.", "Su vida familiar permite observar el contraste entre la imagen idealizada de la familia estadounidense y las tensiones que existen detrás de esa apariencia."], quote: "“Hay cosas que una familia no dice en voz alta.”"
  },
  sally: {
    name: "Sally Draper", role: "Hija mayor de Don y Betty", eyebrow: "Familia Draper", label: "Familia Draper · Hija mayor", initials: "SD",
    paragraphs: ["Sally es la hija mayor de Don y Betty y uno de los personajes que más claramente atraviesa el cambio generacional.", "A medida que crece, comienza a cuestionar las normas y contradicciones del mundo adulto que la rodea."], quote: "“Los niños siempre saben más de lo que los adultos creen.”"
  },
  bobby: {
    name: "Bobby Draper", role: "Hijo de Don y Betty", eyebrow: "Familia Draper", label: "Familia Draper · Hijo", initials: "BD",
    paragraphs: ["Bobby es el segundo hijo de Don y Betty y crece en medio de los cambios familiares que atraviesan los Draper.", "Su presencia ayuda a mostrar la vida cotidiana de la familia y la infancia de los años sesenta."], quote: "“A veces los adultos tienen problemas que los niños no pueden arreglar.”"
  },
  gene: {
    name: "Gene Draper", role: "Hijo menor de Don y Betty", eyebrow: "Familia Draper", label: "Familia Draper · Hijo menor", initials: "GD",
    paragraphs: ["Gene es el hijo menor de Don y Betty y aparece durante una etapa de importantes cambios dentro de la familia.", "Aunque es pequeño, su presencia influye en algunas de las decisiones y emociones que atraviesan a los adultos de su entorno."], quote: "“Una familia también está hecha de recuerdos.”"
  },
  megan: {
    name: "Megan Draper", role: "Segunda esposa de Don", eyebrow: "Familia Draper", label: "Familia Draper · Segunda esposa", initials: "MD",
    paragraphs: ["Megan comienza trabajando como secretaria de Don y posteriormente se convierte en su segunda esposa.", "Su relación con Don coincide con una etapa de transformación personal y profesional, incluyendo su deseo de convertirse en actriz."], quote: "“Quiero una vida que sea realmente mía.”"
  }
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

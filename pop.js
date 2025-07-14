document.addEventListener('DOMContentLoaded', () => {
  // --- Animate progress bars when visible ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width') || '0%';
        bar.style.setProperty('--target-width', width);
        bar.style.animation = 'fillProgress 1.5s ease-out forwards';
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.progress-bar').forEach(bar => {
    observer.observe(bar);
  });

  setTimeout(() => {
    document.querySelectorAll("#tab-skills .progress-bar").forEach(bar => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width;
    });
  }, 100);

  // --- Cards toggle on mobile ---
  document.querySelectorAll('.work').forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) {
        card.classList.remove('active');
      } else {
        document.querySelectorAll('.work.active').forEach(activeCard => {
          activeCard.classList.remove('active');
        });
        card.classList.add('active');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.work')) {
      document.querySelectorAll('.work.active').forEach(activeCard => {
        activeCard.classList.remove('active');
      });
    }
  });

  // --- Accordion toggle ---
  const accordion = document.querySelector('.accordion-copyright');
  if (accordion) {
    accordion.addEventListener('click', () => {
      accordion.classList.toggle('active');
    });
  }

  // --- Modal agenda ---
  const btnAbrir = document.getElementById('abrirAgenda');
  const modal = document.getElementById('modalAgenda');
  const btnCerrar = document.getElementById('cerrarAgenda');

  if (btnAbrir && modal && btnCerrar) {
    btnAbrir.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('activo');
    });

    btnCerrar.addEventListener('click', () => {
      modal.classList.remove('activo');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('activo');
      }
    });
  }

  // --- Selector horarios ---
  const horariosBase = [
    { inicio: "10:00", label: "AM" },
    { inicio: "15:00", label: "PM" },
    { inicio: "17:30", label: "PM" }
  ];

  const selectHora = document.getElementById("hora");
  const selectBloque = document.getElementById("bloque");

  function agregarHoras(horaStr, duracion) {
    const [h, m] = horaStr.split(":").map(Number);
    const inicio = new Date();
    inicio.setHours(h, m, 0);
    const fin = new Date(inicio.getTime() + duracion * 60 * 60 * 1000);

    const limite = new Date();
    limite.setHours(20, 30, 0);
    if (fin > limite) return null;

    const finStr = fin.toTimeString().slice(0, 5);
    return `${horaStr} - ${finStr}`;
  }

  function actualizarOpcionesHorario() {
    if (!selectHora || !selectBloque) return;
    const duracion = parseInt(selectBloque.value, 10);
    selectHora.innerHTML = '<option value="" disabled selected>Selecciona un horario</option>';

    horariosBase.forEach(h => {
      const rango = agregarHoras(h.inicio, duracion);
      if (rango) {
        const option = document.createElement("option");
        option.value = h.inicio;
        option.textContent = `${rango} ${h.label}`;
        selectHora.appendChild(option);
      }
    });
  }

  if (selectBloque) {
    selectBloque.addEventListener('change', actualizarOpcionesHorario);
  }

  actualizarOpcionesHorario();

  // --- Animación placeholder en textarea ---
  const frasesInput = [
    "¿Consulta técnica o de repuesto?",
    "Ej: Necesito pastillas de freno para Mazda 3",
    "Dime qué auto tienes y qué buscas...",
    "Estamos para ayudarte 😉"
  ];

  let indexFrase = 0;
  let indexLetra = 0;
  const inputAnimado = document.querySelector('[data-animar="true"]');

  function escribirFrase() {
    if (!inputAnimado) return;

    if (indexLetra <= frasesInput[indexFrase].length) {
      inputAnimado.placeholder = frasesInput[indexFrase].substring(0, indexLetra);
      indexLetra++;
      setTimeout(escribirFrase, 50);
    } else {
      setTimeout(borrarFrase, 1000);
    }
  }

  function borrarFrase() {
    if (!inputAnimado) return;

    if (indexLetra >= 0) {
      inputAnimado.placeholder = frasesInput[indexFrase].substring(0, indexLetra);
      indexLetra--;
      setTimeout(borrarFrase, 30);
    } else {
      indexFrase = (indexFrase + 1) % frasesInput.length;
      setTimeout(escribirFrase, 300);
    }
  }

  escribirFrase();

  // --- Título rotativo ---
  const frases = [
    ["PORTAFOLIO", "DIGITAL"],
    ["PROGRAMADOR", "WEB"],
    ["ASESOR", "DE", "SERVICIOS", "AUTOMOTRICES"],
    ["INSTRUCTOR", "VIAL"]
  ];
  const colores = [
    ["blanco", "gris"],
    ["blanco", "gris"],
    ["blanco", "blanco", "blanco", "gris"],
    ["blanco", "gris"]
  ];

  const contenedor = document.getElementById("titulo-rotativo");
  let index = 0;

  function mostrarFrase() {
    const palabras = frases[index];
    const clases = colores[index];

    contenedor.innerHTML = palabras.map((palabra, i) => {
      return `<span class="${clases[i]}">${palabra}</span>`;
    }).join(" ");

    contenedor.style.animation = "none";
    void contenedor.offsetWidth;
    contenedor.style.animation = "slideUp 0.8s ease forwards";

    index = (index + 1) % frases.length;
  }

  if (contenedor) {
    mostrarFrase();
    setInterval(mostrarFrase, 4000);
  }

  // --- Mostrar / ocultar header móvil ---
  const mmHeader = document.querySelector('.mm-header');
  let lastScrollY = window.scrollY;
  let isScrolling;

  if (mmHeader) {
    mmHeader.classList.remove('show'); // Asegura que está oculto al cargar

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        mmHeader.classList.remove('show'); // bajando
      } else {
        mmHeader.classList.add('show'); // subiendo
      }

      lastScrollY = currentScrollY;

      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        mmHeader.classList.add('show'); // detenido
      }, 150);
    });
  }

  // --- Slider de imágenes en tarjetas ---
  const sliders = document.querySelectorAll('.card-img-slider');
  sliders.forEach(slider => {
    const images = slider.querySelectorAll('img');
    let current = 0;

    setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, 4000);
  });
});
const offcanvas = document.querySelector('#offcanvasWithBothOptions');
if (offcanvas) {
  offcanvas.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.getAttribute('href')?.startsWith('#')) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  });
}
// --- Submit del formulario (fuera del DOMContentLoaded por seguridad) ---
const formAgenda = document.getElementById('formAgenda');
if (formAgenda) {
  formAgenda.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(formAgenda);

    fetch('agenda.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        if (data.includes('✅')) {
          const modal = document.getElementById('modalAgenda');
          if (modal) modal.classList.remove('activo');
          formAgenda.reset();
        }
      })
      .catch(err => {
        alert('Error al enviar la solicitud.');
        console.error(err);
      });
  });
}
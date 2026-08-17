document.addEventListener('DOMContentLoaded', () => {

  // --- MENU FLOTANTE OFFCANVAS ---
  const menuButton = document.getElementById('menuButton');
  const offcanvasEl = document.getElementById('offcanvasWithBothOptions');
  if (menuButton && offcanvasEl) {
    offcanvasEl.addEventListener('show.bs.offcanvas', () => { menuButton.style.display = 'none'; });
    offcanvasEl.addEventListener('hidden.bs.offcanvas', () => { menuButton.style.display = 'block'; });
    offcanvasEl.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href')?.startsWith('#')) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (bsOffcanvas) bsOffcanvas.hide();
      }
    });
  }

  // --- TABS ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');

      if (btn.dataset.tab === 'skills') {
        document.querySelectorAll("#tab-skills .progress-bar").forEach(bar => {
          bar.style.width = bar.getAttribute("data-width");
        });
      }
    });
  });

  // --- PROGRESS BARS VISIBILITY ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.setProperty('--target-width', bar.getAttribute('data-width') || '0%');
        bar.style.animation = 'fillProgress 1.5s ease-out forwards';
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.progress-bar').forEach(bar => observer.observe(bar));

  // --- ROTACIÓN IMÁGENES PRIMERA TARJETA ---
  const firstCardSlider = document.querySelector('.slider-card:first-child .card-img-slider');
  if (firstCardSlider) {
    const imgs = firstCardSlider.querySelectorAll('img');
    let index = 0;

    function rotateImages() {
      imgs.forEach((img) => img.classList.remove('active'));
      imgs[index].classList.add('active');
      index = (index + 1) % imgs.length;
    }

    rotateImages(); // mostrar la primera imagen al cargar
    setInterval(rotateImages, 3000); // cambiar cada 3 segundos
  }

  // Copyright (mantiene + / -)
  document.querySelectorAll('.accordion-copyright').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');

      const content = btn.nextElementSibling;
      if (content) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      }

      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');
      }
    });
  });
  // Nuevo acordeón Condiciones del Servicio
  document.querySelectorAll('.accordion-condiciones-servicio').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');

      const content = btn.nextElementSibling;
      if (content) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      }

      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');
      }
    });
  });

  // Sobre Mi con animación suave
  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const content = btn.nextElementSibling;

      if (content) {
        if (btn.classList.contains('active')) {
          // Mostrar con transición suave
          content.style.display = 'block';
          const fullHeight = content.scrollHeight + 'px';
          content.style.maxHeight = '0';
          setTimeout(() => {
            content.style.transition = 'max-height 0.4s ease';
            content.style.maxHeight = fullHeight;
          }, 10);
        } else {
          // Ocultar con transición
          content.style.transition = 'max-height 0.4s ease';
          content.style.maxHeight = '0';
          setTimeout(() => {
            content.style.display = 'none';
          }, 400);
        }
      }

      // Cambiar texto Expandir / Retraer
      const label = btn.querySelector('.toggle-label');
      if (label) {
        label.textContent = btn.classList.contains('active') ? 'Retraer' : 'Expandir';
      }
    });
  });

  // --- ESPACIO PUBLICITARIO ---
  const publicidadBtn = document.getElementById('publicidadBtn');
  const publicidadCollapseEl = document.getElementById('publicidadCollapse');

  if (publicidadBtn && publicidadCollapseEl) {
    const bsCollapse = new bootstrap.Collapse(publicidadCollapseEl, { toggle: false });

    // Abrir al cargar
    bsCollapse.show();
    publicidadBtn.textContent = "Cerrar Publicidad";

    // Escuchar evento de colapso
    publicidadCollapseEl.addEventListener('shown.bs.collapse', () => {
      publicidadBtn.textContent = "Cerrar Publicidad";
    });

    publicidadCollapseEl.addEventListener('hidden.bs.collapse', () => {
      publicidadBtn.textContent = "Abrir Publicidad";
    });

    // Botón para alternar
    publicidadBtn.addEventListener('click', () => {
      if (publicidadCollapseEl.classList.contains('show')) {
        bsCollapse.hide();
      } else {
        bsCollapse.show();
      }
    });
  }
  // --- ESPACIO PUBLICITARIO MODERNO ---
  const segundoBtn = document.querySelector('#mm-espacio-publicidad button[data-bs-target="#contenidoPublicidad"]');
  const segundoCollapseEl = document.getElementById('contenidoPublicidad');

  if (segundoBtn && segundoCollapseEl) {
    // Actualizar texto al abrir
    segundoCollapseEl.addEventListener('shown.bs.collapse', () => {
      segundoBtn.textContent = "Cerrar Publicidad";
    });

    // Actualizar texto al cerrar
    segundoCollapseEl.addEventListener('hidden.bs.collapse', () => {
      segundoBtn.innerHTML = `<i class="fa-solid fa-gift" style="margin-right:6px;"></i>Descubre un beneficio exclusivo`;
    });

    // Inicializar texto según estado actual
    if (segundoCollapseEl.classList.contains('show')) {
      segundoBtn.textContent = "Cerrar Publicidad";
    } else {
      segundoBtn.innerHTML = `<i class="fa-solid fa-gift" style="margin-right:6px;"></i>Descubre un beneficio exclusivo`;
    }
  }
  // --- MODAL AGENDA ---
  const btnAbrir = document.getElementById('abrirAgenda');
  const modal = document.getElementById('modalAgenda');
  const btnCerrar = document.getElementById('cerrarAgenda');

  if (btnAbrir && modal && btnCerrar) {
    // Abrir modal
    btnAbrir.addEventListener('click', e => {
      e.preventDefault();
      modal.classList.add('activo');
      document.body.style.overflow = 'hidden'; // Bloquea scroll de fondo
    });

    // Cerrar modal con la X
    btnCerrar.addEventListener('click', () => {
      modal.classList.remove('activo');
      document.body.style.overflow = '';
    });

    // Cerrar modal al hacer click afuera
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('activo');
        document.body.style.overflow = '';
      }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('activo')) {
        modal.classList.remove('activo');
        document.body.style.overflow = '';
      }
    });
  }

  // --- SELECTOR HORARIOS (Modal Agenda) ---
  const horariosBase = [
    { inicio: "10:00", label: "AM" },
    { inicio: "15:00", label: "PM" },
    { inicio: "17:30", label: "PM" }
  ];

  const selectHora = document.getElementById("hora");
  const selectBloque = document.getElementById("bloque");

  // Calcula el rango de horario según duración
  function agregarHoras(horaStr, duracion) {
    const [h, m] = horaStr.split(":").map(Number);
    const inicio = new Date();
    inicio.setHours(h, m, 0);
    const fin = new Date(inicio.getTime() + duracion * 60 * 60 * 1000);
    const limite = new Date();
    limite.setHours(20, 30, 0);
    if (fin > limite) return null;
    return `${horaStr} - ${fin.toTimeString().slice(0, 5)}`;
  }

  // Actualiza opciones del select de horarios según duración del bloque
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

  // Escucha cambio en duración y actualiza horarios
  if (selectBloque) selectBloque.addEventListener('change', actualizarOpcionesHorario);

  // Inicializa opciones al cargar la página
  actualizarOpcionesHorario();

  // --- PLACEHOLDER ANIMADO ---
  const frasesInput = ["Escribe aquí tu mensaje", "Ej: Necesito pastillas de freno para Mazda 3", "Dime qué auto tienes y qué buscas...", "Estamos para ayudarte 😉", "¿Consulta técnica o de repuesto?"];
  let idxFrase = 0, idxLetra = 0;
  const inputAnimado = document.querySelector('[data-animar="true"]');
  function escribirFrase() {
    if (!inputAnimado) return;
    if (idxLetra <= frasesInput[idxFrase].length) {
      inputAnimado.placeholder = frasesInput[idxFrase].substring(0, idxLetra++);
      setTimeout(escribirFrase, 50);
    } else setTimeout(borrarFrase, 1000);
  }
  function borrarFrase() {
    if (!inputAnimado) return;
    if (idxLetra >= 0) {
      inputAnimado.placeholder = frasesInput[idxFrase].substring(0, idxLetra--);
      setTimeout(borrarFrase, 30);
    } else { idxFrase = (idxFrase + 1) % frasesInput.length; setTimeout(escribirFrase, 300); }
  }
  escribirFrase();

  // --- ROTADOR CURSOS ---
  const rotador = document.getElementById("rotadorCursos");
  if (rotador) {
    const frasesCursos = rotador.dataset.frases.split(",");
    let i = 0;
    function rotar() {
      rotador.style.opacity = 0;
      setTimeout(() => { rotador.textContent = frasesCursos[i]; rotador.style.opacity = 1; i = (i + 1) % frasesCursos.length; }, 300);
    }
    rotar();
    setInterval(rotar, 3000);
  }
  // --- Título rotativo ---
  const frases = [
    ["SERVICIOS", "AUTOMOTRICES"],
    ["ENTRENAMIENTO", "VIAL"],
    ["AULA", "VIRTUAL"],
    ["MANTENCIÓN", "PREVENTIVA"]
  ];
  const colores = [
    ["blanco", "gris"],
    ["blanco", "gris"],
    ["blanco", "gris"],
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
    setInterval(mostrarFrase, 2000);
  }
  document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(btn => {
    const target = document.querySelector(btn.getAttribute('data-bs-target'));
    const icon = btn.querySelector('i');

    if (!target || !icon) return;

    target.addEventListener('show.bs.collapse', () => {
      icon.style.transform = 'rotate(180deg)';
    });

    target.addEventListener('hide.bs.collapse', () => {
      icon.style.transform = 'rotate(0deg)';
    });
  });

  // --- BOTON GO TOP ---
  const goTop = document.getElementById('goTop');
  if (goTop) goTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // --- ACTUALIZAR LOGO SEGÚN SECCIÓN ---
  function actualizarLogoPorSeccion() {
    const btnImg = document.querySelector("#menuButton img");
    const btn = document.getElementById("menuButton");
    const sections = document.querySelectorAll("[data-bg]");
    if (!btnImg || !btn || sections.length === 0) return;
    const btnY = btn.getBoundingClientRect().top + btn.getBoundingClientRect().height / 2;
    let logo = "img/logopng.png";
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (btnY >= rect.top && btnY <= rect.bottom) {
        logo = sec.dataset.bg === "dark" ? "img/logopngwhite.png" : "img/logopng.png";
      }
    });
    btnImg.src = logo;
  }
  window.addEventListener('scroll', actualizarLogoPorSeccion);
  window.addEventListener('resize', actualizarLogoPorSeccion);
  actualizarLogoPorSeccion();
  const tooltipEl = document.getElementById("tooltipText");
  if (tooltipEl) {
    const textosTooltip = [
      'Presiona aquí <i class="fa-solid fa-arrow-right ms-2"></i>',
      'Abrir panel del conductor <i class="fa-solid fa-arrow-right ms-2"></i>',
      'Deslizar página <i class="fa-solid fa-arrow-down ms-2"></i>'
    ];

    let i = 0;
    let faseInicial = true;
    let rotarInterval;
    let scrollTimeout;

    // Mostrar tooltip con fade
    function mostrarTooltip() {
      tooltipEl.innerHTML = textosTooltip[i];
      tooltipEl.classList.add("show");

      setTimeout(() => {
        tooltipEl.classList.remove("show");
      }, 3000);

      i = (i + 1) % textosTooltip.length;
    }

    // Rotación rápida inicial
    function iniciarRotacion(velocidad = 2000) {
      mostrarTooltip(); // mostrar inmediatamente
      rotarInterval = setInterval(mostrarTooltip, velocidad);
    }

    function detenerRotacion() {
      clearInterval(rotarInterval);
    }

    // Fase lenta tras interacción
    function iniciarFaseLenta() {
      mostrarTooltip(); // mostrar primero inmediatamente
      rotarInterval = setInterval(mostrarTooltip, 8000); // 8s entre textos
    }

    // Detectar interacción y pasar a fase lenta
    function pasarAFaseLenta() {
      if (!faseInicial) return;
      faseInicial = false;
      detenerRotacion();
      tooltipEl.classList.remove("show");

      // Retardo antes de iniciar fase lenta
      setTimeout(() => {
        iniciarFaseLenta();
      }, 6000); // espera 6s tras scroll antes de mostrar tooltip lento
    }

    // --- Inicio ---
    iniciarRotacion(2000); // rápida y dinámica al cargar

    // Detectar scroll
    window.addEventListener('scroll', () => {
      tooltipEl.classList.remove("show");
      pasarAFaseLenta();
    });

    // Detectar click en botón de menú
    const menuButton = document.getElementById("menuButton");
    if (menuButton) {
      menuButton.addEventListener('click', () => {
        pasarAFaseLenta();
      });
    }
  }

  // Rotacion botones slider card
  (function () {
    const botones = document.querySelectorAll('.slider-card .btn-slide-pill');
    botones.forEach(btn => {
      let raw = btn.dataset.rotate || btn.textContent || '';
      const sep = raw.includes('|') ? '|' : '/';
      let textos = raw.split(sep).map(s => s.trim()).filter(Boolean);
      if (textos.length <= 1) { btn.textContent = (textos[0] || raw).trim(); return; }

      const intervalMs = parseInt(btn.dataset.interval, 10) || 2000;

      const spanTemp = document.createElement('span');
      spanTemp.style.visibility = 'hidden';
      spanTemp.style.position = 'absolute';
      spanTemp.style.whiteSpace = 'nowrap';
      document.body.appendChild(spanTemp);
      let maxWidth = 0;
      textos.forEach(t => { spanTemp.textContent = t; maxWidth = Math.max(maxWidth, spanTemp.offsetWidth); });
      document.body.removeChild(spanTemp);
      btn.style.width = (maxWidth + 60) + "px";

      btn.innerHTML = '';
      const first = document.createElement('div');
      first.className = 'rotator enter';
      first.textContent = textos[0];
      btn.appendChild(first);

      let idx = 1, animating = false;

      function rotateOnce() {
        if (animating) return;
        animating = true;
        const current = btn.querySelector('.rotator');
        const next = document.createElement('div');
        next.className = 'rotator';
        next.textContent = textos[idx];
        btn.appendChild(next);
        next.getBoundingClientRect();
        next.classList.add('enter');
        setTimeout(() => { current.classList.add('exit'); }, 50);
        current.addEventListener('transitionend', (e) => {
          if (e.propertyName !== 'transform') return;
          if (current.parentNode) current.parentNode.removeChild(current);
          animating = false;
        });
        idx = (idx + 1) % textos.length;
      }

      setTimeout(() => { rotateOnce(); setInterval(rotateOnce, intervalMs); }, 300);
    });
  })();


  const socialItems = document.querySelectorAll('.social-item');

  // --- SECUENCIA ENCENDIDO / APAGADO ---
  let secuenciaEncendida = true;
  const encendidoTiempo = 5000; // 5s cada fase
  const pausaEntreIconos = 800; // retraso entre encender/apagar icono

  function secuenciaSocialIcons() {
    if (!socialItems.length) return;

    if (secuenciaEncendida) {
      // Encender uno por uno
      socialItems.forEach((item, idx) => {
        setTimeout(() => {
          const iconI = item.querySelector('i');
          iconI.style.color = item.dataset.color || '#fff';
        }, idx * pausaEntreIconos);
      });
    } else {
      // Apagar uno por uno
      socialItems.forEach((item, idx) => {
        setTimeout(() => {
          const iconI = item.querySelector('i');
          iconI.style.color = '#fff';
        }, idx * pausaEntreIconos);
      });
    }

    setTimeout(() => {
      secuenciaEncendida = !secuenciaEncendida;
      secuenciaSocialIcons();
    }, encendidoTiempo + socialItems.length * pausaEntreIconos);
  }

  // Iniciar secuencia
  secuenciaSocialIcons();

  // --- TEXTO ROTATIVO ---
  const contactos = [
    { selector: '.instagram', textos: ['Abrir Instagram', '@memanejomanejando.cl'] },
    { selector: '.linkedin', textos: ['Abrir LinkedIn', 'Programador Web'] },
    { selector: '.mail', textos: ['Enviar correo', 'Abrir App mail'] },
    { selector: '.whatsapp', textos: ['Abrir WhatsApp', 'Enviar mensaje'] }
  ];

  contactos.forEach(c => {
    const icon = document.querySelector(c.selector);
    if (!icon) return;

    // Crear contenedor de texto si no existe
    let textoSpan = icon.parentNode.querySelector('.social-text');
    if (!textoSpan) {
      textoSpan = document.createElement('span');
      textoSpan.className = 'social-text';
      textoSpan.style.marginLeft = '8px';
      textoSpan.style.color = '#fff';
      textoSpan.style.fontSize = '0.85rem';
      icon.parentNode.style.display = 'flex';
      icon.parentNode.style.alignItems = 'center';
      icon.parentNode.appendChild(textoSpan);
    }

    let textoIndex = 0;
    function rotarTexto() {
      textoSpan.textContent = c.textos[textoIndex];
      textoIndex = (textoIndex + 1) % c.textos.length;
    }

    rotarTexto();
    setInterval(rotarTexto, 3000); // rota cada 4s
  });
// ===== Kit por Vehículo =====
{
  const catalogo = {
    Suzuki:   { Swift:  {2025:36900, 2024:35900, 2023:34900, 2022:33900, 2021:32900} },
    Chevrolet:{ Sail:   {2025:38900, 2024:37900, 2023:36900, 2022:35900, 2021:34900} },
    Hyundai:  { Accent: {2025:41900, 2024:40900, 2023:39900, 2022:38900, 2021:37900} },
    Toyota:   { Yaris:  {2025:42900, 2024:41900, 2023:40900, 2022:39900, 2021:38900} },
    Nissan:   { Versa:  {2025:40900, 2024:39900, 2023:38900, 2022:37900, 2021:36900} }
  };

  const marcaSelect  = document.getElementById("kitMarca");
  const modeloSelect = document.getElementById("kitModelo");
  const anioSelect   = document.getElementById("kitAnio");
  const calcularBtn  = document.getElementById("kitBtn");
  const resultado    = document.getElementById("kitResult");
  const autoLabel    = document.getElementById("kitAutoLabel");
  const precioEl     = document.getElementById("kitPrice");

  if (marcaSelect) {
    function crearOpciones(select, opciones){
      select.innerHTML = "";
      opciones.forEach(op=>{
        const o = document.createElement("option");
        o.value = op; o.textContent = op;
        select.appendChild(o);
      });
    }
    function cargarModelos(){
      const modelos = Object.keys(catalogo[marcaSelect.value]);
      crearOpciones(modeloSelect, modelos);
      cargarAnios();
    }
    function cargarAnios(){
      const anios = Object.keys(catalogo[marcaSelect.value][modeloSelect.value]).sort((a,b)=>b-a);
      crearOpciones(anioSelect, anios);
    }
    function formatoPrecio(p){
      return new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(p);
    }
    function calcularKit(){
      const marca = marcaSelect.value, modelo = modeloSelect.value, anio = anioSelect.value;
      const precio = catalogo[marca][modelo][anio];
      autoLabel.textContent = `${marca} ${modelo} ${anio}`;
      precioEl.textContent = formatoPrecio(precio);
      resultado.classList.remove("is-visible");
      requestAnimationFrame(()=> resultado.classList.add("is-visible"));
    }

    crearOpciones(marcaSelect, Object.keys(catalogo));
    cargarModelos();

    marcaSelect.addEventListener("change", cargarModelos);
    modeloSelect.addEventListener("change", cargarAnios);
    calcularBtn.addEventListener("click", calcularKit);
    calcularKit();
  }
}
// ===== off canvas =====
const WHATS_NUMBER = "56946914558";
const DEMO_EMAIL = "memanejo@memanejo.cl";
const DEMO_PASS  = "memanejo";

const overlay   = document.getElementById('driverOverlay');
const btn       = document.getElementById('menuButton');
const closeBtn  = document.getElementById('driverClose');
const loginView = document.getElementById('dv-login');
const dashView  = document.getElementById('dv-dash');
const form      = document.getElementById('dvForm');
const errorBox  = document.getElementById('dvError');
const logoutBtn = document.getElementById('dvLogout');

function openSheet(){ overlay.classList.add('open'); document.body.style.overflow='hidden'; }
function closeSheet(){ overlay.classList.remove('open'); document.body.style.overflow=''; }

btn.addEventListener('click', openSheet);
closeBtn.addEventListener('click', closeSheet);
overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeSheet(); });

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('dvEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('dvPass').value;
  if(email === DEMO_EMAIL && pass === DEMO_PASS){
    errorBox.classList.remove('show');
    loginView.style.display = 'none';
    dashView.classList.add('show');
  } else {
    errorBox.classList.add('show');
  }
});

logoutBtn.addEventListener('click', ()=>{
  dashView.classList.remove('show');
  loginView.style.display = 'block';
  form.reset();
  errorBox.classList.remove('show');
});

document.getElementById('dvAgendar').addEventListener('click', ()=>{
  closeSheet();
});

  // ===== Slider Mobile QA =====
  const slider = document.getElementById("sliderMobileQA");
  if (slider) {
    const dots = document.querySelectorAll("#sliderMobileQA-wrapper .dot");

    // Actualiza dots al hacer scroll
    slider.addEventListener("scroll", () => {
      const slideWidth = slider.offsetWidth;
      const index = Math.round(slider.scrollLeft / slideWidth);
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    });

    // Click en dots para moverse
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        slider.scrollTo({
          left: slider.offsetWidth * i,
          behavior: "smooth"
        });
      });
    });
  }
  const brandSlider = document.getElementById("brandSlider");
  const brandSlides = Array.from(brandSlider.querySelectorAll(".brand-slide"));
  const brandDotsContainer = document.getElementById("brandSliderDots");

  // Crear dots
  brandSlides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => scrollToSlide(index));
    brandDotsContainer.appendChild(dot);
  });

  // Función para mover slider a un slide específico
  function scrollToSlide(index) {
    const slide = brandSlides[index];
    brandSlider.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth"
    });
    updateActiveDot(index);
  }

  // Actualizar dot activo
  function updateActiveDot(activeIndex) {
    const dots = brandDotsContainer.querySelectorAll(".dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === activeIndex));
  }

  // Detectar slide más cercano al centro del viewport del slider
  function updateDotOnScroll() {
    const sliderCenter = brandSlider.scrollLeft + brandSlider.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    brandSlides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(sliderCenter - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    updateActiveDot(closestIndex);
  }

  // Escuchar scroll del slider
  brandSlider.addEventListener("scroll", () => {
    requestAnimationFrame(updateDotOnScroll);
  });

  // Inicializar primer dot activo
  updateActiveDot(0);
  // Valor máximo de visitas reales
  const maxVisitas = 359;
  const minVisitas = 18;

  // Genera un número aleatorio dentro del rango
  function visitasAleatorias() {
    return Math.floor(Math.random() * (maxVisitas - minVisitas + 1)) + minVisitas;
  }

  // Inserta el valor en el HTML
  document.getElementById("visitas").textContent = visitasAleatorias();

  // Opcional: refresca cada 10 segundos para simular movimiento
  setInterval(() => {
    document.getElementById("visitas").textContent = visitasAleatorias();
  }, 10000);
});

// Fin DOMContentLoaded  
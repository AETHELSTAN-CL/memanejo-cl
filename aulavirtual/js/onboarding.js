// =====================
// ELEMENTOS GLOBALES
// =====================
window.currentStudent = null;
window.testUsers = window.testUsers || [];
const videosNormales = document.getElementById('videos');
const pillNav = document.getElementById('pillNav');

const onboardVideoBg = document.querySelector('.onboard-video-bg');
const onboardDim = document.querySelector('.onboard-dim-overlay');
const onboardContent = document.querySelector('.onboard-content');
const loginCardGlass = document.querySelector('.login-card-glass');
const btnContinuar = document.getElementById('btnContinuar');
const studentMenu = document.querySelector('.student-menu');
const reviewForm = document.getElementById('reviewForm');
const reviewResult = document.getElementById('reviewResult');
const submittedEmail = document.getElementById('submittedEmail');
const submittedText = document.getElementById('submittedText');
const anonCheck = document.getElementById('reviewAnon');
const nameGroup = document.getElementById('nameGroup');
const emailGroup = document.getElementById('emailGroup');

function getIconItems() {
  return Array.from(document.querySelectorAll('.icon-item'));
}

// =====================
// CONTROL MENÚ ESTUDIANTE (solo UI)
// =====================
function openStudentMenu() {
  studentMenu?.classList.add('show');
}

function closeStudentMenu() {
  studentMenu?.classList.remove('show');
}

// =====================
// ESTADO ONBOARDING
// =====================
let selectedRole = null;
let originalCardHTML = null;
let cardHeaderHTML = '';   // logo + Aula Virtual + burbuja (sale del HTML)
let cardFooterHTML = '';   // marca + bandera (sale del HTML)

// Escapa texto del usuario antes de ponerlo dentro de un innerHTML
function escapeHTML(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// Dibuja una pantalla dentro de la card con el mismo encabezado y footer
function renderCard(contenidoHTML) {
  loginCardGlass.innerHTML = cardHeaderHTML + contenidoHTML + cardFooterHTML;
}

// =====================
// INIT ONBOARDING
// =====================
function initOnboarding() {
  // BYPASS DE DESARROLLO
  if (localStorage.getItem('skipOnboarding') === 'true') {
    cerrarOnboarding();
    return;
  }

  if (!loginCardGlass || !btnContinuar) return;

  originalCardHTML = loginCardGlass.innerHTML;
  cardHeaderHTML = loginCardGlass.querySelector('.title-wrapper')?.outerHTML || '';
  cardFooterHTML = loginCardGlass.querySelector('.card-brand-footer')?.outerHTML || '';
  document.body.classList.add('onboarding-activo');

  bindOnboardingEvents();
}

// =====================
// SELECCIÓN DE ROL
// =====================
function bindOnboardingEvents() {
  getIconItems().forEach(icon => {
    icon.onclick = () => {
      selectedRole = icon.dataset.role;
      markSelected(icon);
    };

    // Teclado: Enter o Espacio seleccionan la opción
    icon.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        icon.click();
      }
    };
  });

  const btn = document.getElementById('btnContinuar');
  if (btn) btn.onclick = ejecutarContinuar;
}

function markSelected(iconEl) {
  getIconItems().forEach(it => {
    it.classList.remove('selected');
    it.setAttribute('aria-checked', 'false');
    it.querySelector('.pill')?.classList.remove('selected');
  });

  iconEl.classList.add('selected');
  iconEl.setAttribute('aria-checked', 'true');
  iconEl.querySelector('.pill')?.classList.add('selected');
}

function restoreOnboarding() {
  loginCardGlass.innerHTML = originalCardHTML;
  selectedRole = null;
  bindOnboardingEvents();
}

// =====================
// SALIR DEL ONBOARDING (usado por todos los flujos que terminan)
// =====================
function cerrarOnboarding() {
  document.body.classList.remove('onboarding-activo');
  onboardVideoBg?.style.setProperty('display', 'none');
  onboardDim?.style.setProperty('display', 'none');
  onboardContent?.style.setProperty('display', 'none');
}

// =====================
// FLUJO: VISITANTE
// =====================
function entrarComoVisitante() {
  cerrarOnboarding();
  pillNav?.style.setProperty('display', 'flex');

  if (videosNormales) {
    videosNormales.style.display = 'flex';
    videosNormales.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const video = videosNormales.querySelector('video');
    video && (video.muted = true);
    video?.play().catch(() => { });
  }
}

// =====================
// PRIMER ACCESO (Quiz) / SOLICITAR memanejo ID
// =====================
function mostrarPortalAlumno(modo = 'quiz') {
  const solicitarId = modo === 'solicitar-id';

  const titulo = solicitarId
    ? 'Solicita tu memanejo ID'
    : '¡Nos encanta conocerte!';

  const texto = solicitarId
    ? 'Completa tus datos y te enviaremos tu <strong>memanejo ID</strong> al correo electrónico.'
    : 'Completa tus datos y haz nuestro <strong>Quiz de Nivelación gratis</strong> y conoce qué tan preparado estás para tu examen de conducción.';

  const textoBoton = solicitarId
    ? 'Solicitar memanejo ID'
    : 'Comenzar Quiz de Nivelación';

  const textoLegal = solicitarId
    ? 'Usaremos tus datos para identificarte como estudiante y enviar tu <strong>memanejo ID</strong> al correo electrónico. No compartimos tus datos con terceros.'
    : 'Usaremos tus datos para registrar y enviar información relacionada con tu resultado. No compartimos tus datos con terceros.';

  renderCard(`
    <div class="card-plus">

      <div class="card-subblock portal-intro">
        <h2 class="card-title card-plus-title">${titulo}</h2>
        <p class="card-text card-plus-text">${texto}</p>
      </div>

      <form class="portal-form" id="portalForm" novalidate>

        <div class="portal-row">
          <div class="card-field">
            <input type="text" id="portalNombre" class="card-input"
              placeholder="Nombre" aria-label="Nombre"
              autocomplete="given-name" required>
            <span class="card-error" id="errorNombre"></span>
          </div>

          <div class="card-field">
            <input type="text" id="portalApellido" class="card-input"
              placeholder="Apellido" aria-label="Apellido"
              autocomplete="family-name" required>
            <span class="card-error" id="errorApellido"></span>
          </div>
        </div>

        <div class="card-field">
          <input type="email" id="portalEmail" class="card-input"
            placeholder="Correo electrónico" aria-label="Correo electrónico"
            autocomplete="email" required>
          <span class="card-error" id="errorEmail"></span>
        </div>

        <button type="submit" id="portalIngresar" class="card-btn">
          <strong>${textoBoton}</strong>
        </button>

        <div class="card-sub-text">${textoLegal}</div>

        <button type="button" id="portalVolver" class="card-back">
          <i class="fas fa-chevron-left" aria-hidden="true"></i> Volver
        </button>

      </form>

    </div>
  `);

  document.getElementById('portalForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputNombre = document.getElementById('portalNombre');
    const inputApellido = document.getElementById('portalApellido');
    const inputEmail = document.getElementById('portalEmail');

    const nombre = inputNombre?.value.trim();
    const apellido = inputApellido?.value.trim();
    const email = inputEmail?.value.trim();

    const errorNombre = document.getElementById('errorNombre');
    const errorApellido = document.getElementById('errorApellido');
    const errorEmail = document.getElementById('errorEmail');

    // Limpiar errores anteriores
    errorNombre.textContent = '';
    errorApellido.textContent = '';
    errorEmail.textContent = '';

    inputNombre?.classList.remove('input-error');
    inputApellido?.classList.remove('input-error');
    inputEmail?.classList.remove('input-error');

    let valido = true;

    if (!nombre) {
      errorNombre.textContent = 'Ingresa tu nombre.';
      inputNombre?.classList.add('input-error');
      valido = false;
    }

    if (!apellido) {
      errorApellido.textContent = 'Ingresa tu apellido.';
      inputApellido?.classList.add('input-error');
      valido = false;
    }

    if (!email) {
      errorEmail.textContent = 'Ingresa tu correo electrónico.';
      inputEmail?.classList.add('input-error');
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorEmail.textContent = 'Ingresa un correo válido.';
      inputEmail?.classList.add('input-error');
      valido = false;
    }

    if (!valido) {
      return;
    }

    // =========================
    // RAMA 1: PRIMER ACCESO → va directo al Quiz de Nivelación
    // =========================
    if (modo !== 'solicitar-id') {
      localStorage.setItem('nombre', `${nombre} ${apellido}`.trim());
      localStorage.setItem('correo', email);
      localStorage.setItem('telefono', 'sin_telefono');
      localStorage.setItem('memanejo_desde_onboarding', 'true');

      window.location.href = '/paginas/quiz/quiz-nivelacion/';
      return;
    }

    // =========================
    // RAMA 2: SOLICITAR MEMANEJO ID (flujo completo, sin cambios)
    // =========================
    const memanejoId = generarMemanejoId(nombre, apellido);

    const nuevoUsuario = {
      memanejoId,
      nombre: `${nombre} ${apellido || ""}`.trim(),
      email,
      desbloqueado: {
        quiz180: false,
        quiz500: false,
        quiz800: false,
        clasesEnVivo: false,
        resumenes: false,
        full: false
      },
      referidoPor: null,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };

    const registrados = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
    registrados.push(nuevoUsuario);
    localStorage.setItem('usuariosRegistrados', JSON.stringify(registrados));

    setSession({
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      memanejoId: nuevoUsuario.memanejoId,
      desbloqueado: nuevoUsuario.desbloqueado
    });

    // Envía correo bienvenida
    enviarMemanejoIdPorCorreo(
      nuevoUsuario.nombre,
      email,
      memanejoId
    );

    mostrarBienvenida(email);
  });

  document.getElementById('portalVolver')?.addEventListener('click', restoreOnboarding);
}

// =====================
// BIENVENIDA (después de solicitar el ID)
// =====================
function mostrarBienvenida(correoAcceso) {
  renderCard(`
    <div class="card-plus">

      <div class="welcome-mark" aria-hidden="true">
        <i class="fas fa-check"></i>
      </div>

      <h2 class="card-title card-plus-title">¡Bienvenido a memanejo!</h2>

      <p class="card-text card-plus-text">
        Tu acceso fue creado correctamente. Enviamos tu <strong>memanejo ID</strong> a:
        <br><strong>${escapeHTML(correoAcceso)}</strong>
      </p>

      <p class="card-sub-text">
        Guarda este código para ingresar a la plataforma. Estamos en fase de pruebas operativas.
        Entréganos tu feedback y recibe beneficios. Gracias por tu apoyo.
      </p>

      <button id="btnEntrarPlataforma" class="card-btn card-btn-wide">
        Ingresar
      </button>

    </div>
  `);

  document.getElementById('btnEntrarPlataforma')?.addEventListener('click', () => {
    cerrarOnboarding();
    const pillStudent = document.querySelector('.pill-student');
    pillStudent?.classList.add('visible');
    requestAnimationFrame(() => {
      openStudentMenu();
    });
  });
}

/* ===== Generador de memanejo ID =====
function generarMemanejoId(nombre, apellido) {
  const inicialNombre = nombre.charAt(0).toUpperCase();
  const inicialApellido = apellido.charAt(0).toUpperCase();
  const numero = Math.floor(1000 + Math.random() * 9000); // 4 dígitos
  return `MM${inicialNombre}${inicialApellido}${numero}`;
} */
function generarMemanejoId() {
  return "2026";
}

function enviarMemanejoIdPorCorreo(nombre, email, memanejoId) {
  emailjs.send("service_ujyq6hg", "template_s6jxj1h", {
    nombre: nombre,
    correo: email,
    memanejo_id: memanejoId
  }).then(() => {
    console.log("memanejo ID enviado correctamente");
  }).catch(err => {
    console.error("Error enviando memanejo ID:", err);
  });
}

// =====================
// LOGIN MEMANEJO +
// =====================
function mostrarNuevoEstudiante() {

  renderCard(`
    <div class="card-plus">

      <div class="card-subblock portal-intro">
        <h2 class="card-title card-title-visitante">memanejo+</h2>
        <p class="card-text">
          Ingresa a tu cuenta estudiante con tu correo y tu <strong>memanejo ID</strong>.
        </p>
      </div>

      <form class="portal-form" id="loginForm" novalidate>

        <div class="card-field">
          <input type="email" id="loginEmail" class="card-input"
            placeholder="Correo electrónico" aria-label="Correo electrónico"
            autocomplete="email" required>
        </div>

        <div class="card-field">
          <input type="text" id="loginId" class="card-input"
            placeholder="memanejo ID: 2026" aria-label="memanejo ID"
            autocomplete="off" required>
        </div>

        <button type="submit" id="loginIngresar" class="card-btn">
          <strong>Ingresar</strong>
        </button>

        <div class="card-sub-text">
          ¿No tienes tu memanejo ID?
          <a href="#" id="solicitarMemanejoId">Solicítalo aquí.</a>
        </div>

        <button type="button" id="loginVolver" class="card-back">
          <i class="fas fa-chevron-left" aria-hidden="true"></i> Volver
        </button>

      </form>

    </div>
  `);

  document.getElementById('solicitarMemanejoId')?.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarPortalAlumno('solicitar-id');
  });

  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail')?.value.trim();
    const id = document.getElementById('loginId')?.value.trim();

    if (!email || !id) {
      showError("Completa todos los campos");
      return;
    }

    // carga JSON si aún no existe
    if (usuariosDB.length === 0) {
      await cargarUsuarios();
    }

    const usuariosLocal = JSON.parse(
      localStorage.getItem('usuariosRegistrados') || '[]'
    );

    const todosLosUsuarios = [
      ...usuariosDB,
      ...usuariosLocal
    ];

    const usuario = todosLosUsuarios.find(
      u =>
        u.email === email &&
        String(u.memanejoId) === String(id)
    );

    if (!usuario) {
      showError("Correo o código incorrecto");
      return;
    }

    setSession({
      nombre: usuario.nombre,
      email: usuario.email,
      memanejoId: usuario.memanejoId,
      desbloqueado: usuario.desbloqueado || {}
    });

    cerrarOnboarding();

    const pillStudent = document.querySelector('.pill-student');
    pillStudent?.classList.add('visible');

    requestAnimationFrame(() => {
      openStudentMenu();
    });
  });

  document.getElementById('loginVolver')?.addEventListener('click', restoreOnboarding);
}

reviewForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const anon = reviewAnonRadio.checked;
  const email = document.getElementById('reviewEmail').value.trim();
  const name = document.getElementById('reviewName').value.trim();
  const text = document.getElementById('reviewText').value.trim();

  if (!text) {
    alert("Escribe tu comentario antes de enviar.");
    return;
  }
  if (!anon && !email) {
    alert("Ingresa tu correo o marca 'Enviar como anónimo'.");
    return;
  }

  const finalName = anon ? "Anónimo" : (name || email);
  const finalEmail = anon ? "sin correo (anónimo)" : email;

  emailjs.send("service_ujyq6hg", "template_o43bfnj", {
    nombre: finalName,
    correo: finalEmail,
    telefono: "No aplica",
    puntaje: "-",
    total: "-",
    porcentaje: "-",
    estado: "Mensaje de Soporte",
    correctas: "-",
    erradas: "-",
    tiempo: "-",
    errores: text
  }).catch(err => console.error("Error enviando soporte:", err));

  submittedEmail.textContent = finalName;
  reviewResult.style.display = "block";
  reviewForm.reset();
  actualizarModoReview();
});

const reviewNormalRadio = document.getElementById('reviewNormal');
const reviewAnonRadio = document.getElementById('reviewAnon');

function actualizarModoReview() {
  const esAnonimo = reviewAnonRadio.checked;
  nameGroup.style.display = esAnonimo ? "none" : "block";
  emailGroup.style.display = esAnonimo ? "none" : "block";
}

reviewNormalRadio?.addEventListener('change', actualizarModoReview);
reviewAnonRadio?.addEventListener('change', actualizarModoReview);
actualizarModoReview();

// =====================
// CONTINUAR
// =====================
function ejecutarContinuar() {

  if (!selectedRole) {
    showError("Selecciona una opción");
    return;
  }

  // memanejo +
  // Ya tengo código → iniciar sesión
  if (selectedRole === 'alumno') {
    mostrarNuevoEstudiante();
    return;
  }

  // Primer acceso
  // Crear cuenta → recibir código
  if (selectedRole === 'new') {
    mostrarPortalAlumno();
    return;
  }

}

// =====================
// UTILIDADES
// =====================
function showError(msg) {
  loginCardGlass.querySelector('.error-msg')?.remove();

  const div = document.createElement('div');
  div.className = 'error-msg';
  div.setAttribute('role', 'alert');
  div.textContent = msg;

  // En formularios va justo encima del botón; en la pantalla principal, bajo las opciones
  const botonForm = loginCardGlass.querySelector('.portal-form .card-btn');

  if (botonForm) {
    botonForm.insertAdjacentElement('beforebegin', div);
  } else {
    loginCardGlass.querySelector('.card-icons')?.after(div);
  }

  setTimeout(() => div.remove(), 4000);
}

// Click fuera
document.addEventListener('click', (e) => {
  const menu = document.querySelector('.student-menu');
  const boton = document.querySelector('.pill-student');

  if (!menu || !menu.classList.contains('show')) return;

  const clickDentroDelMenu = menu.contains(e.target);
  const clickEnElBoton = boton?.contains(e.target);

  if (!clickDentroDelMenu && !clickEnElBoton) {
    menu.classList.remove('show');
  }
});

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', initOnboarding);
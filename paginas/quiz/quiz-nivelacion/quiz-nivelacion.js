/* =========================
   UTILIDAD GLOBAL: mezclar arreglo (Fisher-Yates)
   Va fuera del DOMContentLoaded a propósito.
========================= */
function mezclarArray(arr) {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
      CONFIG
  ========================= */
  const NEXT_QUIZ_URL = "/paginas/quiz/quiz-appweb/index.html";

  /* =========================
      VARIABLES
  ========================= */
  let preguntasActuales = [];
  let indice = 0;
  let score = 0;
  let correctasCount = 0;
  let erradasCount = 0;
  let tiempoRestante = 0;
  let tiempoTotalSeg = 0;
  let timerInterval = null;
  let errores = [];

  function armarQuizNivelacion() {
    if (typeof bancoExamenMunicipal === 'undefined' || !bancoExamenMunicipal.length) {
      console.error('bancoExamenMunicipal no está cargado');
      return [];
    }

    const especiales = bancoExamenMunicipal.filter(p =>
      ["alcohol", "cinturon", "retencion_infantil"].includes(p.categoria)
    );

    const generales = bancoExamenMunicipal.filter(
      p => p.categoria === "general"
    );

    const preguntasEspeciales = mezclarArray(especiales).slice(0, 12);
    const faltantes = 12 - preguntasEspeciales.length;
    const preguntasGenerales = mezclarArray(generales).slice(0, 8 + faltantes);

    let seleccion = mezclarArray([
      ...preguntasEspeciales,
      ...preguntasGenerales
    ]).slice(0, 20);

    // Respaldo: si los filtros no dieron nada, usa todo el banco
    if (!seleccion.length) {
      console.warn('Sin preguntas por categoría; usando todo el banco');
      seleccion = mezclarArray(bancoExamenMunicipal).slice(0, 20);
    }

    return seleccion.map(p => ({
      ...p,
      respuestas: mezclarArray(p.respuestas),
      puntos: 1
    }));
  }

  /* =========================
     ELEMENTOS DOM
  ========================= */
  const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
  const pantallaLista = document.getElementById('pantalla-lista');
  const nombreListo = document.getElementById('nombreListo');
  const btnComenzarQuiz = document.getElementById('btnComenzarQuiz');
  const quizContainer = document.getElementById('quiz-container');
  const preguntaElemento = document.getElementById('question');
  const respuestasElemento = document.getElementById('answer-buttons');
  const btnSiguiente = document.getElementById('next-btn');
  const progresoElemento = document.getElementById('progress');
  const modal = document.getElementById('modal-memanejo');
  const textoPuntaje = document.getElementById('texto-puntaje');
  const btnNextQuiz = document.getElementById('btn-next-quiz');
  const btnDescargar = document.getElementById('btn-descargar-img');
  const btnCompartir = document.getElementById('btn-compartir');
  const btnReintentar = document.getElementById('btn-reintentar');
  const btnVolver = document.getElementById('btn-volver');
  const form = document.getElementById('form-usuario');

  const scoreRing = document.getElementById('scoreRing');
  const scorePuntos = document.getElementById('scorePuntos');
  const badgeEstado = document.getElementById('badgeEstado');
  const badgeTexto = document.getElementById('badgeTexto');
  const statCorrectas = document.getElementById('statCorrectas');
  const statErradas = document.getElementById('statErradas');
  const statTiempo = document.getElementById('statTiempo');

  const tiempoElemento = document.getElementById('tiempo-restante');

  /* =========================
     USUARIO QUE VIENE LOGUEADO → pantalla previa (sin pedir datos)
     La página de origen debe guardar en localStorage:
     nombre, correo y memanejo_desde_onboarding = 'true'
  ========================= */
  if (localStorage.getItem('memanejo_desde_onboarding') === 'true') {
    localStorage.removeItem('memanejo_desde_onboarding');

    pantallaBienvenida.style.display = 'none';
    pantallaLista.style.display = 'flex';

    const nombreGuardado = localStorage.getItem('nombre') || 'estudiante';
    nombreListo.textContent = nombreGuardado.split(' ')[0];
  }

  if (btnComenzarQuiz) {
    btnComenzarQuiz.addEventListener('click', iniciarQuiz);
  }

  /* =========================
     VALIDACIÓN DEL FORMULARIO (usuarios sin login)
  ========================= */
  function validarFormulario() {
    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('apellido');
    const inputCorreo = document.getElementById('correo');

    const errorNombre = document.getElementById('errorNombreQuiz');
    const errorApellido = document.getElementById('errorApellidoQuiz');
    const errorCorreo = document.getElementById('errorCorreoQuiz');

    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const correo = inputCorreo.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    errorNombre.textContent = '';
    errorApellido.textContent = '';
    errorCorreo.textContent = '';
    [inputNombre, inputApellido, inputCorreo].forEach(i => i.classList.remove('input-error'));

    let valido = true;

    if (!nombre) {
      errorNombre.textContent = 'Ingresa tu nombre.';
      inputNombre.classList.add('input-error');
      valido = false;
    }

    if (!apellido) {
      errorApellido.textContent = 'Ingresa tu apellido.';
      inputApellido.classList.add('input-error');
      valido = false;
    }

    if (!correo) {
      errorCorreo.textContent = 'Ingresa tu correo electrónico.';
      inputCorreo.classList.add('input-error');
      valido = false;
    } else if (!regexEmail.test(correo)) {
      errorCorreo.textContent = 'Ingresa un correo válido.';
      inputCorreo.classList.add('input-error');
      valido = false;
    }

    return valido;
  }

  /* =========================
     INICIAR QUIZ
  ========================= */
  function iniciarQuiz() {
    const nombreInput = document.getElementById("nombre")?.value.trim();
    const apellidoInput = document.getElementById("apellido")?.value.trim();
    const nombreCompleto = nombreInput ? `${nombreInput} ${apellidoInput || ""}`.trim() : null;

    localStorage.setItem("nombre", nombreCompleto || localStorage.getItem("nombre") || "Invitado");
    localStorage.setItem("correo", document.getElementById("correo")?.value || localStorage.getItem("correo") || "sin_correo");
    localStorage.setItem("telefono", localStorage.getItem("telefono") || "sin_telefono");

    pantallaBienvenida.style.display = 'none';
    pantallaLista.style.display = 'none';
    quizContainer.style.display = 'flex';
    quizContainer.style.flexDirection = 'column';
    quizContainer.style.alignItems = 'center';
    tiempoElemento.classList.add('visible');

    preguntasActuales = armarQuizNivelacion();
    indice = 0;
    score = 0;
    correctasCount = 0;
    erradasCount = 0;
    errores = [];

    tiempoTotalSeg = 20 * 60;
    tiempoRestante = tiempoTotalSeg;

    actualizarTiempo();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      tiempoRestante--;
      if (tiempoRestante <= 0) {
        clearInterval(timerInterval);
        mostrarResultado();
      } else actualizarTiempo();
    }, 1000);

    mostrarPregunta();
  }
  window.iniciarQuiz = iniciarQuiz;

  function actualizarTiempo() {
    const min = Math.floor(tiempoRestante / 60);
    const seg = tiempoRestante % 60;
    tiempoElemento.innerText = `Tiempo restante: ⏱ ${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
  }

  /* =========================
     MOSTRAR PREGUNTA
  ========================= */
  function mostrarPregunta() {
    resetearEstado();
    const q = preguntasActuales[indice];
    if (!q) return;

    preguntaElemento.innerText = q.pregunta;
    progresoElemento.innerText = `Pregunta ${indice + 1} de ${preguntasActuales.length}`;

    q.respuestas.forEach(r => {
      const btn = document.createElement('button');
      btn.innerText = r.texto;
      btn.className = 'btn';
      btn.dataset.correcta = r.correcta ? "true" : "false";
      btn.addEventListener('click', seleccionarRespuesta);
      respuestasElemento.appendChild(btn);
    });
  }

  function resetearEstado() {
    btnSiguiente.style.display = 'none';
    respuestasElemento.innerHTML = '';
    respuestasElemento.style.display = 'flex';
    respuestasElemento.style.flexDirection = 'column';
    respuestasElemento.style.alignItems = 'center';
    respuestasElemento.style.gap = '10px';
  }

  function seleccionarRespuesta(e) {
    const seleccion = e.target;
    const correcta = seleccion.dataset.correcta === "true";

    if (seleccion.disabled) return;

    if (correcta) {
      score += preguntasActuales[indice].puntos;
      correctasCount++;
    } else {
      erradasCount++;
    }

    const botones = Array.from(respuestasElemento.children);

    botones.forEach(btn => {
      btn.disabled = true;
    });

    if (correcta) {
      seleccion.classList.add('correct');
    } else {
      seleccion.classList.add('selected-wrong');

      const pregunta = preguntasActuales[indice].pregunta;
      const respuestaUsuario = seleccion.innerText;
      const correctaTexto = preguntasActuales[indice].respuestas.find(r => r.correcta).texto;
      errores.push(`Pregunta: ${pregunta}<br>Tu respuesta: ${respuestaUsuario}<br>Respuesta correcta: ${correctaTexto}`);

      const botonCorrecto = botones.find(b => b.dataset.correcta === "true");
      if (botonCorrecto) botonCorrecto.classList.add('correct');
    }

    botones.forEach(btn => {
      const esSeleccionado = btn === seleccion;
      const esCorrecto = btn.dataset.correcta === "true";
      if (!esSeleccionado && !esCorrecto) {
        btn.classList.add('respuesta-oculta');
      }
    });

    btnSiguiente.style.display = 'inline-block';

    setTimeout(() => {
      seleccion.classList.add('feedback-final');
      const botonCorrecto = botones.find(b => b.dataset.correcta === "true");
      if (botonCorrecto) botonCorrecto.classList.add('feedback-final');
    }, 6000);
  }

  btnSiguiente.addEventListener('click', () => {
    indice++;
    if (indice < preguntasActuales.length) mostrarPregunta();
    else mostrarResultado();
  });

  /* =========================
     RESULTADO FINAL
  ========================= */
  function calcularPuntajeTotal() {
    return preguntasActuales.reduce((acc, p) => acc + p.puntos, 0);
  }

  function mostrarResultado() {
    clearInterval(timerInterval);
    quizContainer.style.display = 'none';

    const puntajeTotal = calcularPuntajeTotal() || 1;
    const porcentaje = (score / puntajeTotal) * 100;
    const aprobado = porcentaje >= 87;

    scorePuntos.innerText = `${score}/${puntajeTotal}`;
    scoreRing.style.setProperty('--progreso', `${Math.min(porcentaje, 100)}%`);

    badgeEstado.classList.toggle('reprobado', !aprobado);
    badgeTexto.innerText = aprobado ? 'Aprobado' : 'Reprobado';
    badgeEstado.querySelector('i').className = aprobado ? 'fas fa-check' : 'fas fa-times';

    statCorrectas.innerText = correctasCount;
    statErradas.innerText = erradasCount;
    const tiempoUsado = tiempoTotalSeg - tiempoRestante;
    const min = Math.floor(tiempoUsado / 60);
    const seg = tiempoUsado % 60;
    statTiempo.innerText = `${min}:${seg.toString().padStart(2, '0')}`;

    textoPuntaje.innerText = aprobado
      ? "¡Aprobaste el Quiz de Nivelación!"
      : "No alcanzaste el puntaje mínimo. Sigue practicando.";

    const incentivoAnterior = document.getElementById('bloque-incentivo');
    if (incentivoAnterior) incentivoAnterior.remove();

    if (!aprobado) {
      const incentivo = document.createElement('div');
      incentivo.id = 'bloque-incentivo';
      incentivo.style.textAlign = 'center';
      incentivo.style.marginTop = '20px';

      const mensajeWhatsapp = encodeURIComponent(
        `Hola, hice el quiz de nivelación en memanejo.cl y obtuve ${score}/${puntajeTotal} puntos. Quiero revisar mis errores.`
      );
      const numeroWhatsapp = "56946914558";

      incentivo.innerHTML = `
    <p style="font-size:14px; color:#6e6d6d; margin-bottom:12px;">
      ¿Quieres saber en qué preguntas fallaste y por qué?
    </p>

    <a href="https://wa.me/${numeroWhatsapp}?text=${mensajeWhatsapp}" target="_blank"
  class="btn-incentivo">
  Revisa tus errores por solo
  <span class="btn-incentivo-precio">$1.990</span>
</a>

    <small class="acceso-text">
       Te contactaremos por <i class="fab fa-whatsapp"></i>WhatsApp
    </small>
  `;
      const captura = document.getElementById('captura');
      const footer = captura.querySelector('.footer-bottom');

      if (footer) {
        captura.insertBefore(incentivo, footer);
      } else {
        captura.appendChild(incentivo);
      }
    }

    emailjs.send("service_ujyq6hg", "template_o43bfnj", {
      nombre: localStorage.getItem("nombre") || "Invitado",
      correo: localStorage.getItem("correo") || "sin_correo",
      telefono: localStorage.getItem("telefono") || "sin_telefono",
      puntaje: score,
      total: puntajeTotal,
      porcentaje: porcentaje.toFixed(0),
      estado: aprobado ? "Aprobado" : "No aprobado",
      correctas: correctasCount,
      erradas: erradasCount,
      tiempo: `${min}:${seg.toString().padStart(2, '0')}`,
      errores: errores.join('\n\n')
    });

    modal.classList.remove('oculto');
    tiempoElemento.classList.remove('visible');
  }
  window.mostrarResultado = mostrarResultado;

  /* =========================
     CAPTURA DE IMAGEN (usada por Descargar y Compartir)
  ========================= */
  async function capturarResultado(backgroundColor) {
    const captura = document.getElementById('captura');
    const precio = captura.querySelector('.btn-incentivo-precio');

    const estiloOriginal = {
      maxHeight: captura.style.maxHeight,
      overflow: captura.style.overflow,
      height: captura.style.height
    };

    captura.style.maxHeight = 'none';
    captura.style.overflow = 'visible';
    captura.style.height = 'auto';

    if (precio) precio.style.visibility = 'hidden';

    try {
      return await html2canvas(captura, { backgroundColor, scale: 2 });
    } finally {
      captura.style.maxHeight = estiloOriginal.maxHeight;
      captura.style.overflow = estiloOriginal.overflow;
      captura.style.height = estiloOriginal.height;
      if (precio) precio.style.visibility = 'visible';
    }
  }

  /* =========================
     COMPARTIR (unificado: menú nativo o Twitter/X)
  ========================= */
  btnCompartir.addEventListener('click', async () => {
    const puntajeTotal = calcularPuntajeTotal() || 1;
    const porcentaje = (score / puntajeTotal) * 100;
    const texto = `Obtuve ${score}/${puntajeTotal} puntos (${porcentaje.toFixed(0)}%) en el quiz de Nivelación en www.memanejo.cl`;

    try {
      if (navigator.share) {
        try {
          const canvas = await capturarResultado('#121212');
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
          const archivo = new File([blob], 'resultado-quiz-memanejo.png', { type: 'image/png' });

          if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
            await navigator.share({
              files: [archivo],
              title: 'Mi resultado en memanejo.cl',
              text: texto
            });
            return;
          }
        } catch (err) {
          if (err.name === 'AbortError') return;
        }

        await navigator.share({
          title: 'Mi resultado en memanejo.cl',
          text: texto
        });
        return;
      }

      // Escritorio sin Web Share: Twitter / X
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`,
        '_blank',
        'noopener,noreferrer'
      );

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error al compartir:", err);
      }
    }
  });

  /* =========================
     DESCARGAR IMAGEN
  ========================= */
  btnDescargar.addEventListener('click', async () => {
    const canvas = await capturarResultado(null);
    const link = document.createElement('a');
    link.download = 'resultado-quiz-memanejo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  /* =========================
     SIGUIENTE QUIZ
  ========================= */
  if (btnNextQuiz) {
    btnNextQuiz.addEventListener('click', () => {
      window.location.href = NEXT_QUIZ_URL;
    });
  }

  /* =========================
     REINTENTAR / VOLVER
  ========================= */
  btnReintentar.addEventListener('click', () => {
    tiempoElemento.classList.remove('visible');
    modal.classList.add('oculto');
    quizContainer.style.display = 'none';
    pantallaLista.style.display = 'none';
    pantallaBienvenida.style.display = 'flex';
    correctasCount = 0;
    erradasCount = 0;
    resetearEstado();
  });

  btnVolver.addEventListener('click', () => {
    tiempoElemento.classList.remove('visible');
    modal.classList.add('oculto');
    quizContainer.style.display = 'none';
    pantallaLista.style.display = 'none';
    pantallaBienvenida.style.display = 'flex';
  });

  /* =========================
     ENVÍO DEL FORMULARIO
  ========================= */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    iniciarQuiz();
  });
 // Solo para pruebas: escribe testResultado() en la consola
  window.testResultado = function () {
    score = 20;
    correctasCount = 19;
    erradasCount = 1;
    mostrarResultado();
  };
});
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
      1. CONFIGURACIÓN
  ===================================================== */

  const NEXT_QUIZ_URL = "/aulavirtual";
  const RECORDAR_INTRO = false;

  const TOTAL_PASOS = 3;
  const TIEMPO_EXAMEN = 45 * 60;

  const EMAIL_SERVICE = "service_ujyq6hg";
  const EMAIL_TEMPLATE = "template_o43bfnj";

  const GA4_ID = "G-07XB2NNQ0J";

  let preguntasActuales = [];
  let indice = 0;

  let score = 0;
  let correctasCount = 0;
  let erradasCount = 0;

  let errores = [];

  let tiempoRestante = 0;
  let tiempoTotalSeg = 0;

  let timerInterval = null;
  let feedbackTimeout = null;

  let resultadoEnviado = false;
  let resultadoMostrado = false;

  let pasoActual = 1;

  let swipeX = 0;
  let swipeY = 0;

  let usuariosDB = [];
  let usuariosPromise = null;

  let datosUsuario = {
    nombre: "",
    correo: "",
    telefono: ""
  };


  /* =====================================================
      2. ELEMENTOS HTML
  ===================================================== */

  const pantallaBienvenida = document.getElementById("pantalla-bienvenida");
  const quizContainer = document.getElementById("quiz-container");
  const formulario = document.getElementById("form-usuario");

  const preguntaElemento = document.getElementById("question");
  const respuestasElemento = document.getElementById("answer-buttons");

  const btnSiguiente = document.getElementById("next-btn");
  const progresoElemento = document.getElementById("progress");
  const tiempoElemento = document.getElementById("tiempo-restante");

  const modal = document.getElementById("modal-memanejo");
  const textoPuntaje = document.getElementById("texto-puntaje");

  const btnNextQuiz = document.getElementById("btn-next-quiz");
  const btnDescargar = document.getElementById("btn-descargar-img");
  const btnCompartir = document.getElementById("btn-compartir");

  const btnReintentar = document.getElementById("btn-reintentar");
  const btnVolver = document.getElementById("btn-volver");

  const temaToggle = document.getElementById("temaToggle");
  const temaLabelOff = document.getElementById("temaLabelOff");
  const temaLabelOn = document.getElementById("temaLabelOn");

  const scoreRing = document.getElementById("scoreRing");
  const scorePuntos = document.getElementById("scorePuntos");

  const badgeEstado = document.getElementById("badgeEstado");
  const badgeTexto = document.getElementById("badgeTexto");

  const statCorrectas = document.getElementById("statCorrectas");
  const statErradas = document.getElementById("statErradas");
  const statTiempo = document.getElementById("statTiempo");


  /* =====================================================
      3. VALIDACIÓN DE ELEMENTOS ESENCIALES
  ===================================================== */

  const elementosEsenciales = [
    pantallaBienvenida,
    quizContainer,
    formulario,
    preguntaElemento,
    respuestasElemento,
    btnSiguiente,
    progresoElemento,
    tiempoElemento,
    modal
  ];

  if (elementosEsenciales.some(elemento => !elemento)) {
    console.error(
      "MEMANEJO: faltan elementos HTML necesarios para iniciar el quiz."
    );

    return;
  }


  /* =====================================================
      4. GOOGLE ANALYTICS 4
  ===================================================== */

  function registrarEvento(nombreEvento, parametros = {}) {

    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", nombreEvento, {
      ...parametros,
      send_to: GA4_ID
    });

  }


  /* =====================================================
     5. PRESENTACIÓN / ONBOARDING
 ===================================================== */

  function vibrar(ms = 8) {
    if (navigator.vibrate) {
      navigator.vibrate(ms);
    }
  }


  function irAlPaso(n, direccion) {

    const nuevo = Math.min(
      Math.max(n, 1),
      TOTAL_PASOS
    );

    if (nuevo === pasoActual) {
      return;
    }

    const dir = direccion || (
      nuevo > pasoActual ? "next" : "back"
    );

    pasoActual = nuevo;

    pantallaBienvenida.dataset.dir = dir;
    pantallaBienvenida.dataset.paso = String(nuevo);

    // Actualizar indicadores

    document.querySelectorAll(".intro-dot").forEach(punto => {

      const activo = Number(punto.dataset.ir) === nuevo;

      punto.classList.toggle("activo", activo);

      if (activo) {
        punto.setAttribute("aria-current", "step");
      } else {
        punto.removeAttribute("aria-current");
      }

    });

    // Controlar botones de navegación

    const btnBack = document.getElementById("introBack");
    const btnNext = document.getElementById("introNext");
    const btnSkip = document.getElementById("introSkip");
    const introFooter = document.querySelector(".intro-footer");

    if (btnBack) {
      btnBack.style.visibility = nuevo === 1 ? "hidden" : "visible";
    }

    if (introFooter) {
      introFooter.style.display = nuevo === TOTAL_PASOS ? "none" : "flex";
    }

    if (btnNext) {

      const texto = btnNext.querySelector("span");

      if (texto) {
        texto.textContent = nuevo === 2 ? "Acceder" : "Avanzar";
      }

    }

    if (btnSkip) {
      btnSkip.style.display = nuevo === TOTAL_PASOS ? "none" : "flex";
    }

    // Desplazamiento al inicio

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Recordar presentación

    if (nuevo === TOTAL_PASOS && RECORDAR_INTRO) {

      try {

        localStorage.setItem(
          "memanejoIntroVisto",
          "true"
        );

      } catch (error) {

        console.warn(
          "No se pudo guardar el estado de la presentación."
        );

      }

    }

  }


  // Avanzar

  document.getElementById("introNext")?.addEventListener(
    "click",
    () => {
      vibrar();
      irAlPaso(pasoActual + 1);
    }
  );


  // Retroceder

  document.getElementById("introBack")?.addEventListener(
    "click",
    () => {
      irAlPaso(pasoActual - 1);
    }
  );


  // Saltar directamente al acceso

  document.getElementById("introSkip")?.addEventListener(
    "click",
    () => {
      irAlPaso(TOTAL_PASOS);
    }
  );


  // Navegación mediante indicadores superiores

  document.querySelectorAll(".intro-dot").forEach(punto => {

    punto.addEventListener("click", () => {
      irAlPaso(Number(punto.dataset.ir));
    });

  });


  // Deslizamiento horizontal entre las láminas

  document.querySelectorAll(".intro-step").forEach(paso => {

    paso.addEventListener(
      "touchstart",
      e => {
        swipeX = e.touches[0].clientX;
        swipeY = e.touches[0].clientY;
      },
      { passive: true }
    );


    paso.addEventListener(
      "touchend",
      e => {

        const dx = e.changedTouches[0].clientX - swipeX;
        const dy = e.changedTouches[0].clientY - swipeY;

        if (
          Math.abs(dx) < 60 ||
          Math.abs(dy) > 50
        ) {
          return;
        }

        irAlPaso(
          pasoActual + (dx < 0 ? 1 : -1)
        );

      },
      { passive: true }
    );

  });


  // Estado inicial

  let introVisto = false;

  try {
    introVisto =
      localStorage.getItem("memanejoIntroVisto") === "true";
  } catch (error) {
    console.warn("No se pudo consultar localStorage.");
  }


  irAlPaso(
    RECORDAR_INTRO && introVisto ? TOTAL_PASOS : 1,
    "none"
  );
  // Sincronizar navegación inicial

  document.querySelectorAll(".intro-dot").forEach(punto => {

    const activo = Number(punto.dataset.ir) === pasoActual;

    punto.classList.toggle("activo", activo);

    if (activo) {
      punto.setAttribute("aria-current", "step");
    } else {
      punto.removeAttribute("aria-current");
    }

  });

  const introBackInicial = document.getElementById("introBack");

  if (introBackInicial) {
    introBackInicial.style.visibility =
      pasoActual === 1 ? "hidden" : "visible";
  }
  /* =====================================================
      6. MEZCLAR PREGUNTAS
  ===================================================== */

  function mezclarArray(array) {

    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [copia[i], copia[j]] = [
        copia[j],
        copia[i]
      ];

    }

    return copia;

  }


  /* =====================================================
      7. ARMAR EXAMEN MUNICIPAL
      3 especiales + 32 generales
  ===================================================== */

  function armarExamenMunicipal() {

    if (
      typeof bancoExamenMunicipal === "undefined" ||
      !Array.isArray(bancoExamenMunicipal)
    ) {

      throw new Error(
        "No se encontró bancoExamenMunicipal."
      );

    }


    const especiales = bancoExamenMunicipal.filter(
      pregunta =>
        [
          "alcohol",
          "cinturon",
          "retencion_infantil"
        ].includes(pregunta.categoria)
    );


    const generales = bancoExamenMunicipal.filter(
      pregunta =>
        pregunta.categoria === "general"
    );


    if (
      especiales.length < 3 ||
      generales.length < 32
    ) {

      throw new Error(
        "El banco de preguntas no tiene suficientes preguntas para generar el examen."
      );

    }


    const especialesSorteadas = mezclarArray(
      especiales
    ).slice(0, 3);


    const generalesSorteadas = mezclarArray(
      generales
    ).slice(0, 32);


    const examen = mezclarArray([

      ...especialesSorteadas,
      ...generalesSorteadas

    ]);


    return examen.map(pregunta => {

      if (
        !Array.isArray(pregunta.respuestas) ||
        !pregunta.respuestas.some(respuesta => respuesta.correcta)
      ) {

        throw new Error(
          "Existe una pregunta sin respuestas válidas."
        );

      }


      return {

        ...pregunta,

        respuestas: mezclarArray(
          pregunta.respuestas
        ),

        puntos:
          pregunta.categoria !== "general"
            ? 2
            : 1

      };

    });

  }


  /* =====================================================
      8. CARGAR USUARIOS
  ===================================================== */

  async function cargarUsuarios() {

    if (usuariosPromise) {
      return usuariosPromise;
    }


    usuariosPromise = (async () => {

      try {

        const res = await fetch("/data/usuarios.json", {
          cache: "no-store"
        });

        if (!res.ok) {

          throw new Error(
            `Error HTTP ${res.status}`
          );

        }


        const datos = await res.json();

        if (!Array.isArray(datos)) {

          throw new Error(
            "El archivo usuarios.json no contiene un arreglo."
          );

        }


        usuariosDB = datos;

        return usuariosDB;

      } catch (error) {

        console.error(
          "Error cargando usuarios:",
          error
        );

        usuariosDB = [];

        throw error;

      } finally {

        usuariosPromise = null;

      }

    })();


    return usuariosPromise;

  }


  // Carga inicial.

  cargarUsuarios().catch(() => { });


  /* =====================================================
      9. MENSAJES DE LOGIN
  ===================================================== */

  function mostrarErrorLogin(mensaje) {

    const errorElemento = document.getElementById(
      "login-error-msg"
    );

    if (!errorElemento) {
      return;
    }


    errorElemento.textContent = mensaje;
    errorElemento.style.display = "block";


    setTimeout(() => {

      errorElemento.style.display = "none";

    }, 4000);

  }


  /* =====================================================
     10. MODO VISUAL
     Estilo memanejo como estado inicial
 ===================================================== */

  const META_COLOR_TEMA = {
    oficial: "#0d0d0d",
    activado: "#f1f1f1"
  };


  function aplicarModo(modo) {

    const modoValido =
      modo === "activado" ? "activado" : "oficial";


    document.body.classList.toggle(
      "modo-activado",
      modoValido === "activado"
    );


    temaToggle?.setAttribute(
      "aria-pressed",
      modoValido === "activado" ? "true" : "false"
    );


    temaLabelOff?.classList.toggle(
      "activo",
      modoValido === "oficial"
    );


    temaLabelOn?.classList.toggle(
      "activo",
      modoValido === "activado"
    );


    document.querySelector(
      'meta[name="theme-color"]'
    )?.setAttribute(
      "content",
      META_COLOR_TEMA[modoValido]
    );


    try {
      localStorage.setItem(
        "memanejoModo",
        modoValido
      );
    } catch (error) {
      console.warn("No se pudo guardar el tema.");
    }

  }


  // Estado inicial: estilo blanco memanejo

  aplicarModo("activado");


  // Alternar estilos

  temaToggle?.addEventListener("click", () => {

    const nuevoModo =
      document.body.classList.contains("modo-activado")
        ? "oficial"
        : "activado";

    aplicarModo(nuevoModo);

  });

  /* =====================================================
      11. LOGIN E INICIO DEL QUIZ
  ===================================================== */

  formulario.addEventListener("submit", async e => {

    e.preventDefault();


    const nombre = document.getElementById("nombre")
      ?.value.trim()
      .replace(/\s+/g, " ") || "";


    const correo = document.getElementById("correo")
      ?.value.trim()
      .toLowerCase() || "";


    const memanejoId = document.getElementById("memanejoId")
      ?.value.trim()
      .toUpperCase() || "";


    if (nombre.length < 2) {

      mostrarErrorLogin("Ingresa tu nombre.");

      return;

    }


    if (!correo || !memanejoId) {

      mostrarErrorLogin(
        "Completa tu correo y memanejo ID."
      );

      return;

    }


    try {

      if (usuariosDB.length === 0) {

        await cargarUsuarios();

      }

    } catch (error) {

      mostrarErrorLogin(
        "No pudimos validar tus datos. Intenta nuevamente."
      );

      return;

    }


    const usuarioValido = usuariosDB.find(usuario =>

      String(usuario.email || "").trim().toLowerCase() === correo &&

      String(usuario.memanejoId || "").trim().toUpperCase() === memanejoId

    );


    if (!usuarioValido) {

      mostrarErrorLogin(
        "Correo o memanejo ID incorrecto."
      );

      registrarEvento("quiz_login_failed");

      return;

    }


    datosUsuario = {

      nombre,

      correo: usuarioValido.email,

      telefono: usuarioValido.telefono || ""

    };


    registrarEvento("quiz_login_success");


    iniciarQuiz();

  });


  /* =====================================================
      12. INICIAR EXAMEN
  ===================================================== */

  function iniciarQuiz() {

    try {

      preguntasActuales = armarExamenMunicipal();

    } catch (error) {

      console.error(
        "No se pudo generar el examen:",
        error
      );

      mostrarErrorLogin(
        "No fue posible cargar el examen. Intenta nuevamente."
      );

      return;

    }


    if (timerInterval) {

      clearInterval(timerInterval);
      timerInterval = null;

    }


    if (feedbackTimeout) {

      clearTimeout(feedbackTimeout);
      feedbackTimeout = null;

    }


    indice = 0;

    score = 0;

    correctasCount = 0;

    erradasCount = 0;

    errores = [];

    resultadoEnviado = false;

    resultadoMostrado = false;


    pantallaBienvenida.style.display = "none";


    tiempoElemento.classList.add("visible");


    quizContainer.style.display = "flex";

    quizContainer.style.flexDirection = "column";

    quizContainer.style.justifyContent = "center";

    quizContainer.style.alignItems = "center";

    quizContainer.style.minHeight = "100dvh";


    modal.classList.add("oculto");


    tiempoTotalSeg = TIEMPO_EXAMEN;

    tiempoRestante = tiempoTotalSeg;


    actualizarTiempo();


    registrarEvento("quiz_started", {

      total_questions: preguntasActuales.length

    });


    timerInterval = setInterval(() => {

      tiempoRestante--;


      if (tiempoRestante <= 0) {

        tiempoRestante = 0;

        actualizarTiempo();

        clearInterval(timerInterval);

        timerInterval = null;

        mostrarResultado();

        return;

      }


      actualizarTiempo();

    }, 1000);


    mostrarPregunta();

  }


  /* =====================================================
      13. TEMPORIZADOR
  ===================================================== */

  function actualizarTiempo() {

    const min = Math.floor(
      tiempoRestante / 60
    );


    const seg = tiempoRestante % 60;


    tiempoElemento.innerText =

      `Tiempo restante: ⏱ ${min.toString().padStart(2, "0")}:` +

      `${seg.toString().padStart(2, "0")}`;

  }


  /* =====================================================
      14. MOSTRAR PREGUNTA
  ===================================================== */

  function mostrarPregunta() {

    resetearEstado();


    const preguntaActual = preguntasActuales[indice];


    if (!preguntaActual) {

      mostrarResultado();

      return;

    }


    preguntaElemento.innerText =
      preguntaActual.pregunta;


    progresoElemento.innerText =

      `Pregunta ${indice + 1} de ${preguntasActuales.length}`;


    preguntaActual.respuestas.forEach(respuesta => {

      const botonRespuesta = document.createElement("button");


      botonRespuesta.type = "button";

      botonRespuesta.innerText = respuesta.texto;

      botonRespuesta.classList.add("btn");

      botonRespuesta.dataset.correcta =
        respuesta.correcta ? "true" : "false";


      botonRespuesta.addEventListener(
        "click",
        seleccionarRespuesta
      );


      respuestasElemento.appendChild(
        botonRespuesta
      );

    });

  }


  /* =====================================================
      15. RESETEAR RESPUESTAS
  ===================================================== */

  function resetearEstado() {

    btnSiguiente.style.display = "none";


    respuestasElemento.style.display = "flex";

    respuestasElemento.style.flexDirection = "column";

    respuestasElemento.style.alignItems = "center";

    respuestasElemento.style.gap = "10px";


    respuestasElemento.replaceChildren();


    if (feedbackTimeout) {

      clearTimeout(feedbackTimeout);

      feedbackTimeout = null;

    }

  }


  /* =====================================================
      16. SELECCIONAR RESPUESTA
  ===================================================== */

  function seleccionarRespuesta(e) {

    const seleccion = e.currentTarget;

    const preguntaActual = preguntasActuales[indice];


    if (
      !preguntaActual ||
      seleccion.disabled ||
      resultadoMostrado
    ) {

      return;

    }


    const esCorrecta =
      seleccion.dataset.correcta === "true";


    const botones = Array.from(
      respuestasElemento.children
    );


    // Bloquear todas las respuestas.

    botones.forEach(boton => {

      boton.disabled = true;

    });


    if (esCorrecta) {

      score += preguntaActual.puntos;

      correctasCount++;

      seleccion.classList.add("correct");

    } else {

      erradasCount++;

      seleccion.classList.add("selected-wrong");


      const respuestaCorrecta =
        preguntaActual.respuestas.find(
          respuesta => respuesta.correcta
        );


      errores.push(

        `Pregunta ${indice + 1}: ${preguntaActual.pregunta}\n` +

        `Tu respuesta: ${seleccion.innerText}\n` +

        `Respuesta correcta: ${respuestaCorrecta?.texto || "No disponible"}`

      );


      const botonCorrecto = botones.find(
        boton =>
          boton.dataset.correcta === "true"
      );


      botonCorrecto?.classList.add("correct");

    }


    // Ocultar respuestas incorrectas no seleccionadas.

    botones.forEach(boton => {

      const esSeleccionada =
        boton === seleccion;


      const esRespuestaCorrecta =
        boton.dataset.correcta === "true";


      if (
        !esSeleccionada &&
        !esRespuestaCorrecta
      ) {

        boton.classList.add("respuesta-oculta");

      }

    });


    registrarEvento("quiz_answered", {

      question_number: indice + 1,

      is_correct: esCorrecta,

      points: esCorrecta ? preguntaActual.puntos : 0

    });


    btnSiguiente.style.display = "inline-block";


    // Feedback visual después de 6 segundos.

    feedbackTimeout = setTimeout(() => {

      seleccion.classList.add("feedback-final");


      const botonCorrecto = botones.find(
        boton =>
          boton.dataset.correcta === "true"
      );


      botonCorrecto?.classList.add(
        "feedback-final"
      );


      feedbackTimeout = null;

    }, 6000);

  }


  /* =====================================================
      17. SIGUIENTE PREGUNTA
  ===================================================== */

  btnSiguiente.addEventListener("click", () => {

    if (resultadoMostrado) {
      return;
    }


    indice++;


    if (indice < preguntasActuales.length) {

      mostrarPregunta();

    } else {

      mostrarResultado();

    }

  });


  /* =====================================================
      18. PUNTAJE TOTAL
  ===================================================== */

  function calcularPuntajeTotal() {

    return preguntasActuales.reduce(

      (total, pregunta) => {

        return total + pregunta.puntos;

      },

      0

    );

  }


  /* =====================================================
      19. RESULTADO DEL EXAMEN
  ===================================================== */

  function mostrarResultado() {

    if (resultadoMostrado) {
      return;
    }


    if (timerInterval) {

      clearInterval(timerInterval);

      timerInterval = null;

    }


    if (feedbackTimeout) {

      clearTimeout(feedbackTimeout);

      feedbackTimeout = null;

    }


    resultadoMostrado = true;

    resultadoEnviado = true;


    quizContainer.style.display = "none";


    const puntajeTotal = calcularPuntajeTotal();


    const porcentaje = puntajeTotal > 0

      ? (score / puntajeTotal) * 100

      : 0;


    // Criterio municipal: mínimo 33 puntos.

    const aprobado =

      preguntasActuales.length === 35

        ? score >= 33

        : porcentaje >= 87;


    const tiempoUsado =
      tiempoTotalSeg - tiempoRestante;


    const min = Math.floor(
      tiempoUsado / 60
    );


    const seg = tiempoUsado % 60;


    const tiempoUsadoTexto =

      `${min}:${seg.toString().padStart(2, "0")}`;


    /* ==========================================
       ACTUALIZAR RESULTADO VISUAL
    ========================================== */

    if (scorePuntos) {

      scorePuntos.innerText =
        `${score}/${puntajeTotal}`;

    }


    if (scoreRing) {

      scoreRing.style.setProperty(

        "--progreso",

        `${Math.min(porcentaje, 100)}%`

      );

    }


    badgeEstado?.classList.toggle(
      "reprobado",
      !aprobado
    );


    if (badgeTexto) {

      badgeTexto.innerText =
        aprobado ? "Aprobado" : "Reprobado";

    }


    const iconoEstado =
      badgeEstado?.querySelector("i");


    if (iconoEstado) {

      iconoEstado.className = aprobado

        ? "fas fa-check"

        : "fas fa-times";

    }


    if (statCorrectas) {

      statCorrectas.innerText = correctasCount;

    }


    if (statErradas) {

      statErradas.innerText = erradasCount;

    }


    if (statTiempo) {

      statTiempo.innerText = tiempoUsadoTexto;

    }


    if (textoPuntaje) {

      textoPuntaje.innerText = aprobado

        ? "¡Aprobaste el Quiz!"

        : "No alcanzaste el puntaje mínimo para aprobar.";

    }


    /* ==========================================
       ELIMINAR INCENTIVO ANTERIOR
    ========================================== */

    document.getElementById(
      "bloque-incentivo"
    )?.remove();


    /* ==========================================
       CREAR INCENTIVO
    ========================================== */

    const incentivo = document.createElement("div");

    incentivo.id = "bloque-incentivo";


    if (aprobado) {

      incentivo.innerHTML = `

        <p class="texto-incentivo">

          <strong>Gana $5.000</strong>

        </p>

        <p class="texto-incentivo-secundario">

          Invita a un amigo a prepararse en memanejo.cl

        </p>

        <a
          href="#"
          id="btn-compartir-resultado"
          class="btn-incentivo"
        >

          Compartir mi resultado

        </a>

        <p class="texto-incentivo-precio">

          Por cada nuevo alumno que active su acceso con tu recomendación.

        </p>

      `;

    } else {

      incentivo.innerHTML = `

        <p class="texto-incentivo">

          ¿Quieres mejorar tu resultado?

        </p>

        <p class="texto-incentivo-secundario">

          Refuerza el teórico con nuestros cursos.

        </p>

        <a
          href="/aulavirtual/"
          class="btn-incentivo"
        >

          Ver cursos

        </a>

        <p class="texto-incentivo-precio">

          Desde $9.990

        </p>

      `;

    }


    /* ==========================================
       INSERTAR ANTES DEL FOOTER
    ========================================== */

    const captura = document.getElementById("captura");


    if (captura) {

      const footer = captura.querySelector(
        ".footer-bottom"
      );


      if (footer) {

        captura.insertBefore(
          incentivo,
          footer
        );

      } else {

        captura.appendChild(incentivo);

      }

    }


    /* ==========================================
       COMPARTIR RESULTADO
    ========================================== */

    if (aprobado) {

      document.getElementById(
        "btn-compartir-resultado"
      )?.addEventListener("click", e => {

        e.preventDefault();

        btnCompartir?.click();

      });

    }


    /* ==========================================
       MOSTRAR MODAL
    ========================================== */

    modal.classList.remove("oculto");

    tiempoElemento.classList.remove("visible");


    /* ==========================================
       ANALYTICS
    ========================================== */

    registrarEvento("quiz_completed", {

      score: score,

      total_points: puntajeTotal,

      percentage: Number(porcentaje.toFixed(0)),

      correct_answers: correctasCount,

      wrong_answers: erradasCount,

      elapsed_seconds: tiempoUsado,

      exam_status: aprobado ? "passed" : "failed"

    });


    registrarEvento(
      aprobado ? "quiz_passed" : "quiz_failed",
      {

        score: score,

        total_points: puntajeTotal

      }
    );


    /* ==========================================
       EMAILJS
    ========================================== */

    if (
      typeof emailjs !== "undefined" &&
      typeof emailjs.send === "function"
    ) {

      emailjs.send(
        EMAIL_SERVICE,
        EMAIL_TEMPLATE,
        {

          nombre: datosUsuario.nombre,

          correo: datosUsuario.correo,

          telefono: datosUsuario.telefono,

          puntaje: score,

          total: puntajeTotal,

          porcentaje: porcentaje.toFixed(0),

          estado: aprobado
            ? "Aprobado"
            : "No aprobado",

          correctas: correctasCount,

          erradas: erradasCount,

          tiempo: tiempoUsadoTexto,

          errores: errores.length

            ? errores.join("\n\n")

            : "El usuario no registró respuestas incorrectas."

        }

      )

        .then(() => {

          console.log(
            "Resultado enviado por correo correctamente."
          );

        })

        .catch(error => {

          console.error(
            "Error enviando resultado:",
            error
          );

        });

    } else {

      console.error(
        "EmailJS no está disponible."
      );

    }

  }


  window.mostrarResultado = mostrarResultado;


  /* =====================================================
      20. CONVERTIR COLORES MODERNOS
      COMPATIBILIDAD HTML2CANVAS
  ===================================================== */

  function convertirColoresModernos(docClonado) {

    const lienzo = docClonado.createElement("canvas");

    lienzo.width = 1;

    lienzo.height = 1;


    const ctx = lienzo.getContext(
      "2d",
      { willReadFrequently: true }
    );


    if (!ctx) {
      return;
    }


    const aRgba = color => {

      ctx.clearRect(0, 0, 1, 1);

      ctx.fillStyle = "#000";

      ctx.fillStyle = color;

      ctx.fillRect(0, 0, 1, 1);


      const d = ctx.getImageData(
        0,
        0,
        1,
        1
      ).data;


      return `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${(d[3] / 255).toFixed(3)})`;

    };


    const moderno =
      /\b(?:color|oklch|oklab|lab|lch)\([^()]*\)/g;


    const propiedades = [

      "color",

      "background-color",

      "background-image",

      "border-top-color",

      "border-right-color",

      "border-bottom-color",

      "border-left-color",

      "outline-color",

      "text-decoration-color",

      "box-shadow",

      "text-shadow",

      "fill",

      "stroke",

      "caret-color"

    ];


    const vista = docClonado.defaultView;


    docClonado.querySelectorAll("*").forEach(el => {

      const estilos = vista.getComputedStyle(el);


      propiedades.forEach(prop => {

        const valor = estilos.getPropertyValue(prop);


        moderno.lastIndex = 0;


        if (
          valor &&
          moderno.test(valor)
        ) {

          moderno.lastIndex = 0;


          el.style.setProperty(

            prop,

            valor.replace(moderno, aRgba),

            "important"

          );

        }

      });

    });

  }


  /* =====================================================
      21. CAPTURAR RESULTADO
  ===================================================== */

  async function capturarResultado(
    backgroundColor,
    esquinasCuadradas = false
  ) {

    const captura = document.getElementById("captura");


    if (!captura) {

      throw new Error(
        "No se encontró el elemento #captura."
      );

    }


    if (typeof html2canvas !== "function") {

      throw new Error(
        "html2canvas no está disponible."
      );

    }


    const precio = captura.querySelector(
      ".texto-incentivo-precio"
    );


    const estiloOriginal = {

      maxHeight: captura.style.maxHeight,

      overflow: captura.style.overflow,

      height: captura.style.height

    };


    captura.style.maxHeight = "none";

    captura.style.overflow = "visible";

    captura.style.height = "auto";


    if (precio) {

      precio.style.visibility = "hidden";

    }


    try {

      return await html2canvas(captura, {

        backgroundColor,

        scale: 2,

        useCORS: true,

        onclone: docClonado => {

          convertirColoresModernos(
            docClonado
          );


          if (esquinasCuadradas) {

            const copia = docClonado.getElementById(
              "captura"
            );


            if (copia) {

              copia.style.setProperty(
                "border-radius",
                "0",
                "important"
              );

            }

          }

        }

      });

    } finally {

      captura.style.maxHeight =
        estiloOriginal.maxHeight;

      captura.style.overflow =
        estiloOriginal.overflow;

      captura.style.height =
        estiloOriginal.height;


      if (precio) {

        precio.style.visibility = "visible";

      }

    }

  }


  /* =====================================================
      22. COMPARTIR RESULTADO
      MENÚ NATIVO / FALLBACK
  ===================================================== */

  if (btnCompartir) {

    btnCompartir.addEventListener(
      "click",
      async () => {

        const puntajeTotal =
          calcularPuntajeTotal() || 1;


        const porcentaje =
          (score / puntajeTotal) * 100;


        const texto =

          `Obtuve ${score}/${puntajeTotal} puntos (${porcentaje.toFixed(0)}%) en el quiz Clase B en www.memanejo.cl`;


        try {

          if (navigator.share) {

            try {

              const canvas =
                await capturarResultado(null);


              const blob = await new Promise(resolve => {

                canvas.toBlob(
                  resolve,
                  "image/png"
                );

              });


              if (blob) {

                const imagen = new File(

                  [blob],

                  "resultado-quiz-memanejo.png",

                  { type: "image/png" }

                );


                if (
                  navigator.canShare &&
                  navigator.canShare({
                    files: [imagen]
                  })
                ) {

                  await navigator.share({

                    title: "Mi resultado en memanejo.cl",

                    text: texto,

                    files: [imagen]

                  });


                  registrarEvento(
                    "quiz_shared",
                    { share_method: "image" }
                  );


                  return;

                }

              }

            } catch (error) {

              if (error.name === "AbortError") {
                return;
              }

              console.warn(
                "No se pudo compartir la imagen. Se intentará compartir el texto.",
                error
              );

            }


            await navigator.share({

              title: "Mi resultado en memanejo.cl",

              text: texto

            });


            registrarEvento(
              "quiz_shared",
              { share_method: "text" }
            );


            return;

          }


          // Fallback para navegadores sin Web Share.

          if (navigator.clipboard) {

            await navigator.clipboard.writeText(texto);

            alert(
              "Resultado copiado al portapapeles."
            );

            registrarEvento(
              "quiz_shared",
              { share_method: "clipboard" }
            );

          } else {

            window.prompt(
              "Copia tu resultado:",
              texto
            );

          }


        } catch (error) {

          if (error.name !== "AbortError") {

            console.error(
              "No se pudo compartir:",
              error
            );

          }

        }

      }
    );

  }


  /* =====================================================
      23. DESCARGAR RESULTADO PNG
  ===================================================== */

  if (btnDescargar) {

    btnDescargar.addEventListener(
      "click",
      async () => {

        try {

          const canvas = await capturarResultado(
            null,
            true
          );


          const link = document.createElement("a");


          link.download =
            "resultado-quiz-memanejo.png";


          link.href = canvas.toDataURL(
            "image/png"
          );


          link.click();


          registrarEvento(
            "quiz_result_downloaded"
          );


        } catch (error) {

          console.error(
            "Error descargando resultado:",
            error
          );

        }

      }
    );

  }


  /* =====================================================
      24. SIGUIENTE QUIZ
  ===================================================== */

  if (btnNextQuiz) {

    btnNextQuiz.addEventListener("click", () => {

      registrarEvento(
        "quiz_next_clicked"
      );


      window.location.href = NEXT_QUIZ_URL;

    });

  }


  /* =====================================================
      25. REINTENTAR EXAMEN
  ===================================================== */

  if (btnReintentar) {

    btnReintentar.addEventListener("click", () => {

      if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;

      }


      if (feedbackTimeout) {

        clearTimeout(feedbackTimeout);

        feedbackTimeout = null;

      }


      registrarEvento(
        "quiz_retry"
      );


      tiempoElemento.classList.remove("visible");


      modal.classList.add("oculto");


      quizContainer.style.display = "none";


      pantallaBienvenida.style.display = "flex";

      irAlPaso(3, "back");

      formulario.reset();

      resetearEstado();

      resultadoMostrado = false;
      resultadoEnviado = false;

    });

  }


  /* =====================================================
      26. VOLVER AL INICIO
  ===================================================== */

  if (btnVolver) {

    btnVolver.addEventListener("click", () => {

      if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;

      }


      if (feedbackTimeout) {

        clearTimeout(feedbackTimeout);

        feedbackTimeout = null;

      }


      registrarEvento(
        "quiz_back_to_intro"
      );


      tiempoElemento.classList.remove("visible");


      quizContainer.style.display = "none";


      modal.classList.add("oculto");


      pantallaBienvenida.style.display = "flex";


      irAlPaso(1, "back");


      formulario.reset();


      resetearEstado();


      resultadoMostrado = false;

      resultadoEnviado = false;

    });

  }


  /* =====================================================
      27. FUNCIÓN DE PRUEBA
  ===================================================== */

  window.testResultado = function () {

    if (resultadoMostrado) {

      console.warn(
        "Ya existe un resultado mostrado. Reinicia antes de probar."
      );

      return;

    }


    if (!preguntasActuales.length) {

      console.warn(
        "Primero debes iniciar un examen para probar el resultado."
      );

      return;

    }


    score = 33;

    correctasCount = 30;

    erradasCount = 5;


    mostrarResultado();

  };

/* =====================================================
   SLIDER CTA — NAVEGACIÓN COMPLETA
===================================================== */

(() => {

  const track = document.getElementById("memanejoCtaTrack");

  const dots = document.querySelectorAll(
    ".memanejo-cta-pagination .cta-dot"
  );

  const prev = document.querySelector(".memanejo-slider-arrow.prev");
  const next = document.querySelector(".memanejo-slider-arrow.next");

  const current = document.getElementById("cta-current");

  if (!track || !dots.length) return;

  let activeSlide = 0;

  const totalSlides = dots.length;

  function showCtaSlide(index) {

    // Navegación circular
    activeSlide = (index + totalSlides) % totalSlides;

    // Desplazamiento
    track.style.transform = `translateX(-${activeSlide * 33.333333}%)`;

    // Actualizar indicadores
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === activeSlide);
    });

    // Actualizar contador
    if (current) {
      current.textContent = `0${activeSlide + 1}`;
    }

  }

  // INDICADORES

  dots.forEach(dot => {

    dot.addEventListener("click", () => {
      showCtaSlide(Number(dot.dataset.slide));
    });

  });

  // FLECHA IZQUIERDA

  if (prev) {
    prev.addEventListener("click", () => {
      showCtaSlide(activeSlide - 1);
    });
  }

  // FLECHA DERECHA

  if (next) {
    next.addEventListener("click", () => {
      showCtaSlide(activeSlide + 1);
    });
  }

})();
  /* =====================================================
      28. INICIALIZACIÓN FINAL
  ===================================================== */

  console.log(
    "MEMANEJO | Quiz municipal inicializado correctamente."
  );

});
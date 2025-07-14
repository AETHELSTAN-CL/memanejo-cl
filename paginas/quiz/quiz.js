document.addEventListener("DOMContentLoaded", () => {

  const preguntasBase = [
    {
      pregunta: "¿Cuál es la velocidad máxima permitida en zonas urbanas si no hay señalización?",
      respuestas: [
        { texto: "60 km/h", correcta: true },
        { texto: "50 km/h", correcta: false },
        { texto: "40 km/h", correcta: false },
        { texto: "70 km/h", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué debe hacer si sufre un pinchazo en una curva?",
      respuestas: [
        { texto: "Frenar fuerte para detenerse", correcta: false },
        { texto: "Acelerar para salir rápido de la curva", correcta: false },
        { texto: "Sujetar firmemente el volante y reducir velocidad", correcta: true },
        { texto: "Encender luces altas", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Cuál es la función principal del ABS?",
      respuestas: [
        { texto: "Evitar el bloqueo de frenos al frenar bruscamente", correcta: true },
        { texto: "Reducir el consumo de combustible", correcta: false },
        { texto: "Aumentar la potencia del motor", correcta: false },
        { texto: "Mejorar el sonido del escape", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Cuál es la prioridad en un cruce sin señalización?",
      respuestas: [
        { texto: "El que viene por la derecha", correcta: true },
        { texto: "El más rápido", correcta: false },
        { texto: "El más grande", correcta: false },
        { texto: "El que toca la bocina", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Cuándo se debe encender la luz de advertencia de freno de mano?",
      respuestas: [
        { texto: "Cuando está activado el freno de mano", correcta: true },
        { texto: "Cuando el freno de mano está desactivado", correcta: false },
        { texto: "Solo en subidas", correcta: false },
        { texto: "En viajes largos", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué documento NO es obligatorio llevar al conducir?",
      respuestas: [
        { texto: "Cédula de identidad", correcta: false },
        { texto: "Licencia de conducir", correcta: false },
        { texto: "Certificado de revisión técnica", correcta: false },
        { texto: "Boleta del último mantención", correcta: true }
      ],
      puntos: 2
    },
    {
      pregunta: "¿En qué caso se debe encender las luces intermitentes de advertencia?",
      respuestas: [
        { texto: "Al frenar en un semáforo", correcta: false },
        { texto: "Al estacionar", correcta: false },
        { texto: "En situaciones de emergencia", correcta: true },
        { texto: "Al adelantar", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué indica una línea continua en la calzada?",
      respuestas: [
        { texto: "Puede adelantar con precaución", correcta: false },
        { texto: "Debe cambiarse de pista", correcta: false },
        { texto: "Prohibido adelantar o cambiar de pista", correcta: true },
        { texto: "Zona escolar", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué distancia mínima debe mantener respecto al vehículo delantero?",
      respuestas: [
        { texto: "10 metros", correcta: false },
        { texto: "La necesaria para evitar una colisión", correcta: true },
        { texto: "2 metros", correcta: false },
        { texto: "No importa si hay tráfico", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué debe hacer ante una luz amarilla intermitente?",
      respuestas: [
        { texto: "Detenerse siempre", correcta: false },
        { texto: "Acelerar para pasar rápido", correcta: false },
        { texto: "Reducir la velocidad y tener precaución", correcta: true },
        { texto: "Ignorarla si no hay tránsito", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué elemento reduce el riesgo de lesiones en un accidente?",
      respuestas: [
        { texto: "Apoyacabezas", correcta: false },
        { texto: "Sistema ABS", correcta: false },
        { texto: "Cinturón de seguridad", correcta: true },
        { texto: "Neumáticos anchos", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Cuándo es obligatorio encender luces durante el día?",
      respuestas: [
        { texto: "Nunca", correcta: false },
        { texto: "En condiciones de baja visibilidad", correcta: true },
        { texto: "Cuando está lloviendo solamente", correcta: false },
        { texto: "En ciudad solamente", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué indica una señal con un círculo rojo y una bicicleta en el centro?",
      respuestas: [
        { texto: "Estacionamiento exclusivo", correcta: false },
        { texto: "Ruta recomendada", correcta: false },
        { texto: "Prohibición para bicicletas", correcta: true },
        { texto: "Zona escolar", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué hacer si el vehículo comienza a patinar?",
      respuestas: [
        { texto: "Frenar bruscamente", correcta: false },
        { texto: "Girar en sentido opuesto", correcta: false },
        { texto: "Girar suavemente en la misma dirección del patinaje", correcta: true },
        { texto: "Apagar el motor", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué significa una señal triangular con borde rojo y un símbolo de ceda el paso?",
      respuestas: [
        { texto: "Obligación de detenerse", correcta: false },
        { texto: "Advertencia de curva peligrosa", correcta: false },
        { texto: "Debe ceder el paso", correcta: true },
        { texto: "Ruta exclusiva", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué tipo de cruces se consideran más peligrosos?",
      respuestas: [
        { texto: "Rotondas", correcta: false },
        { texto: "Cruces en “T” sin señalización", correcta: true },
        { texto: "Cruces con semáforos", correcta: false },
        { texto: "Cruces con paso peatonal", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Cuándo se permite usar el claxon?",
      respuestas: [
        { texto: "Para saludar a amigos", correcta: false },
        { texto: "En situaciones de emergencia o advertencia", correcta: true },
        { texto: "Al adelantar", correcta: false },
        { texto: "En zonas escolares", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué efecto tiene el alcohol en la conducción?",
      respuestas: [
        { texto: "Aumenta la concentración", correcta: false },
        { texto: "Mejora los reflejos", correcta: false },
        { texto: "Reduce la percepción y el tiempo de reacción", correcta: true },
        { texto: "No tiene efecto", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Cuándo se considera que un conductor está bajo los efectos del alcohol en Chile?",
      respuestas: [
        { texto: "A partir de 0,3 g/L", correcta: true },
        { texto: "Desde 0,8 g/L", correcta: false },
        { texto: "Desde 1,5 g/L", correcta: false },
        { texto: "A cualquier nivel", correcta: false }
      ],
      puntos: 2
    },
    {
      pregunta: "¿Qué significa una señal azul con una flecha blanca hacia arriba?",
      respuestas: [
        { texto: "Curva obligatoria", correcta: false },
        { texto: "Siga de frente", correcta: true },
        { texto: "Giro a la derecha", correcta: false },
        { texto: "Desvío", correcta: false }
      ],
      puntos: 2
    }
  ];

  const preguntasAvanzadas = [
    {
      pregunta: "¿Cuál es el nivel máximo de alcohol permitido en sangre para conductores profesionales en Chile?",
      respuestas: [
        { texto: "0,3 g/L", correcta: false },
        { texto: "0,0 g/L", correcta: true },
        { texto: "0,4 g/L", correcta: false },
        { texto: "0,8 g/L", correcta: false }
      ],
      puntos: 3
    },
    {
      pregunta: "¿En qué situación debe utilizarse la luz de retroceso?",
      respuestas: [
        { texto: "Solo cuando retrocede y hay peatones cerca", correcta: false },
        { texto: "Cada vez que retrocede", correcta: true },
        { texto: "Solo en la noche", correcta: false },
        { texto: "Cuando el vehículo está detenido", correcta: false }
      ],
      puntos: 3
    },
    {
      pregunta: "¿Qué sanción corresponde a conducir sin haber obtenido licencia?",
      respuestas: [
        { texto: "Multa leve", correcta: false },
        { texto: "Multa grave y retención del vehículo", correcta: true },
        { texto: "Solo una advertencia", correcta: false },
        { texto: "Arresto inmediato", correcta: false }
      ],
      puntos: 3
    },
    {
      pregunta: "¿Qué medida reduce la posibilidad de que el vehículo derrape en una curva?",
      respuestas: [
        { texto: "Frenar dentro de la curva", correcta: false },
        { texto: "Acelerar a fondo", correcta: false },
        { texto: "Reducir velocidad antes de la curva", correcta: true },
        { texto: "Tomarla por el interior", correcta: false }
      ],
      puntos: 3
    },
    {
      pregunta: "¿Cuándo debe utilizar cadenas en los neumáticos?",
      respuestas: [
        { texto: "En caminos con barro", correcta: false },
        { texto: "En caminos con nieve o hielo", correcta: true },
        { texto: "En caminos urbanos", correcta: false },
        { texto: "En autopistas", correcta: false }
      ],
      puntos: 3
    },
    {
      pregunta: "¿Qué debe hacer si un semáforo está apagado?",
      respuestas: [
        { texto: "Ignorarlo", correcta: false },
        { texto: "Cruzar sin mirar", correcta: false },
        { texto: "Tratar el cruce como no regulado y ceder el paso", correcta: true },
        { texto: "Esperar una patrulla", correcta: false }
      ],
      puntos: 3
    },
    {
      pregunta: "¿Qué indica una señal con una X roja sobre un semáforo de pista?",
      respuestas: [
        { texto: "Gire a la izquierda", correcta: false },
        { texto: "Carril cerrado", correcta: true },
        { texto: "Carril exclusivo", correcta: false },
        { texto: "Baje la velocidad", correcta: false }
      ],
      puntos: 3
    },
    {
      pregunta: "¿En qué momento debe realizarse la primera mantención a un auto nuevo?",
      respuestas: [
        { texto: "A los 20.000 km", correcta: false },
        { texto: "A los 10.000 km", correcta: false },
        { texto: "Según lo indique el fabricante", correcta: true },
        { texto: "Nunca, si es nuevo", correcta: false }
      ],
      puntos: 3
    },
    {
      pregunta: "¿Cuál es el procedimiento correcto al detenerse en una cuesta?",
      respuestas: [
        { texto: "Usar solo el freno de pie", correcta: false },
        { texto: "Usar el freno de mano y embrague", correcta: true },
        { texto: "Apagar el motor", correcta: false },
        { texto: "Mantenerlo solo con el embrague", correcta: false }
      ],
      puntos: 3
    },
    {
      pregunta: "¿Qué indica una señal amarilla con una cruz negra?",
      respuestas: [
        { texto: "Cruce ferroviario", correcta: true },
        { texto: "Cruce peatonal", correcta: false },
        { texto: "Paso bajo nivel", correcta: false },
        { texto: "Cruce peligroso", correcta: false }
      ],
      puntos: 3
    }
  ];
  let indice = 0;
  let score = 0;
  let preguntasActuales = preguntasBase;

  const preguntaElemento = document.getElementById('question');
  const respuestasElemento = document.getElementById('answer-buttons');
  const btnSiguiente = document.getElementById('next-btn');
  const progresoElemento = document.getElementById('progress');
  const resultadoContenedor = document.getElementById('result');
  const scoreText = document.getElementById('scoreText');
  const btnCompartir = document.getElementById('shareBtn');
  const btnReintentar = document.getElementById('btn-reintentar');

  function startQuiz() {
    indice = 0;
    score = 0;
    resultadoContenedor.classList.add('hide');
    document.getElementById('modal-memanejo').classList.add('oculto');
    btnSiguiente.style.display = 'none';
    respuestasElemento.style.display = 'block';
    mostrarPregunta();
  }

  function mostrarPregunta() {
    resetearEstado();
    const q = preguntasActuales[indice];
    if (!q) return;
    preguntaElemento.innerText = q.pregunta;
    progresoElemento.innerText = `Pregunta ${indice + 1} de ${preguntasActuales.length}`;
    q.respuestas.forEach(r => {
      const btn = document.createElement('button');
      btn.innerText = r.texto;
      btn.classList.add('btn', 'btn-outline-primary', 'mb-2', 'w-100');
      btn.dataset.correcta = r.correcta ? "true" : "false";
      btn.addEventListener('click', seleccionarRespuesta);
      respuestasElemento.appendChild(btn);
    });
  }

  function resetearEstado() {
    btnSiguiente.style.display = 'none';
    while (respuestasElemento.firstChild) {
      respuestasElemento.removeChild(respuestasElemento.firstChild);
    }
  }

  function seleccionarRespuesta(e) {
    const seleccion = e.target;
    const correcta = seleccion.dataset.correcta === "true";
    const puntos = preguntasActuales[indice].puntos;
    if (correcta) score += puntos;

    Array.from(respuestasElemento.children).forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.correcta === "true") {
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
      }
    });

    btnSiguiente.style.display = 'inline-block';
  }

  btnSiguiente.addEventListener('click', () => {
    indice++;
    if (indice < preguntasActuales.length) {
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  });

  function mostrarResultado() {
    preguntaElemento.innerText = "✅ Has completado el quiz";
    progresoElemento.innerText = "Resultado Final";
    scoreText.innerText = `Obtuviste ${score} puntos de ${calcularPuntajeTotal()} posibles.`;
    respuestasElemento.style.display = 'none';
    btnSiguiente.style.display = 'none';
    resultadoContenedor.classList.remove('hide');

    // Mostrar modal
    const texto = `Obtuviste ${score} puntos de ${calcularPuntajeTotal()} posibles.`;
    document.getElementById('texto-puntaje').innerText = texto;
    document.getElementById('modal-memanejo').classList.remove('oculto');

    // Twitter
    const textoParaCompartir = encodeURIComponent(`Obtuve ${score} puntos en el quiz Clase B 🚗 en www.memanejo.cl`);
    btnCompartir.href = `https://twitter.com/intent/tweet?text=${textoParaCompartir}`;
  }

  function calcularPuntajeTotal() {
    return preguntasActuales.reduce((acc, p) => acc + p.puntos, 0);
  }

  // Reintentar
  btnReintentar.addEventListener('click', startQuiz);

  // Cerrar modal
  document.getElementById('cerrar-modal-memanejo').addEventListener('click', () => {
    document.getElementById('modal-memanejo').classList.add('oculto');
  });

  // Descargar imagen
  document.getElementById('btn-descargar-img').addEventListener('click', () => {
    const resultado = document.getElementById('captura');
    html2canvas(resultado).then(canvas => {
      const link = document.createElement('a');
      link.download = 'resultado-quiz-memanejo.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  });

  startQuiz();
});
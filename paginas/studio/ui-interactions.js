document.addEventListener("DOMContentLoaded", () => {
  // Videos autoplay
  document.querySelectorAll("video").forEach(video => {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) playPromise.catch(err => console.log(err));
  });

  // AOS
  AOS.init();

  // Modal y botones
  const btnRaver = document.getElementById("abrirModal1");
  const modal1 = document.getElementById("modal1");
  const modal2 = document.getElementById("modal2");
  const input = document.getElementById("codigoInput");
  const canvas = document.getElementById("qrcode");

  let codigosValidos = {}; // se llenará desde JSON

  // Cargar códigos desde JSON
  fetch("data/codigos.json")
    .then(response => response.json())
    .then(data => { codigosValidos = data; })
    .catch(err => { console.error("Error al cargar los códigos:", err); });

  btnRaver.addEventListener("click", () => modal1.classList.add("mostrar"));

  window.onclick = e => {
    if (e.target.classList.contains("modal")) e.target.classList.remove("mostrar");
  };

  window.cerrarModal = id => document.getElementById(id).classList.remove("mostrar");

  window.validarCodigo = () => {
    const codigo = input.value.trim().toUpperCase();

    if (!codigosValidos.hasOwnProperty(codigo)) {
      alert("Código inválido.");
      return;
    }
    if (codigosValidos[codigo] === true) {
      alert("Código ya utilizado.");
      return;
    }

    codigosValidos[codigo] = true; // marcar usado en memoria
    cerrarModal("modal1");
    modal2.classList.add("mostrar");

    setTimeout(() => {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      const qrLink = `https://www.memanejo.cl/paginas/studio/raver-id/verificacion.html?codigo=${codigo}`;
      QRCode.toCanvas(canvas, qrLink, { width: 200 }, err => {
        if (err) console.error("Error generando QR:", err);
        else console.log("QR generado para:", codigo);
      });
    }, 50);
  };
});
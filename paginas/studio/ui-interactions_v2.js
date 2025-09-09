document.addEventListener("DOMContentLoaded", () => {
  // Videos autoplay
  document.querySelectorAll("video").forEach(video => {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) playPromise.catch(err => console.log("Autoplay error:", err));
  });

  // Inicializar AOS
  AOS.init();

  // Modales y botones
  const btnRaver = document.getElementById("abrirModal1");
  const modal1 = document.getElementById("modal1");
  const modal2 = document.getElementById("modal2");
  const inputCodigo = document.getElementById("codigoInput");
  const inputCorreo = document.getElementById("correoInput"); // Nuevo input para correo
  const loadingText = document.getElementById("loadingText"); // span o p para indicar carga

  btnRaver.addEventListener("click", () => modal1.classList.add("mostrar"));

  window.onclick = e => {
    if (e.target.classList.contains("modal")) e.target.classList.remove("mostrar");
  };

  window.cerrarModal = id => document.getElementById(id).classList.remove("mostrar");

  window.validarCodigo = () => {
    const codigo = inputCodigo.value.trim().toUpperCase();
    const correo = inputCorreo.value.trim().toLowerCase();

    if (!codigo || !correo) {
      alert("Debes ingresar código y correo.");
      return;
    }

    loadingText.style.display = "inline"; // mostrar indicador de carga

    fetch(`raver-id/validar.php?codigo=${codigo}&correo=${correo}`)
      .then(res => res.json())
      .then(data => {
        loadingText.style.display = "none"; // ocultar indicador de carga

        if (data.status === "invalido") {
          alert("Código inválido o correo no coincide.");
        } else if (data.status === "qr_usado") {
          alert(`Este código ya generó un QR previamente: ${data.nombre}`);
        } else if (data.status === "ok") {
          cerrarModal("modal1");
          modal2.classList.add("mostrar");

          setTimeout(() => {
            const qrLink = `https://www.memanejo.cl/paginas/studio/raver-id/validacion.php?codigo=${codigo}`;
            const canvas = document.getElementById("qrcode");
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            QRCode.toCanvas(canvas, qrLink, { width: 200 }, err => {
              if (err) console.error("Error generando QR:", err);
              else console.log("QR generado para:", codigo);
            });
          }, 50);
        }
      })
      .catch(err => {
        loadingText.style.display = "none";
        console.error("Error al consultar el código:", err);
        alert("Error al validar código, intenta nuevamente.");
      });
  };

  // Texto rotativo social
  document.querySelectorAll('.social-link').forEach(link => {
    const span = link.querySelector('.social-text');
    const textos = link.dataset.textos.split(',');
    let idx = 0;
    span.textContent = textos[idx];
    setInterval(() => {
      idx = (idx + 1) % textos.length;
      span.textContent = textos[idx];
    }, 2500);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  let catalogo = [
    {
      id: 1,
      nombre: "Filtro de Aire",
      modelo: "Kia Morning 1.0L | 1.2L",
      precio: "$11.990",
      imagen: "imagenes/repuestos/kia/kiamorning1.0-1.22.jpg.webp",
      miniaturas: [
        "imagenes/repuestos/kia/kiamorning1.0-1.2.jpg.webp",
        "imagenes/repuestos/kia/kiamorning1.0-1.22.jpg.webp",
        "imagenes/repuestos/kia/kiamorning1.2.jpg",

      ],
      detalles: "Motor G3LA | G4LA<br>Año: 2011 | 2017",
      codigoOEM: "281131Y100"
    },
    {
      id: 2,
      nombre: "Filtro de Aceite",
      modelo: "Hyundai i10 | Kia Morning",
      precio: "$9.990",
      imagen: "imagenes/repuestos/kia/photo-output.jpeg",
      miniaturas: [
        "imagenes/repuestos/hyundai/photo-output.jpeg",
        "imagenes/repuestos/kia/photo-output.jpeg",

      ],
      detalles: "Compatibilidad:  Accent - Morning - Rio 4 | 5 - Kia	Sportage	G4NA 16 Valvulas 2.0L	2019 - 2021<br>Kia	Soul	G4FG 16 Valvulas 1.6L	2014 - 2019<br>Kia	Sorento	G4KE 16 Valvulas 2.4L	2018 - 2021<br>Kia	Rio 4	G4FA 16 Valvulas 1.4L	2015 - 2017<br>Kia	Rio JB	G4EE 16 Valvulas 1.4L	2006 - 2012 Kia	Cerato	G4FG 16 Valvulas 1.6L	2016 - 2018<br>Kia	Cerato C	G4FC 16 Valvulas 1.6L	2009 - 2013<br>Hyundai	Getz	G4ED 16 Valvulas 1.6L	2006 - 2010<br>Hyundai	Getz	G4EE 16 Valvulas 1.4L	2006 - 2011<br>Hyundai	I30	G4FC 16 Valvulas 1.6L	2007 - 2011<br>Hyundai	Elantra	G4FG 16 Valvulas 1.6L	2016 - 2019<br>Hyundai	I30	G4NB 16 Valvulas 1.8L	2013 - 2014",
      codigoOEM: "2630035503"
    },
    {
      id: 3,
      nombre: "Filtro de Aire",
      modelo: "Hyundai Grand i10",
      precio: "$11.990",
      imagen: "imagenes/repuestos/hyundai/filtrodeaire.jpg.webp",
      miniaturas: [
        "imagenes/repuestos/hyundai/filtroairehyi10.webp",
        "imagenes/repuestos/hyundai/filtrodeaire.jpg.webp",

      ],
      detalles: "Hyundai	Grand I10 Hatchback	G3LA 12 Valvulas 1.0L	2014 - 2016<br>Hyundai	Grand I10 Hatchback	G4LA 16 Valvulas 1.2L	2014 - 2016<br>Hyundai	Grand I10 Hatchback	G3LA 12 Valvulas 1.0L	2017 - 2021<br>Hyundai	Grand I10 Hatchback	G4LA 16 Valvulas 1.2L	2017 - 2021",
      codigoOEM: "28113B4000"
    },
    {
      id: 4,
      nombre: "Kit Mantención",
      modelo: "Suzuki Baleno",
      precio: "$49.990",
      imagen: "imagenes/repuestos/suzuki/repuesto1.jpeg",
      miniaturas: [
        "imagenes/repuestos/suzuki/sbaleno2.jpg",
        "imagenes/repuestos/suzuki/sbaleno.jpg",
        "imagenes/repuestos/suzuki/repuesto1.jpeg"
      ],
      detalles: "Oferta de Temporada",
      codigoOEM: "Suzuki Genuine Parts"
    },
    {
      id: 5,
      nombre: "Aceite de Motor 5w30",
      modelo: "ACDelco Dexos-1 Gen2 | 4L",
      precio: "$39.990",
      imagen: "imagenes/repuestos/chevrolet/photo-output.jpeg",
      miniaturas: [
        "imagenes/repuestos/chevrolet/acdelcologo.jpg",
        "imagenes/repuestos/chevrolet/photo-output.jpeg"
      ],
      detalles: "Oferta de Temporada",
      codigoOEM: "Suzuki Genuine Parts"
    },

    {
      id: 6,
      nombre: "Kit Mantención",
      modelo: "Chevrolet Sail 1.5L | Año: 2024-2025",
      precio: "$79.990",
      imagen: "imagenes/repuestos/chevrolet/photo-output_3.jpeg",
      miniaturas: [
        "imagenes/repuestos/chevrolet/photo-output_0.jpeg",
        "imagenes/repuestos/chevrolet/photo-output_1.jpeg",
        "imagenes/repuestos/chevrolet/photo-output_2.jpeg",
        "imagenes/repuestos/chevrolet/photo-output_4.jpeg",
        "imagenes/repuestos/chevrolet/photo-output_3.jpeg"
      ],
      detalles: "Nuevos Productos",
      codigoOEM: "AC Delco Genuine Parts"
    },
    {
      id: 7,
      nombre: "Kit Filtros | Volkswagen Nivus",
      modelo: "Año: 2024-2025 | Genuine Parts MAHLE",
      precio: "$64.990",
      imagen: "imagenes/repuestos/volkswagen/kit-fil-air-oil-pol-mahle-nivus.jpeg",
      miniaturas: [
        "imagenes/repuestos/volkswagen/fil-pol-mahle-nivus.jpeg",
        "imagenes/repuestos/volkswagen/fil-air-mahle-nivus-2.jpeg",
        "imagenes/repuestos/volkswagen/kit-fil-air-oil-pol-mahle-nivus.jpeg",
        "imagenes/repuestos/volkswagen/fil-oil-mahle-nivus.jpeg"
      ],
      detalles: "Nuevos Productos | Incluye: Filtro de Aire, Filtro de Habitaculo y Filtro de Aceite",
      codigoOEM: "MAHLE Genuine Parts"
    },
    {
      id: 8,
      nombre: "Filtro de Aire | Volkswagen Nivus",
      modelo: "Año: 2024-2025 | Genuine Parts MAHLE",
      precio: "$26.990",
      imagen: "imagenes/repuestos/volkswagen/fil.air-mahle-nivus.jpeg",
      miniaturas: [
        "imagenes/repuestos/volkswagen/fil-air-mahle-nivus-2.jpeg",
        "imagenes/repuestos/volkswagen/fil.air-mahle-nivus.jpeg",
      ],
      detalles: "Compatibilidad: LX 4354",
      codigoOEM: "MAHLE Genuine Parts"
    },
    {
      id: 9,
      nombre: "Filtro de Aceite | Volkswagen Nivus",
      modelo: "Año: 2024-2025 | Genuine Parts MAHLE",
      precio: "$18.990",
      imagen: "imagenes/repuestos/volkswagen/fil-oil-mahle-nivus.jpeg",
      miniaturas: [
        "imagenes/repuestos/volkswagen/fil-oil-mahle-nivus.jpeg",

      ],
      detalles: "Compatibilidad: OC 1449",
      codigoOEM: "MAHLE Genuine Parts"
    },
    {
      id: 10,
      nombre: "Filtro de Polen | Volkswagen Nivus",
      modelo: "Año: 2024-2025 | Genuine Parts MAHLE",
      precio: "$27.990",
      imagen: "imagenes/repuestos/volkswagen/fil-la816-3-mahle-nivus.jpeg",
      miniaturas: [
        "imagenes/repuestos/volkswagen/fil-la816-3-mahle-nivus.jpeg",
        "imagenes/repuestos/volkswagen/fil-pol-mahle-nivus-la816-3.jpeg",
        "imagenes/repuestos/volkswagen/fil-pol-mahle-nivus.jpeg"
      ],
      detalles: "Compatibilidad: LA 816/3 | Virtus | T- Cross | Polo",
      codigoOEM: "MAHLE Genuine Parts"
    }

  ];

  let carrito = [];
  let productoEnDetalle = null;
  let codigoDescuento = ''; // Guarda el código de descuento activo

  const catalogoContainer = document.getElementById('catalogo');
  const filtroInput = document.getElementById('filtroInput');
  const carritoModal = document.getElementById('carritoModal');
  const cerrarCarritoModal = document.getElementById('cerrarCarritoModal');
  const listaCarritoModal = document.getElementById('listaCarritoModal');
  const resumenCarritoModal = document.getElementById('resumenCarritoModal');
  const copiarTransferenciaBtn = document.getElementById('copiarTransferenciaBtn');
  const solicitarRepuestosBtn = document.getElementById('solicitarRepuestosBtn');
  const verCarritoBtn = document.getElementById('verCarritoBtn');
  const modal = document.getElementById('modal');

  const aplicarDescuentoBtn = document.getElementById('aplicarDescuentoBtn');
  const codigoDescuentoInput = document.getElementById('codigoDescuentoInput');
  const mensajeDescuento = document.getElementById('mensajeDescuento');

  function precioANumero(precioStr) {
    return Number(precioStr.replace(/\./g, '').replace('$', ''));
  }

  function numeroAPrecio(num) {
    return '$' + num.toLocaleString('es-CL');
  }

  function mostrarCatalogo(filtro = '') {
    catalogoContainer.innerHTML = '';
    const productosFiltrados = catalogo.filter(producto =>
      producto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      producto.modelo.toLowerCase().includes(filtro.toLowerCase())
    );

productosFiltrados.forEach(producto => {
  const card = document.createElement('div');
  card.classList.add('col-6', 'col-md-4', 'mb-4');
  card.innerHTML = `
    <div class="card">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title mb-1">${producto.nombre}</h5>
        <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 0.5rem;">${producto.modelo}</p>
        <p class="card-text">${producto.precio}</p>
        <button class="btn btn-primary"
          style="padding: 0.4rem 1.2rem; color: white; font-size: 0.65rem; border-radius: 0.25rem;"
          onclick="verProducto(${producto.id})">Ver Más</button>
      </div>
    </div>
  `;
  catalogoContainer.appendChild(card);
});

  }

  window.verProducto = function (id) {
    const producto = catalogo.find(p => p.id === id);
    if (!producto) return;
    productoEnDetalle = producto;
    document.getElementById('titulo').innerText = producto.nombre;
    document.getElementById("modelo").innerHTML = `<i class="bi bi-car-front"></i> ${producto.modelo}`;
    document.getElementById('precio').innerText = producto.precio;
    document.getElementById('imagen-principal').src = producto.imagen;
    document.getElementById("detalles").innerHTML = producto.detalles;
    document.getElementById('codigo-oem').innerText = "Código OEM: " + producto.codigoOEM;

    const miniaturas = document.getElementById('miniaturas');
    miniaturas.innerHTML = '';
    producto.miniaturas.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.onclick = () => {
        document.getElementById('imagen-principal').src = src;
      };
      miniaturas.appendChild(img);
    });

    modal.style.display = 'flex';
  };

  const cerrarModalBtn = document.getElementById('cerrarModalBtn');
  if (cerrarModalBtn) cerrarModalBtn.onclick = () => modal.style.display = 'none';
  if (cerrarCarritoModal) cerrarCarritoModal.onclick = () => carritoModal.style.display = 'none';

  if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
  if (carritoModal) carritoModal.addEventListener('click', e => { if (e.target === carritoModal) carritoModal.style.display = 'none'; });

  window.solicitarRepuesto = function () {
    if (!productoEnDetalle) return;
    carrito.push(productoEnDetalle);
    alert("Producto agregado al carrito");
    modal.style.display = 'none';
    mostrarCarrito(); // Actualiza carrito tras agregar producto
  };

  function mostrarCarrito() {
    listaCarritoModal.innerHTML = '';

    carrito.forEach(producto => {
      const li = document.createElement('li');
      let precioOriginal = precioANumero(producto.precio);
      let precioFinal = precioOriginal;

      if (codigoDescuento === 'YOMEMANEJO') {
        precioFinal = Math.round(precioOriginal * 0.9);
      }

      li.textContent = `${producto.nombre} - ${numeroAPrecio(precioFinal)}`;
      listaCarritoModal.appendChild(li);
    });

    const total = carrito.reduce((sum, p) => {
      let precioOriginal = precioANumero(p.precio);
      if (codigoDescuento === 'YOMEMANEJO') {
        return sum + Math.round(precioOriginal * 0.9);
      }
      return sum + precioOriginal;
    }, 0);

    resumenCarritoModal.innerText = `Total: ${numeroAPrecio(total)}` + (codigoDescuento === 'YOMEMANEJO' ? ' (10% descuento aplicado)' : '');

    const datosTransferencia = document.getElementById('datosTransferencia');
    if (datosTransferencia) {
      let texto = carrito.map(p => {
        let precioOriginal = precioANumero(p.precio);
        let precioFinal = precioOriginal;
        if (codigoDescuento === 'YOMEMANEJO') precioFinal = Math.round(precioOriginal * 0.9);
        return `${p.nombre} - ${numeroAPrecio(precioFinal)}`;
      }).join('\n');
      texto += `\n\n${resumenCarritoModal.innerText}`;
      datosTransferencia.value = texto;
    }
  }

  const frases = [
    "Buscar por marca, modelo o producto...",
    "Filtro de aire",
    "aceite, ofertas...",
    "Kia, Hyundai, Chevrolet, Volkswagen..."
    
  ];

  let indexFrase = 0;
  let indexLetra = 0;
  let placeholderElement = document.getElementById("filtroInput"); // o "placeholderName"

  function escribirFrase() {
    if (indexLetra <= frases[indexFrase].length) {
      placeholderElement.placeholder = frases[indexFrase].substring(0, indexLetra);
      indexLetra++;
      setTimeout(escribirFrase, 100); // velocidad de tipeo
    } else {
      setTimeout(borrarFrase, 2000); // espera antes de borrar
    }
  }

  function borrarFrase() {
    if (indexLetra >= 0) {
      placeholderElement.placeholder = frases[indexFrase].substring(0, indexLetra);
      indexLetra--;
      setTimeout(borrarFrase, 50); // velocidad de borrado
    } else {
      indexFrase = (indexFrase + 1) % frases.length;
      setTimeout(escribirFrase, 500);
    }
  }

  escribirFrase();

  window.vaciarCarrito = function () {
    carrito = [];
    codigoDescuento = ''; // también resetea el código al vaciar carrito
    mostrarCarrito();
    if (codigoDescuentoInput) codigoDescuentoInput.value = '';
    if (mensajeDescuento) mensajeDescuento.textContent = '';
  };

  if (verCarritoBtn) {
    verCarritoBtn.onclick = () => {
      carritoModal.style.display = 'flex';
      mostrarCarrito();
    };
  }

  if (aplicarDescuentoBtn && codigoDescuentoInput && mensajeDescuento) {
    aplicarDescuentoBtn.onclick = () => {
      const codigo = codigoDescuentoInput.value.trim().toUpperCase();
      if (codigo === 'YOMEMANEJO') {
        codigoDescuento = 'YOMEMANEJO';
        mensajeDescuento.style.color = 'green';
        mensajeDescuento.textContent = 'Código válido: 10% de descuento aplicado.';
      } else if (codigo === '') {
        codigoDescuento = '';
        mensajeDescuento.textContent = '';
      } else {
        codigoDescuento = '';
        mensajeDescuento.style.color = 'red';
        mensajeDescuento.textContent = 'Código inválido.';
      }
      mostrarCarrito();
    };
  }

  if (filtroInput) {
    filtroInput.addEventListener('input', e => {
      mostrarCatalogo(e.target.value);
    });
  }

  if (copiarTransferenciaBtn) {
    copiarTransferenciaBtn.onclick = () => {
      const texto = `Nombre: Leonardo Aguirre Suazo
Banco: BCI
Cuenta Corriente: 777917424056
RUT: 17.424.056-6
Correo: leonardo.azo@memanejo.cl`;

      navigator.clipboard.writeText(texto).then(() => {
        alert("Datos de transferencia copiados al portapapeles.");
      }).catch(() => {
        alert("Hubo un error al copiar.");
      });
    };
  }

  if (solicitarRepuestosBtn) {
    solicitarRepuestosBtn.onclick = () => {
      const listaItems = carrito.map(p => {
        const precioOriginal = precioANumero(p.precio);
        const precioFinal = codigoDescuento === 'YOMEMANEJO' ? Math.round(precioOriginal * 0.9) : precioOriginal;
        return `${p.nombre} (${p.modelo}) - ${numeroAPrecio(precioFinal)}`;
      }).join('\n');

      const total = resumenCarritoModal.innerText;
      const mensaje = encodeURIComponent(`Hola, quisiera solicitar estos repuestos y coordinar el envío o retiro de mi pedido:\n\n${listaItems}\n\n${total}`);
      const telefono = '56946914558';
      window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
    };
  }

const input = document.getElementById("inputRepuesto");
const ghost = document.getElementById("ghostRepuesto");
const mensaje = document.getElementById("mensajeRepuesto");

const repuestosDisponibles = [
  "homocinética",
  "bujías",
  "pastillas de freno",
  "sensor abs",
  "radiador",
  "aceite 10w40",
  "amortiguadores",
  "kit distribución",
  "Accent",
  "focos delanteros",
  "Volkswagen Virtus",
  "308",
  "Santa Fe",
  "Peugeot 3008",
  "Nissan",
  "bieletas",
  "correa de distribución",
  "parachoques",
  "fuelles"
];

input.addEventListener("input", () => {
  const valor = input.value.trim().toLowerCase();
  ghost.value = "";
  mensaje.innerHTML = "";

  if (!valor) return;

  const sugerido = repuestosDisponibles.find(p => p.toLowerCase().startsWith(valor));
  if (sugerido && sugerido.toLowerCase() !== valor) {
    const faltante = sugerido.slice(valor.length);
    ghost.value = valor + faltante;
  }

  const encontrado = repuestosDisponibles.some(p => p.toLowerCase() === valor);

  if (valor.length >= 4 && !encontrado) {
    mensaje.innerHTML = `
      <span class="text-warning">❌ No está en el catálogo, pero lo podemos traer para ti.<br>
      <a href="https://www.memanejo.cl/#contact" class="btn btn-warning btn-sm mt-2">Contáctanos</a></span>`;
  } else if (encontrado) {
    mensaje.innerHTML = `<span class="text-success">✅ ¡Disponible en el catálogo!</span>`;
  }
});

input.addEventListener("keydown", (e) => {
  if (ghost.value && e.key === "Tab") {
    e.preventDefault();
    input.value = ghost.value;
    ghost.value = "";
  }
});
// Función para activar el acordeón
const acordeonBotones = document.querySelectorAll('.acordeon-titulo');

acordeonBotones.forEach(boton => {
  boton.addEventListener('click', () => {
    const contenedor = boton.parentElement;
    contenedor.classList.toggle('acordeon-activo');
  });
});

  mostrarCatalogo();
});


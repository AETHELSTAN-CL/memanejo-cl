document.addEventListener('DOMContentLoaded', () => {
  let catalogo = [
    {
      id: 1,
      nombre: "Filtro de Aire",
      marca: "Kia Morning",
      modelo: "Motor: 1.0L - 1.2L",
      precio: "$11.990",
      imagen: "imagenes/repuestos/kia/kiamorning1.0-1.22.jpg.webp",
      miniaturas: [
        "imagenes/repuestos/kia/kiamorning1.0-1.2.jpg.webp",
        "imagenes/repuestos/kia/kiamorning1.0-1.22.jpg.webp",
        "imagenes/repuestos/kia/kiamorning1.2.jpg",

      ],
      detalles: "Motor G3LA | G4LA | Año: 2011 - 2017",
      codigoOEM: "281131Y100"
    },
    {
      id: 2,
      nombre: "Filtro de Aceite",
      marca: "Hyundai i10   Kia Morning",
      modelo: "Motor: 1.0L - 1.2L",
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
      marca: "Hyundai Grand i10",
      modelo: "Motor: 1.0L - 1.2L",
      precio: "$11.990",
      imagen: "imagenes/repuestos/hyundai/filtrodeaire.jpg.webp",
      miniaturas: [
        "imagenes/repuestos/hyundai/filtroairehyi10.webp",
        "imagenes/repuestos/hyundai/filtrodeaire.jpg.webp",

      ],
      detalles: "Hyundai	Grand i10 Hatchback	G3LA 12 Valvulas 1.0L	2014 - 2016<br>Hyundai	Grand i10 Hatchback	G4LA 16 Valvulas 1.2L	2014 - 2016<br>Hyundai	Grand i10 Hatchback	G3LA 12 Valvulas 1.0L	2017 - 2021<br>Hyundai	Grand i10 Hatchback	G4LA 16 Valvulas 1.2L	2017 - 2021",
      codigoOEM: "28113B4000"
    },
    {
      id: 4,
      nombre: "Kit Mantención",
      marca: "Suzuki Baleno",
      modelo: "Año: 2024 - 2025",
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
      marca: "ACDelco",
      modelo: "Dexos-1 Gen2 | 4L",
      precio: "$39.990",
      imagen: "imagenes/repuestos/chevrolet/photo-output.jpeg",
      miniaturas: [
        "imagenes/repuestos/chevrolet/acdelcologo.jpg",
        "imagenes/repuestos/chevrolet/photo-output.jpeg"
      ],
      detalles: "Oferta de Temporada",
      codigoOEM: "ACDelco Genuine Parts"
    },

    {
      id: 6,
      nombre: "Kit Mantención",
      marca: "Chevrolet Sail",
      modelo: "Motor: 1.5L",
      precio: "$79.990",
      imagen: "imagenes/repuestos/chevrolet/photo-output_3.jpeg",
      miniaturas: [
        "imagenes/repuestos/chevrolet/photo-output_0.jpeg",
        "imagenes/repuestos/chevrolet/photo-output_1.jpeg",
        "imagenes/repuestos/chevrolet/photo-output_2.jpeg",
        "imagenes/repuestos/chevrolet/photo-output_4.jpeg",
        "imagenes/repuestos/chevrolet/photo-output_3.jpeg"
      ],
      detalles: "Nuevos Productos | Año: 2024 - 2025",
      codigoOEM: "AC Delco Genuine Parts"
    },
    {
      id: 7,
      nombre: "Kit Mantención",
      marca: "Volkswagen Nivus",
      modelo: "Año: 2024-2025",
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
      nombre: "Filtro de Aire",
      marca: "Volkswagen Nivus",
      modelo: "Año: 2024-2025",
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
      nombre: "Filtro de Aceite",
      marca: "Volkswagen Nivus",
      modelo: "Año: 2024-2025",
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
      nombre: "Filtro de Polen",
      marca: "Volkswagen Nivus",
      modelo: "Año: 2024-2025",
      precio: "$27.990",
      imagen: "imagenes/repuestos/volkswagen/fil-la816-3-mahle-nivus.jpeg",
      miniaturas: [
        "imagenes/repuestos/volkswagen/fil-la816-3-mahle-nivus.jpeg",
        "imagenes/repuestos/volkswagen/fil-pol-mahle-nivus-la816-3.jpeg",
        "imagenes/repuestos/volkswagen/fil-pol-mahle-nivus.jpeg"
      ],
      detalles: "Compatibilidad: LA 816/3 | Virtus | T- Cross | Polo",
      codigoOEM: "MAHLE Genuine Parts"
    },
    {
      id: 11,
      nombre: "Filtro de Aire",
      marca: "Chery Tiggo 2",
      modelo: "Motor: 1.5L",
      precio: "$15.900",
      imagen: "imagenes/repuestos/chery/chery-tiggo2-fil-air.jpeg",
      miniaturas: [
        "imagenes/repuestos/chery/chery-tiggo2-fil-air.jpeg"
      ],
      detalles: "Compatibilidad: Chery Tiggo 2 | Motor: 1.5L | Año: 2017-2025",
      codigoOEM: "Genuine Parts"
    },
    {
      id: 12,
      nombre: "Filtro de Polen",
      marca: "Chery Tiggo 2",
      modelo: "Motor: 1.5L",
      precio: "$9.900",
      imagen: "imagenes/repuestos/chery/chery-tiggo2-fil.pol.jpeg",
      miniaturas: [
        "imagenes/repuestos/chery/chery-tiggo2-kit.jpeg"
      ],
      detalles: "Compatibilidad: Chery Tiggo 2 | Motor: 1.5L | Año: 2017-2025",
      codigoOEM: "Genuine Parts"
    },
    {
      id: 13,
      nombre: "Kit Mantención",
      marca: "Chery Tiggo 2",
      modelo: "Motor: 1.5L",
      precio: "$33.900",
      imagen: "imagenes/repuestos/chery/chery-tiggo2-kit.jpeg",
      miniaturas: [
        "imagenes/repuestos/chery/chery-tiggo2-fil-air.jpeg",
        "imagenes/repuestos/chery/chery-tiggo2-fil.pol.jpeg",
        "imagenes/repuestos/chery/chery-tiggo2-fil.oil.jpeg"
      ],
      detalles: "Incluye: Filtro de Aceite - Filtro de Polen - Filtro de Aire | Compatibilidad: Motor: 1.5L | Año: 2017-2025",
      codigoOEM: "Genuine Parts"
    },
    {
      id: 14,
      nombre: "Filtro de Polen",
      marca: "Chevrolet Colorado",
      modelo: "ACDelco",
      precio: "$33.900",
      imagen: "imagenes/repuestos/acdelco/acd-fil-pol.b.jpeg",
      miniaturas: [
        "imagenes/repuestos/acdelco/acd-fil-pol (1).jpeg",
        "imagenes/repuestos/acdelco/acd-fil-pol.b.jpeg",
        "imagenes/repuestos/acdelco/fil-pol-c 17.03.36.jpeg"
      ],
      detalles: "Compatibilidad: Motor: Diésel | Año: 2021 - 2024",
      codigoOEM: "Genuine Parts"
    },
    {
      id: 15,
      nombre: "Filtro de Aceite",
      marca: "Chevrolet Colorado",
      modelo: "ACDelco",
      precio: "$23.900",
      imagen: "imagenes/repuestos/acdelco/fil-oil-b.jpeg",
      miniaturas: [
        "imagenes/repuestos/acdelco/fil-oil-b.jpeg",
        "imagenes/repuestos/acdelco/fil-ace-p.jpeg",
        "imagenes/repuestos/acdelco/fil-oil-c 16.20.32.jpeg"
      ],
      detalles: "Compatibilidad: Motor: Diésel | Año: 2021 - 2024",
      codigoOEM: "Genuine Parts"
    },
    {
      id: 16,
      nombre: "Filtro de Aire",
      marca: "Chevrolet Colorado",
      modelo: "ACDelco",
      precio: "$18.900",
      imagen: "imagenes/repuestos/acdelco/fil-air-front-acdelco.jpeg",
      miniaturas: [
        "imagenes/repuestos/acdelco/fil-air-front-acdelco.jpeg",
        "imagenes/repuestos/acdelco/fil-air.acdelco.jpeg",
        "imagenes/repuestos/acdelco/fil-air-up-acdelco.jpeg",
        "imagenes/repuestos/acdelco/fil-air-behind-acdelco.jpeg"
      ],
      detalles: "Compatibilidad: Motor: Diésel | Año: 2021 - 2024",
      codigoOEM: "Genuine Parts"
    },
    {
      id: 17,
      nombre: "Filtro de Combustible",
      marca: "Chevrolet Colorado",
      modelo: "ACDelco",
      precio: "$29.900",
      imagen: "imagenes/repuestos/acdelco/acd-fil.comb.jpeg",
      miniaturas: [
        "imagenes/repuestos/acdelco/acd-fil.comb.jpeg",
        "imagenes/repuestos/acdelco/acd-fil.comb.b.jpeg",
        "imagenes/repuestos/acdelco/fil-comb-c (1).jpeg"
      ],
      detalles: "Compatibilidad: <br> Motor: Diésel | Año: 2021-2024",
      codigoOEM: "Genuine Parts"
    },
    {
      id: 18,
      nombre: "Filtro de Aceite",
      marca: "Kendall",
      modelo: "Multimarca",
      precio: "$9.900",
      imagen: "imagenes/repuestos/kendall/fil-oil-kendall.jpeg",
      miniaturas: [
        "imagenes/repuestos/kendall/fil-oil-kendall-2.jpeg",
        "imagenes/repuestos/kendall/fil-oil-kendall.jpeg"
      ],
      detalles: "Compatibilidad: <br> Motor: Bencina - Diésel <br> Año: 2021 - Actual",
      codigoOEM: "Genuine Parts Multimarca"
    },
    {
      id: 19,
      nombre: "Filtro de Aire",
      marca: "Kia",
      modelo: "K3",
      precio: "$19.900",
      imagen: "imagenes/repuestos/kia/kia-k3-box.jpeg",
      miniaturas: [
        "imagenes/repuestos/kia/kia-k3-fil-air-box-back.jpeg",
        "imagenes/repuestos/kia/kia-k3-fil-air-front.jpeg",
        "imagenes/repuestos/kia/kia-k3-fil-air.jpeg",
        "imagenes/repuestos/kia/kia-k3-box.jpeg"
      ],
      detalles: "Compatibilidad: <br> Motor: Bencina <br> Año: 2024 - Actual",
      codigoOEM: "Genuine Parts"
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

  // -----------------------
  // Función principal de mostrar catálogo
  // -----------------------
  function mostrarCatalogo(filtro = '') {
    catalogoContainer.innerHTML = '';
    const filtroLower = filtro.toLowerCase().trim(); // normaliza

    const productosFiltrados = catalogo.filter(producto =>
      producto.nombre.toLowerCase().includes(filtroLower) ||
      producto.marca.toLowerCase().includes(filtroLower) ||
      producto.modelo.toLowerCase().includes(filtroLower)
    );

    productosFiltrados.forEach(producto => {
      const card = document.createElement('div');
      card.classList.add('col-6', 'col-md-4', 'mb-4');
      card.innerHTML = `
      <div class="card">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title mb-1" style="font-size: 1.1rem">${producto.nombre}</h5>
<p class="marca-producto mb-0">
  <i class="bi bi-car-front"></i> ${producto.marca}
</p>
<p class="modelo-producto mb-2">
  ${producto.modelo}
</p>
          <p class="card-text fw-bold">${producto.precio}</p>
          <div class="d-flex align-items-center justify-content-center gap-2">
            <button class="btn btn-primary btn-sm px-4 rounded-pill btn-no-wrap"
              onclick="verProducto(${producto.id})">Ver más</button>
            <button class="btn btn-sm rounded-circle d-flex align-items-center justify-content-center btn-cart"
              style="width: 36px; height: 36px; background-color: #f1f1f1; color: #333; border: 2px solid #555;"
              onclick="agregarAlCarrito(${producto.id})">
              <i class="bi bi-cart-plus fs-5 fw-bold"></i>
            </button>
          </div>
        </div>
      </div>
    `;
      catalogoContainer.appendChild(card);
    });
  }

  // -----------------------
  // Función global agregar al carrito
  // -----------------------
  window.agregarAlCarrito = function (id) {
    const producto = catalogo.find(p => p.id === id);
    if (!producto) return;
    carrito.push(producto);
    mostrarCarrito();
    alert(`${producto.nombre} agregado al carrito`);
  };

  // -----------------------
  // Función global ver producto
  // -----------------------
  window.verProducto = function (id) {
    const producto = catalogo.find(p => p.id === id);
    if (!producto) return;
    productoEnDetalle = producto;

    document.getElementById('titulo').innerText = producto.nombre;
    document.getElementById("modelo").innerHTML = `<i class="bi bi-car-front"> </i> <span class="marca-producto">${producto.marca}</span> - <span class="modelo-producto">${producto.modelo}</span>`;
    document.getElementById('precio').innerHTML = `<strong>${producto.precio}</strong>`;
    document.getElementById('imagen-principal').src = producto.imagen;
    document.getElementById("detalles").innerHTML = producto.detalles;
    document.getElementById('codigo-oem').innerText = "Código OEM: " + producto.codigoOEM;

    const miniaturas = document.getElementById('miniaturas');
    miniaturas.innerHTML = '';
    if (producto.miniaturas) {
      producto.miniaturas.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.onclick = () => { document.getElementById('imagen-principal').src = src; };
        miniaturas.appendChild(img);
      });
    }

    modal.style.display = 'flex';
  };

  // -----------------------
  // Cierre de modales
  // -----------------------
  const cerrarModalBtn = document.getElementById('cerrarModalBtn');
  if (cerrarModalBtn) cerrarModalBtn.onclick = () => modal.style.display = 'none';
  if (cerrarCarritoModal) cerrarCarritoModal.onclick = () => carritoModal.style.display = 'none';
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
  if (carritoModal) carritoModal.addEventListener('click', e => { if (e.target === carritoModal) carritoModal.style.display = 'none'; });

  // -----------------------
  // Agregar producto desde modal
  // -----------------------
  window.solicitarRepuesto = function () {
    if (!productoEnDetalle) return;
    carrito.push(productoEnDetalle);
    alert("Producto agregado al carrito");
    modal.style.display = 'none';
    mostrarCarrito();
  };

  // -----------------------
  // Mostrar carrito
  // -----------------------
  function mostrarCarrito() {
    listaCarritoModal.innerHTML = '';

    carrito.forEach(producto => {
      const li = document.createElement('li');
      let precioOriginal = precioANumero(producto.precio);
      let precioFinal = precioOriginal;
      if (codigoDescuento === 'YOMEMANEJO') precioFinal = Math.round(precioOriginal * 0.9);
      li.innerHTML = `<strong>${producto.nombre}</strong> - ${producto.marca} (${producto.modelo}) - <strong>${numeroAPrecio(precioFinal)}</strong>`;
      listaCarritoModal.appendChild(li);
    });

    const total = carrito.reduce((sum, p) => {
      let precioOriginal = precioANumero(p.precio);
      return sum + (codigoDescuento === 'YOMEMANEJO' ? Math.round(precioOriginal * 0.9) : precioOriginal);
    }, 0);

    resumenCarritoModal.innerText = `Total: ${numeroAPrecio(total)}` + (codigoDescuento === 'YOMEMANEJO' ? ' (10% descuento aplicado)' : '');

    const datosTransferencia = document.getElementById('datosTransferencia');
    if (datosTransferencia) {
      let texto = carrito.map(p => {
        let precioOriginal = precioANumero(p.precio);
        let precioFinal = codigoDescuento === 'YOMEMANEJO' ? Math.round(precioOriginal * 0.9) : precioOriginal;
        return `${p.nombre} - ${numeroAPrecio(precioFinal)}`;
      }).join('\n');
      texto += `\n\n${resumenCarritoModal.innerText}`;
      datosTransferencia.value = texto;
    }
  }
  const expandirCarritoBtn = document.getElementById("expandirCarrito");

if (expandirCarritoBtn) {
  expandirCarritoBtn.addEventListener("click", () => {
    carritoModal.classList.toggle("fullscreen");
  });
}
  const frases = [
    "Filtro de aire, Filtro de polen, Filtro de aceite",
    "Buscar por Marca, Modelo o Producto...",
    "Buscar Extintores, Elementos de Seguridad...",
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
        return `${p.nombre} - ${p.marca} ${p.modelo} - ${numeroAPrecio(precioFinal)}`;
      }).join('\n');

      const total = resumenCarritoModal.innerText;
      const mensaje = encodeURIComponent(
        `Hola, quisiera solicitar estos repuestos y coordinar el envío o retiro de mi pedido:\n\n${listaItems}\n\n${total}`
      );
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
    "Santa Fe",
    "Peugeot 3008",
    "Nissan",
    "bieletas",
    "correa de distribución",
    "parachoques",
    "turbo",
    "fuelles"
  ];

  input.addEventListener("input", () => {
    const valor = input.value.trim();
    ghost.value = "";
    mensaje.innerHTML = "";

    if (!valor) return;

    const valorLower = valor.toLowerCase();
    const sugerido = repuestosDisponibles.find(p => p.toLowerCase().startsWith(valorLower));

    if (sugerido && sugerido.toLowerCase() !== valorLower) {
      const faltante = sugerido.slice(valor.length);
      ghost.value = valor + faltante;
    }

    const encontrado = repuestosDisponibles.some(p => p.toLowerCase() === valorLower);

    if (valor.length >= 4 && !encontrado) {
      mensaje.innerHTML = `<span class="text-warning">❌ No está en el catálogo <br> Lo podemos traer para ti. <br>Presiona aquí ↓ </span>`;
    } else if (encontrado) {
      mensaje.innerHTML = `<span class="text-success">Disponible para solicitar</span>`;
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
// Toggle Light / Dark Theme
const toggle = document.getElementById('theme-toggle');
const circle = toggle.querySelector('.toggle-circle i');
const label = toggle.querySelector('.toggle-text');

// Estado inicial
document.body.classList.add('dark-theme');
circle.className = 'fa-solid fa-moon';
label.textContent = 'Ambiente Claro';
label.style.textAlign = 'left';

toggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark-theme')) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    circle.className = 'fa-solid fa-sun';
    label.textContent = 'Ambiente Claro';
    label.style.textAlign = 'right';
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    circle.className = 'fa-solid fa-moon';
    label.textContent = 'Ambiente Oscuro';
    label.style.textAlign = 'left';
  }
});
const togglePago = document.getElementById('metodoPagoToggle');
const transferenciaInfo = document.getElementById('transferenciaInfo');
const efectivoInfo = document.getElementById('efectivoInfo');

function actualizarPago() {
  if (togglePago.checked) {
    // Transferencia
    transferenciaInfo.style.display = 'block';
    efectivoInfo.style.display = 'none';
  } else {
    // Efectivo
    transferenciaInfo.style.display = 'none';
    efectivoInfo.style.display = 'block';
  }
}

togglePago.checked = false;
actualizarPago();
togglePago.addEventListener('change', actualizarPago);


// Tooltip automático en bucle infinito, con pausa si el usuario escribe
const tooltip = document.getElementById('tooltipBuscar');
let cicloActivo = true; // Control del ciclo

function cicloTooltip() {
  if (!tooltip || !cicloActivo) return;

  // Primer ciclo: aparece 6s
  tooltip.classList.add('mostrar');
  setTimeout(() => tooltip.classList.remove('mostrar'), 6000);

  // Segundo ciclo: reaparece a los 12s (después de 6s de pausa), dura 3s
  setTimeout(() => {
    if (!cicloActivo) return;
    tooltip.classList.add('mostrar');
    setTimeout(() => tooltip.classList.remove('mostrar'), 3000);
  }, 12000);

  // Tercer ciclo: reaparece a los 21s, dura 12s
  setTimeout(() => {
    if (!cicloActivo) return;
    tooltip.classList.add('mostrar');
    setTimeout(() => tooltip.classList.remove('mostrar'), 12000);
  }, 21000);

  // Reinicia el ciclo completo después de 33s
  setTimeout(() => {
    if (cicloActivo) cicloTooltip();
  }, 33000);
}

// Pausa y oculta tooltip si el usuario escribe
filtroInput.addEventListener('input', () => {
  cicloActivo = false;
  tooltip.classList.remove('mostrar');
});

// Iniciar cuando la página esté lista
window.addEventListener('load', cicloTooltip);

// Toggle modo claro/oscuro
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

const btnSolicitar = document.getElementById("btnSolicitar");
const input = document.getElementById("inputRepuesto");

btnSolicitar.addEventListener("click", () => {
  const repuesto = input.value.trim();
  if (!repuesto) {
    alert("Por favor ingresa un repuesto antes de enviar.");
    return;
  }

  // Número de WhatsApp (ejemplo Chile: 56912345678)
  const telefono = "56946914558";

  // Mensaje predefinido, codificado para URL
  const mensaje = `Hola, quiero solicitar este repuesto: ${repuesto}`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  // Abrir WhatsApp en nueva pestaña
  window.open(url, "_blank");
});

// Función para inicializar los acordeones del footer
function inicializarFooterAccordion() {
  const accordions = document.querySelectorAll('.footer-accordion .accordion');

  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      const panel = acc.nextElementSibling;

      // Si ya está abierto, cerrarlo
      if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
        panel.style.maxHeight = null;
        panel.style.paddingTop = "0";
        panel.style.paddingBottom = "0";
        acc.classList.remove('active');
      } else {
        // Cerrar los demás
        accordions.forEach(other => {
          const otherPanel = other.nextElementSibling;
          otherPanel.style.maxHeight = null;
          otherPanel.style.paddingTop = "0";
          otherPanel.style.paddingBottom = "0";
          other.classList.remove('active');
        });

        // Abrir el seleccionado
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.paddingTop = "4px";
        panel.style.paddingBottom = "4px";
        acc.classList.add('active');
      }
    });
  });
}

// Llamada cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  inicializarFooterAccordion();
});
document.addEventListener('DOMContentLoaded', () => {

  // --- MENU FLOTANTE OFFCANVAS ---
  const menuButton = document.getElementById('menuButton');
  const offcanvasEl = document.getElementById('offcanvasWithBothOptions');
  if(menuButton && offcanvasEl){
    offcanvasEl.addEventListener('show.bs.offcanvas', () => { menuButton.style.display = 'none'; });
    offcanvasEl.addEventListener('hidden.bs.offcanvas', () => { menuButton.style.display = 'block'; });
    offcanvasEl.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if(target && target.getAttribute('href')?.startsWith('#')){
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if(bsOffcanvas) bsOffcanvas.hide();
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

      if(btn.dataset.tab==='skills'){
        document.querySelectorAll("#tab-skills .progress-bar").forEach(bar => {
          bar.style.width = bar.getAttribute("data-width");
        });
      }
    });
  });

  // --- PROGRESS BARS VISIBILITY ---
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const bar = entry.target;
        bar.style.setProperty('--target-width', bar.getAttribute('data-width')||'0%');
        bar.style.animation='fillProgress 1.5s ease-out forwards';
      }
    });
  },{threshold:0.5});
  document.querySelectorAll('.progress-bar').forEach(bar => observer.observe(bar));

  // --- CARDS TOGGLE ---
  document.querySelectorAll('.work').forEach(card => {
    card.addEventListener('click', ()=>{
      document.querySelectorAll('.work.active').forEach(ac=>ac.classList.remove('active'));
      card.classList.toggle('active');
    });
  });
  document.addEventListener('click', e=>{
    if(!e.target.closest('.work')) document.querySelectorAll('.work.active').forEach(ac=>ac.classList.remove('active'));
  });

  // --- ACCORDION Q&A (Bootstrap maneja cierre automático) ---
  // No se manipula manualmente toggle.show para no romper collapse
  // Solo se mantiene posible styling adicional si hay botones con clases propias
  document.querySelectorAll('.accordion-copyright').forEach(btn=>{
    btn.addEventListener('click', ()=>btn.classList.toggle('active'));
  });

  // --- ESPACIO PUBLICITARIO ---
  const publicidadBtn = document.getElementById('publicidadBtn');
  const publicidadCollapseEl = document.getElementById('publicidadCollapse');
  if (publicidadBtn && publicidadCollapseEl) {
      const bsCollapse = new bootstrap.Collapse(publicidadCollapseEl, { toggle: false });
      publicidadBtn.addEventListener('click', () => {
          if (publicidadCollapseEl.classList.contains('show')) bsCollapse.hide();
          else bsCollapse.show();
      });
  }

  // --- MODAL AGENDA ---
  const btnAbrir = document.getElementById('abrirAgenda');
  const modal = document.getElementById('modalAgenda');
  const btnCerrar = document.getElementById('cerrarAgenda');
  if(btnAbrir && modal && btnCerrar){
    btnAbrir.addEventListener('click', e=>{e.preventDefault(); modal.classList.add('activo');});
    btnCerrar.addEventListener('click', ()=>modal.classList.remove('activo'));
    modal.addEventListener('click', e=>{if(e.target===modal) modal.classList.remove('activo');});
  }

  // --- SELECTOR HORARIOS (Modal Agenda) ---
  const horariosBase = [
    { inicio: "10:00", label: "AM" },
    { inicio: "15:00", label: "PM" },
    { inicio: "17:30", label: "PM" }
  ];
  const selectHora = document.getElementById("hora");
  const selectBloque = document.getElementById("bloque");
  function agregarHoras(horaStr, duracion) {
    const [h, m] = horaStr.split(":").map(Number);
    const inicio = new Date(); inicio.setHours(h,m,0);
    const fin = new Date(inicio.getTime() + duracion*60*60*1000);
    const limite = new Date(); limite.setHours(20,30,0);
    if(fin>limite) return null;
    return `${horaStr} - ${fin.toTimeString().slice(0,5)}`;
  }
  function actualizarOpcionesHorario() {
    if(!selectHora || !selectBloque) return;
    const duracion = parseInt(selectBloque.value,10);
    selectHora.innerHTML = '<option value="" disabled selected>Selecciona un horario</option>';
    horariosBase.forEach(h=>{
      const rango = agregarHoras(h.inicio,duracion);
      if(rango){
        const option = document.createElement("option");
        option.value = h.inicio;
        option.textContent = `${rango} ${h.label}`;
        selectHora.appendChild(option);
      }
    });
  }
  if(selectBloque) selectBloque.addEventListener('change', actualizarOpcionesHorario);
  actualizarOpcionesHorario();

  // --- PLACEHOLDER ANIMADO ---
  const frasesInput = ["¿Consulta técnica o de repuesto?","Ej: Necesito pastillas de freno para Mazda 3","Dime qué auto tienes y qué buscas...","Estamos para ayudarte 😉"];
  let idxFrase=0, idxLetra=0;
  const inputAnimado = document.querySelector('[data-animar="true"]');
  function escribirFrase(){
    if(!inputAnimado) return;
    if(idxLetra<=frasesInput[idxFrase].length){
      inputAnimado.placeholder=frasesInput[idxFrase].substring(0,idxLetra++);
      setTimeout(escribirFrase,50);
    }else setTimeout(borrarFrase,1000);
  }
  function borrarFrase(){
    if(!inputAnimado) return;
    if(idxLetra>=0){
      inputAnimado.placeholder=frasesInput[idxFrase].substring(0,idxLetra--);
      setTimeout(borrarFrase,30);
    }else{ idxFrase=(idxFrase+1)%frasesInput.length; setTimeout(escribirFrase,300); }
  }
  escribirFrase();

  // --- ROTADOR CURSOS ---
  const rotador = document.getElementById("rotadorCursos");
  if(rotador){
    const frasesCursos = rotador.dataset.frases.split(",");
    let i=0;
    function rotar(){
      rotador.style.opacity=0;
      setTimeout(()=>{ rotador.textContent=frasesCursos[i]; rotador.style.opacity=1; i=(i+1)%frasesCursos.length; },300);
    }
    rotar();
    setInterval(rotar,3000);
  }
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

  // --- SLIDERS DE TARJETAS ---
  document.querySelectorAll('.card-img-slider').forEach(slider=>{
    const imgs = slider.querySelectorAll('img');
    let c=0;
    setInterval(()=>{
      imgs.forEach(im=>im.classList.remove('active'));
      c=(c+1)%imgs.length;
      imgs[c].classList.add('active');
    },4000);
  });

  // --- BOTON GO TOP ---
  const goTop = document.getElementById('goTop');
  if(goTop) goTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

  // --- FORMULARIO AGENDA ---
  const formAgenda = document.getElementById('formAgenda');
  if(formAgenda){
    formAgenda.addEventListener('submit', e=>{
      e.preventDefault();
      const formData = new FormData(formAgenda);
      fetch('agenda.php',{method:'POST',body:formData})
        .then(res=>res.text())
        .then(data=>{
          alert(data);
          if(data.includes('✅')){ modal.classList.remove('activo'); formAgenda.reset(); }
        }).catch(err=>{alert('Error al enviar la solicitud'); console.error(err);});
    });
  }
  // --- TOGGLE PRECIOS ---
  document.querySelectorAll('.precios-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const collapse = btn.closest('.card-body').querySelector('.precios-burbuja');
      if(collapse) collapse.classList.toggle('show');
    });
  });

  // --- ACTUALIZAR LOGO SEGÚN SECCIÓN ---
  function actualizarLogoPorSeccion(){
    const btnImg = document.querySelector("#menuButton img");
    const btn = document.getElementById("menuButton");
    const sections = document.querySelectorAll("[data-bg]");
    if(!btnImg || !btn || sections.length===0) return;
    const btnY = btn.getBoundingClientRect().top + btn.getBoundingClientRect().height/2;
    let logo = "img/logopng.png";
    sections.forEach(sec=>{
      const rect = sec.getBoundingClientRect();
      if(btnY>=rect.top && btnY<=rect.bottom){
        logo = sec.dataset.bg==="dark"?"img/logopngwhite.png":"img/logopng.png";
      }
    });
    btnImg.src = logo;
  }
  window.addEventListener('scroll', actualizarLogoPorSeccion);
  window.addEventListener('resize', actualizarLogoPorSeccion);
  actualizarLogoPorSeccion();

}); // Fin DOMContentLoaded  
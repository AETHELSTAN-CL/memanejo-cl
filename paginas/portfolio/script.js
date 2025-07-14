gsap.registerPlugin(ScrollTrigger);

// Animación inicial de entrada
gsap.to(".titulo", {
  y: 0,
  opacity: 1,
  duration: 1.2,
  ease: "power3.out"
});

// ScrollTrigger: texto largo aparece
gsap.to(".texto-largo", {
  scrollTrigger: {
    trigger: ".dos",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  x: 0,
  opacity: 1,
  duration: 1.2,
  ease: "power2.out"
});

// ScrollTrigger: botón de contacto
gsap.to(".boton-llamado", {
  scrollTrigger: {
    trigger: ".tres",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 1,
  scale: 1,
  duration: 1.2,
  ease: "elastic.out(1, 0.4)"
});

// Cubo rotando
gsap.to(".cubo", {
  duration: 6,
  rotationY: 360,
  rotationX: 360,
  repeat: -1,
  ease: "linear"
});

// Fondo animado que se mueve con scroll
gsap.to(".bg-movimiento", {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  },
  x: "-10%",
  y: "-10%"
});
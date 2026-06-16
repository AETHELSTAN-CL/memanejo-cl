document.addEventListener('DOMContentLoaded', () => {
  // Cada sección se fija al viewport con sticky natural
  const sections = document.querySelectorAll('.seccion');
  sections.forEach(section => {
    section.style.position = 'sticky';
    section.style.top = '0';
  });

  // Animación continua de cubos y figuras 3D
  const cubes = document.querySelectorAll('.cubo');
  cubes.forEach(c => {
    let rotX = 0, rotY = 0;
    const speed = 0.2;
    function rotateCube() {
      rotX += speed; rotY += speed;
      c.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      requestAnimationFrame(rotateCube);
    }
    rotateCube();
  });

  // Figuras flotantes independientes
  const floats = document.querySelectorAll('.figura');
  floats.forEach(f => {
    const amplitude = Math.random()*30 + 10;
    const speed = Math.random()*0.03 + 0.01;
    let pos = 0, direction = 1;
    function floatAnim() {
      pos += speed*direction;
      if(pos>amplitude || pos<-amplitude) direction*=-1;
      f.style.transform = `translateY(${pos}px) rotate(${pos*5}deg)`;
      requestAnimationFrame(floatAnim);
    }
    floatAnim();
  });

  // Desaparecer sección 1 al hacer scroll
  const seccion1 = document.querySelector('.seccion1');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Ajusta la velocidad de desvanecimiento
    seccion1.style.opacity = Math.max(0, 1 - scrollY / 200);
  });
});
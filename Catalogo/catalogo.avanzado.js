document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.querySelector('.open-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const modal = document.querySelector('.modal-overlay');
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const mainImage = document.getElementById('main-image');
  const accordionToggle = document.querySelector('.accordion-toggle');
  const accordionContent = document.querySelector('.accordion-content');

  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.src;
    });
  });

  accordionToggle.addEventListener('click', () => {
    accordionContent.style.display = accordionContent.style.display === 'block' ? 'none' : 'block';
  });
});
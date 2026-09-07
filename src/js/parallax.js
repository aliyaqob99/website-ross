/* ROSA COSMETICS - 3D Mouse Parallax & Card Tilt Interactions */

export function initParallaxEngine() {
  const cards = document.querySelectorAll('.tilt-effect');
  const cosmetics = document.querySelectorAll('.floating-cosmetic');

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;

    // Parallax floating side 3D elements
    cosmetics.forEach((el, idx) => {
      const depth = (idx + 1) * 15;
      const moveX = deltaX * depth;
      const moveY = deltaY * depth;
      el.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${deltaX * 5}deg)`;
    });

    // Subtitled card tilt
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const tiltX = (clientY - cardCenterY) / (rect.height / 2);
      const tiltY = (clientX - cardCenterX) / (rect.width / 2);

      if (Math.abs(clientX - cardCenterX) < rect.width * 1.5 && Math.abs(clientY - cardCenterY) < rect.height * 1.5) {
        card.style.transform = `perspective(1000px) rotateX(${-tiltX * 5}deg) rotateY(${tiltY * 5}deg) scale3d(1.01, 1.01, 1.01)`;
      } else {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      }
    });
  });
}

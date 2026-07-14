// --- Mouse glow ---
(function() {
  const glow = document.getElementById('mouseGlow');
  if (!glow) return;

  let mx = 0, my = 0;
  let gx = 0, gy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    gx += (mx - gx) * 0.05;
    gy += (my - gy) * 0.05;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

// --- Scroll reveal ---
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

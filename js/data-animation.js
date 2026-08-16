// --- Data Particle Animation ---
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('dataCanvas');
  if (!canvas) return;

  // Skip on mobile entirely
  if (window.innerWidth <= 768) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 107, 53, 0.4)';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    // Fewer particles on tablet
    const density = window.innerWidth <= 1024 ? 25000 : 15000;
    const numParticles = Math.floor((width * height) / density);
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  let animating = true;

  function animate() {
    if (!animating) return;
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connections — skip on tablet for perf
    if (window.innerWidth > 1024) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 107, 53, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(animate);
  }

  // Pause when tab not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      animating = false;
    } else {
      animating = true;
      animate();
    }
  });

  initParticles();
  animate();
});

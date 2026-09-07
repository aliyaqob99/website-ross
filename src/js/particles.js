/* ROSA MAKEUP - Neon Petal & Geometric Emblem Particle Canvas Engine */

export class PowderParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.petals = [];
    this.particleCount = 45;
    this.petalCount = 14;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    this.createParticles();
    this.createPetals();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.2 + 0.8,
        color: this.getRandomNeonColor(),
        alpha: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.5 - 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseDirection: 1
      });
    }
  }

  createPetals() {
    this.petals = [];
    for (let i = 0; i < this.petalCount; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 18 + 12,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.15,
        alpha: Math.random() * 0.5 + 0.25,
        color: this.getRandomNeonColor()
      });
    }
  }

  getRandomNeonColor() {
    const colors = [
      '#E2AD9A', // Rose Gold Neon
      '#F6D8CD', // Blush Champagne Neon
      '#F4E2BB', // Metallic Gold Glow
      '#FFB7C5'  // Soft Neon Rose Pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Draw 4-Petal Geometric Flower Emblem matching the ROSA Logo
  drawLogoPetalEmblem(ctx, x, y, size, rotation, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.shadowBlur = 12;
    ctx.shadowColor = color;

    const r = size;
    ctx.beginPath();
    
    // 4 Symmetrical Petals (Matching the ROSA Emblem)
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.5, -r * 0.8, r * 1.2, -r * 0.5, 0, -r);
      ctx.bezierCurveTo(-r * 1.2, -r * 0.5, -r * 0.5, -r * 0.8, 0, 0);
    }
    ctx.stroke();

    // Center Diamond Spark
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.25);
    ctx.lineTo(r * 0.25, 0);
    ctx.lineTo(0, r * 0.25);
    ctx.lineTo(-r * 0.25, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Render Neon Particles
    for (let p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      p.alpha += p.pulseSpeed * p.pulseDirection;
      if (p.alpha >= 0.85 || p.alpha <= 0.2) p.pulseDirection *= -1;

      if (p.y < -10) { p.y = this.height + 10; p.x = Math.random() * this.width; }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Render Faint Neon Constellation Lines near mouse
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      const dx = this.mouseX - p1.x;
      const dy = this.mouseY - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(this.mouseX, this.mouseY);
        this.ctx.strokeStyle = p1.color;
        this.ctx.globalAlpha = (1 - dist / 120) * 0.25;
        this.ctx.lineWidth = 0.8;
        this.ctx.stroke();
        this.ctx.restore();
      }
    }

    // 3. Render Floating Neon ROSA Geometric Flower Emblem Petals
    for (let petal of this.petals) {
      petal.x += petal.speedX;
      petal.y += petal.speedY;
      petal.rotation += petal.rotSpeed;

      if (petal.y < -30) { petal.y = this.height + 30; petal.x = Math.random() * this.width; }
      if (petal.x < -30) petal.x = this.width + 30;
      if (petal.x > this.width + 30) petal.x = -30;

      this.drawLogoPetalEmblem(
        this.ctx,
        petal.x,
        petal.y,
        petal.size,
        petal.rotation,
        petal.color,
        petal.alpha
      );
    }

    requestAnimationFrame(() => this.animate());
  }
}

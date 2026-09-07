/* ROSA MAKEUP - Complete Standalone JS Bundle */

(function() {
  'use strict';

  // --- 1. NEON LOGO FLOWER & STARLIGHT CANVAS ENGINE ---
  class NeonFlowerParticleEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.flowers = [];
      this.particleCount = 45;
      this.flowerCount = 20; // Elegant quantity of smaller petals
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
      this.createFlowers();
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
          speedX: (Math.random() - 0.5) * 0.35,
          speedY: -Math.random() * 0.5 - 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulseDirection: 1
        });
      }
    }

    createFlowers() {
      this.flowers = [];
      for (let i = 0; i < this.flowerCount; i++) {
        this.flowers.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          scale: Math.random() * 0.28 + 0.16, // Refined smaller size as requested!
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.01,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -Math.random() * 0.4 - 0.12,
          alpha: Math.random() * 0.65 + 0.25,
          color: this.getRandomNeonColor(),
          pulse: Math.random() * Math.PI
        });
      }
    }

    getRandomNeonColor() {
      const colors = [
        '#E2AD9A', // Rose Gold Neon
        '#F6D8CD', // Blush Champagne
        '#F4E2BB', // Metallic Gold Glow
        '#FFB8C6', // Rose Pink Neon
        '#EAA591'  // Soft Rose Gold
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Drawing the exact ROSA Logo Geometric 4-Petal Emblem
    drawRosaLogoFlower(ctx, x, y, scale, rotation, color, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      const size = 30 * scale;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4;
      ctx.shadowBlur = 14;
      ctx.shadowColor = color;

      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(size * 0.6, -size * 0.7, size * 1.1, -size * 0.4, 0, -size * 1.2);
        ctx.bezierCurveTo(-size * 1.1, -size * 0.4, -size * 0.6, -size * 0.7, 0, 0);

        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size * 0.4, -size * 0.6, 0, -size * 0.95);
        ctx.quadraticCurveTo(-size * 0.4, -size * 0.6, 0, 0);
      }
      ctx.stroke();

      ctx.beginPath();
      const dSize = size * 0.28;
      ctx.moveTo(0, -dSize);
      ctx.lineTo(dSize, 0);
      ctx.lineTo(0, dSize);
      ctx.lineTo(-dSize, 0);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.shadowBlur = 16;
      ctx.shadowColor = color;
      ctx.fill();

      ctx.restore();
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let p of this.particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        p.alpha += p.pulseSpeed * p.pulseDirection;
        if (p.alpha >= 0.85 || p.alpha <= 0.25) p.pulseDirection *= -1;

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
          this.ctx.globalAlpha = (1 - dist / 120) * 0.3;
          this.ctx.lineWidth = 0.8;
          this.ctx.shadowBlur = 8;
          this.ctx.shadowColor = p1.color;
          this.ctx.stroke();
          this.ctx.restore();
        }
      }

      for (let flower of this.flowers) {
        flower.x += flower.speedX;
        flower.y += flower.speedY;
        flower.rotation += flower.rotSpeed;
        flower.pulse += 0.02;

        const currentAlpha = flower.alpha + Math.sin(flower.pulse) * 0.12;

        if (flower.y < -40) { flower.y = this.height + 40; flower.x = Math.random() * this.width; }
        if (flower.x < -40) flower.x = this.width + 40;
        if (flower.x > this.width + 40) flower.x = -40;

        this.drawRosaLogoFlower(
          this.ctx,
          flower.x,
          flower.y,
          flower.scale,
          flower.rotation,
          flower.color,
          Math.max(0.15, Math.min(0.85, currentAlpha))
        );
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  // --- 2. BILINGUAL TRANSLATIONS ---
  const translations = {
    ar: {
      lang_label: "English",
      bio_text: "✨ اكتشفي أناقتكِ المتألقة مع الوجهة الأولى للمكياج والجمال الفاخر في العراق. تركيزات غنية، أحمر شفاه مخملي، وإطلالات ملكية.",
      badge_loc: "بغداد (المنصور والأعظمية)",
      badge_orig: "منتجات أصليّة 100%",
      badge_ship: "توصيل لكافة المحافظات",
      btn_wa_title: "واتساب",
      btn_wa_sub: "الطلب الفوري وخدمة العملاء (0770 123 4567)",
      btn_fb_title: "فيسبوك",
      btn_fb_sub: "تابعوا صفحتنا الرسمية @rosa.makeup.iq",
      btn_ig_title: "إنستغرام",
      btn_ig_sub: "أحدث الإصدارات، الريلز ودروس المكياج",
      btn_m_title: "الاتصال بفرع المنصور",
      btn_m_sub: "شارع 14 رمضان • اتصال مباشر وتفاصيل الموقع",
      btn_a_title: "الاتصال بفرع الأعظمية",
      btn_a_sub: "شارع الرويال مول • اتصال مباشر وتفاصيل الموقع",
      sec_title: "التشكيلة المميزة",
      sec_sub: "اضغط على الصور للطلب",
      btn_qr: "مشاركة QR كود"
    },
    en: {
      lang_label: "العربية",
      bio_text: "✨ Discover your radiant elegance with Iraq's premier luxury cosmetics & makeup destination. Ultra-pigmented formulas, velvet lipsticks & couture beauty.",
      badge_loc: "Baghdad (Al-Mansour & Al-Adhamiya)",
      badge_orig: "100% Original Products",
      badge_ship: "Iraq-wide Shipping",
      btn_wa_title: "WhatsApp",
      btn_wa_sub: "Instant Chat & Order Support (0770 123 4567)",
      btn_fb_title: "Facebook",
      btn_fb_sub: "Follow @rosa.makeup.iq Official Community",
      btn_ig_title: "Instagram",
      btn_ig_sub: "Latest Launches, Tutorials & Reels",
      btn_m_title: "Call Al-Mansour Branch",
      btn_m_sub: "14th of Ramadan St • Direct Dial & Store Info",
      btn_a_title: "Call Al-Adhamiya Branch",
      btn_a_sub: "Royal Mall St • Direct Dial & Store Info",
      sec_title: "Signature Collection",
      sec_sub: "Tap item to view & order",
      btn_qr: "Share QR Code"
    }
  };

  const branchData = {
    mansour: {
      titleAr: "ROSA MAKEUP - فرع المنصور",
      titleEn: "ROSA MAKEUP - Al-Mansour Branch",
      addressAr: "بغداد، المنصور، شارع 14 رمضان (بالقرب من المنصور مول)",
      addressEn: "Baghdad, Al-Mansour, 14th of Ramadan Street (Near Al-Mansour Mall)",
      phone: "+9647701234567",
      phoneDisplay: "0770 123 4567",
      hoursAr: "مفتوح يومياً: 10:00 صباحاً – 11:00 مساءً",
      hoursEn: "Open Daily: 10:00 AM – 11:00 PM",
      mapUrl: "https://maps.google.com/?q=Al-Mansour+Baghdad",
      badgeAr: "الفرع الرئيسي والمجسم الفاخر ✨",
      badgeEn: "Flagship Luxury Store ✨"
    },
    adhamiya: {
      titleAr: "ROSA MAKEUP - فرع الأعظمية",
      titleEn: "ROSA MAKEUP - Al-Adhamiya Branch",
      addressAr: "بغداد، الأعظمية، شارع عمر بن الخطاب (مقابل الرويال مول)",
      addressEn: "Baghdad, Al-Adhamiya, Omar Bin Al-Khattab Street (Opposite Royal Mall)",
      phone: "+9647809876543",
      phoneDisplay: "0780 987 6543",
      hoursAr: "مفتوح يومياً: 10:00 صباحاً – 10:30 مساءً",
      hoursEn: "Open Daily: 10:00 AM – 10:30 PM",
      mapUrl: "https://maps.google.com/?q=Al-Adhamiya+Baghdad",
      badgeAr: "معرض البوتيك الفاخر 💎",
      badgeEn: "Boutique Showroom 💎"
    }
  };

  let currentLang = 'ar';

  // --- 3. HELPERS ---
  window.showToast = function(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-sparkles" style="color:var(--rose-gold);"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  function playSoftClick() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }

  function showBranchModal(branchKey) {
    const data = branchData[branchKey];
    if (!data) return;

    const isAr = currentLang === 'ar';
    const modalContainer = document.getElementById('modal-container');
    
    modalContainer.innerHTML = `
      <div class="modal-overlay active" id="branch-modal-overlay">
        <div class="modal-card" style="direction:${isAr ? 'rtl' : 'ltr'}; text-align:${isAr ? 'right' : 'left'};">
          <button class="modal-close" id="close-branch-modal"><i class="fa-solid fa-xmark"></i></button>
          
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:46px; height:46px; border-radius:50%; background:var(--gold-gradient); display:flex; align-items:center; justify-content:center; color:#080406; font-size:20px; flex-shrink:0;">
              <i class="fa-solid fa-store"></i>
            </div>
            <div>
              <span style="font-size:11px; background:rgba(226,173,154,0.15); border:1px solid var(--rose-gold); color:var(--rose-gold-light); padding:2px 8px; border-radius:12px; font-weight:600;">${isAr ? data.badgeAr : data.badgeEn}</span>
              <h3 style="font-family:var(--font-serif); font-size:18px; color:#FFF; margin-top:4px;">${isAr ? data.titleAr : data.titleEn}</h3>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(226,173,154,0.15); border-radius:14px; padding:14px; display:flex; flex-direction:column; gap:10px; font-size:13px; color:var(--text-secondary);">
            <div style="display:flex; gap:10px; align-items:flex-start;">
              <i class="fa-solid fa-location-dot" style="color:var(--rose-gold); margin-top:3px;"></i>
              <span>${isAr ? data.addressAr : data.addressEn}</span>
            </div>
            <div style="display:flex; gap:10px; align-items:center;">
              <i class="fa-solid fa-clock" style="color:var(--rose-gold);"></i>
              <span>${isAr ? data.hoursAr : data.hoursEn}</span>
            </div>
            <div style="display:flex; gap:10px; align-items:center;">
              <i class="fa-solid fa-phone" style="color:var(--rose-gold);"></i>
              <span style="font-weight:600; color:#FFF; direction:ltr;">${data.phoneDisplay}</span>
            </div>
          </div>

          <div style="display:flex; gap:10px; margin-top:6px;">
            <a href="tel:${data.phone}" class="btn-lux" style="height:50px; justify-content:center; gap:8px; background:var(--gold-gradient); color:#080406; font-weight:700; flex:1;">
              <i class="fa-solid fa-phone-flip"></i> ${isAr ? 'اتصال مباشر' : 'Direct Call'}
            </a>
            <a href="${data.mapUrl}" target="_blank" class="btn-lux" style="height:50px; justify-content:center; gap:8px; flex:1;">
              <i class="fa-solid fa-map-location-dot" style="color:var(--rose-gold);"></i> ${isAr ? 'الاتجاهات والخريطة' : 'Directions'}
            </a>
          </div>
        </div>
      </div>
    `;

    document.getElementById('close-branch-modal').addEventListener('click', closeCurrentModal);
    document.getElementById('branch-modal-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'branch-modal-overlay') closeCurrentModal();
    });
  }

  function showQRModal() {
    const isAr = currentLang === 'ar';
    const modalContainer = document.getElementById('modal-container');
    const currentUrl = window.location.href;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&color=080406&bgcolor=F6D8CD`;

    modalContainer.innerHTML = `
      <div class="modal-overlay active" id="qr-modal-overlay">
        <div class="modal-card" style="align-items:center; text-align:center; direction:${isAr ? 'rtl' : 'ltr'};">
          <button class="modal-close" id="close-qr-modal"><i class="fa-solid fa-xmark"></i></button>
          
          <h3 style="font-family:var(--font-serif); font-size:20px; color:var(--rose-gold-light); letter-spacing:1px;">${isAr ? 'امسح ومشاركة الكود' : 'Scan & Share'}</h3>
          <p style="font-size:13px; color:var(--text-muted);">${isAr ? 'امسح رمز الـ QR لفتح موقع روزا ميك أب مباشرة على هاتفك' : 'Scan QR code to open ROSA MAKEUP on mobile'}</p>

          <div style="background:#FFF; padding:16px; border-radius:20px; border:2px solid var(--rose-gold); box-shadow:0 10px 30px var(--rose-gold-glow); margin:10px 0;">
            <img src="${qrApiUrl}" alt="ROSA MAKEUP QR Code" style="width:170px; height:170px; display:block;">
          </div>

          <button id="copy-link-btn" class="btn-lux" style="height:48px; justify-content:center; gap:8px; width:100%;">
            <i class="fa-regular fa-copy" style="color:var(--rose-gold);"></i> ${isAr ? 'نسخ رابط الموقع' : 'Copy Link Address'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('close-qr-modal').addEventListener('click', closeCurrentModal);
    document.getElementById('qr-modal-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'qr-modal-overlay') closeCurrentModal();
    });

    document.getElementById('copy-link-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      window.showToast(isAr ? "تم نسخ الرابط بنجاح! ✨" : "Link copied to clipboard! ✨");
      closeCurrentModal();
    });
  }

  function closeCurrentModal() {
    const activeOverlay = document.querySelector('.modal-overlay.active');
    if (activeOverlay) {
      activeOverlay.classList.remove('active');
      setTimeout(() => {
        const container = document.getElementById('modal-container');
        if (container) container.innerHTML = '';
      }, 400);
    }
  }

  function updateLanguage(lang) {
    currentLang = lang;
    document.body.className = `lang-${lang} ${document.body.classList.contains('theme-blush') ? 'theme-blush' : ''}`;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    const dict = translations[lang];
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('.arrow-dir').forEach(el => {
      el.className = lang === 'ar' ? 'fa-solid fa-chevron-left arrow-dir' : 'fa-solid fa-chevron-right arrow-dir';
    });

    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = dict.lang_label;

    window.showToast(lang === 'ar' ? "تم التغيير إلى اللغة العربية ✨" : "Switched to English ✨");
  }

  // --- 4. INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    new NeonFlowerParticleEngine('bg-canvas');

    document.querySelectorAll('button, .btn-lux, .product-card, .action-chip, .logo-container, .top-bar-btn, .social-circle-btn').forEach(el => {
      el.addEventListener('click', playSoftClick);
    });

    const btnMansour = document.getElementById('btn-mansour');
    const btnAdhamiya = document.getElementById('btn-adhamiya');
    const btnShare = document.getElementById('btn-share');
    const btnThemeToggle = document.getElementById('btn-theme-toggle');
    const btnLangToggle = document.getElementById('btn-lang-toggle');

    if (btnMansour) {
      btnMansour.addEventListener('click', (e) => {
        e.preventDefault();
        showBranchModal('mansour');
      });
    }

    if (btnAdhamiya) {
      btnAdhamiya.addEventListener('click', (e) => {
        e.preventDefault();
        showBranchModal('adhamiya');
      });
    }

    if (btnShare) {
      btnShare.addEventListener('click', () => {
        showQRModal();
      });
    }

    if (btnThemeToggle) {
      btnThemeToggle.addEventListener('click', () => {
        document.body.classList.toggle('theme-blush');
        const isBlush = document.body.classList.contains('theme-blush');
        window.showToast(isBlush ? (currentLang === 'ar' ? "نمط الورد الشمباني ✨" : "Blush Champagne Theme ✨") : (currentLang === 'ar' ? "نمط الليل الفاخر 🌙" : "Midnight Rose Velvet Theme 🌙"));
      });
    }

    if (btnLangToggle) {
      btnLangToggle.addEventListener('click', () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        updateLanguage(newLang);
      });
    }

    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const nameEn = card.getAttribute('data-name-en') || 'Makeup Item';
        const nameAr = card.getAttribute('data-name-ar') || 'منتج مكياج';
        const waNumber = "9647701234567";
        const isAr = currentLang === 'ar';
        const message = isAr 
          ? encodeURIComponent(`مرحباً روزا ميك أب! أود الاستفسار عن طلب ${nameAr} ✨`)
          : encodeURIComponent(`Hello ROSA MAKEUP! I am interested in ordering the ${nameEn}. ✨`);
        window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
      });
    });
  });

})();

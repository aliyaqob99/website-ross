/* ROSA MAKEUP - Main Application Logic & Language Manager */
import { PowderParticleEngine } from './particles.js';
import { initParallaxEngine } from './parallax.js';
import { showBranchModal, showQRModal } from './modal.js';

// Bilingual Translations Dictionary
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
    sec_sub: "اضغط على المنتجات للطلب",
    p1_name: "أحمر شفاه مخملي روز",
    p2_name: "ظلال عيون روز جولد",
    p3_name: "عطر كريستال بلوم",
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
    p1_name: "Velvet Rose Lipstick",
    p2_name: "Rose Gold Eyeshadow",
    p3_name: "Crystal Bloom Parfum",
    btn_qr: "Share QR Code"
  }
};

let currentLang = 'ar';

// Synthesize subtle luxury audio touch feedback via Web Audio API
class AudioFeedback {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playSoftClick() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Audio context silently fails gracefully
    }
  }
}

const audio = new AudioFeedback();

// Global Toast Notification Helper
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

  // Update arrow directions
  document.querySelectorAll('.arrow-dir').forEach(el => {
    el.className = lang === 'ar' ? 'fa-solid fa-chevron-left arrow-dir' : 'fa-solid fa-chevron-right arrow-dir';
  });

  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = dict.lang_label;

  window.showToast(lang === 'ar' ? "تم التغيير إلى اللغة العربية ✨" : "Switched to English ✨");
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Canvas Particle Engine (Neon Petals & Starlight)
  new PowderParticleEngine('bg-canvas');

  // Initialize Parallax 3D & Card Tilt
  initParallaxEngine();

  // Attach button click events with audio feedback
  document.querySelectorAll('button, .btn-lux, .product-card, .action-chip, .logo-container, .top-bar-btn').forEach(el => {
    el.addEventListener('click', () => audio.playSoftClick());
  });

  // Action Button Listeners
  const btnMansour = document.getElementById('btn-mansour');
  const btnAdhamiya = document.getElementById('btn-adhamiya');
  const btnShare = document.getElementById('btn-share');
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const btnLangToggle = document.getElementById('btn-lang-toggle');

  if (btnMansour) {
    btnMansour.addEventListener('click', (e) => {
      e.preventDefault();
      showBranchModal('mansour', currentLang);
    });
  }

  if (btnAdhamiya) {
    btnAdhamiya.addEventListener('click', (e) => {
      e.preventDefault();
      showBranchModal('adhamiya', currentLang);
    });
  }

  if (btnShare) {
    btnShare.addEventListener('click', () => {
      showQRModal(currentLang);
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

  // Product Click Quick Inquiry via WhatsApp
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

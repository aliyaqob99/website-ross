/* ROSA MAKEUP - Interactive Modals & Branch Location Manager */

export const branchData = {
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

export function showBranchModal(branchKey, lang = 'ar') {
  const data = branchData[branchKey];
  if (!data) return;

  const isAr = lang === 'ar';
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

export function showQRModal(lang = 'ar') {
  const isAr = lang === 'ar';
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

export function closeCurrentModal() {
  const activeOverlay = document.querySelector('.modal-overlay.active');
  if (activeOverlay) {
    activeOverlay.classList.remove('active');
    setTimeout(() => {
      document.getElementById('modal-container').innerHTML = '';
    }, 400);
  }
}

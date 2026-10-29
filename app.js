/* =================================================================
   الصبر للصين | دليل بويوسف الصبر - التطبيق الذكي الشامل
   ================================================================= */

// City Definitions
const CITIES_INFO = {
  gz: {
    ar: "غوانزو",
    cn: "Guangzhou · 广州",
    watermark: "广州",
    blurb: "عاصمة التجارة وأسواق الجملة في جنوب الصين. تضم أضخم مجمعات الملابس، الحقائب، الساعات، الإلكترونيات، والمطاعم الحلال."
  },
  sh: {
    ar: "شنغهاي",
    cn: "Shanghai · 上海",
    watermark: "上海",
    blurb: "المدينة العالمية الفارهة، شارع نانجينغ التجاري، ممشى البوند، ديزني لاند، ناطحات السحاب، وأفخم المولات والكافيهات العالمية."
  },
  fs: {
    ar: "فوشان",
    cn: "Foshan · 佛山",
    watermark: "佛山",
    blurb: "عاصمة صناعة وتجارة الأثاث ومواد البناء والإنارة في العالم (مجاورة لغوانزو). مجمعات اللوفر Louver للأثاث الفاخر، وأسواق الإنارة في غوجين."
  }
};

// Travel Phrases
const TRAVEL_PHRASES = [
  { ar: "كم السعر؟", cn: "多少钱？", pinyin: "Duōshao qián?" },
  { ar: "خفض السعر قليلاً / رخيص شوي", cn: "便宜一点！", pinyin: "Piányi yīdiǎn!" },
  { ar: "هل هذا الطعام حلال؟", cn: "这是清真的吗？", pinyin: "Zhè shì qīngzhēn de ma?" },
  { ar: "أريد الذهاب إلى هذا العنوان", cn: "我想去这个地址。", pinyin: "Wǒ xiǎng qù zhè ge dìzhǐ." },
  { ar: "أين تقع محطة المترو؟", cn: "地铁站在哪里？", pinyin: "Dìtiě zhàn zài nǎlǐ?" },
  { ar: "أين يقع الحمام؟", cn: "洗手间在哪里？", pinyin: "Xǐshǒujiān zài nǎlǐ?" },
  { ar: "شكراً جزيلاً لك", cn: "非常感谢！", pinyin: "Fēicháng gǎnxiè!" },
  { ar: "أريد الفاتورة / الإيصال", cn: "我要发票。", pinyin: "Wǒ yào fāpiào." },
  { ar: "بدون فلفل حار لو سمحت", cn: "不要辣，谢谢。", pinyin: "Bù yào là, xièxie." },
  { ar: "أريد ماء دافئ / ماء للشرب", cn: "我要温水。", pinyin: "Wǒ yào wēn shuǐ." },
  { ar: "هل تقبل الدفع عبر Alipay؟", cn: "可以刷支付宝吗？", pinyin: "Kěyǐ shuā Zhīfùbǎo ma?" },
  { ar: "أحتاج إلى مترجم", cn: "我需要一个翻译。", pinyin: "Wǒ xūyào yī ge fānyì." }
];

// Pre-Travel Checklist Data
const TRAVEL_CHECKLIST_DATA = [
  {
    category: "🛂 الجواز والتأشيرة ووثائق السفر",
    items: [
      {
        id: "chk_passport_validity",
        title: "صلاحية جواز السفر لا تقل عن 6 أشهر",
        desc: "تأكد من تاريخ انتهاء جواز سفرك وأنه يحتوي على صفحتين فارغتين على الأقل."
      },
      {
        id: "chk_china_visa",
        title: "إصدار التأشيرة الصينية أو تأكيد شروط الإعفاء",
        desc: "تأشيرة تجارية (M) أو سياحية (L)، أو التأكد من أحدث اتفاقيات الإعفاء لمواطني دولتك أو ترانزيت 144 ساعة."
      },
      {
        id: "chk_doc_copies",
        title: "حفظ نسخ إلكترونية من الجواز والتذكرة",
        desc: "احفظ صور واضحة للجواز والفيزا وتذاكر الطيران في بريدك الإلكتروني وهاتفك."
      }
    ]
  },
  {
    category: "💳 تفعيل الدفع الإلكتروني (Alipay & WeChat Pay)",
    items: [
      {
        id: "chk_alipay_setup",
        title: "تثبيت تطبيق Alipay وتفعيله برقم هاتفك",
        desc: "التطبيق الأساسي رقم 1 للدفع في الصين لكل شيء من المترو والمشتريات وحتى التاكسي."
      },
      {
        id: "chk_alipay_card",
        title: "ربط بطاقة فيزا أو ماستركارد خليجية بـ Alipay",
        desc: "أضف بطاقتك الائتمانية أو بطاقة الخصم وأكمل التحقق بالهوية (Passport Verification)."
      },
      {
        id: "chk_wechat_setup",
        title: "تثبيت وتفعيل تطبيق WeChat",
        desc: "ضروري للتواصل مع التجار الصينيين وتفعيل محفظة WeChat Pay كخيار دفع احتياطي."
      },
      {
        id: "chk_emergency_cash",
        title: "حمل مبلغ نقدي بسيط للطوارئ (500 إلى 1000 يوان)",
        desc: "رغم أن الصين تعتمد بنسبة 99% على الدفع الرقمي، إلا أن الكاش الاحتياطي يمنحك راحة بال."
      }
    ]
  },
  {
    category: "📱 شريحة الإنترنت وتجاوز الحجب الصيني (eSIM & Roaming)",
    items: [
      {
        id: "chk_esim_roaming",
        title: "تثبيت شريحة eSIM مع باقة تجوال دولية",
        desc: "شرائح مثل Airalo و Nomad و Holafly تعمل عبر شبكات تجوال دولية وتتجاوز الحجب الصيني تلقائياً دون الحاجة لـ VPN (يعمل WhatsApp و Google و Instagram بسلاسة)."
      },
      {
        id: "chk_gulf_roaming",
        title: "أو تفعيل باقة تجوال من مشغل هاتفك الخليجي",
        desc: "باقات التجوال من STC و Zain و Ooredoo تعمل في الصين بدون أي حجب للمواقع والتطبيقات العالمية."
      },
      {
        id: "chk_backup_vpn",
        title: "تثبيت تطبيق VPN موثوق ومدفوع قبل الإقلاع",
        desc: "تنبيه: لا يمكن تنزيل تطبيقات VPN بعد الوصول للصين، لذا قم بتثبيتها وتجربتها مسبقاً."
      }
    ]
  },
  {
    category: "📲 تطبيقات الهاتف الضرورية داخل الصين",
    items: [
      {
        id: "chk_app_amap",
        title: "تنزيل تطبيق الخرائط الصيني Amap (高德地图)",
        desc: "الخريطة الأكثر دقة في الصين لأن خرائط Google محجوبة ومواقعها غير دقيقة."
      },
      {
        id: "chk_app_metroman",
        title: "تنزيل تطبيق MetroMan لمترو الصين",
        desc: "تطبيق مجاني يعمل بدون إنترنت يوضح خطوط ومحطات وأسعار مترو غوانزو وشنغهاي وفوشان."
      },
      {
        id: "chk_app_trip",
        title: "تنزيل تطبيق Trip.com لقطارات الرصاصة والفنادق",
        desc: "حجز تذاكر القطارات الصينية فائقة السرعة بسهولة وباللغة الإنجليزية."
      },
      {
        id: "chk_app_translate",
        title: "تنزيل تطبيق ترجمة مع حزمة اللغة الصينية بدون نت",
        desc: "حمّل حزمة الصينية أوفلاين في تطبيق الترجمة لترجمة الصور والنصوص الفورية."
      }
    ]
  },
  {
    category: "🏨 حجز الفنادق والتنقل بين المدن",
    items: [
      {
        id: "chk_hotel_foreigners",
        title: "التأكد من أن الفندق يقبل الأجانب (Foreigners Accepted)",
        desc: "بعض الفنادق الصينية الصغيرة غير مرخصة لاستقبال النزلاء الأجانب، تحقق عبر Trip.com."
      },
      {
        id: "chk_hotel_cn_addr",
        title: "حفظ اسم وعنوان الفندق باللغة الصينية للتاكسي",
        desc: "سائق التاكسي في المطار لا يتحدث الإنجليزية؛ احفظ كرت الفندق باللغة الصينية لإبرازه فوراً."
      }
    ]
  },
  {
    category: "🛬 بطاقة الدخول الإلكترونية (Digital Arrival Card)",
    items: [
      {
        id: "chk_arrival_card",
        title: "تعبئة إقرار بطاقة الدخول الصينية إلكترونياً (NIA)",
        desc: "قم بتعبئتها مجاناً خلال 24 ساعة قبل الرحلة عبر موقع الهجرة الصيني واحتفظ برمز QR."
      }
    ]
  }
];

// App State
let state = {
  activeSection: "home",
  currentCity: "gz",
  currentCategory: "الكل",
  currentSubFilter: "الكل",
  searchQuery: "",
  calcDiscount: 15,
  favorites: new Set(),
  checklist: new Set(),
  currentTaxiPlace: null
};

let toastTimeout = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadFavorites();
  loadChecklist();
  initPWA();
  initHomeSearch();
  initCatalogSearch();
  initFxConverter();
  initCbmCalculator();
  initPhrases();
  initTaxiHub();
  renderChecklist();
  updateCityHeader();
  renderFilters();
  renderPlaces();
  updateStats();

  // Handle URL hash navigation on load
  const hash = window.location.hash.replace("#", "").trim();
  if (hash) {
    switchSection(hash, true);
  } else {
    switchSection("home", true);
  }

  // Listen to browser Back/Forward buttons
  window.addEventListener("hashchange", () => {
    const newHash = window.location.hash.replace("#", "").trim() || "home";
    if (newHash !== state.activeSection) {
      switchSection(newHash, true);
    }
  });
});

/* =================================================================
   PWA & Service Worker
   ================================================================= */
function initPWA() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

/* =================================================================
   Favorites Management (Local Storage)
   ================================================================= */
function loadFavorites() {
  try {
    const raw = localStorage.getItem("sabar_favs_v2");
    if (raw) {
      const arr = JSON.parse(raw);
      state.favorites = new Set(arr);
    }
  } catch (_) {}
  updateFavBadges();
}

function saveFavorites() {
  try {
    const arr = Array.from(state.favorites);
    localStorage.setItem("sabar_favs_v2", JSON.stringify(arr));
  } catch (_) {}
  updateFavBadges();
}

function toggleFavorite(id, event) {
  if (event) event.stopPropagation();
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
    showToast("تمت الإزالة من جدول رحلتك ⭐");
  } else {
    state.favorites.add(id);
    showToast("تم الحفظ في جدول رحلتك ⭐");
  }
  saveFavorites();
  renderPlaces();
  if (state.activeSection === "favorites") {
    renderFavorites();
  }
}

function updateFavBadges() {
  const count = state.favorites.size;
  const topBadge = document.getElementById("favCountTop");
  const mBadge = document.getElementById("mobileFavBadge");

  if (topBadge) topBadge.textContent = count;
  if (mBadge) {
    mBadge.textContent = count;
    mBadge.style.display = count > 0 ? "inline-block" : "none";
  }
}

function clearFavorites() {
  if (!state.favorites.size) return;
  if (confirm("هل أنت متأكد من رغبتك في تفريغ قائمة المفضلة؟")) {
    state.favorites.clear();
    saveFavorites();
    renderFavorites();
    showToast("تم تفريغ المفضلة");
  }
}

function copyTripPlan() {
  if (!state.favorites.size) {
    showToast("قائمة المفضلة فارغة حالياً");
    return;
  }
  const favPlaces = PLACES.filter((p) => state.favorites.has(p.id));
  let text = "📋 جدول رحلتي في الصين - دليل بويوسف الصبر:\n\n";
  favPlaces.forEach((p, idx) => {
    text += `${idx + 1}. ${p.ar} (${p.city.toUpperCase()})\n`;
    text += `   🇨🇳 الصيني: ${p.cn}\n`;
    if (p.cnAddr) text += `   📍 العنوان: ${p.cnAddr}\n`;
    if (p.metro) text += `   🚇 المترو: ${p.metro}\n`;
    text += "\n";
  });

  copyTextToClipboard(text, "تم نسخ جدول اليوم بنجاح!");
}

function printTripPlan() {
  if (!state.favorites.size) {
    showToast("أضف أماكن إلى المفضلة أولاً لطباعة جدول رحلتك ⭐");
    return;
  }
  window.print();
}

/* =================================================================
   Pre-Travel Checklist Management (Local Storage)
   ================================================================= */
function loadChecklist() {
  try {
    const raw = localStorage.getItem("sabar_travel_checklist");
    if (raw) {
      const arr = JSON.parse(raw);
      state.checklist = new Set(arr);
    }
  } catch (_) {}
}

function saveChecklist() {
  try {
    const arr = Array.from(state.checklist);
    localStorage.setItem("sabar_travel_checklist", JSON.stringify(arr));
  } catch (_) {}
  updateChecklistProgress();
}

function renderChecklist() {
  const container = document.getElementById("checklistContainer");
  if (!container) return;

  container.innerHTML = TRAVEL_CHECKLIST_DATA.map((cat) => {
    const itemsHtml = cat.items
      .map((item) => {
        const isChecked = state.checklist.has(item.id);
        const checkedClass = isChecked ? "checked" : "";
        return `
          <div class="checklist-item ${checkedClass}" onclick="toggleChecklistItem('${item.id}')">
            <input 
              type="checkbox" 
              class="checklist-checkbox" 
              id="${item.id}" 
              ${isChecked ? "checked" : ""} 
              onclick="event.stopPropagation(); toggleChecklistItem('${item.id}')"
            />
            <div class="checklist-item-content">
              <div class="checklist-item-title">${escapeHtml(item.title)}</div>
              <div class="checklist-item-desc">${escapeHtml(item.desc)}</div>
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <div class="checklist-cat-card">
        <h3 class="checklist-cat-title">${escapeHtml(cat.category)}</h3>
        <div class="checklist-items-list">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join("");

  updateChecklistProgress();
}

function toggleChecklistItem(id) {
  if (state.checklist.has(id)) {
    state.checklist.delete(id);
  } else {
    state.checklist.add(id);
  }
  saveChecklist();
  renderChecklist();
}

function selectAllChecklist() {
  TRAVEL_CHECKLIST_DATA.forEach((cat) => {
    cat.items.forEach((item) => state.checklist.add(item.id));
  });
  saveChecklist();
  renderChecklist();
  showToast("تم تحديد جميع بنود السفر كمكتملة! ✈️");
}

function resetChecklist() {
  if (!state.checklist.size) return;
  if (confirm("هل ترغب في إعادة تعيين قائمة مهام السفر؟")) {
    state.checklist.clear();
    saveChecklist();
    renderChecklist();
    showToast("تمت إعادة تعيين القائمة");
  }
}

function updateChecklistProgress() {
  let totalItems = 0;
  TRAVEL_CHECKLIST_DATA.forEach((c) => (totalItems += c.items.length));
  const doneCount = state.checklist.size;
  const percent = totalItems ? Math.round((doneCount / totalItems) * 100) : 0;

  const percentEl = document.getElementById("checklistPercent");
  const countEl = document.getElementById("checklistCountText");
  const fillEl = document.getElementById("checklistProgressFill");

  if (percentEl) percentEl.textContent = `${percent}%`;
  if (countEl) countEl.textContent = `${doneCount} من ${totalItems} بنداً مكتملاً`;
  if (fillEl) fillEl.style.width = `${percent}%`;
}

/* =================================================================
   Dedicated Taxi Assistant Hub
   ================================================================= */
function initTaxiHub() {
  const defaultPlace = PLACES.find((p) => p.id === "p_1") || PLACES[0];
  if (defaultPlace) {
    selectTaxiDestination(defaultPlace);
  }
}

function handleTaxiSearchInput(query) {
  const suggestionsBox = document.getElementById("taxiSuggestions");
  if (!suggestionsBox) return;

  const q = query.trim().toLowerCase();
  if (!q) {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
    return;
  }

  const matches = PLACES.filter((p) => {
    const haystack = [p.ar, p.cn, p.en, p.cnAddr, p.metro || ""].join(" ").toLowerCase();
    return haystack.includes(q);
  }).slice(0, 6);

  if (!matches.length) {
    suggestionsBox.style.display = "block";
    suggestionsBox.innerHTML = `<div class="taxi-suggestion-item" style="color:var(--text-muted); cursor:default;">لم يتم العثور على نتائج، يمكنك استخدام خيار العنوان المخصص أدناه.</div>`;
    return;
  }

  suggestionsBox.style.display = "block";
  suggestionsBox.innerHTML = matches
    .map((p) => {
      const cityLabel = CITIES_INFO[p.city] ? CITIES_INFO[p.city].ar : p.city;
      return `
      <div class="taxi-suggestion-item" onclick="selectTaxiDestinationById('${p.id}')">
        <div>
          <strong>${escapeHtml(p.ar)}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted); margin-right:6px;">(${cityLabel})</span>
          <div style="font-size:0.8rem; color:#64748b;">${escapeHtml(p.cn)}</div>
        </div>
        <span style="color:var(--gold); font-size:0.8rem; font-weight:700;">اختيار ↗</span>
      </div>
    `;
    })
    .join("");
}

function selectTaxiDestinationById(id) {
  const place = PLACES.find((p) => p.id === id);
  if (!place) return;
  selectTaxiDestination(place);
  const searchInput = document.getElementById("taxiHubSearch");
  if (searchInput) searchInput.value = "";
  const suggestionsBox = document.getElementById("taxiSuggestions");
  if (suggestionsBox) suggestionsBox.style.display = "none";
}

function selectTaxiDestination(place) {
  state.currentTaxiPlace = place;

  const arEl = document.getElementById("taxiDisplayAr");
  const cnEl = document.getElementById("taxiDisplayCn");
  const addrEl = document.getElementById("taxiDisplayAddr");
  const metroEl = document.getElementById("taxiDisplayMetro");
  const cityEl = document.getElementById("taxiDisplayCity");

  if (arEl) arEl.textContent = place.ar;
  if (cnEl) cnEl.textContent = place.cn;
  if (addrEl) addrEl.textContent = place.cnAddr ? `📍 ${place.cnAddr}` : `📍 ${place.cn}`;
  if (metroEl) {
    if (place.metro) {
      metroEl.textContent = `🚇 ${place.metro}`;
      metroEl.style.display = "block";
    } else {
      metroEl.style.display = "none";
    }
  }
  if (cityEl) {
    cityEl.textContent = CITIES_INFO[place.city] ? CITIES_INFO[place.city].ar : place.city;
  }
}

function applyCustomTaxiAddress() {
  const input = document.getElementById("customTaxiInput");
  if (!input || !input.value.trim()) {
    showToast("يرجى كتابة اسم أو عنوان الفندق أولاً");
    return;
  }

  const customText = input.value.trim();
  const customPlace = {
    id: "custom_taxi",
    ar: "وجهة مخصصة (فندق / عنوان خاص)",
    cn: customText,
    cnAddr: customText,
    metro: "",
    city: state.currentCity || "gz"
  };

  selectTaxiDestination(customPlace);
  showToast("تم تحديث بطاقة السائق بالعنوان المخصص ✨");
  const display = document.getElementById("taxiHubDisplay");
  if (display) display.scrollIntoView({ behavior: "smooth", block: "center" });
}

function speakCurrentTaxi() {
  if (state.currentTaxiPlace && state.currentTaxiPlace.cn) {
    speakChinese(state.currentTaxiPlace.cn);
  }
}

function copyCurrentTaxi() {
  if (!state.currentTaxiPlace) return;
  const text = state.currentTaxiPlace.cnAddr || state.currentTaxiPlace.cn;
  copyTextToClipboard(text, "تم نسخ العنوان الصيني للتاكسي");
}

function openCurrentTaxiAmap() {
  if (!state.currentTaxiPlace) return;
  const p = state.currentTaxiPlace;
  openAmapMap(p.cnAddr || p.cn, p.city || "gz");
}

function openCurrentTaxiBaidu() {
  if (!state.currentTaxiPlace) return;
  const p = state.currentTaxiPlace;
  openBaiduMap(p.cnAddr || p.cn, p.city || "gz");
}

/* =================================================================
   Navigation & Section Switching
   ================================================================= */
function switchSection(secKey, skipHash = false) {
  state.activeSection = secKey;

  // View containers
  const homeView = document.getElementById("view-home");
  const catalogView = document.getElementById("view-catalog");
  const taxiView = document.getElementById("view-taxi");
  const checklistView = document.getElementById("view-checklist");
  const mapsView = document.getElementById("view-maps");
  const arrivalView = document.getElementById("view-arrival");
  const fxView = document.getElementById("view-fx");
  const servicesView = document.getElementById("view-services");
  const phrasesView = document.getElementById("view-phrases");
  const favoritesView = document.getElementById("view-favorites");

  // Hide all
  const allViews = [
    homeView,
    catalogView,
    taxiView,
    checklistView,
    mapsView,
    arrivalView,
    fxView,
    servicesView,
    phrasesView,
    favoritesView
  ];

  allViews.forEach((el) => {
    if (el) el.style.display = "none";
  });

  // Handle views
  if (secKey === "home") {
    if (homeView) homeView.style.display = "block";
  } else if (secKey === "gz" || secKey === "sh" || secKey === "fs") {
    state.currentCity = secKey;
    state.currentCategory = "الكل";
    state.currentSubFilter = "الكل";
    if (catalogView) catalogView.style.display = "block";
    updateCityHeader();
    updateCatalogCrumb();
    updateCitySelectorTabs();
    renderFilters();
    renderPlaces();
  } else if (secKey === "taxi") {
    if (taxiView) taxiView.style.display = "block";
  } else if (secKey === "checklist") {
    if (checklistView) checklistView.style.display = "block";
    renderChecklist();
  } else if (secKey === "maps") {
    if (mapsView) mapsView.style.display = "block";
  } else if (secKey === "arrival") {
    if (arrivalView) arrivalView.style.display = "block";
  } else if (secKey === "fx") {
    if (fxView) fxView.style.display = "block";
  } else if (secKey === "services") {
    if (servicesView) servicesView.style.display = "block";
  } else if (secKey === "phrases") {
    if (phrasesView) phrasesView.style.display = "block";
  } else if (secKey === "favorites") {
    if (favoritesView) favoritesView.style.display = "block";
    renderFavorites();
  }

  // Update tabs UI & Mobile Nav
  updateTabsUI(secKey);

  // Sync Hash
  if (!skipHash) {
    window.location.hash = secKey;
  }

  // Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateTabsUI(activeKey) {
  // Mobile Bottom Nav
  document.querySelectorAll("#mobileBottomNav .mobile-nav-item").forEach((btn) => {
    const sec = btn.getAttribute("data-sec");
    if (sec === activeKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function updateCatalogCrumb() {
  const crumb = document.getElementById("catalogCrumbTitle");
  if (!crumb) return;
  const names = {
    gz: "أسواق غوانزو بالجملة",
    fs: "عالم أثاث وإنارة فوشان",
    sh: "معالم وتجارة شنغهاي"
  };
  crumb.textContent = names[state.currentCity] || "الأسواق";
}

function updateCitySelectorTabs() {
  const tabs = {
    gz: document.getElementById("tabBtnGz"),
    fs: document.getElementById("tabBtnFs"),
    sh: document.getElementById("tabBtnSh")
  };

  Object.keys(tabs).forEach((k) => {
    if (tabs[k]) {
      if (k === state.currentCity) {
        tabs[k].classList.add("active");
      } else {
        tabs[k].classList.remove("active");
      }
    }
  });
}

function updateCityHeader() {
  const info = CITIES_INFO[state.currentCity];
  if (!info) return;

  const titleAr = document.getElementById("cityNameAr");
  const titleCn = document.getElementById("cityNameCn");
  const blurb = document.getElementById("cityBlurb");
  const watermark = document.getElementById("cityWatermark");

  if (titleAr) titleAr.textContent = info.ar;
  if (titleCn) titleCn.textContent = info.cn;
  if (blurb) blurb.textContent = info.blurb;
  if (watermark) watermark.textContent = info.watermark;
}

/* =================================================================
   Search & Filter Logic
   ================================================================= */
function initHomeSearch() {
  const homeInput = document.getElementById("homeUniversalSearch");
  const clearBtn = document.getElementById("homeClearSearchBtn");

  if (homeInput) {
    homeInput.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = val ? "block" : "none";
    });

    homeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = homeInput.value.trim();
        if (val) {
          launchSearch(val);
        }
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (homeInput) homeInput.value = "";
      clearBtn.style.display = "none";
      if (homeInput) homeInput.focus();
    });
  }
}

function launchSearch(query, preferredCity = null) {
  // If user searched for furniture and didn't specify city, pick Foshan
  let targetCity = preferredCity || state.currentCity;
  if (query.includes("أثاث") || query.includes("اللوفر") || query.includes("إنارة")) {
    targetCity = "fs";
  } else if (query.includes("نانجينغ") || query.includes("بوند") || query.includes("ديزني")) {
    targetCity = "sh";
  }

  switchSection(targetCity);

  const catalogSearchInput = document.getElementById("globalSearch");
  const clearBtn = document.getElementById("clearSearchBtn");

  if (catalogSearchInput) {
    catalogSearchInput.value = query;
    state.searchQuery = query.toLowerCase();
    if (clearBtn) clearBtn.style.display = "block";
    renderPlaces();
    catalogSearchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function initCatalogSearch() {
  const searchInput = document.getElementById("globalSearch");
  const clearBtn = document.getElementById("clearSearchBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) {
        clearBtn.style.display = state.searchQuery ? "block" : "none";
      }
      renderPlaces();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      state.searchQuery = "";
      clearBtn.style.display = "none";
      renderPlaces();
      if (searchInput) searchInput.focus();
    });
  }
}

function quickSearch(tag) {
  const searchInput = document.getElementById("globalSearch");
  const clearBtn = document.getElementById("clearSearchBtn");
  if (searchInput) {
    searchInput.value = tag;
    state.searchQuery = tag.toLowerCase();
    if (clearBtn) clearBtn.style.display = "block";
    if (tag === "أثاث" && state.currentCity !== "fs") {
      switchSection("fs");
      return;
    }
    renderPlaces();
    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function renderFilters() {
  const chipsContainer = document.getElementById("categoryChips");
  if (!chipsContainer) return;

  const cityPlaces = PLACES.filter((p) => p.city === state.currentCity);
  const catCounts = { الكل: cityPlaces.length };

  cityPlaces.forEach((p) => {
    catCounts[p.cat] = (catCounts[p.cat] || 0) + 1;
  });

  const categories = ["الكل", ...Object.keys(catCounts).filter((c) => c !== "الكل")];

  chipsContainer.innerHTML = categories
    .map((cat) => {
      const activeClass = state.currentCategory === cat ? "active" : "";
      const count = catCounts[cat] || 0;
      return `
      <button class="chip ${activeClass}" onclick="setCategory('${cat}')">
        <span>${cat}</span>
        <span class="chip-count">(${count})</span>
      </button>
    `;
    })
    .join("");
}

function setCategory(cat) {
  state.currentCategory = cat;
  renderFilters();
  renderPlaces();
}

function setSubFilter(sub) {
  state.currentSubFilter = sub;
  document.querySelectorAll("#subCategoryChips .subchip").forEach((btn) => {
    if (btn.getAttribute("data-sub") === sub) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  renderPlaces();
}

/* =================================================================
   Places Card Rendering
   ================================================================= */
function renderPlaces() {
  const container = document.getElementById("placesContainer");
  const emptyState = document.getElementById("emptyState");
  if (!container) return;

  const q = state.searchQuery;
  const filtered = PLACES.filter((p) => {
    // City match
    if (p.city !== state.currentCity) return false;

    // Category match
    if (state.currentCategory !== "الكل" && p.cat !== state.currentCategory) {
      return false;
    }

    // Sub-category niche match
    if (state.currentSubFilter && state.currentSubFilter !== "الكل") {
      const sf = state.currentSubFilter;
      const matchSub =
        (p.subTags && p.subTags.includes(sf)) ||
        [p.ar, p.cn, p.cat, p.en, p.note].join(" ").includes(sf);
      if (!matchSub) return false;
    }

    // Search query match
    if (q) {
      const haystack = [p.ar, p.cn, p.en, p.cnAddr, p.enAddr, p.cat, p.note, p.metro || ""]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });

  if (!filtered.length) {
    container.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  container.innerHTML = filtered.map((place) => createPlaceCardHtml(place)).join("");
}

function renderFavorites() {
  const container = document.getElementById("favoritesContainer");
  const emptyState = document.getElementById("favEmptyState");
  if (!container) return;

  const favPlaces = PLACES.filter((p) => state.favorites.has(p.id));

  if (!favPlaces.length) {
    container.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  container.innerHTML = favPlaces.map((place) => createPlaceCardHtml(place, true)).join("");
}

function createPlaceCardHtml(place, showCityBadge = false) {
  const isFav = state.favorites.has(place.id);
  const favClass = isFav ? "is-fav" : "";
  const favIcon = isFav ? "★" : "☆";
  const cityLabel = CITIES_INFO[place.city] ? CITIES_INFO[place.city].ar : place.city;

  const displayAddr = place.cnAddr || place.cn;

  return `
    <article class="place-card" id="${place.id}">
      <div class="card-top">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="card-cat-badge">${place.cat}</span>
          ${showCityBadge ? `<span class="card-cat-badge" style="background: rgba(154,112,22,0.15); color: #7c5a11;">${cityLabel}</span>` : ""}
        </div>
        <button class="card-fav-btn ${favClass}" onclick="toggleFavorite('${place.id}', event)" title="حفظ في المفضلة">
          ${favIcon}
        </button>
      </div>

      <h3 class="place-title-ar">${escapeHtml(place.ar)}</h3>
      ${place.en ? `<div class="place-title-en">🇬🇧 ${escapeHtml(place.en)}</div>` : ""}

      <div class="chinese-box">
        <div class="chinese-name">
          <span>🇨🇳 ${escapeHtml(place.cn)}</span>
        </div>
        ${place.cnAddr ? `<div class="chinese-address">📍 ${escapeHtml(place.cnAddr)}</div>` : ""}
        ${place.enAddr ? `<div class="english-address">${escapeHtml(place.enAddr)}</div>` : ""}
      </div>

      ${place.note ? `<div class="place-note">💡 ${escapeHtml(place.note)}</div>` : ""}
      ${place.metro ? `<div class="place-metro-badge">🚇 <strong>المترو:</strong> ${escapeHtml(place.metro)}</div>` : ""}

      <div class="card-actions">
        <button class="btn-card btn-card-copy" onclick="copyChineseAddress('${escapeAttr(displayAddr)}')">
          📋 نسخ الصيني
        </button>
        <button class="btn-card" onclick="openAmapMap('${escapeAttr(displayAddr)}', '${place.city}')">
          📍 خريطة Amap
        </button>
        <button class="btn-card btn-card-taxi" onclick="openTaxiCardModal('${place.id}')">
          🚕 بطاقة لسائق التاكسي (خط مكبّر)
        </button>
      </div>
    </article>
  `;
}

function updateStats() {
  const countEl = document.getElementById("portalStatCount");
  if (countEl) countEl.textContent = PLACES.length;

  const gzCount = PLACES.filter((p) => p.city === "gz").length;
  const shCount = PLACES.filter((p) => p.city === "sh").length;
  const fsCount = PLACES.filter((p) => p.city === "fs").length;

  const pGz = document.getElementById("portalBadgeGz");
  const pSh = document.getElementById("portalBadgeSh");
  const pFs = document.getElementById("portalBadgeFs");

  if (pGz) pGz.textContent = `${gzCount} سوقاً`;
  if (pSh) pSh.textContent = `${shCount} مواقع`;
  if (pFs) pFs.textContent = `${fsCount} مجمعاً`;

  const bGz = document.getElementById("badgeGz");
  const bSh = document.getElementById("badgeSh");
  const bFs = document.getElementById("badgeFs");

  if (bGz) bGz.textContent = gzCount;
  if (bSh) bSh.textContent = shCount;
  if (bFs) bFs.textContent = fsCount;
}

/* =================================================================
   Fullscreen Modal Taxi Card
   ================================================================= */
function openTaxiCardModal(placeId) {
  const place = PLACES.find((p) => p.id === placeId);
  if (!place) return;

  const modal = document.getElementById("taxiModal");
  const arEl = document.getElementById("taxiModalAr");
  const cnEl = document.getElementById("taxiModalCn");
  const addrEl = document.getElementById("taxiModalAddr");
  const metroEl = document.getElementById("taxiModalMetro");
  const speakBtn = document.getElementById("taxiModalSpeakBtn");
  const copyBtn = document.getElementById("taxiModalCopyBtn");
  const mapBtn = document.getElementById("taxiModalMapBtn");
  const baiduBtn = document.getElementById("taxiModalBaiduBtn");

  if (arEl) arEl.textContent = place.ar;
  if (cnEl) cnEl.textContent = place.cn;
  if (addrEl) addrEl.textContent = place.cnAddr ? `📍 ${place.cnAddr}` : `📍 ${place.cn}`;
  if (metroEl) {
    if (place.metro) {
      metroEl.textContent = `🚇 ${place.metro}`;
      metroEl.style.display = "block";
    } else {
      metroEl.style.display = "none";
    }
  }

  if (speakBtn) {
    speakBtn.onclick = () => {
      speakChinese(place.cn);
    };
  }

  if (copyBtn) {
    copyBtn.onclick = () => {
      const text = place.cnAddr || place.cn;
      copyTextToClipboard(text, "تم نسخ العنوان الصيني للتاكسي");
    };
  }

  if (mapBtn) {
    mapBtn.onclick = () => {
      openAmapMap(place.cnAddr || place.cn, place.city);
    };
  }

  if (baiduBtn) {
    baiduBtn.onclick = () => {
      openBaiduMap(place.cnAddr || place.cn, place.city);
    };
  }

  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeTaxiModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById("taxiModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

/* =================================================================
   Service Inquiry Preview Modal
   ================================================================= */
function showServiceInquiry(serviceName) {
  const modal = document.getElementById("serviceModal");
  const title = document.getElementById("serviceModalTitle");
  if (title) title.textContent = serviceName;
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeServiceModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById("serviceModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

/* =================================================================
   Speech & External Actions
   ================================================================= */
function speakChinese(text) {
  if (!("speechSynthesis" in window)) {
    showToast("النطق الصوتي غير مدعوم في متصفحك");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
  showToast("جاري النطق باللغة الصينية 🔊");
}

function openAmapMap(query, cityKey) {
  const cityInfo = CITIES_INFO[cityKey];
  const fullQuery = [query, cityInfo ? cityInfo.cn.split("·")[1].trim() : ""].join(" ");
  const url = `https://uri.amap.com/search?keyword=${encodeURIComponent(fullQuery)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function openBaiduMap(query, cityKey) {
  const cityInfo = CITIES_INFO[cityKey];
  const cityName = cityInfo ? cityInfo.cn.split("·")[1].trim() : "中国";
  const url = `https://map.baidu.com/mobile/webapp/search/search/qt=s&wd=${encodeURIComponent(query)}&c=${encodeURIComponent(cityName)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function copyChineseAddress(text) {
  copyTextToClipboard(text, `تم نسخ: ${text}`);
}

function copyTextToClipboard(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast(successMsg))
      .catch(() => fallbackCopy(text, successMsg));
    return;
  }
  fallbackCopy(text, successMsg);
}

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(successMsg);
  } catch (_) {
    showToast("تعذر النسخ تلقائياً");
  }
  document.body.removeChild(textArea);
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* =================================================================
   Live Currency & Freight CBM Calculators
   ================================================================= */
const RATES = {
  KWD: 0.04285,
  SAR: 0.5182,
  AED: 0.5075,
  QAR: 0.5034,
  OMR: 0.05315,
  BHD: 0.0521,
  USD: 0.1383
};

function initFxConverter() {
  const input = document.getElementById("cnyInput");
  if (input) {
    input.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value) || 0;
      updateFxRates(val);
    });
    updateFxRates(1000);
  }

  const pInput = document.getElementById("calcPrice");
  const qInput = document.getElementById("calcQty");
  if (pInput && qInput) {
    pInput.addEventListener("input", updateShoppingCalculator);
    qInput.addEventListener("input", updateShoppingCalculator);
    updateShoppingCalculator();
  }
}

function updateFxRates(cny) {
  Object.keys(RATES).forEach((curr) => {
    const el = document.getElementById(`res${curr}`);
    if (el) {
      const val = (cny * RATES[curr]).toFixed(2);
      el.textContent = `${val} ${curr}`;
    }
  });
}

function applyDiscount(percent) {
  state.calcDiscount = percent;
  document.querySelectorAll("#view-fx .chip").forEach((btn) => {
    if (btn.textContent.includes(`${percent}%`) || (percent === 0 && btn.textContent.includes("0%"))) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  updateShoppingCalculator();
}

function updateShoppingCalculator() {
  const pInput = document.getElementById("calcPrice");
  const qInput = document.getElementById("calcQty");
  if (!pInput || !qInput) return;

  const price = parseFloat(pInput.value) || 0;
  const qty = parseFloat(qInput.value) || 0;
  const subtotal = price * qty;
  const discounted = subtotal * (1 - state.calcDiscount / 100);

  const totalCnyEl = document.getElementById("calcTotalCny");
  const totalKwdEl = document.getElementById("calcTotalKwd");
  const totalSarEl = document.getElementById("calcTotalSar");

  if (totalCnyEl) totalCnyEl.textContent = `${discounted.toFixed(1)} CNY`;
  if (totalKwdEl) totalKwdEl.textContent = `~ ${(discounted * RATES.KWD).toFixed(2)} KWD`;
  if (totalSarEl) totalSarEl.textContent = `~ ${(discounted * RATES.SAR).toFixed(2)} SAR`;
}

function initCbmCalculator() {
  const lInput = document.getElementById("cbmLength");
  const wInput = document.getElementById("cbmWidth");
  const hInput = document.getElementById("cbmHeight");
  const qInput = document.getElementById("cbmQty");
  const weightInput = document.getElementById("cbmWeight");

  const inputs = [lInput, wInput, hInput, qInput, weightInput];
  inputs.forEach((inp) => {
    if (inp) inp.addEventListener("input", updateCbmCalculator);
  });

  updateCbmCalculator();
}

function updateCbmCalculator() {
  const l = parseFloat(document.getElementById("cbmLength")?.value) || 0;
  const w = parseFloat(document.getElementById("cbmWidth")?.value) || 0;
  const h = parseFloat(document.getElementById("cbmHeight")?.value) || 0;
  const qty = parseFloat(document.getElementById("cbmQty")?.value) || 0;
  const weight = parseFloat(document.getElementById("cbmWeight")?.value) || 0;

  // Single carton volume in m³
  const singleCbm = (l * w * h) / 1000000;
  const totalCbm = singleCbm * qty;
  const totalActualWeight = weight * qty;

  // Air volumetric weight: (L * W * H in cm / 5000) * qty
  const airVolumetricWeight = ((l * w * h) / 5000) * qty;

  const resCbmEl = document.getElementById("resTotalCbm");
  const resWeightEl = document.getElementById("resTotalWeight");
  const resAirEl = document.getElementById("resAirVolWeight");
  const resCont20El = document.getElementById("resContainer20");
  const adviceEl = document.getElementById("cbmAdvice");

  if (resCbmEl) resCbmEl.textContent = `${totalCbm.toFixed(2)} م³`;
  if (resWeightEl) resWeightEl.textContent = `${totalActualWeight.toFixed(0)} كجم`;
  if (resAirEl) resAirEl.textContent = `${airVolumetricWeight.toFixed(0)} كجم`;

  // Standard container capacities: 20ft approx 28 CBM usable, 40HQ approx 65 CBM usable
  if (resCont20El) {
    if (totalCbm <= 28) {
      const pct = ((totalCbm / 28) * 100).toFixed(1);
      resCont20El.textContent = `~ ${pct}% من حاوية 20 قدم`;
    } else {
      const pct = ((totalCbm / 65) * 100).toFixed(1);
      resCont20El.textContent = `~ ${pct}% من حاوية 40HQ`;
    }
  }

  if (adviceEl) {
    if (totalCbm < 0.3) {
      adviceEl.innerHTML = `💡 <strong>توصية الشحن:</strong> حجم شحنتك صغير جداً وخفيف، الأوفر والأنسب شحنها عبر <strong>الشحن الجوي السريع</strong>.`;
    } else if (totalCbm <= 15) {
      adviceEl.innerHTML = `💡 <strong>توصية الشحن:</strong> حجم شحنتك اقتصادي ومناسب جداً للشحن الجزئي البحري المجمّع <strong>(LCL)</strong> بدلاً من حجز حاوية كاملة.`;
    } else if (totalCbm <= 30) {
      adviceEl.innerHTML = `💡 <strong>توصية الشحن:</strong> حجم شحنتك يشغل معظم أو كامل <strong>حاوية 20 قدم (FCL)</strong>. الأفضل حجز حاوية 20 قدم خاصة لحماية بضاعتك.`;
    } else {
      adviceEl.innerHTML = `💡 <strong>توصية الشحن:</strong> حجم شحنتك ضخم ويتطلب <strong>حاوية 40 قدم عالية السقف (40HQ)</strong> للتوفير الأقصى في تكلفة النقل.`;
    }
  }
}

/* =================================================================
   Travel Phrases
   ================================================================= */
function initPhrases() {
  const container = document.getElementById("phrasesList");
  if (!container) return;

  container.innerHTML = TRAVEL_PHRASES.map((phrase) => {
    return `
      <div class="phrase-card">
        <div class="phrase-ar">${escapeHtml(phrase.ar)}</div>
        <div class="phrase-cn">${escapeHtml(phrase.cn)}</div>
        <div class="phrase-pinyin">${escapeHtml(phrase.pinyin)}</div>
        <div class="phrase-actions">
          <button class="phrase-action-btn" onclick="speakChinese('${escapeAttr(phrase.cn)}')">
            🔊 استمع
          </button>
          <button class="phrase-action-btn" onclick="copyChineseAddress('${escapeAttr(phrase.cn)}')">
            📋 نسخ
          </button>
        </div>
      </div>
    `;
  }).join("");
}

/* =================================================================
   Utility Helpers
   ================================================================= */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(str) {
  if (!str) return "";
  return String(str)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "\\'");
}

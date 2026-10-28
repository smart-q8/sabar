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
    blurb: "عاصمة صناعة وتجارة الأثاث ومواد البناء والإنارة في العالم (مجاورة لغوانزو). مجمعات اللوفر Louver للأثاث الفاخر، وأسواق الإنارة."
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

// App State
let state = {
  activeSection: "gz",
  currentCity: "gz",
  currentCategory: "الكل",
  searchQuery: "",
  calcDiscount: 15,
  favorites: new Set()
};

let toastTimeout = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadFavorites();
  initPWA();
  initSearch();
  initFxConverter();
  initPhrases();
  updateCityHeader();
  renderFilters();
  renderPlaces();
  updateStats();
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
  const tabBadge = document.getElementById("badgeFav");
  const mBadge = document.getElementById("mobileFavBadge");

  if (topBadge) topBadge.textContent = count;
  if (tabBadge) tabBadge.textContent = count;
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
    text += "\n";
  });

  copyTextToClipboard(text, "تم نسخ جدول اليوم بنجاح!");
}

/* =================================================================
   Navigation & Section Switching
   ================================================================= */
function switchSection(secKey) {
  state.activeSection = secKey;

  // View containers
  const catalogView = document.getElementById("view-catalog");
  const arrivalView = document.getElementById("view-arrival");
  const fxView = document.getElementById("view-fx");
  const servicesView = document.getElementById("view-services");
  const phrasesView = document.getElementById("view-phrases");
  const favoritesView = document.getElementById("view-favorites");

  // Hide all
  [catalogView, arrivalView, fxView, servicesView, phrasesView, favoritesView].forEach((el) => {
    if (el) el.style.display = "none";
  });

  // Handle views
  if (secKey === "gz" || secKey === "sh" || secKey === "fs") {
    state.currentCity = secKey;
    state.currentCategory = "الكل";
    if (catalogView) catalogView.style.display = "block";
    updateCityHeader();
    renderFilters();
    renderPlaces();
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

  // Update tabs UI
  updateTabsUI(secKey);
}

function updateTabsUI(activeKey) {
  // Desktop Nav Links
  document.querySelectorAll("#desktopNav .nav-link").forEach((btn) => {
    const fn = btn.getAttribute("onclick") || "";
    if (fn.includes(`'${activeKey}'`)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Main Sticky Tabs
  document.querySelectorAll("#mainTabs .sec-tab").forEach((btn) => {
    const sec = btn.getAttribute("data-sec");
    if (sec === activeKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

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
function initSearch() {
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
    // If tag relates to Foshan and we are not in Foshan, switch to Foshan
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

    // Search query match
    if (q) {
      const haystack = [p.ar, p.cn, p.en, p.cnAddr, p.enAddr, p.cat, p.note]
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
          ${showCityBadge ? `<span class="card-cat-badge" style="background: rgba(212,175,55,0.15); color: #f5df88;">${cityLabel}</span>` : ""}
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
  const countEl = document.getElementById("statPlacesCount");
  if (countEl) countEl.textContent = PLACES.length;

  const gzCount = PLACES.filter((p) => p.city === "gz").length;
  const shCount = PLACES.filter((p) => p.city === "sh").length;
  const fsCount = PLACES.filter((p) => p.city === "fs").length;

  const bGz = document.getElementById("badgeGz");
  const bSh = document.getElementById("badgeSh");
  const bFs = document.getElementById("badgeFs");

  if (bGz) bGz.textContent = gzCount;
  if (bSh) bSh.textContent = shCount;
  if (bFs) bFs.textContent = fsCount;
}

/* =================================================================
   Taxi Modal (بطاقة التاكسي الصينية المكبرة)
   ================================================================= */
let currentTaxiPlace = null;

function openTaxiCardModal(placeId) {
  const place = PLACES.find((p) => p.id === placeId);
  if (!place) return;

  currentTaxiPlace = place;

  const modal = document.getElementById("taxiModal");
  const arEl = document.getElementById("taxiModalAr");
  const cnEl = document.getElementById("taxiModalCn");
  const addrEl = document.getElementById("taxiModalAddr");
  const speakBtn = document.getElementById("taxiModalSpeakBtn");
  const copyBtn = document.getElementById("taxiModalCopyBtn");
  const mapBtn = document.getElementById("taxiModalMapBtn");

  if (arEl) arEl.textContent = place.ar;
  if (cnEl) cnEl.textContent = place.cn;
  if (addrEl) addrEl.textContent = place.cnAddr || place.cn;

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
   Service Inquiry Preview Modal (دون تفعيل أي اتصال مباشر)
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
  textArea.remove();
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* =================================================================
   FX Converter & Shopping Calculator
   ================================================================= */
const FX_RATES_CNY_BASE = {
  KWD: 0.04285, // 1 CNY ≈ 0.04285 KWD (1 KWD ≈ 23.33 CNY)
  SAR: 0.5182,  // 1 CNY ≈ 0.5182 SAR
  AED: 0.5075,  // 1 CNY ≈ 0.5075 AED
  QAR: 0.5034,  // 1 CNY ≈ 0.5034 QAR
  OMR: 0.05315, // 1 CNY ≈ 0.05315 OMR
  BHD: 0.05210, // 1 CNY ≈ 0.05210 BHD
  USD: 0.1383   // 1 CNY ≈ 0.1383 USD
};

function initFxConverter() {
  const cnyInput = document.getElementById("cnyInput");
  if (cnyInput) {
    cnyInput.addEventListener("input", updateFxRates);
  }

  const calcPrice = document.getElementById("calcPrice");
  const calcQty = document.getElementById("calcQty");

  if (calcPrice) calcPrice.addEventListener("input", updateShoppingCalculator);
  if (calcQty) calcQty.addEventListener("input", updateShoppingCalculator);

  updateFxRates();
  updateShoppingCalculator();
}

function updateFxRates() {
  const input = document.getElementById("cnyInput");
  const cny = parseFloat(input ? input.value : 0) || 0;

  const setVal = (id, cur, rate) => {
    const el = document.getElementById(id);
    if (el) {
      const val = (cny * rate).toFixed(2);
      el.textContent = `${val} ${cur}`;
    }
  };

  setVal("resKWD", "KWD", FX_RATES_CNY_BASE.KWD);
  setVal("resSAR", "SAR", FX_RATES_CNY_BASE.SAR);
  setVal("resAED", "AED", FX_RATES_CNY_BASE.AED);
  setVal("resQAR", "QAR", FX_RATES_CNY_BASE.QAR);
  setVal("resOMR", "OMR", FX_RATES_CNY_BASE.OMR);
  setVal("resBHD", "BHD", FX_RATES_CNY_BASE.BHD);
  setVal("resUSD", "USD", FX_RATES_CNY_BASE.USD);
}

function applyDiscount(discountPercent) {
  state.calcDiscount = discountPercent;
  const chips = document.querySelectorAll("#view-fx .chip");
  chips.forEach((c) => {
    if (c.textContent.includes(`${discountPercent}%`)) {
      c.classList.add("active");
    } else {
      c.classList.remove("active");
    }
  });
  updateShoppingCalculator();
}

function updateShoppingCalculator() {
  const priceInput = document.getElementById("calcPrice");
  const qtyInput = document.getElementById("calcQty");

  const price = parseFloat(priceInput ? priceInput.value : 0) || 0;
  const qty = parseFloat(qtyInput ? qtyInput.value : 0) || 0;

  const subtotal = price * qty;
  const discountFactor = (100 - state.calcDiscount) / 100;
  const totalCny = Math.round(subtotal * discountFactor);

  const totalKwd = (totalCny * FX_RATES_CNY_BASE.KWD).toFixed(1);
  const totalSar = (totalCny * FX_RATES_CNY_BASE.SAR).toFixed(1);

  const totalCnyEl = document.getElementById("calcTotalCny");
  const totalKwdEl = document.getElementById("calcTotalKwd");
  const totalSarEl = document.getElementById("calcTotalSar");

  if (totalCnyEl) totalCnyEl.textContent = `${totalCny} CNY`;
  if (totalKwdEl) totalKwdEl.textContent = `~ ${totalKwd} KWD`;
  if (totalSarEl) totalSarEl.textContent = `~ ${totalSar} SAR`;
}

/* =================================================================
   Travel Phrases View
   ================================================================= */
function initPhrases() {
  const container = document.getElementById("phrasesList");
  if (!container) return;

  container.innerHTML = TRAVEL_PHRASES.map(
    (item) => `
    <div class="phrase-card">
      <div class="phrase-info">
        <div class="phrase-ar">${escapeHtml(item.ar)}</div>
        <div class="phrase-cn">${escapeHtml(item.cn)}</div>
        <div class="phrase-pinyin">${escapeHtml(item.pinyin)}</div>
      </div>
      <button class="btn-speak" onclick="speakChinese('${escapeAttr(item.cn)}')" title="استمع للنطق">
        🔊
      </button>
    </div>
  `
  ).join("");
}

/* =================================================================
   Sanitization Utilities
   ================================================================= */
function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function escapeAttr(str) {
  return String(str || "")
    .replace(/'/g, "\\'")
    .replace(/"/g, "&quot;");
}

const CITIES = {
  gz: {
    ar: "غوانزو",
    cn: "广州",
    en: "Guangzhou",
    blurb: "أسواق الجملة، المولات، المساجد، المطار، ومحطات القطار.",
  },
  sh: {
    ar: "شنغهاي",
    cn: "上海",
    en: "Shanghai",
    blurb: "مولات، شوارع، كافيهات، ومعالم من البوند إلى حديقة يو.",
  },
};

const CATS = ["الكل", "تسوق", "سياحة", "مطاعم", "كافيهات", "فنادق"];

const ALIASES = [
  ["外滩", "البوند"],
  ["北外滩", "البوند الشمالي"],
  ["the bund", "البوند"],
  ["南京路", "شارع نانجينغ"],
  ["豫园", "حديقة يو"],
  ["yu garden", "حديقة يو"],
  ["迪士尼", "ديزني"],
  ["disneyland", "ديزني"],
  ["东方明珠", "برج اللؤلؤة"],
  ["上海中心", "برج شنغهاي"],
  ["广州塔", "برج كانتون"],
];

let city = "gz";
let cat = "الكل";
let toastTimer = 0;

const citiesEl = document.getElementById("cities");
const filtersEl = document.getElementById("filters");
const cardsEl = document.getElementById("cards");
const statsEl = document.getElementById("stats");
const searchEl = document.getElementById("search");
const toastEl = document.getElementById("toast");
const didiHelp = document.getElementById("didiHelp");

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function showToast(text) {
  toastEl.textContent = text;
  toastEl.style.display = "block";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.style.display = "none";
  }, 3200);
}

function copyText(text) {
  const done = () => showToast("تم النسخ: " + text);
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text));
    return;
  }
  fallbackCopy(text);
}

function fallbackCopy(text) {
  const field = document.createElement("textarea");
  field.value = text;
  document.body.appendChild(field);
  field.select();
  try {
    document.execCommand("copy");
    showToast("تم النسخ: " + text);
  } catch (_) {
    showToast("تعذر النسخ تلقائيًا");
  }
  field.remove();
}

function openAmap(place) {
  const query = [place.cn || place.ar, CITIES[place.city].cn].join(" ");
  window.open(
    "https://uri.amap.com/search?keyword=" + encodeURIComponent(query),
    "_blank",
    "noopener"
  );
}

function openDidi() {
  showToast("فتح Alipay… ابحث داخل التطبيق عن 滴滴出行");
  const link = document.createElement("a");
  link.href = "alipays://";
  link.target = "_blank";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => {
    if (!document.hidden && !didiHelp.open) {
      didiHelp.showModal();
      showToast("افتح Alipay ثم ابحث عن 滴滴出行");
    }
  }, 1600);
}

function matches(place, query) {
  if (place.city !== city) return false;
  if (cat !== "الكل" && place.cat !== cat) return false;
  if (!query) return true;
  const cityInfo = CITIES[place.city];
  const blob = `${place.ar} ${place.cn}`.toLocaleLowerCase();
  const alias = ALIASES.filter(([key]) => blob.includes(key.toLocaleLowerCase()))
    .map(([, words]) => words)
    .join(" ");
  const haystack = [place.ar, place.cn, place.note, alias, cityInfo.ar, cityInfo.en, cityInfo.cn]
    .join(" ")
    .toLocaleLowerCase();
  return haystack.includes(query);
}

function renderCities() {
  citiesEl.innerHTML = Object.entries(CITIES)
    .map(([id, info]) => {
      const count = PLACES.filter((place) => place.city === id).length;
      return `<button type="button" class="city ${city === id ? "on" : ""}" data-city="${id}">
        <span class="city-count">${count}</span>
        <strong>${info.ar}</strong>
        <small>${info.cn} · ${info.en}</small>
        <span class="city-blurb">${escapeHtml(info.blurb)}</span>
      </button>`;
    })
    .join("");
}

function renderFilters() {
  filtersEl.innerHTML = CATS.map(
    (name) =>
      `<button type="button" class="filter ${cat === name ? "on" : ""}" data-cat="${name}">${name}</button>`
  ).join("");
}

function renderCards() {
  const query = searchEl.value.toLocaleLowerCase().trim();
  const list = PLACES.filter((place) => matches(place, query));
  const cityInfo = CITIES[city];
  statsEl.textContent = `${list.length} مكانًا · ${cityInfo.ar} ${cityInfo.cn}`;

  if (!list.length) {
    cardsEl.innerHTML = '<p class="empty">لا توجد نتائج مطابقة.</p>';
    return;
  }

  cardsEl.innerHTML = list
    .map((place) => {
      const index = PLACES.indexOf(place);
      const chinese = place.cn
        ? `<div class="cn" lang="zh">${escapeHtml(place.cn)}</div>`
        : '<div class="cn missing">الاسم الصيني يحتاج إلى تحقق</div>';
      const note = place.note ? `<p class="note">${escapeHtml(place.note)}</p>` : "";
      return `<article class="card" data-cat="${escapeHtml(place.cat)}">
        <span class="category">${escapeHtml(place.cat)}</span>
        <h3>${escapeHtml(place.ar)}</h3>
        ${chinese}
        ${note}
        <div class="actions">
          <button type="button" data-act="copy" data-i="${index}">نسخ الاسم</button>
          <button type="button" data-act="map" data-i="${index}">Amap</button>
          <button type="button" class="taxi" data-act="taxi">تاكسي DIDI</button>
        </div>
      </article>`;
    })
    .join("");
}

function render() {
  renderCities();
  renderFilters();
  renderCards();
}

citiesEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-city]");
  if (!button) return;
  city = button.dataset.city;
  cat = "الكل";
  searchEl.value = "";
  render();
});

filtersEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cat]");
  if (!button) return;
  cat = button.dataset.cat;
  render();
});

searchEl.addEventListener("input", render);

cardsEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-act]");
  if (!button) return;
  if (button.dataset.act === "taxi") {
    openDidi();
    return;
  }
  const place = PLACES[Number(button.dataset.i)];
  if (!place) return;
  if (button.dataset.act === "copy") copyText(place.cn || place.ar);
  if (button.dataset.act === "map") openAmap(place);
});

document.getElementById("copyDidi").addEventListener("click", () => copyText("滴滴出行"));
document.getElementById("closeDidi").addEventListener("click", () => didiHelp.close());

render();

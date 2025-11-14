// newsList は newsIndex.js で読み込み済み

// -----------------------------
// ★ 年ごとに分類
// -----------------------------
const newsByYear = {};

newsList.forEach(news => {
  const year = news.date.split("/")[0]; // "2025"
  if (!newsByYear[year]) {
    newsByYear[year] = [];
  }
  newsByYear[year].push(news);
});

// 新しい年順に並べる
const years = Object.keys(newsByYear).sort((a, b) => b - a);


// -----------------------------
// ★ HTML要素
// -----------------------------
const newsContainer = document.getElementById("news-container");
const tabContainer = document.getElementById("year-tabs");


// -----------------------------
// ★ 年タブ生成
// -----------------------------
years.forEach((year, index) => {
  const tab = document.createElement("button");
  tab.innerText = year;
  tab.className = `
      px-4 py-2  rounded-lg
      hover:bg-[var(--navy)] hover:text-white transition
      ${index === 0 ? "bg-[var(--navy)] text-white" : "bg-white text-[var(--navy)]"}
    `;
  tab.dataset.year = year;

  tab.addEventListener("click", () => {
    setActiveTab(year);
    renderNews(year);
  });

  tabContainer.appendChild(tab);
});


// -----------------------------
// ★ タブの見た目の切り替え
// -----------------------------
function setActiveTab(activeYear) {
  document.querySelectorAll("#year-tabs button").forEach(btn => {
    if (btn.dataset.year === activeYear) {
      btn.classList.add("bg-[var(--navy)]", "text-white");
      btn.classList.remove("bg-white", "text-[var(--navy)]");
    } else {
      btn.classList.remove("bg-[var(--navy)]", "text-white");
      btn.classList.add("bg-white", "text-[var(--navy)]");
    }
  });
}


// -----------------------------
// ★ ニュースを表示
// -----------------------------
function renderNews(year) {
  // 初期化（安全）
  newsContainer.textContent = "";

  newsByYear[year].forEach(news => {
    const hasLink = news.url && news.url !== "";

    const card = document.createElement("div");
    card.className =
      "bg-white p-6 rounded-lg shadow-md mb-8 ";

    if (hasLink) {
      card.classList.add("cursor-pointer", "hover:bg-gray-50", "transition");
      card.addEventListener("click", () => {
        location.href = news.url;
      });
    }

    const dateP = document.createElement("p");
    dateP.className = "text-sm text-gray-600";
    dateP.textContent = news.date;

    const titleH3 = document.createElement("h3");
    titleH3.className = "text-2xl text-[var(--navy)] mt-2";
    titleH3.textContent = news.title;

    const contentP = document.createElement("p");
    contentP.className = "text-gray-700 mt-2";
    contentP.textContent = news.content;

    card.appendChild(dateP);
    card.appendChild(titleH3);
    card.appendChild(contentP);

    if (hasLink) {
      const btn = document.createElement("button");
      btn.className =
        "mt-3 bg-[var(--orange)] text-white px-4 py-2 rounded hover:bg-[#c06e2d] transition";
      btn.textContent = " 詳細を見る";

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        location.href = news.url;
      });

      card.appendChild(btn);
    }

    newsContainer.appendChild(card);
  });
}



// -----------------------------
// ★ 最初に最新の年を表示
// -----------------------------
setActiveTab(years[0]);  // タブの見た目を選択状態に
renderNews(years[0]);    // 最新年のニュース表示




// -----------------------------
// ★ HTML要素
// -----------------------------
const container = document.getElementById("members-update-container");

// -----------------------------
// ★ カード生成
// -----------------------------
membersList.forEach(item => {
  const hasLink = item.url && item.url !== "";

  const card = document.createElement("div");
  card.className =
    "bg-white p-6 rounded-lg shadow-md mb-8";

  // クリック可（ニュースと同じ）
  if (hasLink) {
    card.classList.add("cursor-pointer", "hover:bg-gray-50", "transition");
    card.addEventListener("click", () => {
      location.href = item.url;
    });
  }

  // 年度タイトル
  const title = document.createElement("h3");
  title.className = "text-xl text-[var(--navy)] font-bold";
  title.textContent = `${item.year}年度メンバーの写真を追加しました。`;

  // カードに追加
  card.appendChild(title);

  // 詳細ボタン（ニュースとまったく同じ）
  if (hasLink) {
    const btn = document.createElement("button");
    btn.className =
      "mt-3 bg-[var(--orange)] text-white px-4 py-2 rounded hover:bg-[#c06e2d] transition";
    btn.textContent = " 詳細を見る";

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      location.href = item.url;
    });

    card.appendChild(btn);
  }

  // DOMに追加
  container.appendChild(card);
});

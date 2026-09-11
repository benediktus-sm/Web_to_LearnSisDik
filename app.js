/**
 * app.js — SisDik Learn
 * ---------------------
 * Merakit sidebar 14 minggu dari data.js, navigasi antar topik,
 * welcome screen, dark/light mode, dan perilaku sidebar di layar sempit.
 */

document.addEventListener("DOMContentLoaded", () => {
  const railNav       = document.getElementById("railNav");
  const content       = document.getElementById("content");
  const breadcrumb    = document.getElementById("breadcrumb");
  const railProgress  = document.getElementById("railProgress");
  const progressFill  = document.getElementById("progressBarFill");
  const rail          = document.getElementById("rail");
  const railToggle    = document.getElementById("railToggle");
  const railBackdrop  = document.getElementById("railBackdrop");
  const themeToggle   = document.getElementById("themeToggle");
  const themeIcon     = document.getElementById("themeIcon");
  const themeLabel    = document.getElementById("themeLabel");
  const readingTime   = document.getElementById("readingTime");
  const readingTimeText = document.getElementById("readingTimeText");

  /* ---------- TEMA ---------- */
  const savedTheme = localStorage.getItem("sisdik-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeUI(savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sisdik-theme", next);
    updateThemeUI(next);
  });

  function updateThemeUI(theme) {
    if (theme === "dark") {
      themeIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
      themeLabel.textContent = "Mode Terang";
    } else {
      themeIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
      themeLabel.textContent = "Mode Gelap";
    }
  }

  /* ---------- PROGRESS ---------- */
  const availableWeeks = COURSE.weeks.filter(w => w.available).length;
  const totalWeeks = COURSE.weeks.length;
  railProgress.textContent = `${availableWeeks} dari ${totalWeeks} minggu tersedia`;
  setTimeout(() => {
    progressFill.style.width = `${(availableWeeks / totalWeeks) * 100}%`;
  }, 300);

  /* ---------- BANGUN SIDEBAR ---------- */
  COURSE.weeks.forEach((week) => {
    const item = document.createElement("div");
    item.className = "week-item" + (week.available ? "" : " week-item--locked");
    item.dataset.weekNumber = week.number;

    const headerBtn = document.createElement("button");
    headerBtn.type = "button";
    headerBtn.className = "week-header";
    headerBtn.setAttribute("aria-expanded", "false");
    headerBtn.setAttribute("aria-controls", `week-topics-${week.number}`);

    const weekNumStr = String(week.number).padStart(2, "0");
    const weekDisplayName = week.available ? week.title : `Minggu ${week.number}`;
    const rightEl = week.available
      ? `<span class="week-caret" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>`
      : `<span class="week-soon"><span class="badge-icon-frame"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>Segera</span>`;

    headerBtn.innerHTML = `
      <span class="week-badge" aria-hidden="true">${weekNumStr}</span>
      <span class="week-name">${weekDisplayName}</span>
      ${rightEl}
    `;
    item.appendChild(headerBtn);

    const topicList = document.createElement("div");
    topicList.className = "week-topics";
    topicList.id = `week-topics-${week.number}`;
    topicList.hidden = true;

    if (week.available) {
      week.topics.forEach((topic) => {
        const topicBtn = document.createElement("button");
        topicBtn.type = "button";
        topicBtn.className = "topic-btn";
        topicBtn.dataset.topicId = topic.id;
        topicBtn.textContent = topic.label;
        topicBtn.addEventListener("click", () => selectTopic(week, topic, topicBtn));
        topicList.appendChild(topicBtn);
      });
    }

    item.appendChild(topicList);
    railNav.appendChild(item);

    headerBtn.addEventListener("click", () => {
      const isOpen = !topicList.hidden;
      // tutup semua
      railNav.querySelectorAll(".week-topics").forEach(el => { el.hidden = true; });
      railNav.querySelectorAll(".week-header").forEach(el => el.setAttribute("aria-expanded", "false"));
      railNav.querySelectorAll(".week-item").forEach(el => el.classList.remove("week-item--open"));

      if (!isOpen) {
        topicList.hidden = false;
        headerBtn.setAttribute("aria-expanded", "true");
        item.classList.add("week-item--open");
        if (!week.available) showEmptyState(week);
      } else if (!week.available) {
        showEmptyState(week);
      }
    });
  });

  /* ---------- WELCOME SCREEN ---------- */
  function showWelcome() {
    breadcrumb.innerHTML = '<span class="breadcrumb-icon-frame"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span> <span>Beranda</span>';
    readingTime.hidden = true;

    content.innerHTML = "";
    content.className = "content content-enter";

    const firstWeek = COURSE.weeks.find(w => w.available);

    const div = document.createElement("div");
    div.className = "welcome";
    div.innerHTML = `
      <div class="welcome-hero">
        <div class="welcome-tag">
          <span class="tag-icon-frame">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </span>
          <span>Media Ajar Interaktif</span>
        </div>
        <h2>Selamat Datang di<br>Sistem Digital</h2>
        <p>
          Pelajari konversi bilangan digital dengan cara yang menyenangkan dan interaktif.
          Semua dimulai dari <strong>biner</strong> — bahasa asli perangkat digital.
          Eksplorasi, klik, dan eksperimen langsung di sini.
        </p>
        <div class="welcome-cta">
          <button class="btn-hero btn-hero--primary" id="btnStartLearning">
            <span class="btn-icon-frame">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </span>
            <span>Mulai Belajar</span>
          </button>
          <button class="btn-hero btn-hero--secondary" id="btnGoConverter">
            <span class="btn-icon-frame">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </span>
            <span>Konverter Langsung</span>
          </button>
        </div>
      </div>

      <div class="welcome-stats">
        <div class="stat-card">
          <div class="stat-icon stat-icon--cyan">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
          </div>
          <div class="stat-value">14</div>
          <div class="stat-label">Total Minggu</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon--green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div class="stat-value" style="color:var(--success)">${availableWeeks}</div>
          <div class="stat-label">Minggu Tersedia</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon--amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
          </div>
          <div class="stat-value" style="color:var(--accent-amber)">4</div>
          <div class="stat-label">Sistem Bilangan</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon--violet">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </div>
          <div class="stat-value" style="color:var(--accent-violet)">∞</div>
          <div class="stat-label">Soal Latihan</div>
        </div>
      </div>

      <div class="welcome-topics">
        <h3>Materi Tersedia — Minggu 1</h3>
        <div class="topic-chips">
          ${firstWeek ? firstWeek.topics.map(t => `
            <button class="topic-chip" data-render="${t.render}" data-label="${t.label}">${t.label}</button>
          `).join("") : ""}
        </div>
      </div>
    `;
    content.appendChild(div);

    // event listeners
    div.querySelector("#btnStartLearning")?.addEventListener("click", () => {
      const firstHeader = railNav.querySelector(".week-header");
      if (firstHeader) firstHeader.click();
      const firstTopic = railNav.querySelector(".topic-btn");
      if (firstTopic) { setTimeout(() => firstTopic.click(), 180); }
    });

    div.querySelector("#btnGoConverter")?.addEventListener("click", () => {
      if (!firstWeek) return;
      const converterTopic = firstWeek.topics.find(t => t.render === "renderWeek1Converter");
      if (converterTopic) {
        const firstHeader = railNav.querySelector(".week-header");
        if (firstHeader) firstHeader.click();
        setTimeout(() => {
          const btn = railNav.querySelector(`[data-topic-id="${converterTopic.id}"]`);
          if (btn) btn.click();
        }, 180);
      }
    });

    div.querySelectorAll(".topic-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const render = chip.dataset.render;
        const label = chip.dataset.label;
        if (!firstWeek) return;
        const topic = firstWeek.topics.find(t => t.render === render);
        if (topic) {
          const firstHeader = railNav.querySelector(".week-header");
          if (firstHeader) firstHeader.click();
          setTimeout(() => {
            const btn = railNav.querySelector(`[data-topic-id="${topic.id}"]`);
            if (btn) btn.click();
          }, 180);
        }
      });
    });
  }

  /* ---------- PILIH TOPIK ---------- */
  function selectTopic(week, topic, btnEl) {
    railNav.querySelectorAll(".topic-btn").forEach(b => b.classList.remove("active"));
    btnEl.classList.add("active");

    breadcrumb.textContent = `Minggu ${week.number} › ${week.title} › ${topic.label}`;

    // Reading time berdasarkan konten
    const rtMap = { renderWeek1Intro: "4 menit baca", renderWeek1Converter: "Interaktif", renderWeek1Quiz: "Latihan" };
    const rt = rtMap[topic.render] || "5 menit baca";
    readingTime.hidden = false;
    readingTimeText.textContent = rt;

    content.innerHTML = `
      <h2 class="content-title">${topic.label}</h2>
      <div class="content-body" id="topicBody"></div>
    `;
    content.className = "content content-enter";

    const body = document.getElementById("topicBody");
    const renderFn = window[topic.render];
    if (typeof renderFn === "function") {
      renderFn(body);
    } else {
      body.innerHTML = `
        <p class="lead">Materi ini sedang disiapkan oleh dosen.</p>
        <p>Cek kembali minggu depan!</p>
      `;
    }

    if (window.matchMedia("(max-width: 900px)").matches) closeRail();
  }

  /* ---------- EMPTY STATE MINGGU BELUM TERSEDIA ---------- */
  function showEmptyState(week) {
    breadcrumb.textContent = `Minggu ${week.number}`;
    readingTime.hidden = true;
    content.innerHTML = `
      <div class="empty-state">
        <div class="empty-mark">${String(week.number).padStart(2, "0")}</div>
        <h2>Materi Minggu ${week.number} sedang disiapkan</h2>
        <p>
          Konten ini akan tersedia begitu dosen menambahkan materi di <code>data.js</code>.
          Sementara itu, <strong>Minggu 1</strong> sudah tersedia lengkap — mulai dari sana!
        </p>
      </div>
    `;
    content.className = "content content-enter";
    if (window.matchMedia("(max-width: 900px)").matches) closeRail();
  }

  /* ---------- SIDEBAR MOBILE ---------- */
  function openRail() {
    rail.classList.add("rail--open");
    railToggle.setAttribute("aria-expanded", "true");
    railBackdrop.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeRail() {
    rail.classList.remove("rail--open");
    railToggle.setAttribute("aria-expanded", "false");
    railBackdrop.hidden = true;
    document.body.style.overflow = "";
  }
  railToggle.addEventListener("click", () => {
    rail.classList.contains("rail--open") ? closeRail() : openRail();
  });
  railBackdrop.addEventListener("click", closeRail);

  /* ---------- TOAST ---------- */
  window.showToast = function(msg, duration = 3000) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerHTML = `
      <span class="toast-icon-frame">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      <span>${msg}</span>
    `;
    toast.hidden = false;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.hidden = true; }, duration);
  };

  /* ---------- INISIALISASI ---------- */
  // Tampilkan welcome screen
  showWelcome();

  // Buka minggu 1 di sidebar (tapi jangan auto-navigate konten)
  const firstHeader = railNav.querySelector(".week-header");
  if (firstHeader) firstHeader.click();
});

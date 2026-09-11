/**
 * converter.js — SisDik Learn
 * ----------------------------
 * Semua logika matematis konversi bilangan (biner sebagai pusat) dan
 * tampilan interaktif untuk Minggu 1.
 */

/* ============================================================
   1) FUNGSI INTI KONVERSI
   ============================================================ */

function stripLeadingZeros(str) {
  const stripped = str.replace(/^0+(?=.)/, "");
  return stripped.length ? stripped : "0";
}

function padToMultiple(bin, groupSize) {
  const rem = bin.length % groupSize;
  if (rem === 0) return bin;
  return "0".repeat(groupSize - rem) + bin;
}

function groupBits(bin, groupSize) {
  const padded = padToMultiple(bin, groupSize);
  const groups = [];
  for (let i = 0; i < padded.length; i += groupSize) {
    groups.push(padded.slice(i, i + groupSize));
  }
  return groups;
}

function binGroupToHexDigit(group) {
  return parseInt(group, 2).toString(16).toUpperCase();
}
function binGroupToOctDigit(group) {
  return parseInt(group, 2).toString(8);
}

function binaryPositionTable(bin) {
  const n = bin.length;
  const rows = [];
  for (let i = 0; i < n; i++) {
    const bit = bin[i];
    const power = n - 1 - i;
    rows.push({ bit, power, value: bit === "1" ? Math.pow(2, power) : 0 });
  }
  return rows;
}
function binaryToDecimal(bin) {
  return binaryPositionTable(bin).reduce((sum, r) => sum + r.value, 0);
}

const OCT_TO_BIN = {
  0:"000", 1:"001", 2:"010", 3:"011", 4:"100", 5:"101", 6:"110", 7:"111"
};
const HEX_TO_BIN = {
  0:"0000",1:"0001",2:"0010",3:"0011",4:"0100",5:"0101",6:"0110",7:"0111",
  8:"1000",9:"1001",A:"1010",B:"1011",C:"1100",D:"1101",E:"1110",F:"1111"
};

function validateInput(raw, base) {
  const patterns = { 2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^[0-9]+$/, 16: /^[0-9a-fA-F]+$/ };
  const names = {
    2:  "biner (hanya 0 dan 1)",
    8:  "oktal (digit 0–7)",
    10: "desimal (digit 0–9)",
    16: "heksadesimal (0–9 dan A–F)"
  };
  if (!raw) return { ok: false, message: "Masukkan sebuah angka terlebih dahulu." };
  if (!patterns[base].test(raw)) {
    return { ok: false, message: `Format tidak sesuai. Gunakan digit ${names[base]}.` };
  }
  const value = parseInt(raw, base);
  if (value > 65535) {
    return { ok: false, message: "Gunakan bilangan yang menghasilkan nilai desimal < 65536 agar visualisasi tetap jelas." };
  }
  return { ok: true, value, clean: stripLeadingZeros(raw.toUpperCase()) };
}

/* ============================================================
   2) BANGUN LANGKAH-LANGKAH
   ============================================================ */
function buildStep1(base, cleanRaw, decimalValue) {
  if (base === 2) {
    return { method: "identity", binary: stripLeadingZeros(cleanRaw) };
  }
  if (base === 8) {
    const digits = cleanRaw.split("");
    const parts  = digits.map(d => OCT_TO_BIN[d]);
    return { method: "substitution", digits, parts, unit: 3, base, binary: stripLeadingZeros(parts.join("")) };
  }
  if (base === 16) {
    const digits = cleanRaw.split("");
    const parts  = digits.map(d => HEX_TO_BIN[d]);
    return { method: "substitution", digits, parts, unit: 4, base, binary: stripLeadingZeros(parts.join("")) };
  }
  // base === 10 → pembagian berulang
  const rows = [];
  let q = decimalValue;
  if (q === 0) rows.push({ qStart: 0, r: 0, qEnd: 0 });
  while (q > 0) {
    const r = q % 2;
    const nextQ = Math.floor(q / 2);
    rows.push({ qStart: q, r, qEnd: nextQ });
    q = nextQ;
  }
  const binary = rows.map(row => row.r).reverse().join("") || "0";
  return { method: "division", rows, binary: stripLeadingZeros(binary) };
}

/* ============================================================
   3) RENDER: Minggu 1 — Kenapa Biner Jadi Pusat?
   ============================================================ */
function renderWeek1Intro(container) {
  container.innerHTML = `
    <p class="lead">
      Sebuah rangkaian digital hanya mengenal dua kondisi: <strong>ada arus</strong> atau <strong>tidak ada arus</strong>.
      Karena itulah <strong>biner</strong> bukan sekadar salah satu sistem bilangan —
      ia adalah <em>bahasa asli</em> perangkat digital.
    </p>

    <div class="flow-diagram" role="img" aria-label="Diagram alur konversi dengan biner sebagai pusat">
      <div class="flow-row">
        <div class="flow-chip flow-chip--dec">
          <span class="chip-icon-frame"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg></span>
          <span>Desimal</span>
        </div>
        <div class="flow-chip flow-chip--oct">
          <span class="chip-icon-frame"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg></span>
          <span>Oktal</span>
        </div>
        <div class="flow-chip flow-chip--hex">
          <span class="chip-icon-frame"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg></span>
          <span>Heksadesimal</span>
        </div>
      </div>
      <div class="flow-arrow-down">diubah ke biner terlebih dahulu</div>
      <div class="flow-hub">
        <div class="flow-hub-badge">
          <span class="hub-icon-frame">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2"/>
              <rect x="9" y="9" width="6" height="6"/>
              <line x1="9" y1="1" x2="9" y2="4"/>
              <line x1="15" y1="1" x2="15" y2="4"/>
              <line x1="9" y1="20" x2="9" y2="23"/>
              <line x1="15" y1="20" x2="15" y2="23"/>
              <line x1="20" y1="9" x2="23" y2="9"/>
              <line x1="20" y1="15" x2="23" y2="15"/>
              <line x1="1" y1="9" x2="4" y2="9"/>
              <line x1="1" y1="15" x2="4" y2="15"/>
            </svg>
          </span>
          <strong>BINER</strong>
        </div>
        <span>pusat konversi semua sistem</span>
      </div>
      <div class="flow-arrow-down">lalu diturunkan menjadi</div>
      <div class="flow-row">
        <div class="flow-chip flow-chip--hex">
          <span class="chip-icon-frame"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span>Kelompokkan <strong>4 bit</strong> → Heksadesimal</span>
        </div>
        <div class="flow-chip flow-chip--oct">
          <span class="chip-icon-frame"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span>Kelompokkan <strong>3 bit</strong> → Oktal</span>
        </div>
        <div class="flow-chip flow-chip--dec">
          <span class="chip-icon-frame"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span>Jumlahkan <strong>nilai posisi</strong> → Desimal</span>
        </div>
      </div>
    </div>

    <h3>Empat Sistem Bilangan yang Wajib Dikuasai</h3>
    <div class="concept-cards">
      <div class="concept-card concept-card--bin">
        <div class="concept-header">
          <span class="concept-base">basis-2</span>
          <span class="concept-icon-frame concept-icon-frame--bin" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="9" y1="9" x2="9" y2="15"/><circle cx="15" cy="12" r="3"/></svg>
          </span>
        </div>
        <div class="concept-name">Biner</div>
        <p class="concept-desc">Hanya gunakan digit <strong>0</strong> dan <strong>1</strong>. Bahasa asli komputer dan sirkuit digital.</p>
        <div class="concept-example">1011 0100</div>
      </div>
      <div class="concept-card concept-card--dec">
        <div class="concept-header">
          <span class="concept-base">basis-10</span>
          <span class="concept-icon-frame concept-icon-frame--dec" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
          </span>
        </div>
        <div class="concept-name">Desimal</div>
        <p class="concept-desc">Digit <strong>0–9</strong>. Sistem bilangan yang kita pakai sehari-hari.</p>
        <div class="concept-example">180</div>
      </div>
      <div class="concept-card concept-card--oct">
        <div class="concept-header">
          <span class="concept-base">basis-8</span>
          <span class="concept-icon-frame concept-icon-frame--oct" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
          </span>
        </div>
        <div class="concept-name">Oktal</div>
        <p class="concept-desc">Digit <strong>0–7</strong>. Satu digit = persis 3 bit biner.</p>
        <div class="concept-example">264</div>
      </div>
      <div class="concept-card concept-card--hex">
        <div class="concept-header">
          <span class="concept-base">basis-16</span>
          <span class="concept-icon-frame concept-icon-frame--hex" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
          </span>
        </div>
        <div class="concept-name">Heksadesimal</div>
        <p class="concept-desc">Digit <strong>0–9</strong> dan huruf <strong>A–F</strong>. Satu digit = persis 4 bit biner.</p>
        <div class="concept-example">B4</div>
      </div>
    </div>

    <h3>Mengapa 4 Bit → Heks, 3 Bit → Oktal?</h3>
    <p>
      2<sup>4</sup> = <strong>16</strong> — persis jumlah simbol heksadesimal (0-F).
      2<sup>3</sup> = <strong>8</strong>  — persis jumlah simbol oktal (0-7).
      Setiap kelompok bit selalu bisa diwakili oleh <em>tepat satu digit</em>.
      Itulah sebabnya konversi ini bisa dilakukan secara <strong>digit per digit</strong>
      tanpa perhitungan rumit.
    </p>
    <p>
      Sekarang coba langsung di <strong>Konverter Interaktif</strong> →
      ketik angka apapun, lihat setiap langkahnya, lalu <em>klik bit satu per satu</em>
      untuk melihat bagaimana perubahan 1 bit mengubah semua representasi sekaligus!
    </p>

    <div class="ref-section">
      <h3>Tabel Referensi Cepat</h3>
      <div class="ref-grid">
        <div class="ref-card ref-card--hex">
          <div class="ref-card-head">Heksadesimal ↔ Biner (4 bit)</div>
          <table class="ref-table">
            <thead><tr><th>Hex</th><th>Biner</th><th>Hex</th><th>Biner</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>0000</td><td>8</td><td>1000</td></tr>
              <tr><td>1</td><td>0001</td><td>9</td><td>1001</td></tr>
              <tr><td>2</td><td>0010</td><td>A</td><td>1010</td></tr>
              <tr><td>3</td><td>0011</td><td>B</td><td>1011</td></tr>
              <tr><td>4</td><td>0100</td><td>C</td><td>1100</td></tr>
              <tr><td>5</td><td>0101</td><td>D</td><td>1101</td></tr>
              <tr><td>6</td><td>0110</td><td>E</td><td>1110</td></tr>
              <tr><td>7</td><td>0111</td><td>F</td><td>1111</td></tr>
            </tbody>
          </table>
        </div>
        <div class="ref-card ref-card--oct">
          <div class="ref-card-head">Oktal ↔ Biner (3 bit)</div>
          <table class="ref-table">
            <thead><tr><th>Oktal</th><th>Biner</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>000</td></tr>
              <tr><td>1</td><td>001</td></tr>
              <tr><td>2</td><td>010</td></tr>
              <tr><td>3</td><td>011</td></tr>
              <tr><td>4</td><td>100</td></tr>
              <tr><td>5</td><td>101</td></tr>
              <tr><td>6</td><td>110</td></tr>
              <tr><td>7</td><td>111</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/* ============================================================
   4) RENDER: Minggu 1 — Konverter Interaktif
   ============================================================ */
function renderWeek1Converter(container) {
  container.innerHTML = `
    <p class="lead">
      Pilih basis bilangan asal, ketik angkanya, lalu tekan <strong>Konversi</strong>.
      Setiap langkah ditampilkan secara transparan — dan kamu bisa <em>klik bit</em>
      untuk mengubahnya dan melihat efek langsung ke semua sistem bilangan!
    </p>
    <section class="tool" aria-label="Konverter bilangan interaktif">
      <p class="tool-title">
        <span class="title-icon-frame"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg></span>
        <span>Pilih Basis Bilangan Asal</span>
      </p>
      <div class="base-select" role="radiogroup" aria-label="Pilih basis bilangan input">
        <button type="button" class="base-btn active" data-base="10" role="radio" aria-checked="true" id="baseBtn10">Desimal (10)</button>
        <button type="button" class="base-btn" data-base="2"  role="radio" aria-checked="false" id="baseBtn2">Biner (2)</button>
        <button type="button" class="base-btn" data-base="8"  role="radio" aria-checked="false" id="baseBtn8">Oktal (8)</button>
        <button type="button" class="base-btn" data-base="16" role="radio" aria-checked="false" id="baseBtn16">Heksadesimal (16)</button>
      </div>
      <div class="input-row">
        <input type="text" id="numInput" placeholder="Contoh: 180" autocomplete="off" spellcheck="false" aria-label="Masukkan angka">
        <button type="button" id="convertBtn" class="btn-primary">
          <span class="btn-icon-frame">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67"/>
            </svg>
          </span>
          <span>Konversi</span>
        </button>
        <button type="button" id="clearBtn" class="btn-secondary">
          <span class="btn-icon-frame">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </span>
          <span>Hapus</span>
        </button>
      </div>
      <p class="input-hint" id="inputHint" aria-live="polite">
        <span class="hint-icon-frame"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></span>
        <span class="hint-text">Masukkan bilangan desimal (0–65535).</span>
      </p>
      <div class="tool-results" id="toolResults" hidden aria-live="polite"></div>
    </section>

    <section class="tool" style="margin-top:16px;" aria-label="Contoh cepat">
      <p class="tool-title">
        <span class="title-icon-frame"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
        <span>Coba Contoh Cepat</span>
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <button class="topic-chip example-chip" data-val="90"  data-base="10">90 (Desimal)</button>
        <button class="topic-chip example-chip" data-val="FF"  data-base="16">FF (Hex)</button>
        <button class="topic-chip example-chip" data-val="1010110" data-base="2">1010110 (Biner)</button>
        <button class="topic-chip example-chip" data-val="177" data-base="8">177 (Oktal)</button>
        <button class="topic-chip example-chip" data-val="255" data-base="10">255 (Desimal)</button>
        <button class="topic-chip example-chip" data-val="A3"  data-base="16">A3 (Hex)</button>
      </div>
    </section>
  `;

  const baseButtons = container.querySelectorAll(".base-btn");
  const input       = container.querySelector("#numInput");
  const hint        = container.querySelector("#inputHint");
  const results     = container.querySelector("#toolResults");
  const convertBtn  = container.querySelector("#convertBtn");
  const clearBtn    = container.querySelector("#clearBtn");
  let currentBase   = 10;

  const hints = {
    2:  "Masukkan bilangan biner — hanya digit 0 dan 1.",
    8:  "Masukkan bilangan oktal — digit 0 sampai 7.",
    10: "Masukkan bilangan desimal (0–65535).",
    16: "Masukkan bilangan heksadesimal — digit 0–9 dan huruf A–F."
  };
  const placeholders = {
    2:  "Contoh: 10110100",
    8:  "Contoh: 264",
    10: "Contoh: 180",
    16: "Contoh: B4"
  };

  function setHint(text, isError = false) {
    hint.innerHTML = `
      <span class="hint-icon-frame">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${isError 
            ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' 
            : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'}
        </svg>
      </span>
      <span class="hint-text">${text}</span>
    `;
    if (isError) {
      hint.classList.add("input-hint--error");
    } else {
      hint.classList.remove("input-hint--error");
    }
  }

  baseButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      baseButtons.forEach(b => { b.classList.remove("active"); b.setAttribute("aria-checked", "false"); });
      btn.classList.add("active");
      btn.setAttribute("aria-checked", "true");
      currentBase = parseInt(btn.dataset.base, 10);
      setHint(hints[currentBase]);
      input.placeholder = placeholders[currentBase];
      input.value = "";
      results.hidden = true;
      input.focus();
    });
  });

  // Example chips
  container.querySelectorAll(".example-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const base = parseInt(chip.dataset.base, 10);
      const val  = chip.dataset.val;
      // set base
      baseButtons.forEach(b => { b.classList.remove("active"); b.setAttribute("aria-checked", "false"); });
      const matchBtn = container.querySelector(`[data-base="${base}"]`);
      if (matchBtn) { matchBtn.classList.add("active"); matchBtn.setAttribute("aria-checked", "true"); }
      currentBase = base;
      setHint(hints[currentBase]);
      input.placeholder = placeholders[currentBase];
      input.value = val;
      runConversion();
    });
  });

  function runConversion() {
    const raw   = input.value.trim();
    const check = validateInput(raw, currentBase);
    if (!check.ok) {
      setHint(check.message, true);
      results.hidden = true;
      return;
    }
    setHint(hints[currentBase]);
    results.hidden = false;
    mountConversionView(results, check.value, currentBase, check.clean);
    if (window.showToast) window.showToast("Konversi berhasil!");
  }

  clearBtn.addEventListener("click", () => {
    input.value = "";
    results.hidden = true;
    setHint(hints[currentBase]);
    input.focus();
  });

  convertBtn.addEventListener("click", runConversion);
  input.addEventListener("keydown", e => { if (e.key === "Enter") runConversion(); });
}

/* Menyusun seluruh tampilan langkah 1–4 + ringkasan + eksplorasi bit */
function mountConversionView(results, decimalValue, base, cleanRaw) {
  const step1 = buildStep1(base, cleanRaw, decimalValue);

  results.innerHTML = `
    <div class="step" id="step1">
      <div class="step-head">
        <span class="step-num" aria-hidden="true">1</span>
        <h3>Ubah ke Biner</h3>
      </div>
      <div class="step-body" id="step1Body"></div>
    </div>
    <div class="step" id="step2">
      <div class="step-head">
        <span class="step-num" aria-hidden="true">2</span>
        <h3>Kelompokkan 4 Bit → <span style="color:var(--accent-amber)">Heksadesimal</span></h3>
      </div>
      <div class="step-body" id="step2Body"></div>
    </div>
    <div class="step" id="step3">
      <div class="step-head">
        <span class="step-num" aria-hidden="true">3</span>
        <h3>Kelompokkan 3 Bit → <span style="color:var(--accent-violet)">Oktal</span></h3>
      </div>
      <div class="step-body" id="step3Body"></div>
    </div>
    <div class="step" id="step4">
      <div class="step-head">
        <span class="step-num" aria-hidden="true">4</span>
        <h3>Jumlahkan Nilai Posisi → <span style="color:var(--accent-cyan)">Desimal</span></h3>
      </div>
      <div class="step-body" id="step4Body"></div>
    </div>
    <div class="summary" id="summaryCards"></div>
    <p class="explore-note" aria-label="Tip interaktif">
      <span class="note-icon-frame">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3v4a2 2 0 002 2h4"/><path d="M18 17l4-4-4-4"/><path d="M6 17l-4-4 4-4"/></svg>
      </span>
      <span>Klik bit di atas untuk mengubahnya — semua hasil diperbarui otomatis!</span>
    </p>
  `;

  renderStep1Body(results.querySelector("#step1Body"), step1);

  let workingBinary = step1.binary;
  renderBitRow(results.querySelector("#step1Body"), workingBinary, (newBinary) => {
    workingBinary = newBinary;
    renderDerived(results, workingBinary);
  });
  renderDerived(results, workingBinary);
}

function renderStep1Body(el, step1) {
  if (step1.method === "identity") {
    el.innerHTML = `<p>Angka sudah dalam bentuk biner — tidak perlu dikonversi, langsung digunakan.</p>`;
    return;
  }
  if (step1.method === "substitution") {
    const label = step1.base === 16 ? "heksadesimal" : "oktal";
    const rows = step1.digits.map((d, i) => `
      <tr>
        <td class="mono" style="font-size:1rem;font-weight:700">${d}</td>
        <td>→</td>
        <td class="mono" style="letter-spacing:0.1em">${step1.parts[i]}</td>
      </tr>
    `).join("");
    el.innerHTML = `
      <p>Setiap digit ${label} langsung diganti dengan pola <strong>${step1.unit} bit</strong>-nya, lalu disambung berurutan dari kiri ke kanan.</p>
      <table class="sub-table" style="max-width:280px">
        <thead><tr><th>Digit ${label}</th><th></th><th>${step1.unit} Bit</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:10px;font-size:0.9rem;color:var(--text-dim)">
        Hasil gabungan: <strong class="mono" style="color:var(--accent-cyan);font-size:1rem">${step1.parts.join(" ")}</strong>
      </p>
    `;
    return;
  }
  // division
  const rows = step1.rows.map(r => `
    <tr>
      <td class="mono">${r.qStart}</td>
      <td class="mono" style="color:var(--text-faint)">÷ 2 = ${r.qEnd}</td>
      <td class="mono" style="color:var(--accent-cyan);font-weight:700">sisa <strong>${r.r}</strong></td>
    </tr>
  `).join("");
  el.innerHTML = `
    <p>Bagi angka dengan 2 berulang kali sampai hasil baginya 0, kemudian baca <strong>sisa bagi dari bawah ke atas</strong>.</p>
    <table class="sub-table" style="max-width:320px">
      <thead><tr><th>Dibagi</th><th>Hasil Bagi</th><th>Sisa ↑</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin-top:10px;font-size:0.88rem;color:var(--text-dim)">
      Baca sisa dari <strong>bawah ke atas</strong> →
      <strong class="mono" style="color:var(--accent-cyan);font-size:1rem">${step1.binary}</strong>
    </p>
  `;
}

function renderBitRow(el, binary, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "bit-row";

  const label = document.createElement("p");
  label.className = "bit-row-label";
  label.textContent = "Eksplorasi Bit (klik untuk toggle 0\u21941):";
  wrap.appendChild(label);

  const tiles = document.createElement("div");
  tiles.className = "bit-tiles";
  wrap.appendChild(tiles);
  el.appendChild(wrap);

  function draw(bin) {
    tiles.innerHTML = "";
    bin.split("").forEach((bit, idx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "bit-tile" + (bit === "1" ? " bit-tile--on" : "");
      b.textContent = bit;
      b.setAttribute("aria-label", `Bit posisi ${bin.length - 1 - idx} (nilai ${Math.pow(2, bin.length - 1 - idx)}), saat ini ${bit}. Klik untuk mengubah.`);
      b.addEventListener("click", () => {
        b.classList.add("flipping");
        b.addEventListener("animationend", () => b.classList.remove("flipping"), { once: true });
        const arr = bin.split("");
        arr[idx] = arr[idx] === "1" ? "0" : "1";
        bin = arr.join("");
        draw(bin);
        onChange(bin);
      });
      tiles.appendChild(b);
    });
  }
  draw(binary);
}

function renderDerived(results, binary) {
  const hexGroups  = groupBits(binary, 4);
  const octGroups  = groupBits(binary, 3);
  const hexDigits  = hexGroups.map(binGroupToHexDigit);
  const octDigits  = octGroups.map(binGroupToOctDigit);
  const hexResult  = stripLeadingZeros(hexDigits.join(""));
  const octResult  = stripLeadingZeros(octDigits.join(""));
  const posRows    = binaryPositionTable(binary);
  const decResult  = binaryToDecimal(binary);

  results.querySelector("#step2Body").innerHTML = `
    <p>Padatkan biner ke kiri sampai panjangnya kelipatan 4, lalu baca tiap kelompok 4 bit sebagai satu digit heksadesimal.</p>
    <div class="group-row" aria-label="Kelompok 4 bit ke heksadesimal">
      ${hexGroups.map((g, i) => `
        <div class="group-cell group-cell--hex" title="${g} (biner) = ${hexDigits[i]} (hex)">
          <span class="group-bits mono">${g}</span>
          <span class="group-arrow">↓</span>
          <span class="group-digit">${hexDigits[i]}</span>
        </div>
      `).join("")}
    </div>
    <p class="group-result">Heksadesimal = <span class="mono result-strong">${hexResult}<sub style="font-size:0.6em;color:var(--text-faint)">16</sub></span></p>
  `;

  results.querySelector("#step3Body").innerHTML = `
    <p>Padatkan biner ke kiri sampai panjangnya kelipatan 3, lalu baca tiap kelompok 3 bit sebagai satu digit oktal.</p>
    <div class="group-row" aria-label="Kelompok 3 bit ke oktal">
      ${octGroups.map((g, i) => `
        <div class="group-cell group-cell--oct" title="${g} (biner) = ${octDigits[i]} (oktal)">
          <span class="group-bits mono">${g}</span>
          <span class="group-arrow">↓</span>
          <span class="group-digit">${octDigits[i]}</span>
        </div>
      `).join("")}
    </div>
    <p class="group-result">Oktal = <span class="mono result-strong">${octResult}<sub style="font-size:0.6em;color:var(--text-faint)">8</sub></span></p>
  `;

  const addStr = posRows.filter(r => r.bit === "1").map(r => r.value).join(" + ") || "0";
  results.querySelector("#step4Body").innerHTML = `
    <p>Kalikan setiap bit dengan nilai posisinya (2<sup>n</sup>), mulai dari kanan (posisi 0), lalu jumlahkan semuanya.</p>
    <div style="overflow-x:auto">
      <table class="sub-table">
        <thead>
          <tr>
            <th>Posisi (n)</th>
            ${posRows.map(r => `<th class="mono">2<sup>${r.power}</sup></th>`).join("")}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Bit</th>
            ${posRows.map(r => `<td class="mono" style="font-weight:700;color:${r.bit==='1'?'var(--accent-cyan)':'var(--text-faint)'}">${r.bit}</td>`).join("")}
          </tr>
          <tr>
            <th>Nilai</th>
            ${posRows.map(r => `<td class="mono" style="color:${r.value>0?'var(--success)':'var(--text-faint)'}">${r.value}</td>`).join("")}
          </tr>
        </tbody>
      </table>
    </div>
    <p class="group-result" style="margin-top:12px">
      ${addStr} = <span class="mono result-strong">${decResult}<sub style="font-size:0.6em;color:var(--text-faint)">10</sub></span>
    </p>
  `;

  results.querySelector("#summaryCards").innerHTML = `
    <div class="summary-card">
      <span>DES</span>
      <strong class="mono">${decResult}</strong>
    </div>
    <div class="summary-card">
      <span>BIN</span>
      <strong class="mono" style="font-size:0.95rem;word-break:break-all">${binary}</strong>
    </div>
    <div class="summary-card">
      <span>OKT</span>
      <strong class="mono">${octResult}</strong>
    </div>
    <div class="summary-card">
      <span>HEX</span>
      <strong class="mono">${hexResult}</strong>
    </div>
  `;
}

/* ============================================================
   5) RENDER: Minggu 1 — Latihan & Kuis
   ============================================================ */
const QUIZ_TYPES = [
  {
    id: "dec2bin",
    label: "Desimal → Biner",
    ask:  (n) => `Ubah <strong class="mono">${n}</strong> <span style="color:var(--text-faint)">(desimal)</span> ke <strong>biner</strong>.`,
    hint: "Gunakan pembagian berulang dengan 2. Catat sisa bagi tiap langkah, baca dari bawah ke atas.",
    answer: (n) => n.toString(2),
    color: "var(--success)"
  },
  {
    id: "bin2hex",
    label: "Biner → Hex",
    ask:  (n) => `Biner dari ${n} adalah <strong class="mono">${n.toString(2)}</strong>. Kelompokkan 4 bit, ubah ke <strong>heksadesimal</strong>.`,
    hint: "Kelompokkan dari kanan, tambahkan 0 di depan jika perlu. Tiap kelompok 4 bit = 1 digit hex.",
    answer: (n) => n.toString(16).toUpperCase(),
    color: "var(--accent-amber)"
  },
  {
    id: "bin2oct",
    label: "Biner → Oktal",
    ask:  (n) => `Biner dari ${n} adalah <strong class="mono">${n.toString(2)}</strong>. Kelompokkan 3 bit, ubah ke <strong>oktal</strong>.`,
    hint: "Kelompokkan dari kanan, tambahkan 0 di depan jika perlu. Tiap kelompok 3 bit = 1 digit oktal.",
    answer: (n) => n.toString(8),
    color: "var(--accent-violet)"
  },
  {
    id: "hex2bin",
    label: "Hex → Biner",
    ask:  (n) => `Ubah <strong class="mono">${n.toString(16).toUpperCase()}</strong> <span style="color:var(--text-faint)">(heksadesimal)</span> ke <strong>biner</strong>.`,
    hint: "Ganti tiap digit hex dengan pola 4 bit-nya (gunakan tabel referensi).",
    answer: (n) => n.toString(2),
    color: "var(--accent-amber)"
  },
  {
    id: "bin2dec",
    label: "Biner → Desimal",
    ask:  (n) => `Ubah biner <strong class="mono">${n.toString(2)}</strong> ke <strong>desimal</strong>.`,
    hint: "Kalikan tiap bit dengan nilai posisinya (…, 8, 4, 2, 1) lalu jumlahkan.",
    answer: (n) => n.toString(10),
    color: "var(--accent-cyan)"
  },
  {
    id: "oct2bin",
    label: "Oktal → Biner",
    ask:  (n) => `Ubah <strong class="mono">${n.toString(8)}</strong> <span style="color:var(--text-faint)">(oktal)</span> ke <strong>biner</strong>.`,
    hint: "Ganti tiap digit oktal dengan pola 3 bit-nya.",
    answer: (n) => n.toString(2),
    color: "var(--accent-violet)"
  }
];

function normalizeAnswer(str) {
  return stripLeadingZeros(str.trim().toUpperCase().replace(/\s+/g, "") || "0");
}

function renderWeek1Quiz(container) {
  container.innerHTML = `
    <p class="lead">
      Enam jenis soal konversi dipilih secara acak. Jawab langsung di kotak —
      tidak perlu sempurna, yang penting <em>berlatih membaca pola bit!</em>
    </p>
    <div class="quiz-stats">
      <div class="quiz-stat-chip">
        <span class="stat-chip-icon stat-chip-icon--cyan">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
        </span>
        <span>Skor: <strong id="quizScore">0</strong></span>
      </div>
      <div class="quiz-stat-chip quiz-stat-chip--streak">
        <span class="stat-chip-icon stat-chip-icon--amber">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 003.5 2.5z"/></svg>
        </span>
        <span>Beruntun: <strong id="quizStreak">0</strong></span>
      </div>
      <div class="quiz-stat-chip">
        <span class="stat-chip-icon stat-chip-icon--violet">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </span>
        <span>Soal: <strong id="quizCount">0</strong></span>
      </div>
    </div>

    <div class="quiz-card" id="quizCard">
      <div class="quiz-question-num" id="quizTypeLabel">Memuat soal…</div>
      <p class="quiz-question" id="quizQuestion"></p>
      <details class="quiz-hint">
        <summary>
          <span class="hint-toggle-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </span>
          <span>Tampilkan petunjuk</span>
        </summary>
        <p id="quizHintText"></p>
      </details>
      <div class="input-row">
        <input type="text" id="quizAnswer" placeholder="Ketik jawabanmu di sini…" autocomplete="off" spellcheck="false" aria-label="Kolom jawaban kuis">
        <button type="button" id="quizCheck" class="btn-primary">
          <span class="btn-icon-frame">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <span>Cek Jawaban</span>
        </button>
      </div>
      <div class="quiz-feedback" id="quizFeedback" aria-live="assertive"></div>
      <button type="button" id="quizNext" class="btn-secondary" hidden>
        <span>Soal Berikutnya</span>
        <span class="btn-icon-frame" style="margin-left:6px">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </span>
      </button>
    </div>
  `;

  const scoreEl    = container.querySelector("#quizScore");
  const streakEl   = container.querySelector("#quizStreak");
  const countEl    = container.querySelector("#quizCount");
  const typeLabel  = container.querySelector("#quizTypeLabel");
  const qEl        = container.querySelector("#quizQuestion");
  const hintEl     = container.querySelector("#quizHintText");
  const answerEl   = container.querySelector("#quizAnswer");
  const checkBtn   = container.querySelector("#quizCheck");
  const nextBtn    = container.querySelector("#quizNext");
  const feedbackEl = container.querySelector("#quizFeedback");

  let score = 0, streak = 0, totalQ = 0, current = null, answered = false;

  function newQuestion() {
    const n    = 1 + Math.floor(Math.random() * 254);
    const type = QUIZ_TYPES[Math.floor(Math.random() * QUIZ_TYPES.length)];
    current = { n, type };
    totalQ++;

    typeLabel.textContent = type.label;
    typeLabel.style.color = type.color;
    qEl.innerHTML = type.ask(n);
    hintEl.textContent = type.hint;
    answerEl.value = "";
    answerEl.disabled = false;
    checkBtn.hidden = false;
    nextBtn.hidden = true;
    feedbackEl.textContent = "";
    feedbackEl.className = "quiz-feedback";
    countEl.textContent = totalQ;
    answered = false;
    answerEl.focus();

    // close hint details if open
    const details = container.querySelector(".quiz-hint");
    if (details && details.open) details.open = false;
  }

  function checkAnswer() {
    if (answered || !answerEl.value.trim()) return;
    answered = true;
    const correct   = normalizeAnswer(current.type.answer(current.n));
    const given     = normalizeAnswer(answerEl.value);
    const isCorrect = given === correct;

    score  += isCorrect ? 1 : 0;
    streak  = isCorrect ? streak + 1 : 0;
    scoreEl.textContent  = score;
    streakEl.textContent = streak;

    if (isCorrect) {
      const msg = streak >= 3
        ? `${streak}x beruntun benar! Luar biasa — jawaban: ${current.type.answer(current.n)}`
        : `Tepat sekali! Jawaban: ${current.type.answer(current.n)}`;
      feedbackEl.innerHTML = `
        <span class="feedback-icon-frame feedback-icon-frame--ok">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span>${msg}</span>
      `;
      feedbackEl.className = "quiz-feedback quiz-feedback--ok";
      if (window.showToast && streak >= 5) window.showToast(`Streak ${streak}! Kamu luar biasa!`);
    } else {
      feedbackEl.innerHTML = `
        <span class="feedback-icon-frame feedback-icon-frame--no">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </span>
        <span>Belum tepat. Jawaban yang benar: ${current.type.answer(current.n)}</span>
      `;
      feedbackEl.className = "quiz-feedback quiz-feedback--no";
    }

    answerEl.disabled = true;
    checkBtn.hidden = true;
    nextBtn.hidden = false;
    nextBtn.focus();
  }

  checkBtn.addEventListener("click", checkAnswer);
  answerEl.addEventListener("keydown", e => { if (e.key === "Enter") checkAnswer(); });
  nextBtn.addEventListener("click", newQuestion);

  newQuestion();
}

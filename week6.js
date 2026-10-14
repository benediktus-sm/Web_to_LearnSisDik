/**
 * week6.js - Modul Pembelajaran Pertemuan 6: Multilevel NAND, NOR, dan Multiplexer (MUX)
 * Mata Kuliah: Sistem Digital
 * Referensi: Stephen Brown & Zvonko Vranesic, "Fundamentals of Digital Logic with VHDL Design", 3rd Ed., McGraw-Hill, 2009.
 */


/* ==========================================================================
   SECTION: w6_part1_helpers_svg.js
   ========================================================================== */

/* ───── HELPERS (w6 namespace) ───── */
function w6Section(title, accentOrBody, iconOrNothing, bodyOrNothing) {
  let accentVar = '--accent-cyan';
  let iconSvg = '📌';
  let bodyHTML = accentOrBody;
  if (bodyOrNothing !== undefined) {
    accentVar = accentOrBody;
    iconSvg = iconOrNothing;
    bodyHTML = bodyOrNothing;
  }
  return `
    <div class="card" style="margin-bottom:24px; border-left:3px solid var(${accentVar}); background:rgba(15,23,42,0.4);">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px;">
        <span style="display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:8px; background:rgba(0,210,255,0.08); font-size:1.1rem;">${iconSvg}</span>
        <h3 style="margin:0; font-size:1.15rem; font-weight:700; color:var(${accentVar});">${title}</h3>
      </div>
      <div>${bodyHTML}</div>
    </div>`;
}

function w6Code(lines, label) {
  const inner = Array.isArray(lines) ? lines.join('\n') : lines;
  return `<div style="margin:12px 0;">${label ? `<p style="font-size:0.78rem; color:var(--text-faint); font-weight:600; letter-spacing:.06em; text-transform:uppercase; margin-bottom:6px;">${label}</p>` : ''}
    <pre style="font-family:var(--font-mono, monospace); font-size:0.88rem; line-height:1.7; background:rgba(0,0,0,0.35); border:1px solid var(--border-color, rgba(255,255,255,0.1)); border-radius:10px; padding:16px 18px; overflow-x:auto; margin:0;"><code>${inner}</code></pre></div>`;
}

function w6Step(n, titleOrText, maybeDesc) {
  const title = maybeDesc ? `<strong style="color:var(--text-primary); font-size:0.95rem;">${titleOrText}</strong><br>` : '';
  const desc = maybeDesc || titleOrText;
  return `<div style="display:flex; align-items:flex-start; gap:12px; margin:10px 0;">
    <span style="min-width:28px; height:28px; border-radius:50%; background:rgba(0,210,255,0.1); border:1.5px solid var(--accent-cyan); color:var(--accent-cyan); font-size:0.82rem; font-weight:700; display:inline-flex; align-items:center; justify-content:center; margin-top:2px;">${n}</span>
    <div style="font-size:0.92rem; line-height:1.6; color:var(--text-secondary);">${title}${desc}</div></div>`;
}

function w6Alert(type, text) {
  const map = {
    info: ['var(--accent-cyan)', '💡', 'rgba(0,210,255,0.06)'],
    warning: ['var(--accent-amber)', '⚠️', 'rgba(245,158,11,0.06)'],
    success: ['var(--accent-emerald, #10b981)', '✅', 'rgba(16,185,129,0.06)'],
    danger: ['var(--accent-rose, #f43f5e)', '🚨', 'rgba(244,63,94,0.06)']
  };
  const [color, icon, bg] = map[type] || map.info;
  return `<div style="display:flex; gap:12px; align-items:flex-start; background:${bg}; border-left:4px solid ${color}; border-radius:0 8px 8px 0; padding:14px 16px; margin:16px 0; font-size:0.92rem; line-height:1.6; color:var(--text-secondary);">
    <span style="font-size:1.2rem;">${icon}</span><div style="flex:1;">${text}</div></div>`;
}

function w6Table(headers, rows) {
  return `<div style="overflow-x:auto; margin:16px 0;">
    <table style="width:100%; border-collapse:collapse; font-size:0.88rem; background:rgba(15,23,42,0.4); border-radius:8px; overflow:hidden;">
      <thead><tr style="border-bottom:2px solid var(--border-color, rgba(255,255,255,0.1)); background:rgba(255,255,255,0.02);">
        ${headers.map(h => `<th style="padding:10px 14px; text-align:center; color:var(--text-primary); font-weight:600; font-size:0.82rem; letter-spacing:.04em;">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${rows.map((r, i) => `<tr style="border-bottom:1px solid rgba(255,255,255,0.05); ${i % 2 === 0 ? 'background:rgba(255,255,255,0.015);' : ''}">
        ${r.map(c => `<td style="padding:10px 14px; text-align:center; font-family:var(--font-mono, monospace); font-size:0.88rem; color:var(--text-secondary);">${c}</td>`).join('')}
      </tr>`).join('')}</tbody>
    </table></div>`;
}

function w6Spoiler(buttonLabel, contentHTML) {
  const uid = 'w6sp_' + Math.random().toString(36).substr(2, 9);
  return `<div style="margin:16px 0;">
    <button type="button" onclick="(function(){var c=document.getElementById('${uid}');c.hidden=!c.hidden;this.querySelector('.sp-arrow').textContent=c.hidden?'▶':'▼';}).call(this)" style="display:flex; align-items:center; gap:8px; background:rgba(124,58,237,0.12); border:1px solid var(--accent-violet); color:var(--accent-violet); padding:10px 16px; border-radius:8px; cursor:pointer; font-size:0.88rem; font-weight:600; width:100%; text-align:left;">
      <span class="sp-arrow">▶</span> ${buttonLabel}
    </button>
    <div id="${uid}" hidden style="background:rgba(0,0,0,0.3); border:1px solid rgba(124,58,237,0.3); border-radius:0 0 8px 8px; padding:16px 18px; margin-top:-2px;">
      ${contentHTML}
    </div>
  </div>`;
}

/* ───── DIAGRAM SCHEMATIC SVG HELPERS ───── */

/* Diagram Universal Gates using NAND (NOT, AND, OR) */
function w6SvgUniversalNAND() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="580" height="240" viewBox="0 0 580 240" style="display:inline-block;min-width:540px;max-width:100%">
        <!-- 1. NOT gate via NAND -->
        <g transform="translate(10, 20)">
          <text x="75" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent-cyan)">1. Inverter (NOT): A' = A NAND A</text>
          <text x="15" y="55" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
          <line x1="28" y1="52" x2="50" y2="52" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="50" cy="52" r="3" fill="var(--accent-cyan)"/>
          <line x1="50" y1="52" x2="50" y2="44" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="50" y1="44" x2="70" y2="44" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="50" y1="52" x2="50" y2="60" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="50" y1="60" x2="70" y2="60" stroke="var(--line-strong)" stroke-width="2"/>
          <!-- NAND symbol -->
          <path d="M 70 36 L 88 36 A 16 16 0 0 1 88 68 L 70 68 Z" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <circle cx="107" cy="52" r="3" fill="var(--bg-card)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <line x1="110" y1="52" x2="140" y2="52" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="140" cy="52" r="3.5" fill="var(--accent-cyan)"/>
          <text x="146" y="56" font-size="11" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">A'</text>
        </g>

        <!-- 2. AND gate via NAND -->
        <g transform="translate(260, 20)">
          <text x="130" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent-violet)">2. Gerbang AND: Y = ((A·B)')'</text>
          <text x="15" y="44" font-size="11" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
          <line x1="28" y1="40" x2="50" y2="40" stroke="var(--line-strong)" stroke-width="2"/>
          <text x="15" y="66" font-size="11" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
          <line x1="28" y1="64" x2="50" y2="64" stroke="var(--line-strong)" stroke-width="2"/>
          <!-- NAND 1 -->
          <path d="M 50 32 L 68 32 A 20 20 0 0 1 68 72 L 50 72 Z" fill="var(--accent-violet-dim)" stroke="var(--accent-violet)" stroke-width="2"/>
          <circle cx="91" cy="52" r="3" fill="var(--bg-card)" stroke="var(--accent-violet)" stroke-width="2"/>
          <!-- Interconnect to NAND 2 (Inverter) -->
          <line x1="94" y1="52" x2="120" y2="52" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="120" cy="52" r="3" fill="var(--accent-violet)"/>
          <line x1="120" y1="52" x2="120" y2="44" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="120" y1="44" x2="140" y2="44" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="120" y1="52" x2="120" y2="60" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="120" y1="60" x2="140" y2="60" stroke="var(--line-strong)" stroke-width="2"/>
          <!-- NAND 2 -->
          <path d="M 140 36 L 158 36 A 16 16 0 0 1 158 68 L 140 68 Z" fill="var(--accent-violet-dim)" stroke="var(--accent-violet)" stroke-width="2"/>
          <circle cx="177" cy="52" r="3" fill="var(--bg-card)" stroke="var(--accent-violet)" stroke-width="2"/>
          <line x1="180" y1="52" x2="210" y2="52" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="210" cy="52" r="3.5" fill="var(--accent-violet)"/>
          <text x="216" y="56" font-size="11" font-weight="800" fill="var(--accent-violet)" font-family="var(--font-mono)">A·B</text>
        </g>

        <!-- 3. OR gate via NAND (De Morgan: A + B = (A' · B')') -->
        <g transform="translate(70, 130)">
          <text x="220" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="var(--success)">3. Gerbang OR: A + B = (A' · B')'  (Hukum De Morgan)</text>
          <!-- Inverter A -->
          <text x="15" y="44" font-size="11" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
          <line x1="28" y1="40" x2="50" y2="40" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="50" cy="40" r="3" fill="var(--success)"/>
          <line x1="50" y1="40" x2="50" y2="34" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="50" y1="34" x2="70" y2="34" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="50" y1="40" x2="50" y2="46" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="50" y1="46" x2="70" y2="46" stroke="var(--line-strong)" stroke-width="2"/>
          <path d="M 70 28 L 86 28 A 12 12 0 0 1 86 52 L 70 52 Z" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2"/>
          <circle cx="101" cy="40" r="3" fill="var(--bg-card)" stroke="var(--success)" stroke-width="2"/>
          <line x1="104" y1="40" x2="160" y2="40" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="160" y1="40" x2="160" y2="58" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="160" y1="58" x2="180" y2="58" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- Inverter B -->
          <text x="15" y="86" font-size="11" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
          <line x1="28" y1="82" x2="50" y2="82" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="50" cy="82" r="3" fill="var(--success)"/>
          <line x1="50" y1="82" x2="50" y2="76" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="50" y1="76" x2="70" y2="76" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="50" y1="82" x2="50" y2="88" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="50" y1="88" x2="70" y2="88" stroke="var(--line-strong)" stroke-width="2"/>
          <path d="M 70 70 L 86 70 A 12 12 0 0 1 86 94 L 70 94 Z" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2"/>
          <circle cx="101" cy="82" r="3" fill="var(--bg-card)" stroke="var(--success)" stroke-width="2"/>
          <line x1="104" y1="82" x2="160" y2="82" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="160" y1="82" x2="160" y2="72" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="160" y1="72" x2="180" y2="72" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- Final NAND combining A' and B' -->
          <path d="M 180 50 L 202 50 A 15 15 0 0 1 202 80 L 180 80 Z" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2"/>
          <circle cx="220" cy="65" r="3" fill="var(--bg-card)" stroke="var(--success)" stroke-width="2"/>
          <line x1="223" y1="65" x2="270" y2="65" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="270" cy="65" r="3.5" fill="var(--success)"/>
          <text x="276" y="69" font-size="11" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">A + B</text>
        </g>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 6.1: Realisasi Gerbang NOT, AND, dan OR Hanya Menggunakan Gerbang Universal NAND</p>
    </div>`;
}

/* Diagram Multilevel NAND for F = A + BC */
function w6SvgMultilevelNAND_ABC() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="480" height="180" viewBox="0 0 480 180" style="display:inline-block;max-width:100%">
        <!-- Inverter A via NAND: N1 -->
        <text x="15" y="45" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
        <line x1="30" y1="42" x2="60" y2="42" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="60" cy="42" r="3" fill="var(--accent-cyan)"/>
        <line x1="60" y1="42" x2="60" y2="35" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="60" y1="35" x2="80" y2="35" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="60" y1="42" x2="60" y2="49" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="60" y1="49" x2="80" y2="49" stroke="var(--line-strong)" stroke-width="2"/>
        <path d="M 80 28 L 102 28 A 14 14 0 0 1 102 56 L 80 56 Z" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2"/>
        <circle cx="119" cy="42" r="3" fill="var(--bg-card)" stroke="var(--accent-cyan)" stroke-width="2"/>
        <line x1="122" y1="42" x2="210" y2="42" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="210" y1="42" x2="210" y2="70" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="210" y1="70" x2="240" y2="70" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="150" y="34" font-size="10" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">A'</text>

        <!-- Suku B·C via NAND: N2 = (BC)' -->
        <text x="15" y="115" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
        <line x1="30" y1="112" x2="80" y2="112" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="15" y="145" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">C</text>
        <line x1="30" y1="142" x2="80" y2="142" stroke="var(--line-strong)" stroke-width="2"/>
        <path d="M 80 100 L 105 100 A 27 27 0 0 1 105 154 L 80 154 Z" fill="var(--accent-violet-dim)" stroke="var(--accent-violet)" stroke-width="2"/>
        <circle cx="135" cy="127" r="3" fill="var(--bg-card)" stroke="var(--accent-violet)" stroke-width="2"/>
        <line x1="138" y1="127" x2="210" y2="127" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="210" y1="127" x2="210" y2="92" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="210" y1="92" x2="240" y2="92" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="160" y="140" font-size="10" font-weight="700" fill="var(--accent-violet)" font-family="var(--font-mono)">(B·C)'</text>

        <!-- Final NAND Level 2: N3 = (A' · (BC)')' = A + BC -->
        <path d="M 240 60 L 270 60 A 21 21 0 0 1 270 102 L 240 102 Z" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2"/>
        <circle cx="294" cy="81" r="3" fill="var(--bg-card)" stroke="var(--success)" stroke-width="2"/>
        <line x1="297" y1="81" x2="360" y2="81" stroke="var(--line-strong)" stroke-width="2.5"/>
        <circle cx="360" cy="81" r="4" fill="var(--success)"/>
        <text x="372" y="86" font-size="13" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">F = A + B·C</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 6.2: Implementasi Multilevel NAND untuk Fungsi F = A + B·C</p>
    </div>`;
}

/* Diagram SOP 2-level NAND for F = AB + CD */
function w6SvgSOP_NAND_ABCD() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="480" height="200" viewBox="0 0 480 200" style="display:inline-block;max-width:100%">
        <!-- NAND 1: (A·B)' -->
        <text x="15" y="42" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
        <line x1="30" y1="38" x2="80" y2="38" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="15" y="72" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
        <line x1="30" y1="68" x2="80" y2="68" stroke="var(--line-strong)" stroke-width="2"/>
        <path d="M 80 26 L 105 26 A 27 27 0 0 1 105 80 L 80 80 Z" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2"/>
        <circle cx="135" cy="53" r="3" fill="var(--bg-card)" stroke="var(--accent-cyan)" stroke-width="2"/>
        <line x1="138" y1="53" x2="200" y2="53" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="200" y1="53" x2="200" y2="85" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="200" y1="85" x2="230" y2="85" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="150" y="45" font-size="10" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">(A·B)'</text>

        <!-- NAND 2: (C·D)' -->
        <text x="15" y="132" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">C</text>
        <line x1="30" y1="128" x2="80" y2="128" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="15" y="162" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">D</text>
        <line x1="30" y1="158" x2="80" y2="158" stroke="var(--line-strong)" stroke-width="2"/>
        <path d="M 80 116 L 105 116 A 27 27 0 0 1 105 170 L 80 170 Z" fill="var(--accent-violet-dim)" stroke="var(--accent-violet)" stroke-width="2"/>
        <circle cx="135" cy="143" r="3" fill="var(--bg-card)" stroke="var(--accent-violet)" stroke-width="2"/>
        <line x1="138" y1="143" x2="200" y2="143" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="200" y1="143" x2="200" y2="107" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="200" y1="107" x2="230" y2="107" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="150" y="160" font-size="10" font-weight="700" fill="var(--accent-violet)" font-family="var(--font-mono)">(C·D)'</text>

        <!-- NAND 3 (Level 2): ((A·B)' · (C·D)')' = AB + CD -->
        <path d="M 230 75 L 260 75 A 21 21 0 0 1 260 117 L 230 117 Z" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2"/>
        <circle cx="284" cy="96" r="3" fill="var(--bg-card)" stroke="var(--success)" stroke-width="2"/>
        <line x1="287" y1="96" x2="350" y2="96" stroke="var(--line-strong)" stroke-width="2.5"/>
        <circle cx="350" cy="96" r="4" fill="var(--success)"/>
        <text x="360" y="101" font-size="13" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">F = A·B + C·D</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 6.3: Implementasi Standar SOP 2-Level Menjadi Rangkaian NAND-Only Ekuivalen</p>
    </div>`;
}

/* Diagram Multilevel NOR for F = (A+B)(C+D) */
function w6SvgMultilevelNOR() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="480" height="200" viewBox="0 0 480 200" style="display:inline-block;max-width:100%">
        <!-- NOR 1: (A+B)' -->
        <text x="15" y="42" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
        <line x1="30" y1="38" x2="80" y2="38" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="15" y="72" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
        <line x1="30" y1="68" x2="80" y2="68" stroke="var(--line-strong)" stroke-width="2"/>
        <path d="M 80 26 Q 95 53 80 80 Q 120 80 138 53 Q 120 26 80 26 Z" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="2"/>
        <circle cx="141" cy="53" r="3" fill="var(--bg-card)" stroke="var(--accent-amber)" stroke-width="2"/>
        <line x1="144" y1="53" x2="200" y2="53" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="200" y1="53" x2="200" y2="85" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="200" y1="85" x2="230" y2="85" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="152" y="45" font-size="10" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-mono)">(A+B)'</text>

        <!-- NOR 2: (C+D)' -->
        <text x="15" y="132" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">C</text>
        <line x1="30" y1="128" x2="80" y2="128" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="15" y="162" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">D</text>
        <line x1="30" y1="158" x2="80" y2="158" stroke="var(--line-strong)" stroke-width="2"/>
        <path d="M 80 116 Q 95 143 80 170 Q 120 170 138 143 Q 120 116 80 116 Z" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="2"/>
        <circle cx="141" cy="143" r="3" fill="var(--bg-card)" stroke="var(--accent-amber)" stroke-width="2"/>
        <line x1="144" y1="143" x2="200" y2="143" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="200" y1="143" x2="200" y2="107" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="200" y1="107" x2="230" y2="107" stroke="var(--line-strong)" stroke-width="2"/>
        <text x="152" y="160" font-size="10" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-mono)">(C+D)'</text>

        <!-- NOR 3 (Level 2): ((A+B)' + (C+D)')' = (A+B)(C+D) -->
        <path d="M 230 75 Q 245 96 230 117 Q 265 117 280 96 Q 265 75 230 75 Z" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2"/>
        <circle cx="283" cy="96" r="3" fill="var(--bg-card)" stroke="var(--success)" stroke-width="2"/>
        <line x1="286" y1="96" x2="350" y2="96" stroke="var(--line-strong)" stroke-width="2.5"/>
        <circle cx="350" cy="96" r="4" fill="var(--success)"/>
        <text x="360" y="101" font-size="13" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">F = (A+B)·(C+D)</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 6.4: Realisasi Bentuk POS Menggunakan Rangkaian NOR-Only 2-Level</p>
    </div>`;
}

/* Diagram MUX 2:1 SVG */
function w6SvgMux2to1() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
      <svg width="340" height="180" viewBox="0 0 340 180" style="display:inline-block;max-width:100%">
        <!-- Trapezoid MUX 2:1 -->
        <polygon points="100,30 180,50 180,130 100,150" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2.2"/>
        <text x="140" y="95" text-anchor="middle" font-size="14" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-ui)">MUX 2:1</text>

        <!-- Input D0 -->
        <text x="35" y="65" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">D₀</text>
        <line x1="55" y1="60" x2="100" y2="60" stroke="var(--line-strong)" stroke-width="2"/>

        <!-- Input D1 -->
        <text x="35" y="125" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">D₁</text>
        <line x1="55" y1="120" x2="100" y2="120" stroke="var(--line-strong)" stroke-width="2"/>

        <!-- Select S from bottom -->
        <line x1="140" y1="165" x2="140" y2="137" stroke="var(--accent-violet)" stroke-width="2.2"/>
        <text x="140" y="177" text-anchor="middle" font-size="12" font-weight="800" fill="var(--accent-violet)" font-family="var(--font-mono)">S (Select)</text>

        <!-- Output Y -->
        <line x1="180" y1="90" x2="250" y2="90" stroke="var(--success)" stroke-width="2.5"/>
        <circle cx="250" cy="90" r="4" fill="var(--success)"/>
        <text x="260" y="95" font-size="14" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">Y</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 6.5: Simbol Blok Diagram Multiplexer 2-ke-1 (MUX 2:1)</p>
    </div>`;
}

/* Diagram MUX 4:1 SVG */
function w6SvgMux4to1() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
      <svg width="380" height="230" viewBox="0 0 380 230" style="display:inline-block;max-width:100%">
        <!-- Trapezoid MUX 4:1 -->
        <polygon points="110,25 210,50 210,175 110,200" fill="var(--accent-violet-dim)" stroke="var(--accent-violet)" stroke-width="2.2"/>
        <text x="160" y="117" text-anchor="middle" font-size="14" font-weight="800" fill="var(--accent-violet)" font-family="var(--font-ui)">MUX 4:1</text>

        <!-- Inputs D0..D3 -->
        ${[0, 1, 2, 3].map(i => {
          const y = 50 + i * 36;
          return `
            <text x="35" y="${y + 4}" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">D${i}</text>
            <line x1="55" y1="${y}" x2="110" y2="${y}" stroke="var(--line-strong)" stroke-width="2"/>
          `;
        }).join('')}

        <!-- Select lines S1, S0 from bottom -->
        <line x1="145" y1="215" x2="145" y2="187" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="145" y="226" text-anchor="middle" font-size="10.5" font-weight="800" fill="var(--accent-amber)" font-family="var(--font-mono)">S₁</text>

        <line x1="175" y1="215" x2="175" y2="181" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="175" y="226" text-anchor="middle" font-size="10.5" font-weight="800" fill="var(--accent-amber)" font-family="var(--font-mono)">S₀</text>

        <!-- Output Y -->
        <line x1="210" y1="112" x2="280" y2="112" stroke="var(--success)" stroke-width="2.5"/>
        <circle cx="280" cy="112" r="4" fill="var(--success)"/>
        <text x="292" y="117" font-size="14" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">Y</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 6.6: Simbol Blok Diagram Multiplexer 4-ke-1 (MUX 4:1)</p>
    </div>`;
}

/* Diagram MUX 8:1 SVG */
function w6SvgMux8to1() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
      <svg width="420" height="300" viewBox="0 0 420 300" style="display:inline-block;max-width:100%">
        <!-- Trapezoid MUX 8:1 -->
        <polygon points="120,20 230,50 230,240 120,270" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="2.2"/>
        <text x="175" y="148" text-anchor="middle" font-size="15" font-weight="800" fill="var(--accent-amber)" font-family="var(--font-ui)">MUX 8:1</text>

        <!-- Inputs D0..D7 -->
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const y = 42 + i * 28;
          return `
            <text x="35" y="${y + 4}" font-size="11" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">D${i}</text>
            <line x1="55" y1="${y}" x2="120" y2="${y}" stroke="var(--line-strong)" stroke-width="2"/>
          `;
        }).join('')}

        <!-- Select lines S2, S1, S0 -->
        <line x1="150" y1="285" x2="150" y2="258" stroke="var(--accent-cyan)" stroke-width="2"/>
        <text x="150" y="297" text-anchor="middle" font-size="10" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">S₂</text>

        <line x1="175" y1="285" x2="175" y2="252" stroke="var(--accent-cyan)" stroke-width="2"/>
        <text x="175" y="297" text-anchor="middle" font-size="10" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">S₁</text>

        <line x1="200" y1="285" x2="200" y2="246" stroke="var(--accent-cyan)" stroke-width="2"/>
        <text x="200" y="297" text-anchor="middle" font-size="10" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">S₀</text>

        <!-- Output Y -->
        <line x1="230" y1="145" x2="310" y2="145" stroke="var(--success)" stroke-width="2.5"/>
        <circle cx="310" cy="145" r="4" fill="var(--success)"/>
        <text x="322" y="150" font-size="14" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">Y</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 6.7: Simbol Blok Diagram Multiplexer 8-ke-1 (MUX 8:1)</p>
    </div>`;
}

/* Diagram Realisasi Fungsi Boolean dengan MUX 4:1 SVG */
function w6SvgMuxBooleanImpl() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
      <svg width="440" height="240" viewBox="0 0 440 240" style="display:inline-block;max-width:100%">
        <!-- MUX 4:1 -->
        <polygon points="160,25 260,50 260,180 160,205" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2.2"/>
        <text x="210" y="120" text-anchor="middle" font-size="14" font-weight="800" fill="var(--success)" font-family="var(--font-ui)">MUX 4:1</text>

        <!-- Signal C line and Inverter C' -->
        <text x="20" y="55" font-size="12" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">C</text>
        <line x1="38" y1="52" x2="80" y2="52" stroke="var(--accent-cyan)" stroke-width="2"/>
        <circle cx="60" cy="52" r="3" fill="var(--accent-cyan)"/>
        <line x1="60" y1="52" x2="60" y2="110" stroke="var(--accent-cyan)" stroke-width="2"/>
        <line x1="60" y1="110" x2="75" y2="110" stroke="var(--accent-cyan)" stroke-width="2"/>

        <!-- Inverter NOT for C -->
        <polygon points="75,102 75,118 90,110" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="1.8"/>
        <circle cx="93" cy="110" r="2.5" fill="var(--bg-card)" stroke="var(--accent-amber)" stroke-width="1.8"/>
        <line x1="96" y1="110" x2="120" y2="110" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="125" y="105" font-size="10" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-mono)">C'</text>

        <!-- Connections to D0 (C) -->
        <line x1="80" y1="52" x2="160" y2="52" stroke="var(--accent-cyan)" stroke-width="2"/>
        <text x="142" y="48" font-size="10" font-weight="700" fill="var(--text-faint)" font-family="var(--font-mono)">D₀=C</text>

        <!-- Connection to D1 (C') -->
        <line x1="120" y1="110" x2="140" y2="110" stroke="var(--accent-amber)" stroke-width="2"/>
        <circle cx="140" cy="110" r="3" fill="var(--accent-amber)"/>
        <line x1="140" y1="110" x2="140" y2="88" stroke="var(--accent-amber)" stroke-width="2"/>
        <line x1="140" y1="88" x2="160" y2="88" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="142" y="82" font-size="10" font-weight="700" fill="var(--text-faint)" font-family="var(--font-mono)">D₁=C'</text>

        <!-- Connection to D2 (C') -->
        <line x1="140" y1="110" x2="140" y2="135" stroke="var(--accent-amber)" stroke-width="2"/>
        <line x1="140" y1="135" x2="160" y2="135" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="142" y="130" font-size="10" font-weight="700" fill="var(--text-faint)" font-family="var(--font-mono)">D₂=C'</text>

        <!-- Connection to D3 (C) -->
        <line x1="60" y1="52" x2="60" y2="172" stroke="var(--accent-cyan)" stroke-width="2"/>
        <line x1="60" y1="172" x2="160" y2="172" stroke="var(--accent-cyan)" stroke-width="2"/>
        <text x="142" y="167" font-size="10" font-weight="700" fill="var(--text-faint)" font-family="var(--font-mono)">D₃=C</text>

        <!-- Select lines: A -> S1, B -> S0 -->
        <line x1="195" y1="220" x2="195" y2="193" stroke="var(--accent-violet)" stroke-width="2"/>
        <text x="195" y="233" text-anchor="middle" font-size="11" font-weight="800" fill="var(--accent-violet)" font-family="var(--font-mono)">A (S₁)</text>

        <line x1="225" y1="220" x2="225" y2="187" stroke="var(--accent-violet)" stroke-width="2"/>
        <text x="225" y="233" text-anchor="middle" font-size="11" font-weight="800" fill="var(--accent-violet)" font-family="var(--font-mono)">B (S₀)</text>

        <!-- Output F -->
        <line x1="260" y1="115" x2="330" y2="115" stroke="var(--success)" stroke-width="2.5"/>
        <circle cx="330" cy="115" r="4" fill="var(--success)"/>
        <text x="342" y="120" font-size="13" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">F(A,B,C)</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 6.8: Realisasi Fungsi Boolean F(A,B,C) = ∑m(1,2,4,7) Menggunakan MUX 4:1</p>
    </div>`;
}

/* ==========================================================================
   SECTION: w6_part2_intro_universal.js
   ========================================================================== */
// Part 2: Intro and Universal Gates
function renderWeek6Intro(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        Pendahuluan & CPMK
      </div>
      <h1 class="content-title">Pertemuan 6 — Multilevel NAND, NOR, dan Multiplexer (MUX)</h1>
      <p class="content-subtitle">Implementasi Fungsi Logika menggunakan Gerbang Universal dan Perancangan Data Selector</p>
    </div>

    ${w6Alert('info', '<strong>Identitas Pembelajaran & Referensi Akademik</strong><br>' +
      'Mata Kuliah: <strong>Sistem Digital</strong> | Pertemuan: <strong>6 (Minggu VI)</strong><br>' +
      'Buku Rujukan Utama: <em>Stephen Brown & Zvonko Vranesic, "Fundamentals of Digital Logic and VHDL Design", 3rd Edition, McGraw-Hill, 2009 (Chapter 2 & Chapter 4).</em>'
    )}

    ${w6Section('Tujuan Pembelajaran (Learning Outcomes / CPMK)', `
      <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1.5rem;">
        Pada pertemuan ini, mahasiswa mempelajari dua pilar penting dalam rekayasa logika digital modern: 
        <strong>(1) Implementasi Multilevel</strong> menggunakan gerbang universal (NAND dan NOR) untuk efisiensi fabrikasi IC, serta 
        <strong>(2) Multiplexer (MUX)</strong> sebagai komponen kombinasional modular penyalur data dan perancang fungsi logika universal.
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
        <div class="card" style="border-left:4px solid var(--accent-cyan); background:rgba(0,210,255,0.03);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">🎯</div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">CPMK 1: Multilevel NAND & NOR</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Mahasiswa mampu memahami konsep gerbang universal, mengonversi ekspresi Boolean (SOP & POS) menggunakan Teorema De Morgan, dan merancang rangkaian logika multilevel hanya dengan gerbang NAND atau NOR.
          </p>
        </div>

        <div class="card" style="border-left:4px solid var(--accent-violet); background:rgba(124,58,237,0.03);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">🔀</div>
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">CPMK 2: Prinsip Kerja Multiplexer</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Mahasiswa mampu menjelaskan prinsip kerja data selector, menganalisis hubungan antara $n$ select lines dan $2^n$ input data pada MUX 2:1, 4:1, dan 8:1, serta merumuskan fungsi Boolean transfernya.
          </p>
        </div>

        <div class="card" style="border-left:4px solid var(--accent-amber); background:rgba(245,158,11,0.03);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">🛠️</div>
          <h4 style="color:var(--accent-amber); margin-bottom:0.5rem;">CPMK 3: Sintesis Kombinasional & MUX</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Mahasiswa mampu merancang fungsi Boolean arbitrer menggunakan multiplexer sebagai generator fungsi logika (lookup/sintesis) serta mengombinasikan gerbang universal dan MUX secara terpadu.
          </p>
        </div>
      </div>
    `)}

    ${w6Section('Mengapa Materi Ini Sangat Fundamental?', `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;" class="w6-responsive-grid">
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.75rem;">1. Realitas Fabrikasi Semikonduktor (CMOS)</h4>
          <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.65;">
            Dalam teknologi CMOS (Complementary Metal-Oxide-Semiconductor), gerbang <strong>NAND</strong> dan <strong>NOR</strong> secara alami lebih mudah, cepat, dan murah difabrikasi daripada gerbang AND atau OR murni. 
            Gerbang AND standar di pabrik silikon sebenarnya dibuat dari satu gerbang NAND diikuti oleh satu gerbang NOT (inverter). 
            Oleh sebab itu, mentransformasikan seluruh rangkaian menjadi <em>NAND-only</em> atau <em>NOR-only</em> memangkas jumlah transistor dan memperkecil propagasi tunda (propagation delay).
          </p>
        </div>
        <div>
          <h4 style="color:var(--accent-violet); margin-bottom:0.75rem;">2. Multiplexer sebagai Sakelar Digital & ALU</h4>
          <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.65;">
            Multiplexer adalah "jantung" pengaturan aliran data di dalam mikroprosesor. MUX memilih register mana yang dikirim ke ALU, instruksi mana yang dieksekusi, serta mengendalikan bus data dan alamat ke memori.
            Selain itu, MUX dapat langsung merealisasikan tabel kebenaran logika apa pun tanpa perlu merancang gerbang logika dari awal.
          </p>
        </div>
      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  
  return _html_;
}

function renderWeek6UniversalGates(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        Gerbang Universal
      </div>
      <h1 class="content-title">Review Gerbang NAND & NOR sebagai Gerbang Universal</h1>
      <p class="content-subtitle">Membuktikan bahwa fungsi logika dasar (NOT, AND, OR, XOR) dapat dibangun secara mandiri</p>
    </div>

    ${w6Alert('info', '<strong>Definisi Gerbang Universal:</strong><br>' +
      'Suatu gerbang logika disebut <em>Universal Gate</em> jika gerbang tersebut secara tunggal (tanpa bantuan jenis gerbang lain) mampu merealisasikan ketiga operasi logika fundamental: <strong>NOT (Inversi)</strong>, <strong>AND (Konjungsi)</strong>, dan <strong>OR (Disjungsi)</strong>. Gerbang universal yang diakui secara luas adalah <strong>NAND</strong> dan <strong>NOR</strong>.'
    )}

    ${w6Section('A. Gerbang NAND sebagai Gerbang Universal', `
      <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
        Gerbang NAND merepresentasikan operasi <em>Not-AND</em>. Simbol aljabar komplemen yang kita gunakan adalah tanda petik apostrof (<code>'</code>), di mana <code>A'</code> berarti NOT A (Ā).
        Persamaan standar NAND dua input adalah:
      </p>
      ${w6Code("Y = (A · B)'")}

      <div style="display:grid; grid-template-columns:auto 1fr; gap:2rem; margin:1.5rem 0;" class="w6-responsive-grid">
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem; text-align:center;">Tabel Kebenaran NAND</h4>
          ${w6Table(["A", "B", "Y = (A · B)'"], [
            ["0", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
            ["0", "1", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
            ["1", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
            ["1", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"]
          ])}
        </div>
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.75rem;">Aturan Operasi NAND</h4>
          <ul style="color:var(--text-secondary); font-size:0.92rem; line-height:1.7; padding-left:1.25rem;">
            <li>Output bernilai <strong>0</strong> hanya jika <em>semua</em> input bernilai 1.</li>
            <li>Output bernilai <strong>1</strong> jika <em>minimal salah satu</em> input bernilai 0.</li>
            <li>Sifat Involusi: <code>(X')' = X</code> (dua kali inversi mengembalikan nilai asli).</li>
            <li>Hukum De Morgan 1: <code>(A · B)' = A' + B'</code></li>
            <li>Hukum De Morgan 2: <code>(A + B)' = A' · B' &hArr; A + B = (A' · B')'</code></li>
          </ul>
        </div>
      </div>

      <h3 style="color:var(--text-primary); margin:1.5rem 0 1rem 0;">Konstruksi Gerbang Dasar Menggunakan NAND</h3>
      
      ${w6Step('1', 'NOT Menggunakan NAND', `
        Persamaan: <code>A' = (A · A)'</code>.<br>
        Kedua input gerbang NAND dihubungkan bersama (tied together) menerima input $A$. Karena $A \\cdot A = A$, outputnya menjadi $(A)' = A'$.
      `)}

      ${w6Step('2', 'AND Menggunakan NAND', `
        Persamaan: <code>Y = ((A · B)')' = A · B</code>.<br>
        Sinyal $A$ dan $B$ dimasukkan ke gerbang NAND pertama menghasilkan $(A \\cdot B)'$. Output ini kemudian dibalik menggunakan gerbang NAND kedua yang difungsikan sebagai inverter (NOT). Hasil akhirnya adalah $A \\cdot B$.
      `)}

      ${w6Step('3', 'OR Menggunakan NAND (Berdasarkan De Morgan)', `
        Berdasarkan Teorema De Morgan: <code>A + B = ((A + B)')' = (A' · B')'</code>.<br>
        Langkah perancangan:
        <ol style="margin-left:1.25rem; margin-top:0.5rem; line-height:1.6;">
          <li>Inversikan $A$ dengan gerbang NAND NOT &rarr; $A'$</li>
          <li>Inversikan $B$ dengan gerbang NAND NOT &rarr; $B'$</li>
          <li>Masukkan $A'$ dan $B'$ ke gerbang NAND ketiga &rarr; $(A' \\cdot B')' = A + B$.</li>
        </ol>
      `)}

      <div style="margin-top:1.5rem; padding:1.25rem; background:rgba(0,0,0,0.2); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem; text-align:center;">Diagram Skematik Gerbang Universal NAND</h4>
        ${w6SvgUniversalNAND()}
      </div>
    `)}

    ${w6Section('B. Gerbang NOR sebagai Gerbang Universal', `
      <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
        Gerbang NOR merepresentasikan operasi <em>Not-OR</em>. Persamaan standar NOR dua input adalah:
      </p>
      ${w6Code("Y = (A + B)'")}

      <div style="display:grid; grid-template-columns:auto 1fr; gap:2rem; margin:1.5rem 0;" class="w6-responsive-grid">
        <div>
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem; text-align:center;">Tabel Kebenaran NOR</h4>
          ${w6Table(["A", "B", "Y = (A + B)'"], [
            ["0", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
            ["0", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"],
            ["1", "0", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"],
            ["1", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"]
          ])}
        </div>
        <div>
          <h4 style="color:var(--accent-violet); margin-bottom:0.75rem;">Aturan Operasi NOR</h4>
          <ul style="color:var(--text-secondary); font-size:0.92rem; line-height:1.7; padding-left:1.25rem;">
            <li>Output bernilai <strong>1</strong> hanya jika <em>semua</em> input bernilai 0.</li>
            <li>Output bernilai <strong>0</strong> jika <em>minimal salah satu</em> input bernilai 1.</li>
            <li>Hukum De Morgan 1: <code>(A + B)' = A' · B'</code></li>
            <li>Hukum De Morgan 2: <code>(A · B)' = A' + B' &hArr; A · B = (A' + B')'</code></li>
          </ul>
        </div>
      </div>

      <h3 style="color:var(--text-primary); margin:1.5rem 0 1rem 0;">Konstruksi Gerbang Dasar Menggunakan NOR</h3>

      ${w6Step('1', 'NOT Menggunakan NOR', `
        Persamaan: <code>A' = (A + A)'</code>.<br>
        Kedua input gerbang NOR dihubungkan bersama menerima input $A$. Karena $A + A = A$, outputnya menjadi $(A)' = A'$.
      `)}

      ${w6Step('2', 'OR Menggunakan NOR', `
        Persamaan: <code>Y = ((A + B)')' = A + B</code>.<br>
        Input $A$ dan $B$ masuk ke gerbang NOR pertama menghasilkan $(A + B)'$. Output tersebut kemudian dibalik menggunakan gerbang NOR kedua (sebagai NOT) sehingga menghasilkan $A + B$.
      `)}

      ${w6Step('3', 'AND Menggunakan NOR (Berdasarkan De Morgan)', `
        Berdasarkan Teorema De Morgan: <code>A · B = ((A · B)')' = (A' + B')'</code>.<br>
        Langkah perancangan:
        <ol style="margin-left:1.25rem; margin-top:0.5rem; line-height:1.6;">
          <li>Inversikan $A$ menggunakan NOR NOT &rarr; $A'$</li>
          <li>Inversikan $B$ menggunakan NOR NOT &rarr; $B'$</li>
          <li>Masukkan $A'$ dan $B'$ ke gerbang NOR ketiga &rarr; $(A' + B')' = A \\cdot B$.</li>
        </ol>
      `)}
    `)}
  `;
  if (el) el.innerHTML = _html_;
  
  return _html_;
}


/* ==========================================================================
   SECTION: w6_part3_multilevel_nand.js
   ========================================================================== */
// Part 3: Multilevel NAND Circuits
function renderWeek6MultilevelNAND(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        Multilevel NAND
      </div>
      <h1 class="content-title">Implementasi Rangkaian Multilevel NAND</h1>
      <p class="content-subtitle">Transformasi fungsi Sum of Products (SOP) menjadi struktur gerbang NAND-only multi-tingkat</p>
    </div>

    ${w6Alert('info', '<strong>Konsep Dasar Multilevel Logic:</strong><br>' +
      'Rangkaian <em>multilevel</em> adalah rangkaian logika kombinasional yang memiliki lebih dari dua tingkat (level) gerbang logika yang dilewati sinyal dari input primer menuju output akhir. Dibandingkan rangkaian 2-level standar (AND-OR), struktur multilevel sering kali secara dramatis mengurangi <em>gate fan-in</em> (jumlah pin input per gerbang) dan total interkoneksi silikon.'
    )}

    ${w6Section('1. Mengapa NAND-Only Dimulai dari Bentuk SOP?', `
      <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
        Fungsi logika bentuk <strong>Sum of Products (SOP)</strong> terdiri dari operasi OR (penjumlahan logika) atas beberapa suku produk AND (perkalian logika):
      </p>
      ${w6Code("F = (Term_1) + (Term_2) + ... + (Term_k)")}
      <p style="color:var(--text-secondary); line-height:1.7; margin-top:1rem;">
        Ketika kita menerapkan hukum <strong>Involusi ganda</strong> $((F)' )' = F$ dan hukum <strong>De Morgan</strong> pada tingkat OR terluar:
      </p>
      ${w6Code("F = [ ((Term_1) + (Term_2) + ... + (Term_k))' ]'\n  = [ (Term_1)' · (Term_2)' · ... · (Term_k)' ]'")}
      <p style="color:var(--text-secondary); line-height:1.7; margin-top:1rem;">
        Perhatikan persamaan di atas:
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:1.25rem;">
          <li>Masing-masing suku produk $(Term_i)'$ adalah sebuah <strong>gerbang NAND</strong> pada level 1.</li>
          <li>Penggabungan $[ (Term_1)' \\cdot (Term_2)' \\cdot ... ]'$ di luar adalah sebuah <strong>gerbang NAND</strong> pada level 2!</li>
        </ul>
        Dengan demikian, <strong>struktur 2-level AND-OR secara alami setara langsung (1-to-1 mapping) dengan struktur 2-level NAND-NAND</strong>, asalkan literal tunggal (non-AND term) diberi perlakuan inversi yang tepat.
      </p>
    `)}

    ${w6Section('2. Prosedur Desain Sistematis Rangkaian NAND-Only', `
      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        ${w6Step('Langkah 1', 'Representasikan Fungsi dalam SOP Teroptimasi', `
          Tuliskan persamaan logika dalam bentuk Sum of Products (SOP), baik melalui K-Map maupun aljabar Boolean.
        `)}
        ${w6Step('Langkah 2', 'Identifikasi Suku Produk (AND) & Literal Tunggal', `
          Bedakan antara suku produk yang terdiri dari 2 atau lebih literal (misal $B \\cdot C$) dan literal tunggal (misal $A$).
        `)}
        ${w6Step('Langkah 3', 'Terapkan Komplementasi Ganda (Double Inversion)', `
          Terapkan inversi dua kali pada seluruh ekspresi: $F = (F'') = ((...)' )'$.
        `)}
        ${w6Step('Langkah 4', 'Terapkan Teorema De Morgan pada Komplemen Pertama', `
          Ubah tanda penjumlahan ($+$) menjadi perkalian ($\\cdot$), sehingga semua gerbang OR berubah menjadi gerbang NAND.
        `)}
        ${w6Step('Langkah 5', 'Sesuaikan Inversi untuk Literal Tunggal & Validasi', `
          Literal tunggal yang tidak melalui gerbang NAND tingkat pertama harus diinversikan terlebih dahulu (atau diambil dari bentuk komplemennya) agar polaritasnya tidak terbalik saat memasuki NAND tingkat akhir.
        `)}
      </div>
    `)}

    ${w6Section('3. Contoh 1: Implementasi Fungsi F = A + B · C', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Kita akan mengimplementasikan fungsi kombinasional $F = A + B \\cdot C$ murni hanya dengan gerbang NAND dua input.
      </p>

      <h4 style="color:var(--accent-cyan); margin:1.25rem 0 0.5rem 0;">Tahapan Aljabar Boolean:</h4>
      ${w6Code(
`// 1. Fungsi awal
F = A + B·C

// 2. Berikan komplemen ganda (Involusi: (F')' = F)
F = [ (A + B·C)' ]'

// 3. Terapkan Teorema De Morgan: (X + Y)' = X' · Y'
// Misalkan X = A, Y = (B·C)
F = [ A' · (B·C)' ]'`
      )}

      <h4 style="color:var(--accent-cyan); margin:1.5rem 0 0.5rem 0;">Analisis Rangkaian:</h4>
      <ul style="color:var(--text-secondary); line-height:1.7; padding-left:1.25rem;">
        <li><strong>Gerbang 1 (NAND NOT):</strong> Menerima input $A$ pada kedua kakinya &rarr; Output = $A'$.</li>
        <li><strong>Gerbang 2 (NAND):</strong> Menerima input $B$ dan $C$ &rarr; Output = $(B \\cdot C)'$.</li>
        <li><strong>Gerbang 3 (NAND Tingkat Akhir):</strong> Menerima input $A'$ dan $(B \\cdot C)'$ &rarr; Output = $[A' \\cdot (B \\cdot C)']' = A + B \\cdot C$.</li>
      </ul>

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem; text-align:center;">Diagram Skematik Rangkaian F = A + B · C (NAND-Only)</h4>
        ${w6SvgMultilevelNAND_ABC()}
      </div>

      <h4 style="color:var(--accent-cyan); margin:1.5rem 0 0.5rem 0;">Tabel Kebenaran Verifikasi F = A + B · C:</h4>
      ${w6Table(["A", "B", "C", "B·C", "F (Teoritis)", "A'", "(B·C)'", "F (NAND Akhir)"], [
        ["0", "0", "0", "0", "0", "1", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"],
        ["0", "0", "1", "0", "0", "1", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"],
        ["0", "1", "0", "0", "0", "1", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"],
        ["0", "1", "1", "1", "1", "1", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["1", "0", "0", "0", "1", "0", "1", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["1", "0", "1", "0", "1", "0", "1", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["1", "1", "0", "0", "1", "0", "1", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["1", "1", "1", "1", "1", "0", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"]
      ])}
      <p style="font-size:0.88rem; color:var(--text-muted); margin-top:0.5rem;">
        &check; Kolom output teoritis ($F = A + B\\cdot C$) identik 100% dengan output gerbang NAND tingkat akhir.
      </p>
    `)}

    ${w6Section('4. Contoh 2: Implementasi Fungsi SOP Standar F = A·B + C·D', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Contoh klasik SOP dua produk: $F = A\\cdot B + C\\cdot D$. Pada rangkaian standar AND-OR, dibutuhkan 2 gerbang AND dan 1 gerbang OR.
      </p>

      <h4 style="color:var(--accent-violet); margin:1.25rem 0 0.5rem 0;">Transformasi Aljabar:</h4>
      ${w6Code(
`// 1. Terapkan Double Negation:
F = [ (A·B + C·D)' ]'

// 2. Terapkan De Morgan pada bagian dalam kurung:
F = [ (A·B)' · (C·D)' ]'`
      )}

      <p style="color:var(--text-secondary); line-height:1.7; margin-top:1rem;">
        Perhatikan betapa elegannya persamaan ini:
        Kita <strong>TIDAK memerlukan inverter tambahan</strong> sama sekali!
        <br>Cukup 3 gerbang NAND dua input:
        dua gerbang di Level 1 untuk menghitung $(A\\cdot B)'$ dan $(C\\cdot D)'$, serta satu gerbang di Level 2 untuk menggabungkannya.
      </p>

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-violet); margin-bottom:1rem; text-align:center;">Diagram Skematik Rangkaian F = A·B + C·D (NAND-Only)</h4>
        ${w6SvgSOP_NAND_ABCD()}
      </div>

      <h4 style="color:var(--accent-violet); margin:1.5rem 0 0.5rem 0;">Tabel Kebenaran Verifikasi (Ringkasan Kasus Kunci):</h4>
      ${w6Table(["A B", "C D", "A·B", "C·D", "F = A·B + C·D", "(A·B)'", "(C·D)'", "Output NAND Level 2"], [
        ["0 0", "0 0", "0", "0", "0", "1", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"],
        ["1 1", "0 0", "1", "0", "1", "0", "1", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["0 0", "1 1", "0", "1", "1", "1", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["1 1", "1 1", "1", "1", "1", "0", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["1 0", "0 1", "0", "0", "0", "1", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"]
      ])}
    `)}
  `;
  if (el) el.innerHTML = _html_;
  
  return _html_;
}


/* ==========================================================================
   SECTION: w6_part4_multilevel_nor.js
   ========================================================================== */
// Part 4: Multilevel NOR Circuits
function renderWeek6MultilevelNOR(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        Multilevel NOR
      </div>
      <h1 class="content-title">Implementasi Rangkaian Multilevel NOR</h1>
      <p class="content-subtitle">Transformasi fungsi Product of Sums (POS) menjadi jaringan gerbang NOR-only multi-tingkat</p>
    </div>

    ${w6Alert('info', '<strong>Dualitas Aljabar Boolean:</strong><br>' +
      'Jika implementasi gerbang <strong>NAND-only</strong> berakar pada bentuk kanonik <strong>SOP</strong> (Sum of Products), maka implementasi gerbang <strong>NOR-only</strong> adalah dual sempurnanya yang berakar pada bentuk kanonik <strong>POS</strong> (Product of Sums).'
    )}

    ${w6Section('1. Mengapa NOR-Only Dimulai dari Bentuk POS?', `
      <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
        Fungsi <strong>Product of Sums (POS)</strong> dibentuk oleh operasi AND (perkalian logika) atas beberapa suku jumlah OR:
      </p>
      ${w6Code("F = (Sum_1) · (Sum_2) · ... · (Sum_k)")}
      <p style="color:var(--text-secondary); line-height:1.7; margin-top:1rem;">
        Ketika kita menerapkan komplemen ganda $((F)' )' = F$ dan hukum <strong>De Morgan</strong> untuk operasi perkalian:
      </p>
      ${w6Code("F = [ ((Sum_1) · (Sum_2) · ... · (Sum_k))' ]'\n  = [ (Sum_1)' + (Sum_2)' + ... + (Sum_k)' ]'")}
      <p style="color:var(--text-secondary); line-height:1.7; margin-top:1rem;">
        Perhatikan strukturnya:
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:1.25rem;">
          <li>Masing-masing suku $(Sum_i)'$ adalah sebuah <strong>gerbang NOR</strong> pada level 1.</li>
          <li>Penggabungan $[ (Sum_1)' + (Sum_2)' + ... ]'$ di tingkat luar adalah sebuah <strong>gerbang NOR</strong> pada level 2!</li>
        </ul>
        Dengan kata lain, <strong>struktur 2-level OR-AND setara langsung dengan struktur 2-level NOR-NOR</strong>.
      </p>
    `)}

    ${w6Section('2. Prosedur Desain Sistematis NOR-Only', `
      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        ${w6Step('Langkah 1', 'Representasikan Fungsi dalam Bentuk POS', `
          Ubah fungsi Boolean menjadi Product of Sums (POS) teroptimasi, misalnya dari K-Map dengan melingkari angka 0 atau melalui hukum distributif aljabar.
        `)}
        ${w6Step('Langkah 2', 'Identifikasi Suku OR dan Literal Tunggal', `
          Petakan suku penjumlahan (seperti $(A + B)$) serta literal tunggal yang berdiri sendiri.
        `)}
        ${w6Step('Langkah 3', 'Terapkan Komplementasi Ganda', `
          Terapkan dua kali negasi: $F = [ (F)' ]'$.
        `)}
        ${w6Step('Langkah 4', 'Terapkan Teorema De Morgan', `
          Ubah tanda perkalian (AND luar) menjadi penjumlahan OR yang dinegasikan: $(X \\cdot Y)' = X' + Y'$.
        `)}
        ${w6Step('Langkah 5', 'Inversi Literal Tunggal & Validasi Aljabar', `
          Literal yang tidak melalui gerbang NOR di level 1 harus diinversikan terlebih dahulu menggunakan inverter NOR agar polaritas akhirnya benar.
        `)}
      </div>
    `)}

    ${w6Section('3. Contoh Implementasi: F = (A + B) · (C + D)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Kita akan merealisasikan fungsi POS $F = (A + B) \\cdot (C + D)$ menggunakan 100% gerbang NOR dua input.
      </p>

      <h4 style="color:var(--accent-violet); margin:1.25rem 0 0.5rem 0;">Transformasi Aljabar Lengkap:</h4>
      ${w6Code(
`// 1. Fungsi awal dalam bentuk POS
F = (A + B) · (C + D)

// 2. Berikan negasi ganda (Involusi)
F = [ ( (A + B) · (C + D) )' ]'

// 3. Terapkan Teorema De Morgan: (X · Y)' = X' + Y'
// Misalkan X = (A + B) dan Y = (C + D)
F = [ (A + B)' + (C + D)' ]'`
      )}

      <h4 style="color:var(--accent-violet); margin:1.5rem 0 0.5rem 0;">Analisis Rangkaian:</h4>
      <ul style="color:var(--text-secondary); line-height:1.7; padding-left:1.25rem;">
        <li><strong>Gerbang 1 (NOR Level 1):</strong> Menerima input $A$ dan $B$ &rarr; Output = $(A + B)'$.</li>
        <li><strong>Gerbang 2 (NOR Level 1):</strong> Menerima input $C$ dan $D$ &rarr; Output = $(C + D)'$.</li>
        <li><strong>Gerbang 3 (NOR Level 2):</strong> Menerima output kedua gerbang di atas &rarr; Output = $[ (A + B)' + (C + D)' ]' = (A + B) \\cdot (C + D)$.</li>
      </ul>

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-violet); margin-bottom:1rem; text-align:center;">Diagram Skematik Rangkaian F = (A + B) · (C + D) (NOR-Only)</h4>
        ${w6SvgMultilevelNOR()}
      </div>

      <h4 style="color:var(--accent-violet); margin:1.5rem 0 0.5rem 0;">Tabel Kebenaran Verifikasi Lengkap:</h4>
      ${w6Table(["A B", "C D", "A+B", "C+D", "F = (A+B)(C+D)", "(A+B)'", "(C+D)'", "Output NOR Level 2"], [
        ["0 0", "0 0", "0", "0", "0", "1", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"],
        ["1 0", "0 0", "1", "0", "0", "0", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"],
        ["0 0", "0 1", "0", "1", "0", "1", "0", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span>"],
        ["1 0", "1 0", "1", "1", "1", "0", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["1 1", "0 1", "1", "1", "1", "0", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["0 1", "1 1", "1", "1", "1", "0", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"],
        ["1 1", "1 1", "1", "1", "1", "0", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span>"]
      ])}
      <p style="font-size:0.88rem; color:var(--text-muted); margin-top:0.5rem;">
        &check; Output NOR Level 2 bernilai 1 jika dan hanya jika kedua suku $(A+B)$ bernilai 1 DAN $(C+D)$ bernilai 1.
      </p>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  
  return _html_;
}


/* ==========================================================================
   SECTION: w6_part5_comparison.js
   ========================================================================== */
// Part 5: Comparison NAND-Only vs NOR-Only
function renderWeek6Comparison(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        Komparasi NAND vs NOR
      </div>
      <h1 class="content-title">Perbandingan Rangkaian NAND-Only vs NOR-Only</h1>
      <p class="content-subtitle">Analisis komparatif arsitektur, efisiensi silikon, dan metodologi konversi logika</p>
    </div>

    ${w6Alert('success', '<strong>Prinsip Kesetaraan Fungsional:</strong><br>' +
      'Baik gerbang NAND maupun NOR mampu merealisasikan <em>setiap fungsi logika Boolean yang ada</em> tanpa batasan. Pemilihan antara NAND-only atau NOR-only dalam industri semikonduktor ditentukan oleh bentuk kanonik persamaan asal (SOP vs POS) dan karakteristik fisika transistor silikon (mobilitas elektron vs hole).'
    )}

    ${w6Section('Tabel Perbandingan Komprehensif', `
      <div style="overflow-x:auto;">
        ${w6Table(['Parameter Perancangan', 'Arsitektur NAND-Only', 'Arsitektur NOR-Only'], [
          [
            '<strong>Gerbang Universal</strong>',
            '<span style="color:var(--accent-cyan); font-weight:bold;">NAND (Not-AND)</span>',
            '<span style="color:var(--accent-violet); font-weight:bold;">NOR (Not-OR)</span>'
          ],
          [
            '<strong>Bentuk Awal Ideal</strong>',
            '<strong>SOP</strong> (Sum of Products)<br>Fungsi AND-OR',
            '<strong>POS</strong> (Product of Sums)<br>Fungsi OR-AND'
          ],
          [
            '<strong>Prinsip Transformasi</strong>',
            'Involusi Ganda + De Morgan pada penjumlahan: (X + Y)\' = X\' · Y\'',
            'Involusi Ganda + De Morgan pada perkalian: (X · Y)\' = X\' + Y\''
          ],
          [
            '<strong>Pemetaan Level Logika</strong>',
            'Level 1: AND &rarr; NAND<br>Level 2: OR &rarr; NAND',
            'Level 1: OR &rarr; NOR<br>Level 2: AND &rarr; NOR'
          ],
          [
            '<strong>Kebutuhan Inversi Literal</strong>',
            'Variabel tunggal yang langsung di-OR-kan harus dibalik (A &rarr; A\')',
            'Variabel tunggal yang langsung di-AND-kan harus dibalik (A &rarr; A\')'
          ],
          [
            '<strong>Kecepatan CMOS Fisik</strong>',
            '<span style="color:var(--accent-emerald); font-weight:bold;">Lebih Cepat (Utama)</span><br>Menggunakan transistor NMOS berseri. Mobilitas elektron ~2-3x lebih tinggi daripada hole.',
            '<strong>Sedikit Lebih Lambat</strong><br>Menggunakan transistor PMOS berseri yang memiliki resistansi internal lebih tinggi untuk ukuran luas yang sama.'
          ],
          [
            '<strong>Aplikasi Populer</strong>',
            'Flash Memory (NAND Flash), standar cell library ASIC, prosesor x86/ARM.',
            'NOR Flash (random access execute-in-place), ROM bios, sistem kontrol POS.'
          ]
        ])}
      </div>
    `)}

    ${w6Section('Kapan Memilih NAND atau NOR?', `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;" class="w6-responsive-grid">
        <div class="card" style="border-top:3px solid var(--accent-cyan);">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.75rem;">Pilih NAND-Only Apabila:</h4>
          <ol style="color:var(--text-secondary); font-size:0.92rem; line-height:1.7; padding-left:1.25rem;">
            <li>Spesifikasi sistem atau tabel kebenaran memiliki lebih sedikit minterm 1 (mudah disederhanakan ke bentuk SOP).</li>
            <li>Kecepatan switching dan propagasi tunda menjadi prioritas tertinggi pada chip silikon CMOS.</li>
            <li>Rangkaian target menggunakan memori sel atau modul logika yang berbasis gerbang NAND.</li>
          </ol>
        </div>

        <div class="card" style="border-top:3px solid var(--accent-violet);">
          <h4 style="color:var(--accent-violet); margin-bottom:0.75rem;">Pilih NOR-Only Apabila:</h4>
          <ol style="color:var(--text-secondary); font-size:0.92rem; line-height:1.7; padding-left:1.25rem;">
            <li>Tabel kebenaran memiliki lebih banyak angka 1 dan sedikit angka 0 (sehingga bentuk POS jauh lebih hemat suku).</li>
            <li>Kebutuhan logika pengendali aktif-rendah (active-low controls) yang membutuhkan operasi pendeteksi nol.</li>
            <li>Arsitektur memori memerlukan kemampuan akses acak berkecepatan tinggi per kata (seperti NOR Flash).</li>
          </ol>
        </div>
      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  
  return _html_;
}


/* ==========================================================================
   SECTION: w6_part6_mux_basics.js
   ========================================================================== */
// Part 6: Multiplexer Basics & MUX 2:1
function renderWeek6MuxBasics(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        Dasar Multiplexer & MUX 2:1
      </div>
      <h1 class="content-title">Multiplexer (MUX) & MUX 2:1 Interaktif</h1>
      <p class="content-subtitle">Prinsip kerja pemilih data (Data Selector) kombinasional dan simulasi real-time</p>
    </div>

    ${w6Alert('info', '<strong>Apa itu Multiplexer?</strong><br>' +
      'Multiplexer (disingkat <strong>MUX</strong> atau sering disebut <em>Data Selector</em>) adalah rangkaian logika kombinasional yang dirancang untuk memilih satu di antara sekian banyak jalur input data ($2^n$ input) dan meneruskannya ke satu jalur output tunggal ($Y$), dikendalikan oleh sejumlah $n$ jalur seleksi (<strong>Select Lines</strong>).'
    )}

    ${w6Section('1. Konsep Dasar dan Formula MUX', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Analogi fisik multiplexer sangat mirip dengan sebuah sakelar putar multi-posisi (rotary switch). Jalur data masuk dari berbagai sumber, namun hanya satu jalur yang terhubung secara elektris ke terminal keluaran pada satu waktu.
      </p>

      <div class="card" style="margin:1.25rem 0; background:rgba(0,210,255,0.04); border:1px solid rgba(0,210,255,0.2);">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Aturan Rasio Input dan Select Line</h4>
        <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6;">
          Jika sebuah multiplexer memiliki <strong>$n$ jalur seleksi</strong> ($S_{n-1}, ..., S_0$), maka MUX tersebut dapat mengontrol hingga <strong>$2^n$ jalur input data</strong> ($D_0$ sampai $D_{2^n - 1}$):
        </p>
        <div style="font-family:'Fira Code', monospace; font-size:1.1rem; color:var(--accent-cyan); margin-top:0.5rem; text-align:center;">
          Jumlah Input Data (N) = 2<sup>n</sup> (di mana n = jumlah Select Lines)
        </div>
      </div>

      <h4 style="color:var(--text-primary); margin:1.25rem 0 0.75rem 0;">Aplikasi Utama Multiplexer dalam Sistem Komputer:</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
        <div class="card">
          <strong style="color:var(--accent-cyan);">1. Seleksi Operand ALU (CPU)</strong>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            CPU menggunakan MUX untuk menentukan apakah input ALU berasal dari Register File, Immediate Value, atau memori cache.
          </p>
        </div>
        <div class="card">
          <strong style="color:var(--accent-violet);">2. Time-Division Multiplexing (TDM)</strong>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Dalam telekomunikasi, beberapa kanal suara/data digilir melewati satu kabel transmisi tunggal berkecepatan tinggi.
          </p>
        </div>
        <div class="card">
          <strong style="color:var(--accent-emerald);">3. Multiplexing Bus Alamat Memori</strong>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Pada memori DRAM, pin alamat yang sama digunakan bergantian untuk Row Address Strobe (RAS) dan Column Address Strobe (CAS).
          </p>
        </div>
        <div class="card">
          <strong style="color:var(--accent-amber);">4. Logika Terprogram (FPGA LUT)</strong>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Lookup Table (LUT) pada chip FPGA modern dibangun dari susunan pohon MUX untuk menyimulasikan fungsi logika apa pun.
          </p>
        </div>
      </div>
    `)}

    ${w6Section('2. Multiplexer 2:1 (2-to-1 MUX)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        MUX 2:1 adalah unit MUX terkecil. Komponen ini memiliki:
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:1.25rem;">
          <li><strong>2 Input Data:</strong> $D_0$ dan $D_1$.</li>
          <li><strong>1 Select Line:</strong> $S$ ($n = 1$, karena $2^1 = 2$).</li>
          <li><strong>1 Output Data:</strong> $Y$.</li>
        </ul>
      </p>

      <h4 style="color:var(--accent-cyan); margin:1.25rem 0 0.5rem 0;">Persamaan Boolean MUX 2:1:</h4>
      ${w6Code("Y = S' · D₀ + S · D₁")}

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:1.5rem 0;" class="w6-responsive-grid">
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem; text-align:center;">Tabel Seleksi Sederhana</h4>
          ${w6Table(['Select (S)', 'Output (Y)', 'Keterangan'], [
            ['0', '<span style="color:var(--accent-cyan); font-weight:bold;">D₀</span>', 'Jalur input D₀ diteruskan ke output'],
            ['1', '<span style="color:var(--accent-violet); font-weight:bold;">D₁</span>', 'Jalur input D₁ diteruskan ke output']
          ])}
        </div>
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem; text-align:center;">Tabel Kebenaran Lengkap (8 Kasus)</h4>
          ${w6Table(["S", "D₀", "D₁", "Y = S'·D₀ + S·D₁"], [
            ["0", "0", "0", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span> (mengikuti D₀)"],
            ["0", "0", "1", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span> (mengikuti D₀)"],
            ["0", "1", "0", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span> (mengikuti D₀)"],
            ["0", "1", "1", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span> (mengikuti D₀)"],
            ["1", "0", "0", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span> (mengikuti D₁)"],
            ["1", "0", "1", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span> (mengikuti D₁)"],
            ["1", "1", "0", "<span style=\"color:var(--accent-rose); font-weight:bold;\">0</span> (mengikuti D₁)"],
            ["1", "1", "1", "<span style=\"color:var(--accent-cyan); font-weight:bold;\">1</span> (mengikuti D₁)"]
          ])}
        </div>
      </div>

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem; text-align:center;">Diagram Simbol & Logika Internal MUX 2:1</h4>
        ${w6SvgMux2to1()}
      </div>
    `)}

    ${w6Section('3. Simulator Interaktif MUX 2:1', `
      <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.25rem;">
        Klik tombol bit di bawah untuk mengubah nilai $D_0, D_1$, dan $S$. Amati secara langsung bagaimana jalur aktif menghubungkan input ke output sesuai rumus $Y = S' \\cdot D_0 + S \\cdot D_1$.
      </p>

      <div class="card" style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); padding:1.5rem;">
        <div style="display:flex; flex-wrap:wrap; justify-content:space-around; align-items:center; gap:1.5rem;">
          
          <!-- Inputs Column -->
          <div style="display:flex; flex-direction:column; gap:1rem;">
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span style="font-weight:bold; color:var(--accent-cyan); width:30px;">D₀:</span>
              <button id="w6-btn-d0" onclick="w6ToggleInput('d0')" class="btn" style="min-width:60px; font-size:1.1rem; font-weight:bold; background:rgba(0,210,255,0.15); border:1px solid var(--accent-cyan);">0</button>
              <span style="font-size:0.85rem; color:var(--text-muted);">(Input 0)</span>
            </div>

            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span style="font-weight:bold; color:var(--accent-violet); width:30px;">D₁:</span>
              <button id="w6-btn-d1" onclick="w6ToggleInput('d1')" class="btn" style="min-width:60px; font-size:1.1rem; font-weight:bold; background:rgba(124,58,237,0.15); border:1px solid var(--accent-violet);">0</button>
              <span style="font-size:0.85rem; color:var(--text-muted);">(Input 1)</span>
            </div>
          </div>

          <!-- Select Line -->
          <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem; padding:1rem; background:rgba(245,158,11,0.08); border-radius:10px; border:1px solid rgba(245,158,11,0.3);">
            <span style="font-weight:bold; color:var(--accent-amber);">Select Line (S)</span>
            <button id="w6-btn-s" onclick="w6ToggleInput('s')" class="btn" style="min-width:80px; font-size:1.2rem; font-weight:bold; background:var(--accent-amber); color:#000;">0</button>
            <span id="w6-s-status" style="font-size:0.85rem; color:var(--accent-amber);">Memilih D₀</span>
          </div>

          <!-- Output Box -->
          <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem; padding:1rem 1.5rem; background:rgba(16,185,129,0.08); border-radius:10px; border:1px solid rgba(16,185,129,0.3);">
            <span style="font-weight:bold; color:var(--accent-emerald);">Output (Y)</span>
            <div id="w6-output-y" style="font-size:2rem; font-weight:bold; color:var(--accent-emerald);">0</div>
            <span style="font-size:0.85rem; color:var(--text-muted);">Sinyal Terpilih</span>
          </div>
        </div>

        <div id="w6-calc-explanation" style="margin-top:1.5rem; padding:1rem; background:rgba(0,0,0,0.3); border-radius:8px; font-family:'Fira Code', monospace; font-size:0.9rem; color:var(--text-secondary);">
          Perhitungan: Y = (S' · D₀) + (S · D₁) = (1 · 0) + (0 · 0) = 0. Output Y mengambil nilai D₀.
        </div>
      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  if (typeof window !== "undefined" && window.w6UpdateMux2Display) setTimeout(window.w6UpdateMux2Display, 10);
  return _html_;
}

// Interactive State & Logic for MUX 2:1
window.w6MuxState = { d0: 0, d1: 0, s: 0 };

window.w6ToggleInput = function(pin) {
  if (window.w6MuxState[pin] !== undefined) {
    window.w6MuxState[pin] = window.w6MuxState[pin] === 0 ? 1 : 0;
    window.w6UpdateMux2Display();
  }
};

window.w6UpdateMux2Display = function() {
  const d0 = window.w6MuxState.d0;
  const d1 = window.w6MuxState.d1;
  const s = window.w6MuxState.s;

  const btnD0 = document.getElementById('w6-btn-d0');
  const btnD1 = document.getElementById('w6-btn-d1');
  const btnS = document.getElementById('w6-btn-s');
  const sStatus = document.getElementById('w6-s-status');
  const outY = document.getElementById('w6-output-y');
  const exp = document.getElementById('w6-calc-explanation');

  if (!btnD0 || !btnD1 || !btnS || !outY || !exp) return;

  btnD0.textContent = d0;
  btnD1.textContent = d1;
  btnS.textContent = s;

  // Boolean calculation: Y = (!s & d0) | (s & d1)
  const notS = s === 0 ? 1 : 0;
  const part0 = notS & d0;
  const part1 = s & d1;
  const y = part0 | part1;

  outY.textContent = y;
  outY.style.color = y === 1 ? 'var(--accent-cyan)' : 'var(--accent-rose)';

  if (s === 0) {
    sStatus.textContent = 'Memilih jalur D₀';
    sStatus.style.color = 'var(--accent-cyan)';
    btnD0.style.boxShadow = '0 0 10px rgba(0,210,255,0.5)';
    btnD1.style.boxShadow = 'none';
    exp.innerHTML = 'Perhitungan: Y = (S\' · D₀) + (S · D₁) = (1 · ' + d0 + ') + (0 · ' + d1 + ') = <strong>' + y + '</strong>. Karena S = 0, sinyal <strong>D₀ (' + d0 + ')</strong> dialirkan ke output Y.';
  } else {
    sStatus.textContent = 'Memilih jalur D₁';
    sStatus.style.color = 'var(--accent-violet)';
    btnD1.style.boxShadow = '0 0 10px rgba(124,58,237,0.5)';
    btnD0.style.boxShadow = 'none';
    exp.innerHTML = 'Perhitungan: Y = (S\' · D₀) + (S · D₁) = (0 · ' + d0 + ') + (1 · ' + d1 + ') = <strong>' + y + '</strong>. Karena S = 1, sinyal <strong>D₁ (' + d1 + ')</strong> dialirkan ke output Y.';
  }
};


/* ==========================================================================
   SECTION: w6_part7_mux_advanced.js
   ========================================================================== */
// Part 7: MUX 4:1 and MUX 8:1 with Interactive Simulators
function renderWeek6MuxAdvanced(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        MUX 4:1 & MUX 8:1
      </div>
      <h1 class="content-title">Multiplexer Skala Lanjut (MUX 4:1 & MUX 8:1)</h1>
      <p class="content-subtitle">Ekspansi kanal data, tabel seleksi biner, dan simulasi multi-kanal interaktif</p>
    </div>

    ${w6Alert('info', '<strong>Ekspansi Kapasitas Multiplexer:</strong><br>' +
      'Setiap penambahan 1 bit select line melipatgandakan jumlah kanal input data ($2^n$). MUX 4:1 memiliki 2 select lines ($2^2=4$), sedangkan MUX 8:1 memiliki 3 select lines ($2^3=8$). Konsep seleksi biner ini adalah dasar perancangan Address Decoder dan Bus Selector pada arsitektur komputer.'
    )}

    ${w6Section('1. Multiplexer 4:1 (4-to-1 MUX)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        MUX 4:1 memiliki empat input data ($D_0, D_1, D_2, D_3$), dua jalur seleksi ($S_1$ sebagai Most Significant Bit dan $S_0$ sebagai Least Significant Bit), serta satu output data ($Y$).
      </p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:1.25rem 0;" class="w6-responsive-grid">
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem; text-align:center;">Tabel Seleksi MUX 4:1</h4>
          ${w6Table(['S₁ (MSB)', 'S₀ (LSB)', 'Input Terpilih', 'Output (Y)'], [
            ['0', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">D₀</span>', 'Y = D₀'],
            ['0', '1', '<span style="color:var(--accent-cyan); font-weight:bold;">D₁</span>', 'Y = D₁'],
            ['1', '0', '<span style="color:var(--accent-violet); font-weight:bold;">D₂</span>', 'Y = D₂'],
            ['1', '1', '<span style="color:var(--accent-violet); font-weight:bold;">D₃</span>', 'Y = D₃']
          ])}
        </div>
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Persamaan Boolean MUX 4:1:</h4>
          ${w6Code("Y = S₁' S₀' D₀ + S₁' S₀ D₁ + S₁ S₀' D₂ + S₁ S₀ D₃")}
          <p style="color:var(--text-secondary); font-size:0.9rem; line-height:1.6; margin-top:0.75rem;">
            <strong>Prinsip Kerja:</strong> Masing-masing minterm select line ($S_1, S_0$) bertindak sebagai <em>"kunci pintu"</em> (enable gate) bagi data tertentu. Ketika $S_1 S_0 = 10_2$, hanya suku ketiga ($S_1 S_0' D_2 = 1 \\cdot 1 \\cdot D_2 = D_2$) yang aktif, sementara ketiga suku lainnya dipaksa menjadi 0.
          </p>
        </div>
      </div>

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem; text-align:center;">Diagram Skematik & Logika Gerbang MUX 4:1</h4>
        ${w6SvgMux4to1()}
      </div>

      <!-- Simulator MUX 4:1 -->
      <div class="card" style="margin-top:1.5rem; background:rgba(15,23,42,0.6); border:1px solid var(--border-color); padding:1.5rem;">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem;">🕹️ Simulator Real-Time MUX 4:1</h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1.5rem; align-items:center;">
          <!-- 4 Data Inputs -->
          <div style="display:flex; flex-direction:column; gap:0.6rem;">
            <div style="font-weight:bold; color:var(--text-primary); margin-bottom:0.25rem;">Input Data (D):</div>
            <div style="display:flex; align-items:center; gap:0.5rem;" id="w6-row-d0">
              <span style="width:30px; font-weight:bold; color:var(--accent-cyan);">D₀:</span>
              <button id="w6-btn-m4-d0" onclick="w6ToggleM4('d0')" class="btn" style="padding:4px 12px; font-weight:bold;">0</button>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;" id="w6-row-d1">
              <span style="width:30px; font-weight:bold; color:var(--accent-cyan);">D₁:</span>
              <button id="w6-btn-m4-d1" onclick="w6ToggleM4('d1')" class="btn" style="padding:4px 12px; font-weight:bold;">0</button>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;" id="w6-row-d2">
              <span style="width:30px; font-weight:bold; color:var(--accent-violet);">D₂:</span>
              <button id="w6-btn-m4-d2" onclick="w6ToggleM4('d2')" class="btn" style="padding:4px 12px; font-weight:bold;">0</button>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;" id="w6-row-d3">
              <span style="width:30px; font-weight:bold; color:var(--accent-violet);">D₃:</span>
              <button id="w6-btn-m4-d3" onclick="w6ToggleM4('d3')" class="btn" style="padding:4px 12px; font-weight:bold;">0</button>
            </div>
          </div>

          <!-- Select Inputs S1, S0 -->
          <div style="display:flex; flex-direction:column; gap:0.75rem; padding:1rem; background:rgba(245,158,11,0.08); border-radius:10px; border:1px solid rgba(245,158,11,0.3);">
            <div style="font-weight:bold; color:var(--accent-amber);">Select Lines (S):</div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span style="width:65px; font-size:0.85rem;">S₁ (MSB):</span>
              <button id="w6-btn-m4-s1" onclick="w6ToggleM4('s1')" class="btn" style="padding:4px 14px; font-weight:bold; background:var(--accent-amber); color:#000;">0</button>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span style="width:65px; font-size:0.85rem;">S₀ (LSB):</span>
              <button id="w6-btn-m4-s0" onclick="w6ToggleM4('s0')" class="btn" style="padding:4px 14px; font-weight:bold; background:var(--accent-amber); color:#000;">0</button>
            </div>
            <div id="w6-m4-selected-txt" style="font-size:0.85rem; font-weight:bold; color:var(--accent-cyan); margin-top:0.25rem;">
              Kanal Aktif: D₀ (Index 00₂)
            </div>
          </div>

          <!-- Output Y -->
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.25rem; background:rgba(16,185,129,0.08); border-radius:10px; border:1px solid rgba(16,185,129,0.3);">
            <span style="font-weight:bold; color:var(--accent-emerald);">Output (Y)</span>
            <div id="w6-m4-out-y" style="font-size:2.5rem; font-weight:bold; color:var(--accent-emerald); margin:0.5rem 0;">0</div>
            <span id="w6-m4-subtext" style="font-size:0.8rem; color:var(--text-muted); text-align:center;">Mengikuti D₀ = 0</span>
          </div>
        </div>
      </div>
    `)}

    ${w6Section('2. Multiplexer 8:1 (8-to-1 MUX)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        MUX 8:1 memiliki <strong>8 input data</strong> ($D_0$ sampai $D_7$), <strong>3 jalur seleksi</strong> ($S_2, S_1, S_0$), dan <strong>1 output</strong> ($Y$). 
        Kombinasi biner 3-bit dari $S_2 S_1 S_0$ bernilai dari $000_2$ (desimal 0) hingga $111_2$ (desimal 7), tepat memetakan masing-masing input ke output.
      </p>

      <div style="margin:1.5rem 0;">
        <h4 style="color:var(--accent-violet); margin-bottom:0.75rem; text-align:center;">Tabel Seleksi 8 Baris MUX 8:1</h4>
        ${w6Table(['S₂ (MSB)', 'S₁', 'S₀ (LSB)', 'Nilai Desimal', 'Input Terpilih', 'Fungsi Output (Y)'], [
          ['0', '0', '0', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">D₀</span>', 'Y = D₀'],
          ['0', '0', '1', '1', '<span style="color:var(--accent-cyan); font-weight:bold;">D₁</span>', 'Y = D₁'],
          ['0', '1', '0', '2', '<span style="color:var(--accent-cyan); font-weight:bold;">D₂</span>', 'Y = D₂'],
          ['0', '1', '1', '3', '<span style="color:var(--accent-cyan); font-weight:bold;">D₃</span>', 'Y = D₃'],
          ['1', '0', '0', '4', '<span style="color:var(--accent-violet); font-weight:bold;">D₄</span>', 'Y = D₄'],
          ['1', '0', '1', '5', '<span style="color:var(--accent-violet); font-weight:bold;">D₅</span>', 'Y = D₅'],
          ['1', '1', '0', '6', '<span style="color:var(--accent-violet); font-weight:bold;">D₆</span>', 'Y = D₆'],
          ['1', '1', '1', '7', '<span style="color:var(--accent-violet); font-weight:bold;">D₇</span>', 'Y = D₇']
        ])}
      </div>

      <h4 style="color:var(--accent-violet); margin:1.25rem 0 0.5rem 0;">Persamaan Boolean MUX 8:1 Lengkap:</h4>
      ${w6Code(
`Y = S₂'S₁'S₀'D₀
  + S₂'S₁'S₀D₁
  + S₂'S₁S₀'D₂
  + S₂'S₁S₀D₃
  + S₂S₁'S₀'D₄
  + S₂S₁'S₀D₅
  + S₂S₁S₀'D₆
  + S₂S₁S₀D₇`
      )}

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-violet); margin-bottom:1rem; text-align:center;">Diagram Skematik Blok MUX 8:1</h4>
        ${w6SvgMux8to1()}
      </div>

      <!-- Simulator MUX 8:1 -->
      <div class="card" style="margin-top:1.5rem; background:rgba(15,23,42,0.6); border:1px solid var(--border-color); padding:1.5rem;">
        <h4 style="color:var(--accent-violet); margin-bottom:1rem;">🕹️ Simulator Real-Time MUX 8:1</h4>
        
        <!-- Controls Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem;">
          
          <!-- 8 Inputs Data -->
          <div>
            <div style="font-weight:bold; color:var(--text-primary); margin-bottom:0.5rem;">Input Data (D₀ - D₇):</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
              ${[0,1,2,3,4,5,6,7].map(i => `
                <div style="display:flex; align-items:center; gap:0.4rem; padding:4px 8px; background:rgba(255,255,255,0.02); border-radius:6px;" id="w6-m8-box-d${i}">
                  <span style="font-size:0.85rem; font-weight:bold; color:${i < 4 ? 'var(--accent-cyan)' : 'var(--accent-violet)'};">D${i}:</span>
                  <button id="w6-btn-m8-d${i}" onclick="w6ToggleM8('d${i}')" class="btn" style="padding:2px 10px; font-size:0.85rem; font-weight:bold;">0</button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Select Lines & Output -->
          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:1rem;">
            <div style="padding:1rem; background:rgba(245,158,11,0.08); border-radius:10px; border:1px solid rgba(245,158,11,0.3);">
              <div style="font-weight:bold; color:var(--accent-amber); margin-bottom:0.5rem;">Select Lines (S₂ S₁ S₀):</div>
              <div style="display:flex; gap:0.75rem; align-items:center;">
                <div style="text-align:center;">
                  <div style="font-size:0.75rem; color:var(--text-muted);">S₂ (MSB)</div>
                  <button id="w6-btn-m8-s2" onclick="w6ToggleM8('s2')" class="btn" style="padding:4px 12px; font-weight:bold; background:var(--accent-amber); color:#000;">0</button>
                </div>
                <div style="text-align:center;">
                  <div style="font-size:0.75rem; color:var(--text-muted);">S₁</div>
                  <button id="w6-btn-m8-s1" onclick="w6ToggleM8('s1')" class="btn" style="padding:4px 12px; font-weight:bold; background:var(--accent-amber); color:#000;">0</button>
                </div>
                <div style="text-align:center;">
                  <div style="font-size:0.75rem; color:var(--text-muted);">S₀ (LSB)</div>
                  <button id="w6-btn-m8-s0" onclick="w6ToggleM8('s0')" class="btn" style="padding:4px 12px; font-weight:bold; background:var(--accent-amber); color:#000;">0</button>
                </div>
              </div>
              <div id="w6-m8-info" style="font-size:0.85rem; font-weight:bold; color:var(--accent-violet); margin-top:0.75rem;">
                Kombinasi S = 000₂ (Desimal 0) &rarr; Memilih D₀
              </div>
            </div>

            <!-- Output Box -->
            <div style="display:flex; align-items:center; justify-content:space-between; padding:1rem 1.5rem; background:rgba(16,185,129,0.08); border-radius:10px; border:1px solid rgba(16,185,129,0.3);">
              <div>
                <span style="font-weight:bold; color:var(--accent-emerald);">Output Akhir (Y):</span>
                <div id="w6-m8-sub" style="font-size:0.8rem; color:var(--text-muted);">Y = D₀</div>
              </div>
              <div id="w6-m8-out-y" style="font-size:2.2rem; font-weight:bold; color:var(--accent-emerald);">0</div>
            </div>
          </div>

        </div>
      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  if (typeof window !== "undefined") { if (window.w6UpdateM4Display) setTimeout(window.w6UpdateM4Display, 10); if (window.w6UpdateM8Display) setTimeout(window.w6UpdateM8Display, 10); }
  return _html_;
}

// State & Handlers for MUX 4:1
window.w6M4State = { d0:0, d1:0, d2:0, d3:0, s1:0, s0:0 };

window.w6ToggleM4 = function(pin) {
  if (window.w6M4State[pin] !== undefined) {
    window.w6M4State[pin] = window.w6M4State[pin] === 0 ? 1 : 0;
    window.w6UpdateM4Display();
  }
};

window.w6UpdateM4Display = function() {
  const s = window.w6M4State;
  ['d0','d1','d2','d3','s1','s0'].forEach(p => {
    const el = document.getElementById('w6-btn-m4-' + p);
    if (el) el.textContent = s[p];
  });

  const selectIdx = (s.s1 << 1) | s.s0; // 0, 1, 2, or 3
  const outVal = s['d' + selectIdx];

  const outY = document.getElementById('w6-m4-out-y');
  const selTxt = document.getElementById('w6-m4-selected-txt');
  const subTxt = document.getElementById('w6-m4-subtext');

  if (outY) {
    outY.textContent = outVal;
    outY.style.color = outVal === 1 ? 'var(--accent-cyan)' : 'var(--accent-rose)';
  }
  if (selTxt) {
    selTxt.textContent = 'Kanal Aktif: D' + selectIdx + ' (Index ' + s.s1 + s.s0 + '₂ = Desimal ' + selectIdx + ')';
  }
  if (subTxt) {
    subTxt.textContent = 'Mengikuti D' + selectIdx + ' = ' + outVal;
  }

  // Highlight active row
  [0,1,2,3].forEach(i => {
    const row = document.getElementById('w6-row-d' + i);
    if (row) {
      if (i === selectIdx) {
        row.style.background = 'rgba(0,210,255,0.12)';
        row.style.borderRadius = '6px';
      } else {
        row.style.background = 'transparent';
      }
    }
  });
};

// State & Handlers for MUX 8:1
window.w6M8State = { d0:0, d1:0, d2:0, d3:0, d4:0, d5:0, d6:0, d7:0, s2:0, s1:0, s0:0 };

window.w6ToggleM8 = function(pin) {
  if (window.w6M8State[pin] !== undefined) {
    window.w6M8State[pin] = window.w6M8State[pin] === 0 ? 1 : 0;
    window.w6UpdateM8Display();
  }
};

window.w6UpdateM8Display = function() {
  const s = window.w6M8State;
  for (let i = 0; i < 8; i++) {
    const el = document.getElementById('w6-btn-m8-d' + i);
    if (el) el.textContent = s['d' + i];
  }
  ['s2','s1','s0'].forEach(p => {
    const el = document.getElementById('w6-btn-m8-' + p);
    if (el) el.textContent = s[p];
  });

  const selectIdx = (s.s2 << 2) | (s.s1 << 1) | s.s0;
  const outVal = s['d' + selectIdx];

  const outY = document.getElementById('w6-m8-out-y');
  const info = document.getElementById('w6-m8-info');
  const sub = document.getElementById('w6-m8-sub');

  if (outY) {
    outY.textContent = outVal;
    outY.style.color = outVal === 1 ? 'var(--accent-cyan)' : 'var(--accent-rose)';
  }
  if (info) {
    info.textContent = 'Kombinasi S = ' + s.s2 + s.s1 + s.s0 + '₂ (Desimal ' + selectIdx + ') &rarr; Memilih D' + selectIdx;
  }
  if (sub) {
    sub.textContent = 'Y = D' + selectIdx + ' (Nilai: ' + outVal + ')';
  }

  // Highlight active channel box
  for (let i = 0; i < 8; i++) {
    const box = document.getElementById('w6-m8-box-d' + i);
    if (box) {
      if (i === selectIdx) {
        box.style.border = '1px solid var(--accent-violet)';
        box.style.background = 'rgba(124,58,237,0.15)';
      } else {
        box.style.border = '1px solid transparent';
        box.style.background = 'rgba(255,255,255,0.02)';
      }
    }
  }
};


/* ==========================================================================
   SECTION: w6_part8_mux_logic.js
   ========================================================================== */
// Part 8: Boolean Function Realization using Multiplexer
function renderWeek6MuxLogic(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        Sintesis Logika dengan MUX
      </div>
      <h1 class="content-title">Implementasi Fungsi Boolean Menggunakan Multiplexer</h1>
      <p class="content-subtitle">Metode perancangan sirkuit kombinasional tanpa gerbang logika melalui MUX Function Generator</p>
    </div>

    ${w6Alert('success', '<strong>Prinsip Universal Function Generator:</strong><br>' +
      'Multiplexer berukuran $2^n : 1$ dapat merealisasikan <strong>SEMUA</strong> fungsi Boolean dari $(n+1)$ variabel hanya dengan menambahkan satu inverter untuk variabel residu, atau fungsi $n$ variabel tanpa gerbang tambahan sama sekali! Ini membuktikan MUX adalah komponen logika universal yang sangat fleksibel.'
    )}

    ${w6Section('1. Metodologi Desain Fungsi Logika dengan MUX', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Jika kita memiliki fungsi Boolean dengan $k$ variabel:
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:1.25rem;">
          <li><strong>Pendekatan Langsung ($2^k : 1$ MUX):</strong> Hubungkan seluruh $k$ variabel ke select lines. Input data $D_i$ langsung dihubungkan permanen ke logika <code>1 (VCC)</code> atau <code>0 (GND)</code> sesuai nilai minterm pada tabel kebenaran.</li>
          <li><strong>Pendekatan Efisien ($2^{k-1} : 1$ MUX):</strong> Hubungkan $(k-1)$ variabel ke select lines. Variabel terakhir digunakan sebagai input data $D_i$, yang nilainya dapat berupa: <code>0</code>, <code>1</code>, variabel itu sendiri (misal $C$), atau komplemennya ($C'$).</li>
        </ul>
      </p>
    `)}

    ${w6Section('2. Studi Kasus Lengkap: F(A, B, C) = Σ m(1, 2, 4, 7)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Kita akan mengimplementasikan fungsi 3 variabel $F(A, B, C) = \\sum m(1, 2, 4, 7)$ menggunakan <strong>MUX 4:1</strong> tunggal dan satu gerbang inverter NOT.
      </p>

      <h4 style="color:var(--accent-cyan); margin:1.25rem 0 0.5rem 0;">Tahap 1: Penentuan Jalur Seleksi & Input Data</h4>
      <p style="color:var(--text-secondary); line-height:1.6;">
        Karena kita menggunakan MUX 4:1 (memiliki 2 select lines), kita memilih dua variabel berbobot tertinggi:
        <br>&bull; <strong>$S_1 = A$</strong>
        <br>&bull; <strong>$S_0 = B$</strong>
        <br>Variabel ketiga, yaitu <strong>$C$</strong>, akan dipetakan ke terminal input data $D_0, D_1, D_2, D_3$.
      </p>

      <h4 style="color:var(--accent-cyan); margin:1.25rem 0 0.5rem 0;">Tahap 2: Tabel Implementasi (Derivasi Nilai Input Data)</h4>
      <p style="color:var(--text-secondary); line-height:1.6;">
        Kita kelompokkan tabel kebenaran berdasarkan kombinasi $A$ dan $B$:
      </p>

      ${w6Table(['Minterm', 'A (S₁)', 'B (S₀)', 'C', 'F (Output)', 'Analisis Hubungan F terhadap C', 'Nilai Input Data Terpilih'], [
        ['m₀', '0', '0', '0', '<span style="color:var(--accent-rose); font-weight:bold;">0</span>', '<span rowspan="2" style="color:var(--accent-cyan);">Ketika C=0 &rarr; F=0<br>Ketika C=1 &rarr; F=1 &rArr; F = C</span>', '<strong style="color:var(--accent-cyan); font-size:1.1rem;">D₀ = C</strong>'],
        ['m₁', '0', '0', '1', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '', ''],
        ['m₂', '0', '1', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '<span rowspan="2" style="color:var(--accent-violet);">Ketika C=0 &rarr; F=1<br>Ketika C=1 &rarr; F=0 &rArr; F = C\\\'</span>', '<strong style="color:var(--accent-violet); font-size:1.1rem;">D₁ = C\\\'</strong>'],
        ['m₃', '0', '1', '1', '<span style="color:var(--accent-rose); font-weight:bold;">0</span>', '', ''],
        ['m₄', '1', '0', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '<span rowspan="2" style="color:var(--accent-violet);">Ketika C=0 &rarr; F=1<br>Ketika C=1 &rarr; F=0 &rArr; F = C\\\'</span>', '<strong style="color:var(--accent-violet); font-size:1.1rem;">D₂ = C\\\'</strong>'],
        ['m₅', '1', '0', '1', '<span style="color:var(--accent-rose); font-weight:bold;">0</span>', '', ''],
        ['m₆', '1', '1', '0', '<span style="color:var(--accent-rose); font-weight:bold;">0</span>', '<span rowspan="2" style="color:var(--accent-cyan);">Ketika C=0 &rarr; F=0<br>Ketika C=1 &rarr; F=1 &rArr; F = C</span>', '<strong style="color:var(--accent-cyan); font-size:1.1rem;">D₃ = C</strong>'],
        ['m₇', '1', '1', '1', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '', '']
      ])}

      <div class="card" style="margin:1.5rem 0; background:rgba(0,210,255,0.04); border-left:4px solid var(--accent-cyan);">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Kesimpulan Konfigurasi Pin MUX 4:1:</h4>
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:1.25rem;">
          <li>Terminal <strong>D₀</strong> dihubungkan ke sinyal <strong>C</strong></li>
          <li>Terminal <strong>D₁</strong> dihubungkan ke sinyal <strong>C'</strong> (melalui inverter)</li>
          <li>Terminal <strong>D₂</strong> dihubungkan ke sinyal <strong>C'</strong> (melalui inverter)</li>
          <li>Terminal <strong>D₃</strong> dihubungkan ke sinyal <strong>C</strong></li>
          <li>Terminal <strong>S₁</strong> dihubungkan ke variabel <strong>A</strong></li>
          <li>Terminal <strong>S₀</strong> dihubungkan ke variabel <strong>B</strong></li>
        </ul>
      </div>

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem; text-align:center;">Diagram Rangkaian Realisasi Fungsi F = Σ m(1, 2, 4, 7) dengan MUX 4:1</h4>
        ${w6SvgMuxBooleanImpl()}
      </div>

      <h4 style="color:var(--text-primary); margin:1.5rem 0 0.5rem 0;">Tahap 3: Verifikasi Matematis Aljabar</h4>
      ${w6Code(
`// Persamaan transfer MUX 4:1:
Y = S₁' S₀' D₀ + S₁' S₀ D₁ + S₁ S₀' D₂ + S₁ S₀ D₃

// Substitusikan konfigurasi yang telah kita rancang:
// S₁ = A, S₀ = B, D₀ = C, D₁ = C', D₂ = C', D₃ = C
Y = A' B' (C) + A' B (C') + A B' (C') + A B (C)
  = A'B'C + A'BC' + AB'C' + ABC
  = m₁ + m₂ + m₄ + m₇

// Terbukti 100% ekuivalen dengan F = Σ m(1, 2, 4, 7)!`
      )}
    `)}
  `;
  if (el) el.innerHTML = _html_;
  
  return _html_;
}


/* ==========================================================================
   SECTION: w6_part9_exercises.js
   ========================================================================== */
// Part 9: Practice Exercises (Latihan A, B, C)
function renderWeek6Exercises(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        Latihan Mandiri
      </div>
      <h1 class="content-title">Latihan Mandiri & Analisis Kasus</h1>
      <p class="content-subtitle">Uji pemahaman Anda melalui problem-solving bertahap gerbang universal dan multiplexer</p>
    </div>

    ${w6Alert('info', '<strong>Petunjuk Pengerjaan:</strong><br>' +
      'Kerjakan setiap soal secara mandiri terlebih dahulu di lembar coretan Anda sebelum membuka panel <em>"Lihat Pembahasan Lengkap"</em>. Latihan disusun secara gradual dari tingkat dasar hingga perancangan sistem.'
    )}

    ${w6Section('Latihan A: Gerbang Universal (NAND & NOR)', `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        
        <!-- Soal A1 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-cyan); margin:0;">Soal A.1: Output NAND dan NOR Multi-Input</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(0,210,255,0.1); color:var(--accent-cyan);">Dasar</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Diberikan tiga sinyal biner: $A = 1, B = 0, C = 1$.<br>
            1. Tentukan output gerbang NAND 3-input: $Y_1 = (A \\cdot B \\cdot C)'$.<br>
            2. Tentukan output gerbang NOR 3-input: $Y_2 = (A + B + C)'$.
          </p>
          ${w6Spoiler('Lihat Pembahasan Lengkap Soal A.1', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Pembahasan:</strong><br>
              1. Untuk NAND 3-input:<br>
              $A \\cdot B \\cdot C = 1 \\cdot 0 \\cdot 1 = 0$.<br>
              Output $Y_1 = (0)' = <strong>1</strong>$.<br>
              <em>Aturan:</em> Gerbang NAND bernilai 1 jika setidaknya ada satu input yang bernilai 0.<br><br>
              2. Untuk NOR 3-input:<br>
              $A + B + C = 1 + 0 + 1 = 1$.<br>
              Output $Y_2 = (1)' = <strong>0</strong>$.<br>
              <em>Aturan:</em> Gerbang NOR bernilai 0 jika setidaknya ada satu input yang bernilai 1.
            </div>
          `)}
        </div>

        <!-- Soal A2 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-cyan); margin:0;">Soal A.2: Realisasi Gerbang XOR Hanya dengan NAND</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(0,210,255,0.1); color:var(--accent-cyan);">Menengah</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Berapa jumlah minimum gerbang NAND 2-input yang diperlukan untuk membangun fungsi Exclusive-OR ($A \\oplus B = A'B + AB'$)? Bagaimana konfigurasi rangkaiannya?
          </p>
          ${w6Spoiler('Lihat Pembahasan Lengkap Soal A.2', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Pembahasan:</strong><br>
              Jumlah minimum yang dibutuhkan adalah <strong>4 gerbang NAND</strong>.<br>
              <strong>Langkah Perancangan:</strong><br>
              1. Gerbang 1 menerima input $A$ dan $B$ &rarr; Output $G_1 = (AB)'$.<br>
              2. Gerbang 2 menerima input $A$ dan $G_1$ &rarr; Output $G_2 = (A \\cdot (AB)')' = (A \\cdot (A' + B'))' = (AB')' = A' + B$.<br>
              3. Gerbang 3 menerima input $B$ dan $G_1$ &rarr; Output $G_3 = (B \\cdot (AB)')' = (B \\cdot (A' + B'))' = (A'B)' = A + B'$.<br>
              4. Gerbang 4 menerima output $G_2$ dan $G_3$ &rarr; Output $Y = (G_2 \\cdot G_3)' = (AB')'' + (A'B)'' = <strong>AB' + A'B = A \\oplus B</strong>.<br>
              Rangkaian 4 gerbang NAND ini adalah topologi klasik standar industri CMOS untuk XOR.
            </div>
          `)}
        </div>

      </div>
    `)}

    ${w6Section('Latihan B: Multilevel NAND dan NOR', `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        
        <!-- Soal B1 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-violet); margin:0;">Soal B.1: Konversi SOP ke NAND-Only</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(124,58,237,0.1); color:var(--accent-violet);">Sintesis Logika</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Diberikan fungsi: $F(A,B,C,D) = A'B + CD'$.<br>
            Tentukan persamaan aljabar NAND-only dan gambarkan tahapan perancangannya jika hanya tersedia gerbang NAND 2-input dan inverter.
          </p>
          ${w6Spoiler('Lihat Pembahasan Lengkap Soal B.1', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Langkah Solusi:</strong><br>
              1. Berikan negasi ganda pada fungsi SOP awal:<br>
              <code>F = [ (A'B + CD')' ]'</code><br>
              2. Terapkan Teorema De Morgan pada bagian dalam kurung:<br>
              <code>F = [ (A'B)' · (CD')' ]'</code><br>
              3. Kebutuhan Gerbang:<br>
              &bull; Inverter NAND 1: menghasilkan $A'$ dari $A$.<br>
              &bull; Inverter NAND 2: menghasilkan $D'$ dari $D$.<br>
              &bull; Gerbang NAND Level 1 (Pertama): menerima $A'$ dan $B$ &rarr; output $(A'B)'$.<br>
              &bull; Gerbang NAND Level 1 (Kedua): menerima $C$ dan $D'$ &rarr; output $(CD')'$.<br>
              &bull; Gerbang NAND Level 2: menggabungkan kedua output &rarr; $[ (A'B)' \\cdot (CD')' ]' = A'B + CD'$.
            </div>
          `)}
        </div>

        <!-- Soal B2 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-violet); margin:0;">Soal B.2: Analisis Kesalahan Inversi pada Rangkaian NOR</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(124,58,237,0.1); color:var(--accent-violet);">Analisis Kritis</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Seorang mahasiswa ingin mengimplementasikan fungsi $F = A \\cdot (B + C)$ menggunakan gerbang NOR-only. Mahasiswa tersebut langsung menghubungkan input $A$ dan output gerbang NOR $(B+C)'$ ke sebuah gerbang NOR kedua. Mengapa rangkaian tersebut <strong>SALAH</strong>? Bagaimana perbaikan aljabar yang benar?
          </p>
          ${w6Spoiler('Lihat Pembahasan Lengkap Soal B.2', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Analisis Kesalahan:</strong><br>
              Jika input $A$ langsung dihubungkan ke gerbang NOR kedua bersama $(B+C)'$, output rangkaian menjadi:<br>
              $Y_{salah} = [ A + (B+C)' ]' = A' \\cdot ((B+C)')' = <strong>A' \\cdot (B + C)</strong>$.<br>
              Perhatikan bahwa variabel $A$ secara tidak sengaja terinversi menjadi $A'$!<br><br>
              <strong>Perbaikan yang Benar:</strong><br>
              Fungsi $F = A \\cdot (B + C)$ memiliki literal tunggal $A$. Berikan negasi ganda:<br>
              $F = [ (A \\cdot (B+C))' ]' = [ A' + (B+C)' ]'$.<br>
              Oleh karena itu, sinyal $A$ harus <strong>diinversikan terlebih dahulu</strong> menjadi $A'$ (menggunakan inverter NOR) sebelum masuk ke gerbang NOR tingkat akhir.
            </div>
          `)}
        </div>

      </div>
    `)}

    ${w6Section('Latihan C: Multiplexer (MUX)', `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        
        <!-- Soal C1 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-amber); margin:0;">Soal C.1: Seleksi Jalur MUX 4:1 dan MUX 8:1</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(245,158,11,0.1); color:var(--accent-amber);">Dasar MUX</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            1. Pada MUX 4:1, jika $S_1 = 1$ dan $S_0 = 0$, kanal data manakah yang tersambung ke output $Y$?<br>
            2. Pada MUX 8:1, select lines diset bernilai biner $S_2 S_1 S_0 = 101_2$. Jika nilai input data adalah $D_5 = 1$ dan $D_4 = 0$, berapakah nilai output $Y$?
          </p>
          ${w6Spoiler('Lihat Pembahasan Lengkap Soal C.1', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Pembahasan:</strong><br>
              1. Nilai biner $S_1 S_0 = 10_2$ setara dengan desimal <strong>2</strong>. Maka kanal data yang tersambung ke output adalah <strong>D₂</strong>.<br>
              2. Nilai biner $S_2 S_1 S_0 = 101_2$ setara dengan desimal $1 \\cdot 4 + 0 \\cdot 2 + 1 \\cdot 1 = <strong>5</strong>$. Maka MUX memilih input $D_5$. Karena $D_5 = 1$, maka output $Y = <strong>1</strong>$.
            </div>
          `)}
        </div>

        <!-- Soal C2 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-amber); margin:0;">Soal C.2: Implementasi Fungsi Genap Menggunakan MUX 4:1</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(245,158,11,0.1); color:var(--accent-amber);">Perancangan</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Rancang fungsi detektor bilangan biner genap 3-bit $F(A,B,C)$ menggunakan MUX 4:1 di mana $S_1 = A$ dan $S_0 = B$. Suatu bilangan genap adalah bilangan yang nilai LSB-nya ($C$) bernilai 0 (yaitu minterm 0, 2, 4, 6). Tentukan nilai untuk $D_0, D_1, D_2, D_3$.
          </p>
          ${w6Spoiler('Lihat Pembahasan Lengkap Soal C.2', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Solusi:</strong><br>
              Bilangan biner genap bernilai 1 jika $C = 0$, dan bernilai 0 jika $C = 1$.<br>
              Mari tinjau setiap blok $AB$:<br>
              &bull; Untuk $AB = 00$: $m_0(C=0) \\to 1$, $m_1(C=1) \\to 0$. Hubungan: $F = C'$. Maka $D_0 = <strong>C'</strong>$.<br>
              &bull; Untuk $AB = 01$: $m_2(C=0) \\to 1$, $m_3(C=1) \\to 0$. Hubungan: $F = C'$. Maka $D_1 = <strong>C'</strong>$.<br>
              &bull; Untuk $AB = 10$: $m_4(C=0) \\to 1$, $m_5(C=1) \\to 0$. Hubungan: $F = C'$. Maka $D_2 = <strong>C'</strong>$.<br>
              &bull; Untuk $AB = 11$: $m_6(C=0) \\to 1$, $m_7(C=1) \\to 0$. Hubungan: $F = C'$. Maka $D_3 = <strong>C'</strong>$.<br>
              <strong>Hasil Akhir:</strong> Seluruh input $D_0 = D_1 = D_2 = D_3 = C'$! (Cukup hubungkan sinyal $C$ melalui satu gerbang inverter NOT ke seluruh pin input data MUX).
            </div>
          `)}
        </div>

      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  
  return _html_;
}


/* ==========================================================================
   SECTION: w6_part10_summary_quiz.js
   ========================================================================== */
// Part 10: Summary and Interactive Quiz
function renderWeek6Summary(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(6)">Minggu 6</a> / 
        Ringkasan & Kuis
      </div>
      <h1 class="content-title">Ringkasan Materi & Uji Kompetensi Minggu 6</h1>
      <p class="content-subtitle">Evaluasi pemahaman konsep Multilevel NAND, NOR, dan Multiplexer (MUX)</p>
    </div>

    ${w6Section('Rangkuman Poin-Poin Kunci Perkuliahan', `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
        <div class="card" style="border-left:4px solid var(--accent-cyan);">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Gerbang Universal (NAND & NOR)</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            NAND dan NOR disebut gerbang universal karena masing-masing dapat membentuk fungsi NOT, AND, OR, dan XOR secara mandiri. Fabrikasi CMOS secara fisik lebih menyukai gerbang universal ini karena lebih kompak dan hemat energi.
          </p>
        </div>

        <div class="card" style="border-left:4px solid var(--accent-violet);">
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">Multilevel SOP & POS</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Rangkaian NAND-only dirancang secara alami dari bentuk <strong>SOP</strong> (Sum of Products) menggunakan Involusi Ganda dan Teorema De Morgan. Sebaliknya, rangkaian NOR-only dirancang secara alami dari bentuk <strong>POS</strong> (Product of Sums).
          </p>
        </div>

        <div class="card" style="border-left:4px solid var(--accent-amber);">
          <h4 style="color:var(--accent-amber); margin-bottom:0.5rem;">Prinsip Data Selector (MUX)</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Multiplexer memilih salah satu dari $2^n$ jalur input data untuk disalurkan ke satu output berdasarkan kode biner pada $n$ select lines. MUX 2:1 memiliki 1 select line, MUX 4:1 memiliki 2 select lines, dan MUX 8:1 memiliki 3 select lines.
          </p>
        </div>

        <div class="card" style="border-left:4px solid var(--accent-emerald);">
          <h4 style="color:var(--accent-emerald); margin-bottom:0.5rem;">Sintesis Logika dengan MUX</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Selain menyalurkan data bus, MUX dapat berfungsi sebagai generator fungsi logika universal tanpa gerbang tambahan, di mana variabel fungsi dipetakan ke select lines dan minterm dipetakan ke input data.
          </p>
        </div>
      </div>
    `)}

    ${w6Section('Kuis Interaktif Mandiri Minggu 6', `
      <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">
        Pilihlah satu jawaban yang paling tepat pada setiap soal di bawah ini, lalu klik tombol <strong>"Periksa Jawaban"</strong>. Skor Anda akan dihitung secara otomatis.
      </p>

      <!-- Score Box -->
      <div id="w6-quiz-score-box" class="card" style="margin-bottom:1.5rem; background:rgba(0,210,255,0.05); border:1px solid rgba(0,210,255,0.3); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <span style="font-size:1.1rem; font-weight:bold; color:var(--text-primary);">Skor Kuis Anda: </span>
          <span id="w6-quiz-score-txt" style="font-size:1.4rem; font-weight:bold; color:var(--accent-cyan);">0 / 5</span>
        </div>
        <button onclick="w6ResetQuiz()" class="btn" style="background:rgba(255,255,255,0.1); border:1px solid var(--border-color);">
          🔄 Ulangi Kuis
        </button>
      </div>

      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        
        <!-- Question 1 -->
        <div class="card" id="w6-q1-card">
          <div style="font-weight:bold; color:var(--accent-cyan); margin-bottom:0.5rem;">Pertanyaan 1 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Manakah persamaan Boolean yang benar untuk merealisasikan gerbang OR dari dua input $A$ dan $B$ hanya menggunakan gerbang NAND berdasarkan Teorema De Morgan?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q1" value="A"> A. $Y = (A \cdot B)'$
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q1" value="B"> B. $Y = (A' \cdot B')'$
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q1" value="C"> C. $Y = ((A \cdot B)')'$
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q1" value="D"> D. $Y = (A + B)'$
            </label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w6CheckAnswer(1, 'B')" class="btn" style="background:var(--accent-cyan); color:#000; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w6-q1-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

        <!-- Question 2 -->
        <div class="card" id="w6-q2-card">
          <div style="font-weight:bold; color:var(--accent-violet); margin-bottom:0.5rem;">Pertanyaan 2 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Dalam merancang rangkaian logika kombinasional multilevel murni menggunakan gerbang <strong>NOR-only</strong>, bentuk ekspresi Boolean awal manakah yang paling efisien digunakan?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q2" value="A"> A. Sum of Products (SOP)
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q2" value="B"> B. Product of Sums (POS)
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q2" value="C"> C. Karnaugh Map 2-variabel
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q2" value="D"> D. Bentuk Komplemen Diminished
            </label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w6CheckAnswer(2, 'B')" class="btn" style="background:var(--accent-violet); color:#fff; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w6-q2-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

        <!-- Question 3 -->
        <div class="card" id="w6-q3-card">
          <div style="font-weight:bold; color:var(--accent-amber); margin-bottom:0.5rem;">Pertanyaan 3 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Sebuah multiplexer memiliki 8 jalur input data ($D_0 - D_7$). Berapakah jumlah jalur seleksi (select lines) yang dibutuhkan oleh MUX tersebut?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q3" value="A"> A. 1 jalur seleksi
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q3" value="B"> B. 2 jalur seleksi
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q3" value="C"> C. 3 jalur seleksi
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q3" value="D"> D. 4 jalur seleksi
            </label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w6CheckAnswer(3, 'C')" class="btn" style="background:var(--accent-amber); color:#000; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w6-q3-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

        <!-- Question 4 -->
        <div class="card" id="w6-q4-card">
          <div style="font-weight:bold; color:var(--accent-emerald); margin-bottom:0.5rem;">Pertanyaan 4 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Pada MUX 4:1 dengan select lines $S_1$ (MSB) dan $S_0$ (LSB), jika diberikan input seleksi $S_1 = 1$ dan $S_0 = 1$, bagaimanakah fungsi transfer output $Y$?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q4" value="A"> A. $Y = D_0$
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q4" value="B"> B. $Y = D_1$
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q4" value="C"> C. $Y = D_2$
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q4" value="D"> D. $Y = D_3$
            </label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w6CheckAnswer(4, 'D')" class="btn" style="background:var(--accent-emerald); color:#fff; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w6-q4-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

        <!-- Question 5 -->
        <div class="card" id="w6-q5-card">
          <div style="font-weight:bold; color:var(--accent-rose); margin-bottom:0.5rem;">Pertanyaan 5 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Ketika mengimplementasikan fungsi Boolean $F = A + B \cdot C$ menjadi gerbang NAND-only, perlakuan apa yang WAJIB diberikan pada literal tunggal $A$?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q5" value="A"> A. Dihubungkan langsung ke gerbang NAND tingkat akhir tanpa pengubahan.
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q5" value="B"> B. Diinversikan terlebih dahulu menjadi $A'$ menggunakan inverter NAND sebelum masuk ke NAND tingkat akhir.
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q5" value="C"> C. Dikalikan dengan logika 0 menggunakan gerbang AND.
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="w6_q5" value="D"> D. Di-OR-kan dengan konstanta logika 1.
            </label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w6CheckAnswer(5, 'B')" class="btn" style="background:var(--accent-rose); color:#fff; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w6-q5-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

      </div>
    `)}

    ${w6Section('Pertanyaan Refleksi & Pemikiran Kritis (Essay)', `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        
        <div class="card">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Essay 1: Komparasi Propagasi Tunda Multilevel vs Two-Level</h4>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Mengapa para desainer VLSI sering kali memilih rangkaian logika multilevel yang memiliki delay propagasi lebih panjang daripada rangkaian 2-level AND-OR murni? Jelaskan ditinjau dari faktor <em>gate fan-in</em> dan area silikon!
          </p>
          ${w6Spoiler('Lihat Penjelasan Akademik Essay 1', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Jawaban:</strong><br>
              Meskipun rangkaian 2-level secara teoritis memiliki tunda propagasi minimum (hanya melewati 2 gerbang), dalam praktiknya rangkaian 2-level sering membutuhkan gerbang dengan <em>fan-in</em> (jumlah pin input) yang sangat besar (misalnya gerbang AND 8-input atau 16-input).<br>
              Pada fabrikasi silikon CMOS, membuat gerbang dengan fan-in $> 4$ menyebabkan resistansi seri transistor NMOS/PMOS membengkak drastis sehingga waktu transisi (rise/fall time) menjadi sangat lambat dan sinyal terdistorsi. 
              Dengan merancang secara <strong>multilevel</strong>, fungsi besar tersebut dipecah menjadi gerbang-gerbang kecil dengan fan-in rendah (2 atau 3 input). Hasilnya, total area chip menjadi jauh lebih ringkas, konsumsi daya lebih rendah, dan kecepatan operasional aktual justru lebih stabil dan tinggi.
            </div>
          `)}
        </div>

        <div class="card">
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">Essay 2: Multiplexer sebagai Blok Pembangun Arsitektur Komputer</h4>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Jelaskan peran sentral Multiplexer dalam unit datapath prosesor modern (seperti RISC-V atau MIPS)!
          </p>
          ${w6Spoiler('Lihat Penjelasan Akademik Essay 2', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Jawaban:</strong><br>
              Dalam CPU datapath, Multiplexer berperan sebagai <strong>pengatur lalu lintas bus data</strong> utama:<br>
              1. <strong>ALU Source MUX:</strong> Memilih apakah input kedua bagi ALU berasal dari isi register (untuk instruksi R-type seperti ADD) atau dari nilai konstanta langsung/immediate (untuk instruksi I-type seperti ADDI).<br>
              2. <strong>Program Counter (PC) MUX:</strong> Menentukan alamat instruksi berikutnya, apakah urut berurutan ($PC + 4$) atau melompat ke alamat target percabangan (Branch/Jump target).<br>
              3. <strong>Write-Back MUX:</strong> Menentukan data apa yang disimpan kembali ke Register File, apakah hasil komputasi ALU, data yang baru dibaca dari RAM (Load Word), atau alamat link (JAL).
            </div>
          `)}
        </div>

      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  if (typeof window !== "undefined" && window.w6UpdateQuizScore) setTimeout(window.w6UpdateQuizScore, 10);
  return _html_;
}

// Interactive Quiz Logic
window.w6UserAnswers = {};
window.w6QuizResults = {};

window.w6CheckAnswer = function(qNum, correctVal) {
  const radios = document.getElementsByName('w6_q' + qNum);
  let selected = null;
  for (let r of radios) {
    if (r.checked) {
      selected = r.value;
      break;
    }
  }

  const fb = document.getElementById('w6-q' + qNum + '-feedback');
  if (!selected) {
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = 'rgba(245,158,11,0.15)';
      fb.style.border = '1px solid var(--accent-amber)';
      fb.style.color = 'var(--accent-amber)';
      fb.innerHTML = '⚠️ Silakan pilih salah satu opsi jawaban terlebih dahulu!';
    }
    return;
  }

  const isCorrect = (selected === correctVal);
  window.w6QuizResults[qNum] = isCorrect;

  if (fb) {
    fb.style.display = 'block';
    if (isCorrect) {
      fb.style.background = 'rgba(16,185,129,0.15)';
      fb.style.border = '1px solid var(--accent-emerald)';
      fb.style.color = 'var(--accent-emerald)';
      fb.innerHTML = '<strong>&check; Benar Sekali!</strong> Jawaban Anda tepat. ' + w6GetExplanation(qNum);
    } else {
      fb.style.background = 'rgba(244,63,94,0.15)';
      fb.style.border = '1px solid var(--accent-rose)';
      fb.style.color = 'var(--accent-rose)';
      fb.innerHTML = '<strong>&cross; Belum Tepat.</strong> Jawaban yang benar adalah <strong>' + correctVal + '</strong>. ' + w6GetExplanation(qNum);
    }
  }

  w6UpdateQuizScore();
};

window.w6GetExplanation = function(qNum) {
  switch(qNum) {
    case 1: return "Berdasarkan De Morgan: A + B = ((A + B)')' = (A' · B')'. Menggunakan 3 gerbang NAND (2 sebagai inverter A & B, 1 sebagai penggabung).";
    case 2: return "Bentuk POS (Product of Sums) adalah perkalian atas penjumlahan (OR-AND), yang secara langsung cocok dengan struktur tingkat NOR-NOR.";
    case 3: return "Jumlah select lines n dihitung dari formula 2ⁿ = N. Karena N = 8 input data, maka 2³ = 8 sehingga n = 3 select lines (S₂, S₁, S₀).";
    case 4: return "Kombinasi biner S₁S₀ = 11₂ merepresentasikan indeks desimal 3, sehingga output MUX mengambil jalur input D₃.";
    case 5: return "Karena F = [A' · (B·C)']', sinyal A harus melewati satu gerbang inverter NAND menjadi A' agar saat dinegasikan oleh NAND tingkat akhir nilainya kembali menjadi A.";
    default: return "";
  }
};

window.w6UpdateQuizScore = function() {
  let score = 0;
  for (let k in window.w6QuizResults) {
    if (window.w6QuizResults[k] === true) score++;
  }
  const scoreTxt = document.getElementById('w6-quiz-score-txt');
  if (scoreTxt) {
    scoreTxt.textContent = score + ' / 5';
    scoreTxt.style.color = score >= 4 ? 'var(--accent-emerald)' : (score >= 2 ? 'var(--accent-amber)' : 'var(--accent-rose)');
  }
};

window.w6ResetQuiz = function() {
  window.w6QuizResults = {};
  for (let i = 1; i <= 5; i++) {
    const radios = document.getElementsByName('w6_q' + i);
    for (let r of radios) r.checked = false;
    const fb = document.getElementById('w6-q' + i + '-feedback');
    if (fb) fb.style.display = 'none';
  }
  w6UpdateQuizScore();
};



/* ───── WINDOW EXPORTS FOR TOPIC RENDERING ───── */
if (typeof window !== 'undefined') {
  window.renderWeek6Intro = renderWeek6Intro;
  window.renderWeek6UniversalGates = renderWeek6UniversalGates;
  window.renderWeek6MultilevelNAND = renderWeek6MultilevelNAND;
  window.renderWeek6MultilevelNOR = renderWeek6MultilevelNOR;
  window.renderWeek6Comparison = renderWeek6Comparison;
  window.renderWeek6MuxBasics = renderWeek6MuxBasics;
  window.renderWeek6MuxAdvanced = renderWeek6MuxAdvanced;
  window.renderWeek6MuxLogic = renderWeek6MuxLogic;
  window.renderWeek6Exercises = renderWeek6Exercises;
  window.renderWeek6Summary = renderWeek6Summary;
}

/**
 * week3.js — SisDik Learn: Pertemuan 3
 * ----------------------------------------
 * Materi: Aljabar Boolean
 * Berisi seluruh render function untuk topik-topik Minggu 3.
 */

/* ───── HELPERS (w3 namespace) ───── */
function w3Section(title, accentVar, iconSvg, bodyHTML) {
  return `
    <div class="info-card" style="margin-bottom:28px;border-left:3px solid var(${accentVar})">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(${accentVar}-dim)">${iconSvg}</span>
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:var(${accentVar})">${title}</h3>
      </div>
      <div>${bodyHTML}</div>
    </div>`;
}

function w3Code(lines, label) {
  const inner = Array.isArray(lines) ? lines.join('\n') : lines;
  return `<div style="margin:12px 0">${label ? `<p style="font-size:0.78rem;color:var(--text-faint);font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">${label}</p>` : ''}
    <pre style="font-family:var(--font-mono);font-size:0.88rem;line-height:1.7;background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px 18px;overflow-x:auto;margin:0"><code>${inner}</code></pre></div>`;
}

function w3Step(n, text) {
  return `<div style="display:flex;align-items:flex-start;gap:12px;margin:10px 0">
    <span style="min-width:26px;height:26px;border-radius:50%;background:var(--accent-cyan-dim);border:1.5px solid var(--accent-cyan);color:var(--accent-cyan);font-size:0.78rem;font-weight:700;display:inline-flex;align-items:center;justify-content:center;margin-top:1px">${n}</span>
    <span style="font-size:0.95rem;line-height:1.6">${text}</span></div>`;
}

function w3Alert(type, text) {
  const map = { info:['var(--accent-cyan)','💡'], warning:['var(--accent-amber)','⚠️'], success:['var(--success)','✅'], danger:['var(--danger)','🚨'] };
  const [color, icon] = map[type] || map.info;
  return `<div style="display:flex;gap:10px;align-items:flex-start;background:var(--bg-inset);border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:12px 14px;margin:14px 0;font-size:0.9rem;line-height:1.6">
    <span>${icon}</span><span>${text}</span></div>`;
}

function w3Table(headers, rows) {
  return `<div style="overflow-x:auto;margin:16px 0">
    <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
      <thead><tr style="border-bottom:2px solid var(--line)">
        ${headers.map(h => `<th style="padding:10px 14px;text-align:center;color:var(--text-faint);font-weight:600;font-size:0.8rem;letter-spacing:.04em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${rows.map((r, i) => `<tr style="border-bottom:1px solid var(--line);${i % 2 === 0 ? 'background:var(--bg-inset)' : ''}">
        ${r.map(c => `<td style="padding:10px 14px;text-align:center;font-family:var(--font-mono);font-size:0.88rem">${c}</td>`).join('')}
      </tr>`).join('')}</tbody>
    </table></div>`;
}

function w3Spoiler(buttonLabel, contentHTML) {
  const uid = 'w3sp_' + Math.random().toString(36).substr(2, 9);
  return `<div style="margin:16px 0">
    <button type="button" onclick="(function(){var c=document.getElementById('${uid}');c.hidden=!c.hidden;this.querySelector('.sp-arrow').textContent=c.hidden?'▶':'▼'}).call(this)" style="display:flex;align-items:center;gap:8px;background:var(--accent-violet-dim);border:1px solid var(--accent-violet);color:var(--accent-violet);padding:10px 16px;border-radius:10px;cursor:pointer;font-size:0.88rem;font-weight:600;width:100%;text-align:left">
      <span class="sp-arrow">▶</span> ${buttonLabel}
    </button>
    <div id="${uid}" hidden style="background:var(--bg-inset);border:1px solid var(--line);border-radius:0 0 10px 10px;padding:16px 18px;margin-top:-2px">
      ${contentHTML}
    </div>
  </div>`;
}

/* ─── SVG Gate Drawing Helpers ─── */
function w3GateSVG(type) {
  const w = 180, h = 100;
  const styles = 'stroke="var(--accent-cyan)" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const textStyle = 'fill="var(--text)" font-family="var(--font-mono)" font-size="11" text-anchor="middle"';
  const labelStyle = 'fill="var(--accent-cyan)" font-family="var(--font-ui)" font-size="13" font-weight="700" text-anchor="middle"';

  const gates = {
    AND: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin:0 auto">
      <line x1="10" y1="35" x2="50" y2="35" ${styles}/>
      <line x1="10" y1="65" x2="50" y2="65" ${styles}/>
      <line x1="140" y1="50" x2="170" y2="50" ${styles}/>
      <path d="M50 25 L80 25 Q120 25 120 50 Q120 75 80 75 L50 75 Z" ${styles}/>
      <text x="10" y="32" ${textStyle} text-anchor="start" font-size="10">A</text>
      <text x="10" y="62" ${textStyle} text-anchor="start" font-size="10">B</text>
      <text x="170" y="47" ${textStyle} text-anchor="end" font-size="10">F</text>
      <text x="85" y="90" ${labelStyle}>AND</text>
    </svg>`,
    OR: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin:0 auto">
      <line x1="10" y1="35" x2="55" y2="35" ${styles}/>
      <line x1="10" y1="65" x2="55" y2="65" ${styles}/>
      <line x1="135" y1="50" x2="170" y2="50" ${styles}/>
      <path d="M45 25 Q60 50 45 75 Q90 75 135 50 Q90 25 45 25 Z" ${styles}/>
      <text x="10" y="32" ${textStyle} text-anchor="start" font-size="10">A</text>
      <text x="10" y="62" ${textStyle} text-anchor="start" font-size="10">B</text>
      <text x="170" y="47" ${textStyle} text-anchor="end" font-size="10">F</text>
      <text x="90" y="90" ${labelStyle}>OR</text>
    </svg>`,
    NOT: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin:0 auto">
      <line x1="10" y1="50" x2="50" y2="50" ${styles}/>
      <line x1="130" y1="50" x2="170" y2="50" ${styles}/>
      <polygon points="50,30 120,50 50,70" ${styles}/>
      <circle cx="125" cy="50" r="5" ${styles}/>
      <text x="10" y="47" ${textStyle} text-anchor="start" font-size="10">A</text>
      <text x="170" y="47" ${textStyle} text-anchor="end" font-size="10">F</text>
      <text x="90" y="90" ${labelStyle}>NOT</text>
    </svg>`,
    NAND: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin:0 auto">
      <line x1="10" y1="35" x2="50" y2="35" ${styles}/>
      <line x1="10" y1="65" x2="50" y2="65" ${styles}/>
      <line x1="145" y1="50" x2="170" y2="50" ${styles}/>
      <path d="M50 25 L80 25 Q120 25 120 50 Q120 75 80 75 L50 75 Z" ${styles}/>
      <circle cx="127" cy="50" r="5" ${styles}/>
      <text x="10" y="32" ${textStyle} text-anchor="start" font-size="10">A</text>
      <text x="10" y="62" ${textStyle} text-anchor="start" font-size="10">B</text>
      <text x="170" y="47" ${textStyle} text-anchor="end" font-size="10">F</text>
      <text x="85" y="90" ${labelStyle}>NAND</text>
    </svg>`,
    NOR: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin:0 auto">
      <line x1="10" y1="35" x2="55" y2="35" ${styles}/>
      <line x1="10" y1="65" x2="55" y2="65" ${styles}/>
      <line x1="145" y1="50" x2="170" y2="50" ${styles}/>
      <path d="M45 25 Q60 50 45 75 Q90 75 135 50 Q90 25 45 25 Z" ${styles}/>
      <circle cx="140" cy="50" r="5" ${styles}/>
      <text x="10" y="32" ${textStyle} text-anchor="start" font-size="10">A</text>
      <text x="10" y="62" ${textStyle} text-anchor="start" font-size="10">B</text>
      <text x="170" y="47" ${textStyle} text-anchor="end" font-size="10">F</text>
      <text x="90" y="90" ${labelStyle}>NOR</text>
    </svg>`,
    XOR: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin:0 auto">
      <line x1="10" y1="35" x2="55" y2="35" ${styles}/>
      <line x1="10" y1="65" x2="55" y2="65" ${styles}/>
      <line x1="135" y1="50" x2="170" y2="50" ${styles}/>
      <path d="M45 25 Q60 50 45 75 Q90 75 135 50 Q90 25 45 25 Z" ${styles}/>
      <path d="M40 25 Q55 50 40 75" ${styles} fill="none"/>
      <text x="10" y="32" ${textStyle} text-anchor="start" font-size="10">A</text>
      <text x="10" y="62" ${textStyle} text-anchor="start" font-size="10">B</text>
      <text x="170" y="47" ${textStyle} text-anchor="end" font-size="10">F</text>
      <text x="90" y="90" ${labelStyle}>XOR</text>
    </svg>`,
    XNOR: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin:0 auto">
      <line x1="10" y1="35" x2="55" y2="35" ${styles}/>
      <line x1="10" y1="65" x2="55" y2="65" ${styles}/>
      <line x1="145" y1="50" x2="170" y2="50" ${styles}/>
      <path d="M45 25 Q60 50 45 75 Q90 75 135 50 Q90 25 45 25 Z" ${styles}/>
      <path d="M40 25 Q55 50 40 75" ${styles} fill="none"/>
      <circle cx="140" cy="50" r="5" ${styles}/>
      <text x="10" y="32" ${textStyle} text-anchor="start" font-size="10">A</text>
      <text x="10" y="62" ${textStyle} text-anchor="start" font-size="10">B</text>
      <text x="170" y="47" ${textStyle} text-anchor="end" font-size="10">F</text>
      <text x="90" y="90" ${labelStyle}>XNOR</text>
    </svg>`
  };
  return gates[type] || '';
}


/* ══════════════════════════════════════════════════════
   TOPIK 1: PENDAHULUAN ALJABAR BOOLEAN
   ══════════════════════════════════════════════════════ */
function renderWeek3Intro(el) {
  el.innerHTML = `
    <!-- Hero Banner -->
    <div style="background:linear-gradient(135deg,var(--accent-amber-dim) 0%,var(--accent-cyan-dim) 100%);border:1px solid var(--line);border-radius:16px;padding:28px 32px;margin-bottom:32px;position:relative;overflow:hidden">
      <div style="position:absolute;top:-20px;right:-20px;width:120px;height:120px;border-radius:50%;background:var(--accent-amber-glow);filter:blur(40px)"></div>
      <div style="position:relative">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <span style="background:var(--accent-amber-dim);color:var(--accent-amber);border:1px solid var(--accent-amber);padding:4px 12px;border-radius:99px;font-size:0.75rem;font-weight:700;letter-spacing:.06em">PERTEMUAN 3</span>
          <span style="font-size:0.78rem;color:var(--text-faint)">Sistem Digital</span>
        </div>
        <h2 style="margin:0 0 10px;font-size:1.5rem;font-weight:800">Aljabar Boolean</h2>
        <p style="margin:0;color:var(--text-secondary);font-size:0.95rem;max-width:560px;line-height:1.6">
          Pelajari dasar-dasar Aljabar Boolean sebagai fondasi analisis dan perancangan rangkaian logika digital. Pahami operator, hukum-hukum, dan cara menyederhanakan fungsi Boolean.
        </p>
      </div>
    </div>

    <!-- Identitas Mata Kuliah -->
    ${w3Section('Identitas Mata Kuliah', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>',
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 4px;font-size:0.75rem;color:var(--text-faint);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Mata Kuliah</p>
          <p style="margin:0;font-weight:700">Sistem Digital</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 4px;font-size:0.75rem;color:var(--text-faint);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Pertemuan</p>
          <p style="margin:0;font-weight:700">3 dari 14</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 4px;font-size:0.75rem;color:var(--text-faint);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Topik</p>
          <p style="margin:0;font-weight:700">Aljabar Boolean</p>
        </div>
      </div>`
    )}

    <!-- Tujuan Pembelajaran -->
    ${w3Section('Tujuan Pembelajaran (CPMK-3)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <p style="margin:0;font-size:0.95rem;line-height:1.6;font-weight:500">Mahasiswa mampu <strong>menjelaskan</strong> dan <strong>memodelkan</strong> konsep dasar Aljabar Boolean untuk menganalisis, menyederhanakan, dan merancang rangkaian logika kombinasi sederhana menggunakan hukum Boolean.</p>
      </div>
      <p style="margin:0 0 12px;font-size:0.88rem;font-weight:600;color:var(--text-secondary)">Setelah mengikuti pertemuan ini, mahasiswa mampu:</p>
      ${[
        'Menjelaskan pengertian dan fungsi Aljabar Boolean dalam Sistem Digital',
        'Mengidentifikasi operator dasar AND, OR, dan NOT beserta gerbang logikanya',
        'Menerapkan hukum dan teorema Aljabar Boolean untuk menyederhanakan ekspresi',
        'Membedakan bentuk standar SOP (Sum of Products) dan POS (Product of Sums)',
        'Menyusun tabel kebenaran dari fungsi Boolean dan melakukan konversi SOP ↔ POS',
        'Merancang rangkaian logika kombinasi dari persamaan Boolean'
      ].map((t, i) => w3Step(i + 1, t)).join('')}`
    )}

    <!-- Pengertian Aljabar Boolean -->
    ${w3Section('Pengertian Aljabar Boolean', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        <strong>Aljabar Boolean</strong> adalah sistem aljabar yang dikembangkan oleh matematikawan <strong>George Boole</strong> pada tahun 1854. Dalam Sistem Digital, Aljabar Boolean digunakan untuk menganalisis dan merancang <em>rangkaian logika kombinasi</em> (combinational logic circuits).
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 8px;font-size:0.78rem;font-weight:700;color:var(--accent-amber);letter-spacing:.05em">VARIABEL BOOLEAN</p>
          <p style="margin:0;font-size:0.9rem;line-height:1.6">Variabel Boolean hanya memiliki <strong>dua nilai</strong>: <code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;font-family:var(--font-mono)">0</code> (FALSE) dan <code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;font-family:var(--font-mono)">1</code> (TRUE).</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 8px;font-size:0.78rem;font-weight:700;color:var(--accent-cyan);letter-spacing:.05em">FUNGSI BOOLEAN</p>
          <p style="margin:0;font-size:0.9rem;line-height:1.6">Digunakan untuk memodelkan hubungan input dan output pada rangkaian logika digital.</p>
        </div>
      </div>

      <h4 style="margin:18px 0 12px;font-size:0.95rem;font-weight:700;color:var(--accent-amber)">Operator Dasar Boolean</h4>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px">
        ${[
          ['AND (Konjungsi)', '·', 'A · B', 'Output 1 hanya jika <strong>semua</strong> input bernilai 1', '--accent-cyan'],
          ['OR (Disjungsi)', '+', 'A + B', 'Output 1 jika <strong>salah satu</strong> atau lebih input bernilai 1', '--accent-violet'],
          ["NOT (Komplemen)", "'", "A'", 'Membalik nilai input: 0 → 1, 1 → 0', '--accent-rose']
        ].map(([name, sym, expr, desc, col]) => `
          <div style="background:var(--bg-inset);border:1px solid var(${col});border-radius:10px;padding:14px 16px;position:relative;overflow:hidden">
            <div style="position:absolute;top:-8px;right:-8px;width:40px;height:40px;border-radius:50%;background:var(${col}-glow);filter:blur(14px)"></div>
            <p style="margin:0 0 4px;font-size:0.8rem;font-weight:700;color:var(${col})">${name}</p>
            <p style="margin:0 0 6px;font-family:var(--font-mono);font-size:1.1rem;font-weight:800;color:var(${col})">${expr}</p>
            <p style="margin:0;font-size:0.82rem;color:var(--text-faint);line-height:1.5">${desc}</p>
          </div>
        `).join('')}
      </div>

      ${w3Alert('info', "<strong>Prioritas operasi Boolean</strong>: Tanda kurung <code>()</code> terlebih dahulu → kemudian <strong>NOT</strong> → <strong>AND</strong> → <strong>OR</strong>. Ini berbeda dari operasi aritmetika biasa.")}

      <h4 style="margin:18px 0 12px;font-size:0.95rem;font-weight:700;color:var(--accent-amber)">Representasi Operasi Boolean</h4>
      ${w3Code([
        "Operasi AND :  F = A · B     atau  F = AB",
        "Operasi OR  :  F = A + B",
        "Operasi NOT :  F = A'        atau  F = Ā",
        "",
        "Contoh ekspresi: F = A'B + AB' + A·B",
        "Urutan evaluasi: NOT → AND → OR",
        "  1. Hitung komplemen: A', B'",
        "  2. Hitung AND: A'·B, A·B', A·B",
        "  3. Hitung OR: A'B + AB' + AB"
      ], 'Notasi & Contoh')}

      ${w3Alert('warning', "Operasi Boolean <strong>berbeda</strong> dari operasi aritmetika biasa. Misalnya: 1 + 1 = 1 (dalam Boolean OR), bukan 2. Jangan tertukar!")}
    `
    )}
  `;
}


/* ══════════════════════════════════════════════════════
   TOPIK 2: GERBANG LOGIKA
   ══════════════════════════════════════════════════════ */
function renderWeek3Gates(el) {
  el.innerHTML = `
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700">Gerbang Logika Dasar & Turunan</h3>
      <p style="margin:0;font-size:0.9rem;color:var(--text-secondary);line-height:1.6">Gerbang logika adalah rangkaian elektronik yang mengimplementasikan operasi Boolean. Setiap gerbang memiliki simbol, persamaan, dan tabel kebenaran yang unik.</p>
    </div>

    <!-- AND Gate -->
    ${w3Section('Gerbang AND', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
        <div>
          <p style="margin:0 0 8px;font-size:0.9rem;line-height:1.6"><strong>Fungsi:</strong> Menghasilkan output <code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;font-family:var(--font-mono)">1</code> hanya jika <strong>semua input bernilai 1</strong>.</p>
          <p style="margin:0 0 12px;font-size:0.9rem"><strong>Persamaan:</strong> <code style="background:var(--bg-card);padding:3px 8px;border-radius:6px;font-family:var(--font-mono);font-size:0.95rem;color:var(--accent-cyan)">F = A · B</code></p>
          ${w3Table(['A', 'B', 'F = A·B'], [['0','0','0'],['0','1','0'],['1','0','0'],['1','1','1']])}
          <p style="margin:8px 0 0;font-size:0.85rem;color:var(--text-faint)"><strong>Penerapan:</strong> Digunakan pada sistem keamanan dimana dua kunci harus diaktifkan bersamaan agar pintu terbuka.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;display:flex;align-items:center;justify-content:center">
          ${w3GateSVG('AND')}
        </div>
      </div>`
    )}

    <!-- OR Gate -->
    ${w3Section('Gerbang OR', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
        <div>
          <p style="margin:0 0 8px;font-size:0.9rem;line-height:1.6"><strong>Fungsi:</strong> Menghasilkan output <code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;font-family:var(--font-mono)">1</code> jika <strong>salah satu atau lebih input bernilai 1</strong>.</p>
          <p style="margin:0 0 12px;font-size:0.9rem"><strong>Persamaan:</strong> <code style="background:var(--bg-card);padding:3px 8px;border-radius:6px;font-family:var(--font-mono);font-size:0.95rem;color:var(--accent-violet)">F = A + B</code></p>
          ${w3Table(['A', 'B', 'F = A+B'], [['0','0','0'],['0','1','1'],['1','0','1'],['1','1','1']])}
          <p style="margin:8px 0 0;font-size:0.85rem;color:var(--text-faint)"><strong>Penerapan:</strong> Sistem alarm yang berbunyi jika salah satu sensor mendeteksi gerakan.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;display:flex;align-items:center;justify-content:center">
          ${w3GateSVG('OR')}
        </div>
      </div>`
    )}

    <!-- NOT Gate -->
    ${w3Section('Gerbang NOT (Inverter)', '--accent-rose',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
        <div>
          <p style="margin:0 0 8px;font-size:0.9rem;line-height:1.6"><strong>Fungsi:</strong> <strong>Membalikkan</strong> (menginversi) nilai input. Jika input 0 maka output 1, dan sebaliknya.</p>
          <p style="margin:0 0 12px;font-size:0.9rem"><strong>Persamaan:</strong> <code style="background:var(--bg-card);padding:3px 8px;border-radius:6px;font-family:var(--font-mono);font-size:0.95rem;color:var(--accent-rose)">F = A'</code></p>
          ${w3Table(['A', "F = A'"], [['0','1'],['1','0']])}
          <p style="margin:8px 0 0;font-size:0.85rem;color:var(--text-faint)"><strong>Penerapan:</strong> Saklar lampu inversi — lampu menyala ketika saklar off dan sebaliknya.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;display:flex;align-items:center;justify-content:center">
          ${w3GateSVG('NOT')}
        </div>
      </div>`
    )}

    <div style="border-top:2px solid var(--line);margin:32px 0;padding-top:24px">
      <h3 style="margin:0 0 16px;font-size:1.05rem;font-weight:700;color:var(--accent-amber)">🔧 Gerbang Logika Turunan</h3>
    </div>

    <!-- NAND Gate -->
    ${w3Section('Gerbang NAND', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
        <div>
          <p style="margin:0 0 8px;font-size:0.9rem;line-height:1.6"><strong>Fungsi:</strong> Kebalikan dari AND. Output <code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;font-family:var(--font-mono)">0</code> hanya jika <strong>semua input bernilai 1</strong>.</p>
          <p style="margin:0 0 12px;font-size:0.9rem"><strong>Persamaan:</strong> <code style="background:var(--bg-card);padding:3px 8px;border-radius:6px;font-family:var(--font-mono);font-size:0.95rem;color:var(--accent-amber)">F = (A · B)'</code></p>
          ${w3Table(['A', 'B', "F = (A·B)'"], [['0','0','1'],['0','1','1'],['1','0','1'],['1','1','0']])}
          ${w3Alert('info', 'NAND disebut <strong>universal gate</strong> karena dapat digunakan untuk membangun gerbang logika lainnya.')}
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;display:flex;align-items:center;justify-content:center">
          ${w3GateSVG('NAND')}
        </div>
      </div>`
    )}

    <!-- NOR Gate -->
    ${w3Section('Gerbang NOR', '--accent-rose',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
        <div>
          <p style="margin:0 0 8px;font-size:0.9rem;line-height:1.6"><strong>Fungsi:</strong> Kebalikan dari OR. Output <code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;font-family:var(--font-mono)">1</code> hanya jika <strong>semua input bernilai 0</strong>.</p>
          <p style="margin:0 0 12px;font-size:0.9rem"><strong>Persamaan:</strong> <code style="background:var(--bg-card);padding:3px 8px;border-radius:6px;font-family:var(--font-mono);font-size:0.95rem;color:var(--accent-rose)">F = (A + B)'</code></p>
          ${w3Table(['A', 'B', "F = (A+B)'"], [['0','0','1'],['0','1','0'],['1','0','0'],['1','1','0']])}
          ${w3Alert('info', 'NOR juga merupakan <strong>universal gate</strong>, sama seperti NAND.')}
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;display:flex;align-items:center;justify-content:center">
          ${w3GateSVG('NOR')}
        </div>
      </div>`
    )}

    <!-- XOR Gate -->
    ${w3Section('Gerbang XOR (Exclusive OR)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
        <div>
          <p style="margin:0 0 8px;font-size:0.9rem;line-height:1.6"><strong>Fungsi:</strong> Output <code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;font-family:var(--font-mono)">1</code> jika <strong>kedua input berbeda</strong>.</p>
          <p style="margin:0 0 12px;font-size:0.9rem"><strong>Persamaan:</strong> <code style="background:var(--bg-card);padding:3px 8px;border-radius:6px;font-family:var(--font-mono);font-size:0.95rem;color:var(--accent-cyan)">F = A ⊕ B = A'B + AB'</code></p>
          ${w3Table(['A', 'B', 'F = A⊕B'], [['0','0','0'],['0','1','1'],['1','0','1'],['1','1','0']])}
          <p style="margin:8px 0 0;font-size:0.85rem;color:var(--text-faint)"><strong>Penerapan:</strong> Deteksi perbedaan bit, half adder, parity checker.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;display:flex;align-items:center;justify-content:center">
          ${w3GateSVG('XOR')}
        </div>
      </div>`
    )}

    <!-- XNOR Gate -->
    ${w3Section('Gerbang XNOR (Exclusive NOR)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="8" x2="16" y2="16"/><line x1="16" y1="8" x2="8" y2="16"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
        <div>
          <p style="margin:0 0 8px;font-size:0.9rem;line-height:1.6"><strong>Fungsi:</strong> Output <code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;font-family:var(--font-mono)">1</code> jika <strong>kedua input sama</strong>.</p>
          <p style="margin:0 0 12px;font-size:0.9rem"><strong>Persamaan:</strong> <code style="background:var(--bg-card);padding:3px 8px;border-radius:6px;font-family:var(--font-mono);font-size:0.95rem;color:var(--accent-violet)">F = (A ⊕ B)' = AB + A'B'</code></p>
          ${w3Table(['A', 'B', "F = (A⊕B)'"], [['0','0','1'],['0','1','0'],['1','0','0'],['1','1','1']])}
          <p style="margin:8px 0 0;font-size:0.85rem;color:var(--text-faint)"><strong>Penerapan:</strong> Komparator bit, deteksi kesamaan data.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;display:flex;align-items:center;justify-content:center">
          ${w3GateSVG('XNOR')}
        </div>
      </div>`
    )}

    <!-- Ringkasan Gerbang -->
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-top:24px">
      <h3 style="margin:0 0 16px;font-size:1rem;font-weight:700;color:var(--accent-amber)">📋 Ringkasan Perbandingan Gerbang Logika</h3>
      ${w3Table(
        ['Gerbang', 'Persamaan', 'Output = 1 Ketika'],
        [
          ['AND', 'F = A · B', 'Semua input = 1'],
          ['OR', 'F = A + B', 'Minimal satu input = 1'],
          ["NOT", "F = A'", 'Input = 0'],
          ["NAND", "F = (A·B)'", 'Minimal satu input = 0'],
          ["NOR", "F = (A+B)'", 'Semua input = 0'],
          ['XOR', "F = A⊕B", 'Input berbeda'],
          ["XNOR", "F = (A⊕B)'", 'Input sama']
        ]
      )}
    </div>
  `;
}


/* ══════════════════════════════════════════════════════
   TOPIK 3: HUKUM & TEOREMA ALJABAR BOOLEAN
   ══════════════════════════════════════════════════════ */
function renderWeek3Laws(el) {
  const lawCard = (name, laws, explanation, example, color) => `
    <div style="background:var(--bg-inset);border:1px solid var(${color});border-radius:12px;padding:18px 20px;margin-bottom:16px;position:relative;overflow:hidden">
      <div style="position:absolute;top:-10px;right:-10px;width:50px;height:50px;border-radius:50%;background:var(${color}-glow);filter:blur(16px)"></div>
      <div style="position:relative">
        <h4 style="margin:0 0 10px;font-size:0.95rem;font-weight:700;color:var(${color})">${name}</h4>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px">
          ${laws.map(l => `<code style="background:var(--bg-card);border:1px solid var(--line);padding:4px 10px;border-radius:6px;font-family:var(--font-mono);font-size:0.9rem;font-weight:600">${l}</code>`).join('')}
        </div>
        <p style="margin:0 0 8px;font-size:0.88rem;line-height:1.6;color:var(--text-secondary)">${explanation}</p>
        ${example ? `<div style="background:var(--bg-card);border:1px solid var(--line);border-radius:8px;padding:10px 14px;margin-top:8px">
          <p style="margin:0;font-size:0.8rem;color:var(--text-faint);font-weight:600;margin-bottom:4px">CONTOH</p>
          <p style="margin:0;font-family:var(--font-mono);font-size:0.88rem;line-height:1.7">${example}</p>
        </div>` : ''}
      </div>
    </div>`;

  el.innerHTML = `
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700">Hukum & Teorema Aljabar Boolean</h3>
      <p style="margin:0;font-size:0.9rem;color:var(--text-secondary);line-height:1.6">Hukum-hukum berikut digunakan untuk menyederhanakan ekspresi Boolean. Penyederhanaan penting untuk meminimalkan jumlah gerbang logika dalam rangkaian.</p>
    </div>

    ${w3Alert('info', 'Dalam notasi berikut: tanda apostrof <code>\'</code> menyatakan komplemen (NOT), tanda titik <code>·</code> menyatakan AND, dan tanda tambah <code>+</code> menyatakan OR.')}

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px">
      ${lawCard('Hukum Identitas',
        ['A + 0 = A', 'A · 1 = A'],
        'Elemen identitas tidak mengubah nilai variabel. OR dengan 0 atau AND dengan 1 menghasilkan variabel itu sendiri.',
        'F = X · 1 + 0 = X + 0 = X',
        '--accent-cyan'
      )}

      ${lawCard('Hukum Dominasi',
        ['A + 1 = 1', 'A · 0 = 0'],
        'OR dengan 1 selalu menghasilkan 1. AND dengan 0 selalu menghasilkan 0. Satu elemen "mendominasi" hasilnya.',
        'F = X · 0 + 1 = 0 + 1 = 1',
        '--accent-violet'
      )}

      ${lawCard('Hukum Idempoten',
        ['A + A = A', 'A · A = A'],
        'OR atau AND suatu variabel dengan dirinya sendiri menghasilkan variabel itu sendiri.',
        'F = X + X + X = X',
        '--accent-amber'
      )}

      ${lawCard('Hukum Komplemen',
        ["A + A' = 1", "A · A' = 0"],
        'Sebuah variabel di-OR-kan dengan komplemennya menghasilkan 1. Di-AND-kan menghasilkan 0.',
        "F = X · X' = 0",
        '--accent-rose'
      )}

      ${lawCard('Hukum Involusi (Double Complement)',
        ["(A')' = A"],
        'Komplemen dari komplemen suatu variabel mengembalikan nilai aslinya.',
        "(X')' = X → NOT dari NOT X = X",
        '--accent-cyan'
      )}

      ${lawCard('Hukum Komutatif',
        ['A + B = B + A', 'A · B = B · A'],
        'Urutan operand pada operasi AND dan OR tidak memengaruhi hasil.',
        'X · Y = Y · X → kedua ekspresi identik',
        '--accent-violet'
      )}

      ${lawCard('Hukum Asosiatif',
        ['(A + B) + C = A + (B + C)', '(A · B) · C = A · (B · C)'],
        'Pengelompokan operand pada AND dan OR tidak memengaruhi hasil.',
        '(X + Y) + Z = X + (Y + Z) = X + Y + Z',
        '--accent-amber'
      )}

      ${lawCard('Hukum Distributif',
        ['A · (B + C) = A·B + A·C', 'A + (B · C) = (A + B) · (A + C)'],
        'AND dapat didistribusikan terhadap OR (mirip perkalian ke penjumlahan), dan OR dapat didistribusikan terhadap AND.',
        'X · (Y + Z) = X·Y + X·Z',
        '--accent-rose'
      )}

      ${lawCard("Hukum De Morgan",
        ["(A · B)' = A' + B'", "(A + B)' = A' · B'"],
        'Komplemen AND = OR dari komplemen masing-masing. Komplemen OR = AND dari komplemen masing-masing. Ini adalah teorema fundamental.',
        "(X · Y)' = X' + Y' → Komplemen output AND = OR dari masing-masing input yang dikomplemenkan",
        '--accent-cyan'
      )}

      ${lawCard('Hukum Absorpsi',
        ['A + A·B = A', 'A · (A + B) = A'],
        'Variabel "menyerap" suku yang mengandung dirinya sendiri.',
        'X + X·Y = X(1 + Y) = X·1 = X',
        '--accent-violet'
      )}

      ${lawCard('Teorema Konsensus',
        ["A·B + A'·C + B·C = A·B + A'·C"],
        "Suku B·C merupakan suku konsensus yang redundan (dapat dihilangkan) karena sudah tercakup oleh suku A·B dan A'·C.",
        "X·Y + X'·Z + Y·Z = X·Y + X'·Z → suku Y·Z dihilangkan",
        '--accent-amber'
      )}
    </div>

    <!-- Ringkasan Tabel -->
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-top:24px">
      <h3 style="margin:0 0 16px;font-size:1rem;font-weight:700;color:var(--accent-amber)">📋 Tabel Ringkasan Hukum Boolean</h3>
      ${w3Table(
        ['Hukum', 'Bentuk OR (+)', 'Bentuk AND (·)'],
        [
          ['Identitas', 'A + 0 = A', 'A · 1 = A'],
          ['Dominasi', 'A + 1 = 1', 'A · 0 = 0'],
          ['Idempoten', 'A + A = A', 'A · A = A'],
          ["Komplemen", "A + A' = 1", "A · A' = 0"],
          ['Komutatif', 'A + B = B + A', 'A · B = B · A'],
          ['Asosiatif', '(A+B)+C = A+(B+C)', '(A·B)·C = A·(B·C)'],
          ['Distributif', 'A+(B·C) = (A+B)·(A+C)', 'A·(B+C) = A·B+A·C'],
          ["De Morgan", "(A+B)' = A'·B'", "(A·B)' = A'+B'"],
          ['Absorpsi', 'A + A·B = A', 'A·(A+B) = A']
        ]
      )}
    </div>
  `;
}


/* ══════════════════════════════════════════════════════
   TOPIK 4: BENTUK STANDAR FUNGSI BOOLEAN (SOP & POS)
   ══════════════════════════════════════════════════════ */
function renderWeek3StandardForms(el) {
  el.innerHTML = `
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700">Bentuk Standar Fungsi Boolean</h3>
      <p style="margin:0;font-size:0.9rem;color:var(--text-secondary);line-height:1.6">Fungsi Boolean dapat dinyatakan dalam dua bentuk standar: Sum of Products (SOP) dan Product of Sums (POS). Kedua bentuk ini penting untuk representasi dan implementasi rangkaian logika.</p>
    </div>

    <!-- SOP -->
    ${w3Section('Sum of Products (SOP) / Minterm', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Pada bentuk <strong>SOP</strong>, setiap suku (term) merupakan hasil operasi <strong>AND</strong>, dan suku-suku tersebut digabungkan menggunakan operasi <strong>OR</strong>.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px">
        <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 6px;font-size:0.78rem;font-weight:700;color:var(--accent-cyan)">CIRI-CIRI SOP</p>
          <ul style="margin:0;padding-left:16px;font-size:0.88rem;line-height:1.8">
            <li>Setiap suku = operasi AND</li>
            <li>Suku-suku digabung dengan OR</li>
            <li>Bentuk kanonis: setiap minterm memuat seluruh variabel</li>
          </ul>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 6px;font-size:0.78rem;font-weight:700;color:var(--accent-cyan)">KONVENSI MINTERM</p>
          <ul style="margin:0;padding-left:16px;font-size:0.88rem;line-height:1.8">
            <li>Variabel tanpa komplemen → nilai <strong>1</strong></li>
            <li>Variabel dengan komplemen → nilai <strong>0</strong></li>
            <li>Minterm dipilih dari baris output = 1</li>
          </ul>
        </div>
      </div>

      <h4 style="margin:16px 0 10px;font-size:0.92rem;font-weight:700">Contoh SOP Dua Variabel</h4>
      ${w3Code("F(A,B) = A'B + AB", 'Bentuk Kanonis SOP')}
      <p style="margin:8px 0 0;font-size:0.88rem;line-height:1.6;color:var(--text-secondary)">
        Penjelasan: Fungsi bernilai 1 pada minterm <code style="font-family:var(--font-mono)">A'B</code> (A=0, B=1) dan <code style="font-family:var(--font-mono)">AB</code> (A=1, B=1).
      </p>

      <h4 style="margin:16px 0 10px;font-size:0.92rem;font-weight:700">Contoh SOP Tiga Variabel</h4>
      ${w3Code("F(A,B,C) = A'BC + ABC + A'B'C'", 'Bentuk Kanonis SOP 3 Variabel')}
      <p style="margin:8px 0;font-size:0.88rem;line-height:1.6;color:var(--text-secondary)">
        Terdapat 3 minterm: <code style="font-family:var(--font-mono)">A'BC</code> (m₃), <code style="font-family:var(--font-mono)">ABC</code> (m₇), <code style="font-family:var(--font-mono)">A'B'C'</code> (m₀).
      </p>
      ${w3Table(['A','B','C','Minterm','Simbol','F'],
        [
          ['0','0','0',"A'B'C'",'m₀','1'],
          ['0','0','1',"A'B'C",'m₁','0'],
          ['0','1','0',"A'BC'",'m₂','0'],
          ['0','1','1',"A'BC",'m₃','1'],
          ['1','0','0',"AB'C'",'m₄','0'],
          ['1','0','1',"AB'C",'m₅','0'],
          ['1','1','0',"ABC'",'m₆','0'],
          ['1','1','1',"ABC",'m₇','1']
        ]
      )}`
    )}

    <!-- POS -->
    ${w3Section('Product of Sums (POS) / Maxterm', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Pada bentuk <strong>POS</strong>, setiap suku (term) merupakan hasil operasi <strong>OR</strong>, dan suku-suku tersebut digabungkan menggunakan operasi <strong>AND</strong>.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px">
        <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 6px;font-size:0.78rem;font-weight:700;color:var(--accent-violet)">CIRI-CIRI POS</p>
          <ul style="margin:0;padding-left:16px;font-size:0.88rem;line-height:1.8">
            <li>Setiap suku = operasi OR</li>
            <li>Suku-suku digabung dengan AND</li>
            <li>Bentuk kanonis: setiap maxterm memuat seluruh variabel</li>
          </ul>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 6px;font-size:0.78rem;font-weight:700;color:var(--accent-violet)">KONVENSI MAXTERM</p>
          <ul style="margin:0;padding-left:16px;font-size:0.88rem;line-height:1.8">
            <li>Variabel tanpa komplemen → nilai <strong>0</strong></li>
            <li>Variabel dengan komplemen → nilai <strong>1</strong></li>
            <li>Maxterm dipilih dari baris output = 0</li>
          </ul>
        </div>
      </div>

      <h4 style="margin:16px 0 10px;font-size:0.92rem;font-weight:700">Contoh POS Dua Variabel</h4>
      ${w3Code("F(A,B) = (A' + B)(A + B')", 'Bentuk Kanonis POS')}
      <p style="margin:8px 0;font-size:0.88rem;line-height:1.6;color:var(--text-secondary)">
        Fungsi terdiri dari maxterm <code style="font-family:var(--font-mono)">(A' + B)</code> dan <code style="font-family:var(--font-mono)">(A + B')</code> yang dihubungkan dengan AND.
      </p>`
    )}

    <!-- Perbandingan -->
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-top:24px">
      <h3 style="margin:0 0 16px;font-size:1rem;font-weight:700;color:var(--accent-amber)">⚖️ Perbandingan SOP vs POS</h3>
      ${w3Table(
        ['Aspek', 'SOP (Sum of Products)', 'POS (Product of Sums)'],
        [
          ['Suku dasar', 'Minterm (AND)', 'Maxterm (OR)'],
          ['Penghubung suku', 'OR (+)', 'AND (·)'],
          ['Dipilih dari', 'Baris output = 1', 'Baris output = 0'],
          ['Var. tanpa komplemen', 'Bernilai 1', 'Bernilai 0'],
          ['Var. dengan komplemen', 'Bernilai 0', 'Bernilai 1'],
          ['Contoh', "F = A'B + AB", "F = (A'+B)(A+B')"],
          ['Implementasi', 'AND gates → OR gate', 'OR gates → AND gate']
        ]
      )}
    </div>
  `;
}


/* ══════════════════════════════════════════════════════
   TOPIK 5: TABEL KEBENARAN
   ══════════════════════════════════════════════════════ */
function renderWeek3TruthTable(el) {
  el.innerHTML = `
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700">Tabel Kebenaran</h3>
      <p style="margin:0;font-size:0.9rem;color:var(--text-secondary);line-height:1.6">Tabel kebenaran (truth table) menampilkan seluruh kemungkinan kombinasi input dan output dari suatu fungsi Boolean. Ini adalah alat fundamental untuk menganalisis dan memverifikasi fungsi logika.</p>
    </div>

    <!-- Langkah Membuat Tabel Kebenaran -->
    ${w3Section('Langkah Membuat Tabel Kebenaran', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
      `${w3Step(1, '<strong>Tentukan jumlah variabel masukan</strong> — Identifikasi semua variabel yang terlibat dalam fungsi Boolean.')}
      ${w3Step(2, '<strong>Tentukan jumlah kombinasi input</strong> — Gunakan rumus <code style="font-family:var(--font-mono);background:var(--bg-card);padding:2px 6px;border-radius:4px">2<sup>n</sup></code> di mana n = jumlah variabel.')}
      ${w3Step(3, '<strong>Susun seluruh kombinasi nilai input</strong> — Tulis semua kemungkinan dari 00...0 sampai 11...1.')}
      ${w3Step(4, '<strong>Hitung output</strong> — Evaluasi persamaan Boolean untuk setiap baris.')}
      ${w3Step(5, '<strong>Periksa hasil setiap baris</strong> — Verifikasi kebenaran output.')}

      ${w3Alert('info', 'Untuk <strong>n variabel</strong>, tabel memiliki <strong>2<sup>n</sup> baris</strong>. Contoh: 2 variabel → 4 baris, 3 variabel → 8 baris, 4 variabel → 16 baris.')}`
    )}

    <!-- Contoh 1: Dua Variabel -->
    ${w3Section("Contoh 1: F(A,B) = A'B + AB", '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
      `<p style="margin:0 0 12px;font-size:0.9rem;line-height:1.6">Variabel: A, B (n=2) → Jumlah baris: 2² = <strong>4 baris</strong></p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
        <div>
          <p style="font-size:0.8rem;color:var(--text-faint);font-weight:600;margin-bottom:8px">PROSES EVALUASI</p>
          ${w3Code([
            "Baris 1: A=0, B=0",
            "  A'B = 1·0 = 0, AB = 0·0 = 0",
            "  F = 0 + 0 = 0",
            "",
            "Baris 2: A=0, B=1",
            "  A'B = 1·1 = 1, AB = 0·1 = 0",
            "  F = 1 + 0 = 1",
            "",
            "Baris 3: A=1, B=0",
            "  A'B = 0·0 = 0, AB = 1·0 = 0",
            "  F = 0 + 0 = 0",
            "",
            "Baris 4: A=1, B=1",
            "  A'B = 0·1 = 0, AB = 1·1 = 1",
            "  F = 0 + 1 = 1"
          ])}
        </div>
        <div>
          <p style="font-size:0.8rem;color:var(--text-faint);font-weight:600;margin-bottom:8px">TABEL KEBENARAN</p>
          ${w3Table(['A', 'B', "A'", "A'B", 'AB', "F = A'B + AB"],
            [
              ['0','0','1','0','0','<span style="color:var(--danger)">0</span>'],
              ['0','1','1','1','0','<span style="color:var(--success);font-weight:700">1</span>'],
              ['1','0','0','0','0','<span style="color:var(--danger)">0</span>'],
              ['1','1','0','0','1','<span style="color:var(--success);font-weight:700">1</span>']
            ]
          )}
          ${w3Alert('success', "Kesimpulan: F bernilai 1 ketika B = 1. Jadi F = A'B + AB = B(A' + A) = B·1 = <strong>B</strong>.")}
        </div>
      </div>`
    )}

    <!-- Contoh 2: Tiga Variabel -->
    ${w3Section('Contoh 2: F(A,B,C) = AB + C', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
      `<p style="margin:0 0 12px;font-size:0.9rem;line-height:1.6">Variabel: A, B, C (n=3) → Jumlah baris: 2³ = <strong>8 baris</strong></p>

      ${w3Table(['A', 'B', 'C', 'AB', 'F = AB + C'],
        [
          ['0','0','0','0','<span style="color:var(--danger)">0</span>'],
          ['0','0','1','0','<span style="color:var(--success);font-weight:700">1</span>'],
          ['0','1','0','0','<span style="color:var(--danger)">0</span>'],
          ['0','1','1','0','<span style="color:var(--success);font-weight:700">1</span>'],
          ['1','0','0','0','<span style="color:var(--danger)">0</span>'],
          ['1','0','1','0','<span style="color:var(--success);font-weight:700">1</span>'],
          ['1','1','0','1','<span style="color:var(--success);font-weight:700">1</span>'],
          ['1','1','1','1','<span style="color:var(--success);font-weight:700">1</span>']
        ]
      )}

      ${w3Alert('info', 'F bernilai 1 pada 5 dari 8 kombinasi input. Dalam bentuk SOP kanonis: F = Σm(1,3,5,6,7).')}`
    )}
  `;
}


/* ══════════════════════════════════════════════════════
   TOPIK 6: KONVERSI SOP DAN POS
   ══════════════════════════════════════════════════════ */
function renderWeek3Conversion(el) {
  el.innerHTML = `
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700">Konversi SOP ↔ POS</h3>
      <p style="margin:0;font-size:0.9rem;color:var(--text-secondary);line-height:1.6">Konversi antara bentuk SOP dan POS dapat dilakukan melalui tabel kebenaran. Setiap fungsi Boolean dapat dinyatakan dalam kedua bentuk.</p>
    </div>

    <!-- Konversi SOP ke POS -->
    ${w3Section('A. Konversi SOP ke POS', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/><path d="M21 16v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"/></svg>',
      `<h4 style="margin:0 0 12px;font-size:0.92rem;font-weight:700">Langkah-langkah:</h4>
      ${w3Step(1, 'Susun <strong>tabel kebenaran</strong> dari fungsi SOP.')}
      ${w3Step(2, 'Identifikasi semua baris dengan <strong>output = 0</strong>.')}
      ${w3Step(3, 'Bentuk <strong>maxterm</strong> dari setiap baris output 0 (variabel tanpa komplemen jika nilainya 0, variabel dengan komplemen jika nilainya 1).')}
      ${w3Step(4, 'Gabungkan semua maxterm menggunakan operasi <strong>AND</strong>.')}

      <div style="border-top:1px solid var(--line);margin:20px 0;padding-top:20px">
        <h4 style="margin:0 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-cyan)">Contoh: Konversi F(A,B) = A'B + AB ke POS</h4>

        <p style="font-size:0.85rem;font-weight:600;color:var(--text-faint);margin-bottom:8px">LANGKAH 1 & 2: Tabel Kebenaran</p>
        ${w3Table(['A', 'B', "F (SOP)", 'Keterangan'],
          [
            ['0','0','0','← Output 0 → bentuk maxterm'],
            ['0','1','1',''],
            ['1','0','0','← Output 0 → bentuk maxterm'],
            ['1','1','1','']
          ]
        )}

        <p style="font-size:0.85rem;font-weight:600;color:var(--text-faint);margin:16px 0 8px">LANGKAH 3: Bentuk Maxterm</p>
        ${w3Code([
          "Baris A=0, B=0 (output=0):",
          "  A=0 → A (tanpa komplemen), B=0 → B (tanpa komplemen)",
          "  Maxterm: (A + B)",
          "",
          "Baris A=1, B=0 (output=0):",
          "  A=1 → A' (dengan komplemen), B=0 → B (tanpa komplemen)",
          "  Maxterm: (A' + B)"
        ])}

        <p style="font-size:0.85rem;font-weight:600;color:var(--text-faint);margin:16px 0 8px">LANGKAH 4: Gabungkan</p>
        ${w3Code("F(A,B) = (A + B) · (A' + B)  ← Bentuk POS", 'Hasil Konversi')}

        ${w3Alert('success', 'Verifikasi: (A + B)·(A\' + B) = AB + B + A\'B = B(A + 1 + A\') = B·1 = <strong>B</strong>, yang cocok dengan penyederhanaan SOP.')}
      </div>`
    )}

    <!-- Konversi POS ke SOP -->
    ${w3Section('B. Konversi POS ke SOP', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="9 21 3 21 3 15"/><line x1="14" y1="10" x2="3" y2="21"/><path d="M3 8V3h5"/></svg>',
      `<h4 style="margin:0 0 12px;font-size:0.92rem;font-weight:700">Langkah-langkah:</h4>
      ${w3Step(1, 'Susun <strong>tabel kebenaran</strong> dari fungsi POS.')}
      ${w3Step(2, 'Identifikasi semua baris dengan <strong>output = 1</strong>.')}
      ${w3Step(3, 'Bentuk <strong>minterm</strong> dari setiap baris output 1 (variabel tanpa komplemen jika nilainya 1, variabel dengan komplemen jika nilainya 0).')}
      ${w3Step(4, 'Gabungkan semua minterm menggunakan operasi <strong>OR</strong>.')}

      <div style="border-top:1px solid var(--line);margin:20px 0;padding-top:20px">
        <h4 style="margin:0 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-violet)">Contoh: Konversi F(A,B) = (A + B)(A' + B) ke SOP</h4>

        <p style="font-size:0.85rem;font-weight:600;color:var(--text-faint);margin-bottom:8px">LANGKAH 1 & 2: Tabel Kebenaran</p>
        ${w3Table(['A', 'B', '(A+B)', "(A'+B)", 'F (POS)', 'Keterangan'],
          [
            ['0','0','0','1','0',''],
            ['0','1','1','1','1','← Output 1 → bentuk minterm'],
            ['1','0','1','0','0',''],
            ['1','1','1','1','1','← Output 1 → bentuk minterm']
          ]
        )}

        <p style="font-size:0.85rem;font-weight:600;color:var(--text-faint);margin:16px 0 8px">LANGKAH 3: Bentuk Minterm</p>
        ${w3Code([
          "Baris A=0, B=1 (output=1):",
          "  A=0 → A' (komplemen), B=1 → B (tanpa komplemen)",
          "  Minterm: A'B",
          "",
          "Baris A=1, B=1 (output=1):",
          "  A=1 → A (tanpa komplemen), B=1 → B (tanpa komplemen)",
          "  Minterm: AB"
        ])}

        <p style="font-size:0.85rem;font-weight:600;color:var(--text-faint);margin:16px 0 8px">LANGKAH 4: Gabungkan</p>
        ${w3Code("F(A,B) = A'B + AB  ← Bentuk SOP", 'Hasil Konversi')}
      </div>`
    )}

    <!-- Catatan Penting -->
    ${w3Alert('warning', '<strong>Penting:</strong> Bentuk kanonis adalah bentuk di mana setiap suku memuat seluruh variabel fungsi. Bentuk yang telah disederhanakan mungkin tidak memuat semua variabel dalam setiap suku.')}
  `;
}


/* ══════════════════════════════════════════════════════
   TOPIK 7: PENYEDERHANAAN FUNGSI BOOLEAN
   ══════════════════════════════════════════════════════ */
function renderWeek3Simplification(el) {
  el.innerHTML = `
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700">Penyederhanaan Fungsi Boolean</h3>
      <p style="margin:0;font-size:0.9rem;color:var(--text-secondary);line-height:1.6">Penyederhanaan ekspresi Boolean bertujuan mengurangi jumlah gerbang logika yang diperlukan dalam implementasi rangkaian. Setiap langkah harus didasarkan pada hukum Boolean yang berlaku.</p>
    </div>

    <!-- Contoh 1: Hukum Komplemen -->
    ${w3Section("Contoh 1: F = A·B + A·B'", '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
      `<div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:16px 18px">
        ${w3Code([
          "F = A·B + A·B'",
          "",
          "  = A·(B + B')        ← Hukum Distributif: faktorkan A",
          "",
          "  = A·(1)             ← Hukum Komplemen: B + B' = 1",
          "",
          "  = A                 ← Hukum Identitas: A·1 = A"
        ], 'Penyelesaian Langkah demi Langkah')}
      </div>
      ${w3Alert('success', 'Hasil: <strong>F = A</strong>. Rangkaian yang awalnya membutuhkan 2 gerbang AND, 1 inverter, dan 1 gerbang OR, disederhanakan menjadi koneksi langsung ke variabel A.')}`
    )}

    <!-- Contoh 2: Hukum Absorpsi -->
    ${w3Section("Contoh 2: F = A + A·B", '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
      `<div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:16px 18px">
        ${w3Code([
          "F = A + A·B",
          "",
          "  = A·(1 + B)         ← Hukum Distributif: faktorkan A",
          "",
          "  = A·(1)             ← Hukum Dominasi: 1 + B = 1",
          "",
          "  = A                 ← Hukum Identitas: A·1 = A",
          "",
          "Alternatif (langsung): F = A + A·B = A  ← Hukum Absorpsi"
        ], 'Penyelesaian')}
      </div>`
    )}

    <!-- Contoh 3: Hukum De Morgan -->
    ${w3Section("Contoh 3: F = (A·B)' + A'", '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
      `<div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:16px 18px">
        ${w3Code([
          "F = (A·B)' + A'",
          "",
          "  = (A' + B') + A'    ← Hukum De Morgan: (A·B)' = A' + B'",
          "",
          "  = A' + A' + B'      ← Hukum Asosiatif & Komutatif",
          "",
          "  = A' + B'           ← Hukum Idempoten: A' + A' = A'"
        ], 'Penyelesaian')}
      </div>`
    )}

    <!-- Contoh 4: Kompleks -->
    ${w3Section("Contoh 4: F = A'B'C + A'BC + AB'C + ABC", '--accent-rose',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
      `<div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:16px 18px">
        ${w3Code([
          "F = A'B'C + A'BC + AB'C + ABC",
          "",
          "  = A'C(B' + B) + AC(B' + B)   ← Hukum Distributif",
          "",
          "  = A'C(1) + AC(1)             ← Hukum Komplemen: B' + B = 1",
          "",
          "  = A'C + AC                   ← Hukum Identitas",
          "",
          "  = C(A' + A)                  ← Hukum Distributif",
          "",
          "  = C(1)                       ← Hukum Komplemen",
          "",
          "  = C                          ← Hukum Identitas"
        ], 'Penyelesaian')}
      </div>
      ${w3Alert('success', 'Dari 4 suku dengan 12 variabel, disederhanakan menjadi <strong>F = C</strong>. Ini menunjukkan kekuatan Aljabar Boolean dalam meminimalkan rangkaian.')}`
    )}

    <!-- Tips Penyederhanaan -->
    <div style="background:var(--bg-inset);border:1px solid var(--accent-amber);border-radius:14px;padding:20px 24px;margin-top:24px">
      <h3 style="margin:0 0 12px;font-size:1rem;font-weight:700;color:var(--accent-amber)">💡 Tips Penyederhanaan</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px">
        ${[
          ['Cari pasangan komplemen', "Dua suku berbeda hanya di satu variabel (XY dan XY') → faktorkan variabel yang sama."],
          ['Gunakan absorpsi', "Jika ada suku A dan A·B, hapus suku A·B karena sudah tercakup oleh A."],
          ['Terapkan De Morgan', "Untuk menyederhanakan ekspresi dengan komplemen gabungan, pecah menggunakan De Morgan."],
          ['Verifikasi hasil', "Buat tabel kebenaran sebelum dan sesudah penyederhanaan untuk memastikan keduanya identik."]
        ].map(([t, d]) => `
          <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
            <p style="margin:0 0 4px;font-size:0.82rem;font-weight:700;color:var(--accent-amber)">${t}</p>
            <p style="margin:0;font-size:0.85rem;color:var(--text-secondary);line-height:1.5">${d}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


/* ══════════════════════════════════════════════════════
   TOPIK 8: GERBANG XOR & BENTUK SOP
   ══════════════════════════════════════════════════════ */
function renderWeek3XOR(el) {
  el.innerHTML = `
    <div style="background:linear-gradient(135deg,var(--accent-cyan-dim) 0%,var(--accent-violet-dim) 100%);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700">Gerbang XOR & Hubungannya dengan SOP</h3>
      <p style="margin:0;font-size:0.9rem;color:var(--text-secondary);line-height:1.6">Memahami bagaimana gerbang XOR diekspresikan dalam bentuk SOP dan hubungan antara tabel kebenaran dengan representasi minterm.</p>
    </div>

    <!-- Fungsi XOR -->
    ${w3Section('Fungsi XOR Dua Masukan', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Gerbang <strong>XOR</strong> (Exclusive OR) menghasilkan output <strong>1</strong> ketika kedua input memiliki <strong>nilai yang berbeda</strong>.
      </p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
        <div>
          <p style="margin:0 0 8px;font-size:0.85rem;font-weight:600;color:var(--text-faint)">PERSAMAAN BOOLEAN XOR</p>
          ${w3Code("F = A ⊕ B = A'B + AB'")}

          <p style="margin:16px 0 8px;font-size:0.85rem;font-weight:600;color:var(--text-faint)">TABEL KEBENARAN</p>
          ${w3Table(['A', 'B', "A'B", "AB'", 'F = A⊕B'],
            [
              ['0','0','0','0','<span style="color:var(--danger)">0</span>'],
              ['0','1','1','0','<span style="color:var(--success);font-weight:700">1</span>'],
              ['1','0','0','1','<span style="color:var(--success);font-weight:700">1</span>'],
              ['1','1','0','0','<span style="color:var(--danger)">0</span>']
            ]
          )}
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px">
          ${w3GateSVG('XOR')}
          <div style="background:var(--bg-card);border:1px solid var(--accent-cyan);border-radius:8px;padding:10px 14px;width:100%">
            <p style="margin:0;font-size:0.85rem;text-align:center;line-height:1.6">
              <strong style="color:var(--accent-cyan)">A ⊕ B = 1</strong> ketika<br>A ≠ B (input berbeda)
            </p>
          </div>
        </div>
      </div>`
    )}

    <!-- Hubungan dengan SOP -->
    ${w3Section('Hubungan Tabel Kebenaran dengan SOP', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Bentuk SOP diperoleh langsung dari tabel kebenaran dengan memilih <strong>minterm yang menghasilkan output 1</strong>, kemudian menggabungkannya menggunakan operasi OR.
      </p>

      <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:16px 18px;margin-bottom:16px">
        ${w3Code([
          "Dari tabel kebenaran XOR:",
          "",
          "  Baris A=0, B=1 → output 1 → minterm: A'B",
          "  Baris A=1, B=0 → output 1 → minterm: AB'",
          "",
          "Gabungkan dengan OR:",
          "  F = A'B + AB'",
          "",
          "Ini adalah bentuk SOP dari fungsi XOR!"
        ], 'Proses Pembentukan SOP dari Tabel Kebenaran')}
      </div>

      ${w3Alert('info', 'Proses ini berlaku untuk <strong>semua fungsi Boolean</strong>: identifikasi baris dengan output 1 → bentuk minterm → gabungkan dengan OR → selesai!')}`
    )}

    <!-- Verifikasi Aljabar -->
    ${w3Section('Verifikasi: XOR Bukan Gerbang OR Biasa', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div style="background:var(--bg-card);border:1px solid var(--accent-amber);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 8px;font-size:0.82rem;font-weight:700;color:var(--accent-amber)">OR vs XOR</p>
          ${w3Table(['A', 'B', 'A + B (OR)', 'A ⊕ B (XOR)'],
            [
              ['0','0','0','0'],
              ['0','1','1','1'],
              ['1','0','1','1'],
              ['1','1','<span style="color:var(--success);font-weight:700">1</span>','<span style="color:var(--danger);font-weight:700">0</span>']
            ]
          )}
        </div>
        <div style="display:flex;flex-direction:column;justify-content:center">
          <p style="margin:0;font-size:0.9rem;line-height:1.7">
            Perbedaan utama terletak pada baris terakhir:<br>
            • <strong>OR</strong>: A=1, B=1 → output <strong style="color:var(--success)">1</strong><br>
            • <strong>XOR</strong>: A=1, B=1 → output <strong style="color:var(--danger)">0</strong><br><br>
            XOR hanya menghasilkan 1 ketika input <em>berbeda</em>, sedangkan OR menghasilkan 1 ketika <em>salah satu atau kedua</em> input bernilai 1.
          </p>
        </div>
      </div>`
    )}
  `;
}


/* ══════════════════════════════════════════════════════
   TOPIK 9: LATIHAN & EVALUASI
   ══════════════════════════════════════════════════════ */
function renderWeek3Exercises(el) {
  el.innerHTML = `
    <div style="background:linear-gradient(135deg,var(--accent-rose-dim) 0%,var(--accent-amber-dim) 100%);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700">📝 Latihan & Evaluasi</h3>
      <p style="margin:0;font-size:0.9rem;color:var(--text-secondary);line-height:1.6">Kerjakan setiap latihan dengan menunjukkan langkah pengerjaan dan hukum Boolean yang digunakan. Coba selesaikan terlebih dahulu sebelum melihat pembahasan.</p>
    </div>

    <!-- Latihan 1 -->
    ${w3Section("Latihan 1: Penyederhanaan Boolean", '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
      `<div style="background:var(--accent-cyan-dim);border:1px solid var(--accent-cyan);border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <p style="margin:0;font-size:0.95rem;font-weight:600">Sederhanakan persamaan berikut:</p>
        <p style="margin:8px 0 0;font-family:var(--font-mono);font-size:1.05rem;font-weight:700;color:var(--accent-cyan)">F = A·B + A·B' + A'·B</p>
      </div>
      <p style="margin:0 0 12px;font-size:0.9rem;color:var(--text-secondary)">Tunjukkan setiap langkah pengerjaan dan sebutkan hukum Boolean yang digunakan.</p>

      ${w3Spoiler('📖 Lihat Pembahasan', `
        ${w3Code([
          "F = A·B + A·B' + A'·B",
          "",
          "Langkah 1: Kelompokkan suku yang mengandung A",
          "  = A·(B + B') + A'·B     ← Hukum Distributif",
          "",
          "Langkah 2: Sederhanakan B + B'",
          "  = A·(1) + A'·B          ← Hukum Komplemen: B + B' = 1",
          "",
          "Langkah 3: Sederhanakan A·1",
          "  = A + A'·B               ← Hukum Identitas: A·1 = A",
          "",
          "Langkah 4: Terapkan hukum absorpsi",
          "  Perhatikan: A + A'·B",
          "  = (A + A')·(A + B)       ← Hukum Distributif OR",
          "  = 1·(A + B)              ← Hukum Komplemen",
          "  = A + B                  ← Hukum Identitas",
          "",
          "Hasil: F = A + B"
        ], 'Penyelesaian')}
        ${w3Alert('success', '<strong>F = A + B</strong> → Rangkaian disederhanakan menjadi satu gerbang OR!')}
      `)}`
    )}

    <!-- Latihan 2 -->
    ${w3Section('Latihan 2: Analisis Rangkaian', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <p style="margin:0;font-size:0.95rem;font-weight:600">Diberikan persamaan:</p>
        <p style="margin:8px 0 0;font-family:var(--font-mono);font-size:1.05rem;font-weight:700;color:var(--accent-violet)">F = (A · B) + C</p>
      </div>
      <p style="margin:0 0 8px;font-size:0.9rem;color:var(--text-secondary)">Kerjakan tugas berikut:</p>
      ${w3Step(1, 'Gambarkan rangkaian gerbang logika')}
      ${w3Step(2, 'Susun tabel kebenaran')}
      ${w3Step(3, 'Tentukan persamaan Boolean')}
      ${w3Step(4, 'Jelaskan fungsi setiap gerbang')}

      ${w3Spoiler('📖 Lihat Pembahasan', `
        <h4 style="margin:0 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-violet)">1. Rangkaian Gerbang Logika</h4>
        <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:16px;margin-bottom:16px">
          <svg width="320" height="130" viewBox="0 0 320 130" style="display:block;margin:0 auto">
            <defs>
              <marker id="arrowW3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="var(--accent-cyan)"/>
              </marker>
            </defs>
            <!-- Input labels -->
            <text x="10" y="38" fill="var(--text)" font-family="var(--font-mono)" font-size="13" font-weight="700">A</text>
            <text x="10" y="68" fill="var(--text)" font-family="var(--font-mono)" font-size="13" font-weight="700">B</text>
            <text x="10" y="108" fill="var(--text)" font-family="var(--font-mono)" font-size="13" font-weight="700">C</text>
            <!-- Wires to AND -->
            <line x1="28" y1="35" x2="60" y2="35" stroke="var(--accent-cyan)" stroke-width="2"/>
            <line x1="28" y1="65" x2="60" y2="65" stroke="var(--accent-cyan)" stroke-width="2"/>
            <!-- AND gate body -->
            <path d="M60 20 L90 20 Q130 20 130 50 Q130 80 90 80 L60 80 Z" fill="none" stroke="var(--accent-cyan)" stroke-width="2"/>
            <text x="90" y="55" fill="var(--accent-cyan)" font-family="var(--font-mono)" font-size="11" text-anchor="middle">AND</text>
            <!-- Wire from AND to OR -->
            <line x1="130" y1="50" x2="170" y2="40" stroke="var(--accent-cyan)" stroke-width="2"/>
            <!-- C to OR -->
            <line x1="28" y1="105" x2="155" y2="105" stroke="var(--accent-cyan)" stroke-width="2"/>
            <line x1="155" y1="105" x2="170" y2="70" stroke="var(--accent-cyan)" stroke-width="2"/>
            <!-- OR gate body -->
            <path d="M165 25 Q175 55 165 85 Q210 85 250 55 Q210 25 165 25 Z" fill="none" stroke="var(--accent-violet)" stroke-width="2"/>
            <text x="205" y="60" fill="var(--accent-violet)" font-family="var(--font-mono)" font-size="11" text-anchor="middle">OR</text>
            <!-- Output -->
            <line x1="250" y1="55" x2="290" y2="55" stroke="var(--accent-violet)" stroke-width="2" marker-end="url(#arrowW3)"/>
            <text x="298" y="60" fill="var(--text)" font-family="var(--font-mono)" font-size="13" font-weight="700">F</text>
          </svg>
        </div>

        <h4 style="margin:16px 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-violet)">2. Tabel Kebenaran</h4>
        ${w3Table(['A', 'B', 'C', 'A·B', 'F = (A·B)+C'],
          [
            ['0','0','0','0','<span style="color:var(--danger)">0</span>'],
            ['0','0','1','0','<span style="color:var(--success);font-weight:700">1</span>'],
            ['0','1','0','0','<span style="color:var(--danger)">0</span>'],
            ['0','1','1','0','<span style="color:var(--success);font-weight:700">1</span>'],
            ['1','0','0','0','<span style="color:var(--danger)">0</span>'],
            ['1','0','1','0','<span style="color:var(--success);font-weight:700">1</span>'],
            ['1','1','0','1','<span style="color:var(--success);font-weight:700">1</span>'],
            ['1','1','1','1','<span style="color:var(--success);font-weight:700">1</span>']
          ]
        )}

        <h4 style="margin:16px 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-violet)">3 & 4. Persamaan & Fungsi Gerbang</h4>
        ${w3Code([
          "Persamaan: F = (A · B) + C",
          "",
          "Fungsi setiap gerbang:",
          "• Gerbang AND: Menerima input A dan B,",
          "  menghasilkan output 1 hanya jika A=1 DAN B=1.",
          "• Gerbang OR: Menerima output AND dan input C,",
          "  menghasilkan output 1 jika salah satu atau",
          "  keduanya bernilai 1."
        ])}
      `)}`
    )}

    <!-- Latihan 3 -->
    ${w3Section('Latihan 3: Rangkaian C, D, dan Q', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      `<div style="background:var(--accent-amber-dim);border:1px solid var(--accent-amber);border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <p style="margin:0;font-size:0.95rem;font-weight:600">Diberikan rangkaian dengan konfigurasi berikut:</p>
        <ul style="margin:8px 0 0;padding-left:18px;font-size:0.9rem;line-height:1.8">
          <li>Input: A dan B</li>
          <li>Gerbang NAND menghasilkan: <code style="font-family:var(--font-mono);background:var(--bg-card);padding:2px 6px;border-radius:4px">C = (A·B)'</code></li>
          <li>Gerbang NOR menghasilkan: <code style="font-family:var(--font-mono);background:var(--bg-card);padding:2px 6px;border-radius:4px">D = (A+B)'</code></li>
          <li>Sinyal C dan D masuk ke gerbang AND: <code style="font-family:var(--font-mono);background:var(--bg-card);padding:2px 6px;border-radius:4px">Q = C · D</code></li>
        </ul>
      </div>
      <p style="margin:0 0 8px;font-size:0.9rem;color:var(--text-secondary)">Tentukan:</p>
      ${w3Step(1, 'Tabel kebenaran untuk C, D, dan Q')}
      ${w3Step(2, 'Gerbang tunggal yang ekuivalen dengan rangkaian ini')}

      ${w3Spoiler('📖 Lihat Pembahasan', `
        <h4 style="margin:0 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-amber)">Tabel Kebenaran</h4>
        ${w3Table(['A', 'B', "C = (A·B)'", "D = (A+B)'", 'Q = C·D'],
          [
            ['0','0','1','1','<span style="color:var(--success);font-weight:700">1</span>'],
            ['0','1','1','0','<span style="color:var(--danger)">0</span>'],
            ['1','0','1','0','<span style="color:var(--danger)">0</span>'],
            ['1','1','0','0','<span style="color:var(--danger)">0</span>']
          ]
        )}

        <h4 style="margin:16px 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-amber)">Pembuktian Aljabar</h4>
        ${w3Code([
          "Q = C · D",
          "  = (A·B)' · (A+B)'",
          "  = (A'+B') · (A'·B')     ← De Morgan",
          "  = A'·B'                  ← Hukum Absorpsi: X·(X·Y)=X karena",
          "                             (A'+B')·(A'·B') dan A'·B' ⊆ A'+B'",
          "",
          "Alternatif: dari tabel kebenaran,",
          "Q = 1 hanya saat A=0 dan B=0",
          "Q = A'·B' = (A+B)'         ← De Morgan"
        ], 'Analisis')}

        ${w3Alert('success', 'Rangkaian ekuivalen dengan gerbang <strong>NOR</strong> tunggal: <strong>Q = (A+B)\'</strong>')}
      `)}`
    )}

    <!-- Latihan 4 -->
    ${w3Section('Latihan 4: Kombinasi AND, OR, dan XOR', '--accent-rose',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>',
      `<div style="background:var(--accent-rose-dim);border:1px solid var(--accent-rose);border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <p style="margin:0;font-size:0.95rem;font-weight:600">Konfigurasi rangkaian:</p>
        <ul style="margin:8px 0 0;padding-left:18px;font-size:0.9rem;line-height:1.8">
          <li>Gerbang AND menghasilkan: <code style="font-family:var(--font-mono);background:var(--bg-card);padding:2px 6px;border-radius:4px">C = A · B</code></li>
          <li>Gerbang OR menghasilkan: <code style="font-family:var(--font-mono);background:var(--bg-card);padding:2px 6px;border-radius:4px">D = A + B</code></li>
          <li>Gerbang XOR dari C dan D: <code style="font-family:var(--font-mono);background:var(--bg-card);padding:2px 6px;border-radius:4px">Q = C ⊕ D</code></li>
        </ul>
      </div>
      <p style="margin:0 0 8px;font-size:0.9rem;color:var(--text-secondary)">Tugas:</p>
      ${w3Step(1, 'Gambarkan rangkaian logika')}
      ${w3Step(2, 'Tuliskan persamaan Boolean')}
      ${w3Step(3, 'Buat tabel kebenaran lengkap')}

      ${w3Spoiler('📖 Lihat Pembahasan', `
        <h4 style="margin:0 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-rose)">1. Rangkaian Logika</h4>
        <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:16px;margin-bottom:16px">
          <svg width="380" height="150" viewBox="0 0 380 150" style="display:block;margin:0 auto">
            <!-- Input labels -->
            <text x="10" y="35" fill="var(--text)" font-family="var(--font-mono)" font-size="12" font-weight="700">A</text>
            <text x="10" y="125" fill="var(--text)" font-family="var(--font-mono)" font-size="12" font-weight="700">B</text>
            <!-- Wires -->
            <line x1="25" y1="32" x2="55" y2="32" stroke="var(--accent-cyan)" stroke-width="1.5"/>
            <line x1="25" y1="32" x2="25" y2="88" stroke="var(--accent-cyan)" stroke-width="1.5"/>
            <line x1="25" y1="88" x2="55" y2="88" stroke="var(--accent-violet)" stroke-width="1.5"/>
            <line x1="25" y1="122" x2="40" y2="122" stroke="var(--accent-cyan)" stroke-width="1.5"/>
            <line x1="40" y1="122" x2="40" y2="48" stroke="var(--accent-cyan)" stroke-width="1.5"/>
            <line x1="40" y1="48" x2="55" y2="48" stroke="var(--accent-cyan)" stroke-width="1.5"/>
            <line x1="40" y1="122" x2="55" y2="104" stroke="var(--accent-violet)" stroke-width="1.5"/>
            <!-- AND gate -->
            <path d="M55 22 L80 22 Q110 22 110 40 Q110 58 80 58 L55 58 Z" fill="none" stroke="var(--accent-cyan)" stroke-width="2"/>
            <text x="80" y="44" fill="var(--accent-cyan)" font-family="var(--font-mono)" font-size="10" text-anchor="middle">AND</text>
            <!-- OR gate -->
            <path d="M52 78 Q62 96 52 114 Q85 114 115 96 Q85 78 52 78 Z" fill="none" stroke="var(--accent-violet)" stroke-width="2"/>
            <text x="82" y="100" fill="var(--accent-violet)" font-family="var(--font-mono)" font-size="10" text-anchor="middle">OR</text>
            <!-- Labels C, D -->
            <text x="125" y="44" fill="var(--accent-cyan)" font-family="var(--font-mono)" font-size="11" font-weight="600">C</text>
            <text x="125" y="100" fill="var(--accent-violet)" font-family="var(--font-mono)" font-size="11" font-weight="600">D</text>
            <!-- Wires to XOR -->
            <line x1="110" y1="40" x2="185" y2="55" stroke="var(--accent-cyan)" stroke-width="1.5"/>
            <line x1="115" y1="96" x2="185" y2="80" stroke="var(--accent-violet)" stroke-width="1.5"/>
            <!-- XOR gate -->
            <path d="M180 45 Q192 68 180 90 Q215 90 250 68 Q215 45 180 45 Z" fill="none" stroke="var(--accent-rose)" stroke-width="2"/>
            <path d="M175 45 Q187 68 175 90" fill="none" stroke="var(--accent-rose)" stroke-width="2"/>
            <text x="215" y="72" fill="var(--accent-rose)" font-family="var(--font-mono)" font-size="10" text-anchor="middle">XOR</text>
            <!-- Output -->
            <line x1="250" y1="68" x2="300" y2="68" stroke="var(--accent-rose)" stroke-width="2"/>
            <text x="310" y="72" fill="var(--text)" font-family="var(--font-mono)" font-size="13" font-weight="700">Q</text>
          </svg>
        </div>

        <h4 style="margin:16px 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-rose)">2. Persamaan Boolean</h4>
        ${w3Code([
          "C = A · B",
          "D = A + B",
          "Q = C ⊕ D = (A·B) ⊕ (A+B)",
          "",
          "Dalam bentuk SOP:",
          "Q = C'D + CD'",
          "  = (A·B)'·(A+B) + (A·B)·(A+B)'",
          "  = (A'+B')·(A+B) + (A·B)·(A'·B')",
          "  Karena A·B·A'·B' selalu = 0:",
          "  = (A'+B')·(A+B)",
          "  = A'A + A'B + AB' + BB'",
          "  = 0 + A'B + AB' + 0",
          "  = A'B + AB'",
          "  = A ⊕ B"
        ], 'Analisis')}

        <h4 style="margin:16px 0 12px;font-size:0.92rem;font-weight:700;color:var(--accent-rose)">3. Tabel Kebenaran</h4>
        ${w3Table(['A', 'B', 'C = A·B', 'D = A+B', 'Q = C⊕D'],
          [
            ['0','0','0','0','<span style="color:var(--danger)">0</span>'],
            ['0','1','0','1','<span style="color:var(--success);font-weight:700">1</span>'],
            ['1','0','0','1','<span style="color:var(--success);font-weight:700">1</span>'],
            ['1','1','1','1','<span style="color:var(--danger)">0</span>']
          ]
        )}

        ${w3Alert('success', 'Menarik! Rangkaian kombinasi AND → OR → XOR ternyata ekuivalen dengan gerbang <strong>XOR</strong> tunggal: <strong>Q = A ⊕ B</strong>')}
      `)}`
    )}
  `;
}


/* ══════════════════════════════════════════════════════
   TOPIK 10: RINGKASAN & EVALUASI AKHIR
   ══════════════════════════════════════════════════════ */
function renderWeek3Summary(el) {
  // State for quiz
  const quizId = 'w3quiz_' + Math.random().toString(36).substr(2, 9);

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,var(--accent-cyan-dim) 0%,var(--accent-amber-dim) 100%);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700">📋 Ringkasan Materi & Evaluasi Akhir</h3>
      <p style="margin:0;font-size:0.9rem;color:var(--text-secondary);line-height:1.6">Rangkuman seluruh materi Pertemuan 3: Aljabar Boolean, dilengkapi evaluasi akhir berupa soal pilihan ganda dan esai.</p>
    </div>

    <!-- Ringkasan -->
    ${w3Section('Ringkasan Materi', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px">
        ${[
          ['🔢 Operator Boolean', 'Tiga operator dasar: AND (·), OR (+), dan NOT (\'). Prioritas: tanda kurung → NOT → AND → OR.', '--accent-cyan'],
          ['📐 Hukum Boolean', 'Identitas, Dominasi, Idempoten, Komplemen, Involusi, Komutatif, Asosiatif, Distributif, De Morgan, Absorpsi, dan Teorema Konsensus.', '--accent-violet'],
          ['📊 Tabel Kebenaran', 'Menampilkan semua kombinasi input (2ⁿ baris untuk n variabel) dan output dari fungsi Boolean.', '--accent-amber'],
          ['➕ SOP (Sum of Products)', 'Minterm (AND) digabung dengan OR. Dipilih dari baris output = 1. Variabel tanpa komplemen = 1.', '--accent-rose'],
          ['✖️ POS (Product of Sums)', 'Maxterm (OR) digabung dengan AND. Dipilih dari baris output = 0. Variabel tanpa komplemen = 0.', '--accent-cyan'],
          ['🔄 Konversi SOP ↔ POS', 'Melalui tabel kebenaran: SOP → identifikasi output 0 → buat maxterm. POS → identifikasi output 1 → buat minterm.', '--accent-violet'],
          ['📉 Penyederhanaan', 'Mengurangi jumlah gerbang dengan menerapkan hukum Boolean secara bertahap. Selalu verifikasi dengan tabel kebenaran.', '--accent-amber'],
          ['🔗 Boolean & Gerbang', 'Setiap persamaan Boolean dapat diimplementasikan langsung sebagai rangkaian gerbang logika, dan sebaliknya.', '--accent-rose']
        ].map(([title, desc, col]) => `
          <div style="background:var(--bg-inset);border:1px solid var(${col});border-radius:10px;padding:14px 16px;position:relative;overflow:hidden">
            <div style="position:absolute;top:-8px;right:-8px;width:40px;height:40px;border-radius:50%;background:var(${col}-glow);filter:blur(14px)"></div>
            <p style="margin:0 0 6px;font-size:0.88rem;font-weight:700;position:relative">${title}</p>
            <p style="margin:0;font-size:0.82rem;color:var(--text-secondary);line-height:1.5;position:relative">${desc}</p>
          </div>
        `).join('')}
      </div>`
    )}

    <!-- Evaluasi Pilihan Ganda -->
    ${w3Section('Evaluasi Akhir: Pilihan Ganda', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      `<div id="${quizId}">
        ${[
          {
            q: "1. Hasil dari operasi Boolean A + A' adalah ...",
            opts: ['0', '1', 'A', "A'"],
            correct: 1,
            explain: "Berdasarkan Hukum Komplemen: A + A' = 1. Sebuah variabel di-OR-kan dengan komplemennya selalu menghasilkan 1."
          },
          {
            q: "2. Hukum De Morgan menyatakan bahwa (A · B)' sama dengan ...",
            opts: ["A' · B'", "A' + B'", "A + B", "(A + B)'"],
            correct: 1,
            explain: "Hukum De Morgan: (A · B)' = A' + B'. Komplemen AND menjadi OR dari komplemen masing-masing."
          },
          {
            q: "3. Bentuk SOP (Sum of Products) terdiri dari ...",
            opts: [
              "Suku-suku OR yang digabung dengan AND",
              "Suku-suku AND yang digabung dengan OR",
              "Suku-suku NOT yang digabung dengan AND",
              "Suku-suku XOR yang digabung dengan OR"
            ],
            correct: 1,
            explain: "Pada SOP, setiap suku (product term) merupakan operasi AND, dan suku-suku tersebut digabung menggunakan OR (sum)."
          },
          {
            q: "4. Berapa jumlah baris dalam tabel kebenaran untuk fungsi dengan 4 variabel input?",
            opts: ['4', '8', '16', '32'],
            correct: 2,
            explain: "Jumlah baris = 2ⁿ = 2⁴ = 16 baris."
          },
          {
            q: "5. Penyederhanaan dari ekspresi A · 1 + A · 0 adalah ...",
            opts: ['0', '1', 'A', "A'"],
            correct: 2,
            explain: "A · 1 = A (Hukum Identitas), A · 0 = 0 (Hukum Dominasi), sehingga A + 0 = A (Hukum Identitas)."
          }
        ].map((item, qi) => `
          <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px 18px;margin-bottom:14px" id="${quizId}_q${qi}">
            <p style="margin:0 0 12px;font-size:0.92rem;font-weight:600">${item.q}</p>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${item.opts.map((opt, oi) => `
                <button type="button" class="w3-quiz-opt" data-qi="${qi}" data-oi="${oi}" data-correct="${item.correct}" onclick="w3CheckAnswer(this, '${quizId}', ${qi}, ${oi}, ${item.correct}, '${item.explain.replace(/'/g, "\\'")}')"
                  style="display:flex;align-items:center;gap:10px;background:var(--bg-card);border:1px solid var(--line);border-radius:8px;padding:10px 14px;cursor:pointer;text-align:left;font-size:0.88rem;transition:all 0.2s ease;width:100%">
                  <span style="min-width:24px;height:24px;border-radius:50%;border:2px solid var(--line);display:inline-flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:var(--text-faint)">${String.fromCharCode(65 + oi)}</span>
                  <span>${opt}</span>
                </button>
              `).join('')}
            </div>
            <div id="${quizId}_fb${qi}" style="margin-top:10px" hidden></div>
          </div>
        `).join('')}
      </div>`
    )}

    <!-- Evaluasi Esai -->
    ${w3Section('Evaluasi Akhir: Soal Esai', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      `<div style="background:var(--bg-card);border:1px solid var(--accent-violet);border-radius:10px;padding:16px 18px;margin-bottom:16px">
        <p style="margin:0 0 8px;font-size:0.82rem;font-weight:700;color:var(--accent-violet)">SOAL ESAI 1</p>
        <p style="margin:0;font-size:0.92rem;line-height:1.6">Sederhanakan ekspresi Boolean berikut menggunakan hukum-hukum Aljabar Boolean. Tunjukkan setiap langkah pengerjaan beserta nama hukum yang digunakan.</p>
        <p style="margin:10px 0 0;font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--accent-violet)">F = A'B'C + A'BC + AB'C + ABC + A'BC'</p>
      </div>

      ${w3Spoiler('📖 Lihat Kunci Jawaban Esai 1', `
        ${w3Code([
          "F = A'B'C + A'BC + AB'C + ABC + A'BC'",
          "",
          "Langkah 1: Kelompokkan suku yang mengandung C",
          "  = C(A'B' + A'B + AB' + AB) + A'BC'  ← Distributif",
          "",
          "Langkah 2: Sederhanakan dalam kurung",
          "  A'B' + A'B = A'(B'+B) = A'·1 = A'   ← Distributif, Komplemen, Identitas",
          "  AB' + AB = A(B'+B) = A·1 = A         ← Distributif, Komplemen, Identitas",
          "",
          "Langkah 3: Substitusi",
          "  = C(A' + A) + A'BC'",
          "  = C·1 + A'BC'                        ← Komplemen",
          "  = C + A'BC'                           ← Identitas",
          "",
          "Langkah 4: Terapkan A + A'B = A + B",
          "  Bentuk: C + A'BC'",
          "  = C + A'B  (absorpsi karena C menyerap C')",
          "",
          "Namun perlu dicek ulang:",
          "  C + A'BC' ≠ C + A'B secara langsung.",
          "  Gunakan: C + XC' = C + X (karena C + XC' = C(1) + XC'",
          "                            = C + XC' dan C + C'X = C + X)",
          "  Jadi: C + A'B·C' = C + A'B",
          "",
          "Hasil: F = C + A'B"
        ], 'Penyelesaian')}
      `)}

      <div style="background:var(--bg-card);border:1px solid var(--accent-violet);border-radius:10px;padding:16px 18px;margin-top:16px">
        <p style="margin:0 0 8px;font-size:0.82rem;font-weight:700;color:var(--accent-violet)">SOAL ESAI 2</p>
        <p style="margin:0;font-size:0.92rem;line-height:1.6">Diberikan fungsi Boolean F(A,B,C) = Σm(0,2,5,7). Lakukan hal berikut:</p>
        <ol style="margin:10px 0 0;padding-left:20px;font-size:0.9rem;line-height:1.8">
          <li>Tuliskan ekspresi SOP dalam bentuk kanonis.</li>
          <li>Buatlah tabel kebenaran lengkap.</li>
          <li>Konversikan ke bentuk POS.</li>
          <li>Sederhanakan ekspresi jika memungkinkan.</li>
        </ol>
      </div>

      ${w3Spoiler('📖 Lihat Kunci Jawaban Esai 2', `
        <h4 style="margin:0 0 10px;font-size:0.92rem;font-weight:700;color:var(--accent-violet)">1. Bentuk SOP Kanonis</h4>
        ${w3Code([
          "F = Σm(0,2,5,7)",
          "  = m₀ + m₂ + m₅ + m₇",
          "  = A'B'C' + A'BC' + AB'C + ABC"
        ])}

        <h4 style="margin:16px 0 10px;font-size:0.92rem;font-weight:700;color:var(--accent-violet)">2. Tabel Kebenaran</h4>
        ${w3Table(['Baris', 'A', 'B', 'C', 'Minterm', 'F'],
          [
            ['0','0','0','0',"A'B'C'",'<span style="color:var(--success);font-weight:700">1</span>'],
            ['1','0','0','1',"A'B'C",'<span style="color:var(--danger)">0</span>'],
            ['2','0','1','0',"A'BC'",'<span style="color:var(--success);font-weight:700">1</span>'],
            ['3','0','1','1',"A'BC",'<span style="color:var(--danger)">0</span>'],
            ['4','1','0','0',"AB'C'",'<span style="color:var(--danger)">0</span>'],
            ['5','1','0','1',"AB'C",'<span style="color:var(--success);font-weight:700">1</span>'],
            ['6','1','1','0',"ABC'",'<span style="color:var(--danger)">0</span>'],
            ['7','1','1','1',"ABC",'<span style="color:var(--success);font-weight:700">1</span>']
          ]
        )}

        <h4 style="margin:16px 0 10px;font-size:0.92rem;font-weight:700;color:var(--accent-violet)">3. Konversi ke POS</h4>
        ${w3Code([
          "Baris output = 0: baris 1, 3, 4, 6",
          "",
          "Maxterm baris 1 (A=0,B=0,C=1): (A + B + C')",
          "Maxterm baris 3 (A=0,B=1,C=1): (A + B' + C')",
          "Maxterm baris 4 (A=1,B=0,C=0): (A' + B + C)",
          "Maxterm baris 6 (A=1,B=1,C=0): (A' + B' + C)",
          "",
          "F = (A+B+C')·(A+B'+C')·(A'+B+C)·(A'+B'+C)",
          "  = ΠM(1,3,4,6)"
        ])}

        <h4 style="margin:16px 0 10px;font-size:0.92rem;font-weight:700;color:var(--accent-violet)">4. Penyederhanaan</h4>
        ${w3Code([
          "F = A'B'C' + A'BC' + AB'C + ABC",
          "",
          "Kelompok 1: A'B'C' + A'BC' = A'C'(B'+B) = A'C'",
          "Kelompok 2: AB'C + ABC = AC(B'+B) = AC",
          "",
          "F = A'C' + AC",
          "",
          "Perhatikan pola: F=1 saat A=C'",
          "Ini adalah XNOR: F = (A ⊕ C)' = A'C' + AC"
        ])}
        ${w3Alert('success', "Hasil: <strong>F = A'C' + AC = (A ⊕ C)'</strong> → ekuivalen dengan gerbang XNOR antara A dan C.")}
      `)}`
    )}
  `;

  // Register quiz handler
  window.w3CheckAnswer = function(btn, qid, qi, selected, correct, explain) {
    const qDiv = document.getElementById(`${qid}_q${qi}`);
    const fbDiv = document.getElementById(`${qid}_fb${qi}`);
    if (!qDiv || !fbDiv) return;

    // Disable all buttons in this question
    qDiv.querySelectorAll('.w3-quiz-opt').forEach(b => {
      b.style.pointerEvents = 'none';
      b.style.opacity = '0.7';
    });

    const isCorrect = selected === correct;

    // Highlight selected
    btn.style.opacity = '1';
    if (isCorrect) {
      btn.style.borderColor = 'var(--success)';
      btn.style.background = 'var(--success-dim)';
    } else {
      btn.style.borderColor = 'var(--danger)';
      btn.style.background = 'var(--danger-dim)';
      // Also highlight correct
      const correctBtn = qDiv.querySelectorAll('.w3-quiz-opt')[correct];
      if (correctBtn) {
        correctBtn.style.opacity = '1';
        correctBtn.style.borderColor = 'var(--success)';
        correctBtn.style.background = 'var(--success-dim)';
      }
    }

    // Show feedback
    fbDiv.hidden = false;
    fbDiv.innerHTML = `
      <div style="display:flex;gap:8px;align-items:flex-start;background:${isCorrect ? 'var(--success-dim)' : 'var(--danger-dim)'};border-left:3px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'};border-radius:0 8px 8px 0;padding:10px 14px;font-size:0.85rem;line-height:1.6">
        <span>${isCorrect ? '✅' : '❌'}</span>
        <span>${isCorrect ? '<strong>Benar!</strong> ' : '<strong>Kurang tepat.</strong> '}${explain}</span>
      </div>`;
  };
}

/**
 * week4.js — SisDik Learn: Pertemuan 4
 * ----------------------------------------
 * Materi: Penyederhanaan Fungsi Boolean menggunakan Karnaugh Map (K-Map)
 * Berisi seluruh render function untuk topik-topik Minggu 4.
 */

/* ───── HELPERS (w4 namespace) ───── */
function w4Section(title, accentVar, iconSvg, bodyHTML) {
  return `
    <div class="info-card" style="margin-bottom:28px;border-left:3px solid var(${accentVar})">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(${accentVar}-dim)">${iconSvg}</span>
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:var(${accentVar})">${title}</h3>
      </div>
      <div>${bodyHTML}</div>
    </div>`;
}

function w4Code(lines, label) {
  const inner = Array.isArray(lines) ? lines.join('\n') : lines;
  return `<div style="margin:12px 0">${label ? `<p style="font-size:0.78rem;color:var(--text-faint);font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">${label}</p>` : ''}
    <pre style="font-family:var(--font-mono);font-size:0.88rem;line-height:1.7;background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px 18px;overflow-x:auto;margin:0"><code>${inner}</code></pre></div>`;
}

function w4Step(n, text) {
  return `<div style="display:flex;align-items:flex-start;gap:12px;margin:10px 0">
    <span style="min-width:26px;height:26px;border-radius:50%;background:var(--accent-cyan-dim);border:1.5px solid var(--accent-cyan);color:var(--accent-cyan);font-size:0.78rem;font-weight:700;display:inline-flex;align-items:center;justify-content:center;margin-top:1px">${n}</span>
    <span style="font-size:0.95rem;line-height:1.6">${text}</span></div>`;
}

function w4Alert(type, text) {
  const map = { info:['var(--accent-cyan)','💡'], warning:['var(--accent-amber)','⚠️'], success:['var(--success)','✅'], danger:['var(--danger)','🚨'] };
  const [color, icon] = map[type] || map.info;
  return `<div style="display:flex;gap:10px;align-items:flex-start;background:var(--bg-inset);border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:12px 14px;margin:14px 0;font-size:0.9rem;line-height:1.6">
    <span>${icon}</span><span>${text}</span></div>`;
}

function w4Table(headers, rows) {
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

function w4Spoiler(buttonLabel, contentHTML) {
  const uid = 'w4sp_' + Math.random().toString(36).substr(2, 9);
  return `<div style="margin:16px 0">
    <button type="button" onclick="(function(){var c=document.getElementById('${uid}');c.hidden=!c.hidden;this.querySelector('.sp-arrow').textContent=c.hidden?'▶':'▼'}).call(this)" style="display:flex;align-items:center;gap:8px;background:var(--accent-violet-dim);border:1px solid var(--accent-violet);color:var(--accent-violet);padding:10px 16px;border-radius:10px;cursor:pointer;font-size:0.88rem;font-weight:600;width:100%;text-align:left">
      <span class="sp-arrow">▶</span> ${buttonLabel}
    </button>
    <div id="${uid}" hidden style="background:var(--bg-inset);border:1px solid var(--line);border-radius:0 0 10px 10px;padding:16px 18px;margin-top:-2px">
      ${contentHTML}
    </div>
  </div>`;
}

/* ─── K-Map SVG Renderers ─── */
/* K-Map 2 variabel (2x2) */
function w4KMap2(values, groups, caption) {
  // values: [m0, m1, m2, m3] where m0=A'B', m1=A'B, m2=AB', m3=AB
  // positions: row 0: A=0 [m0, m1]; row 1: A=1 [m2, m3]
  const cellW = 60, cellH = 60;
  const ox = 75, oy = 55;
  const positions = [
    [ox, oy],                 // m0: row 0, col 0
    [ox + cellW, oy],         // m1: row 0, col 1
    [ox, oy + cellH],         // m2: row 1, col 0
    [ox + cellW, oy + cellH]   // m3: row 1, col 1
  ];
  const mintermNames = ['m₀ (00)', 'm₁ (01)', 'm₂ (10)', 'm₃ (11)'];
  const W = ox + cellW * 2 + 25;
  const H = oy + cellH * 2 + 25;

  let groupRects = '';
  if (groups && groups.length > 0) {
    groups.forEach((g, gIdx) => {
      const xs = g.cells.map(i => positions[i][0]);
      const ys = g.cells.map(i => positions[i][1]);
      const minX = Math.min(...xs) + 4;
      const minY = Math.min(...ys) + 4;
      const maxX = Math.max(...xs) + cellW - 4;
      const maxY = Math.max(...ys) + cellH - 4;
      const color = g.color || 'var(--accent-cyan)';
      groupRects += `<rect x="${minX}" y="${minY}" width="${maxX - minX}" height="${maxY - minY}" rx="10" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
      if (g.label) {
        groupRects += `<text x="${(minX + maxX)/2}" y="${minY - 6}" font-size="11" font-weight="700" fill="${color}" text-anchor="middle" font-family="var(--font-mono)">${g.label}</text>`;
      }
    });
  }

  let cellSVG = '';
  positions.forEach(([x, y], i) => {
    const val = values && values[i] !== undefined ? String(values[i]) : '0';
    const isOne = val === '1';
    const isX = val === 'X' || val === 'x';
    const textColor = isOne ? 'var(--success)' : (isX ? 'var(--accent-amber)' : 'var(--text-faint)');
    const cellBg = isOne ? 'rgba(34,197,94,0.08)' : (isX ? 'rgba(245,158,11,0.08)' : 'var(--bg-inset)');

    cellSVG += `
      <rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" fill="${cellBg}" stroke="var(--line)" stroke-width="1.5"/>
      <text x="${x + cellW/2}" y="${y + cellH/2 + 2}" text-anchor="middle" dominant-baseline="middle" font-size="20" font-weight="800" fill="${textColor}" font-family="var(--font-mono)">${val}</text>
      <text x="${x + cellW - 6}" y="${y + 11}" text-anchor="end" font-size="9" fill="var(--text-faint)" font-family="var(--font-mono)">${mintermNames[i]}</text>
    `;
  });

  return `
    <div style="text-align:center;margin:18px 0">
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:inline-block;max-width:100%;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.15))">
        <!-- Labels -->
        <text x="${ox + cellW}" y="${oy - 30}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-ui)">Variabel B</text>
        <text x="${ox - 45}" y="${oy + cellH}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="700" fill="var(--accent-violet)" font-family="var(--font-ui)">Variabel A</text>

        <!-- Column headers -->
        <text x="${ox + cellW * 0.5}" y="${oy - 10}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-mono)">0</text>
        <text x="${ox + cellW * 1.5}" y="${oy - 10}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-mono)">1</text>

        <!-- Row headers -->
        <text x="${ox - 16}" y="${oy + cellH * 0.5}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-mono)">0</text>
        <text x="${ox - 16}" y="${oy + cellH * 1.5}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-mono)">1</text>

        <!-- Diagonal slash -->
        <line x1="${ox - 35}" y1="${oy - 20}" x2="${ox}" y2="${oy}" stroke="var(--line)" stroke-width="1.5"/>
        <text x="${ox - 24}" y="${oy - 8}" font-size="10" font-weight="600" fill="var(--accent-cyan)" font-family="var(--font-mono)">B</text>
        <text x="${ox - 10}" y="${oy - 2}" font-size="10" font-weight="600" fill="var(--accent-violet)" font-family="var(--font-mono)">A</text>

        ${cellSVG}
        ${groupRects}
      </svg>
      ${caption ? `<p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">${caption}</p>` : ''}
    </div>`;
}

/* K-Map 3 variabel (2x4) */
function w4KMap3(values, groups, caption) {
  // values: array of 8 values index 0..7 (m0..m7)
  // Grid layout:
  // Row 0 (A=0): col 0(BC=00) -> m0, col 1(BC=01) -> m1, col 2(BC=11) -> m3, col 3(BC=10) -> m2
  // Row 1 (A=1): col 0(BC=00) -> m4, col 1(BC=01) -> m5, col 2(BC=11) -> m7, col 3(BC=10) -> m6
  const cellW = 58, cellH = 58;
  const ox = 75, oy = 55;
  const gridMinterms = [
    [0, 1, 3, 2],
    [4, 5, 7, 6]
  ];
  const colLabels = ['00', '01', '11', '10'];
  const mintermPos = {};
  gridMinterms.forEach((row, ri) => {
    row.forEach((m, ci) => {
      mintermPos[m] = [ox + ci * cellW, oy + ri * cellH, ri, ci];
    });
  });

  const W = ox + cellW * 4 + 25;
  const H = oy + cellH * 2 + 25;

  let groupRects = '';
  if (groups && groups.length > 0) {
    groups.forEach(g => {
      const positions = g.cells.map(m => mintermPos[m]);
      const ris = positions.map(p => p[2]);
      const cis = positions.map(p => p[3]);
      const minR = Math.min(...ris), maxR = Math.max(...ris);
      const minC = Math.min(...cis), maxC = Math.max(...cis);
      const color = g.color || 'var(--accent-cyan)';

      // Check wrap around across columns 0 and 3
      const isWrapCol = cis.includes(0) && cis.includes(3) && !cis.includes(1) && !cis.includes(2);
      if (isWrapCol) {
        // Draw 2 partial rects on left and right borders
        const h = cellH * (maxR - minR + 1) - 8;
        const y = oy + minR * cellH + 4;
        groupRects += `<rect x="${ox + 4}" y="${y}" width="${cellW - 8}" height="${h}" rx="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
        groupRects += `<rect x="${ox + cellW * 3 + 4}" y="${y}" width="${cellW - 8}" height="${h}" rx="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
      } else {
        const x = ox + minC * cellW + 4;
        const y = oy + minR * cellH + 4;
        const w = cellW * (maxC - minC + 1) - 8;
        const h = cellH * (maxR - minR + 1) - 8;
        groupRects += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
      }
      if (g.label) {
        groupRects += `<text x="${ox + (minC + maxC + 1)*cellW/2}" y="${oy + minR * cellH - 4}" font-size="11" font-weight="700" fill="${color}" text-anchor="middle" font-family="var(--font-mono)">${g.label}</text>`;
      }
    });
  }

  let cellSVG = '';
  gridMinterms.forEach((row, ri) => {
    row.forEach((m, ci) => {
      const x = ox + ci * cellW;
      const y = oy + ri * cellH;
      const val = values && values[m] !== undefined ? String(values[m]) : '0';
      const isOne = val === '1';
      const isX = val === 'X' || val === 'x';
      const textColor = isOne ? 'var(--success)' : (isX ? 'var(--accent-amber)' : 'var(--text-faint)');
      const cellBg = isOne ? 'rgba(34,197,94,0.08)' : (isX ? 'rgba(245,158,11,0.08)' : 'var(--bg-inset)');

      cellSVG += `
        <rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" fill="${cellBg}" stroke="var(--line)" stroke-width="1.5"/>
        <text x="${x + cellW/2}" y="${y + cellH/2 + 2}" text-anchor="middle" dominant-baseline="middle" font-size="18" font-weight="800" fill="${textColor}" font-family="var(--font-mono)">${val}</text>
        <text x="${x + cellW - 5}" y="${y + 11}" text-anchor="end" font-size="8.5" fill="var(--text-faint)" font-family="var(--font-mono)">m${m}</text>
      `;
    });
  });

  return `
    <div style="text-align:center;margin:18px 0">
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:inline-block;max-width:100%;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.15))">
        <!-- Labels -->
        <text x="${ox + cellW * 2}" y="${oy - 30}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-ui)">BC (Kode Gray)</text>
        <text x="${ox - 45}" y="${oy + cellH}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="700" fill="var(--accent-violet)" font-family="var(--font-ui)">A</text>

        <!-- Column headers -->
        ${colLabels.map((lbl, ci) => `<text x="${ox + ci * cellW + cellW/2}" y="${oy - 10}" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-mono)">${lbl}</text>`).join('')}

        <!-- Row headers -->
        <text x="${ox - 16}" y="${oy + cellH * 0.5}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-mono)">0</text>
        <text x="${ox - 16}" y="${oy + cellH * 1.5}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-mono)">1</text>

        <!-- Diagonal slash -->
        <line x1="${ox - 35}" y1="${oy - 20}" x2="${ox}" y2="${oy}" stroke="var(--line)" stroke-width="1.5"/>
        <text x="${ox - 24}" y="${oy - 8}" font-size="9.5" font-weight="600" fill="var(--accent-cyan)" font-family="var(--font-mono)">BC</text>
        <text x="${ox - 10}" y="${oy - 2}" font-size="9.5" font-weight="600" fill="var(--accent-violet)" font-family="var(--font-mono)">A</text>

        ${cellSVG}
        ${groupRects}
      </svg>
      ${caption ? `<p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">${caption}</p>` : ''}
    </div>`;
}

/* K-Map 4 variabel (4x4) */
function w4KMap4(values, groups, caption) {
  // values: array of 16 values index 0..15
  // Row order AB: 00 (row 0), 01 (row 1), 11 (row 2), 10 (row 3)
  // Col order CD: 00 (col 0), 01 (col 1), 11 (col 2), 10 (col 3)
  const cellW = 52, cellH = 52;
  const ox = 78, oy = 60;
  const rowAB = [[0,0],[0,1],[1,1],[1,0]];
  const colCD = [[0,0],[0,1],[1,1],[1,0]];
  const rowLabels = ['00', '01', '11', '10'];
  const colLabels = ['00', '01', '11', '10'];

  function getM(ri, ci) {
    const [A,B] = rowAB[ri];
    const [C,D] = colCD[ci];
    return 8*A + 4*B + 2*C + D;
  }

  const mintermPos = {};
  for (let ri = 0; ri < 4; ri++) {
    for (let ci = 0; ci < 4; ci++) {
      const m = getM(ri, ci);
      mintermPos[m] = [ox + ci * cellW, oy + ri * cellH, ri, ci];
    }
  }

  const W = ox + cellW * 4 + 25;
  const H = oy + cellH * 4 + 25;

  let groupRects = '';
  if (groups && groups.length > 0) {
    groups.forEach(g => {
      const positions = g.cells.map(m => mintermPos[m]);
      const ris = positions.map(p => p[2]);
      const cis = positions.map(p => p[3]);
      const minR = Math.min(...ris), maxR = Math.max(...ris);
      const minC = Math.min(...cis), maxC = Math.max(...cis);
      const color = g.color || 'var(--accent-cyan)';

      const wrapRow = ris.includes(0) && ris.includes(3) && !ris.includes(1) && !ris.includes(2);
      const wrapCol = cis.includes(0) && cis.includes(3) && !cis.includes(1) && !cis.includes(2);

      if (wrapRow && wrapCol) {
        // 4 corners
        [ [0,0], [0,3], [3,0], [3,3] ].forEach(([r, c]) => {
          groupRects += `<rect x="${ox + c * cellW + 4}" y="${oy + r * cellH + 4}" width="${cellW - 8}" height="${cellH - 8}" rx="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
        });
      } else if (wrapCol && !wrapRow) {
        // wrap left and right columns
        const h = cellH * (maxR - minR + 1) - 8;
        const y = oy + minR * cellH + 4;
        groupRects += `<rect x="${ox + 4}" y="${y}" width="${cellW - 8}" height="${h}" rx="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
        groupRects += `<rect x="${ox + cellW * 3 + 4}" y="${y}" width="${cellW - 8}" height="${h}" rx="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
      } else if (wrapRow && !wrapCol) {
        // wrap top and bottom rows
        const w = cellW * (maxC - minC + 1) - 8;
        const x = ox + minC * cellW + 4;
        groupRects += `<rect x="${x}" y="${oy + 4}" width="${w}" height="${cellH - 8}" rx="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
        groupRects += `<rect x="${x}" y="${oy + cellH * 3 + 4}" width="${w}" height="${cellH - 8}" rx="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
      } else {
        const x = ox + minC * cellW + 4;
        const y = oy + minR * cellH + 4;
        const w = cellW * (maxC - minC + 1) - 8;
        const h = cellH * (maxR - minR + 1) - 8;
        groupRects += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.9"/>`;
      }
      if (g.label) {
        groupRects += `<text x="${ox + (minC + maxC + 1)*cellW/2}" y="${oy + minR * cellH - 4}" font-size="10.5" font-weight="700" fill="${color}" text-anchor="middle" font-family="var(--font-mono)">${g.label}</text>`;
      }
    });
  }

  let cellSVG = '';
  for (let ri = 0; ri < 4; ri++) {
    for (let ci = 0; ci < 4; ci++) {
      const m = getM(ri, ci);
      const x = ox + ci * cellW;
      const y = oy + ri * cellH;
      const val = values && values[m] !== undefined ? String(values[m]) : '0';
      const isOne = val === '1';
      const isX = val === 'X' || val === 'x';
      const textColor = isOne ? 'var(--success)' : (isX ? 'var(--accent-amber)' : 'var(--text-faint)');
      const cellBg = isOne ? 'rgba(34,197,94,0.08)' : (isX ? 'rgba(245,158,11,0.08)' : 'var(--bg-inset)');

      cellSVG += `
        <rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" fill="${cellBg}" stroke="var(--line)" stroke-width="1.5"/>
        <text x="${x + cellW/2}" y="${y + cellH/2 + 2}" text-anchor="middle" dominant-baseline="middle" font-size="16" font-weight="800" fill="${textColor}" font-family="var(--font-mono)">${val}</text>
        <text x="${x + cellW - 4}" y="${y + 10}" text-anchor="end" font-size="8" fill="var(--text-faint)" font-family="var(--font-mono)">m${m}</text>
      `;
    }
  }

  return `
    <div style="text-align:center;margin:18px 0">
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:inline-block;max-width:100%;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.15))">
        <!-- Labels -->
        <text x="${ox + cellW * 2}" y="${oy - 32}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-ui)">CD (Kode Gray)</text>
        <text x="${ox - 48}" y="${oy + cellH * 2}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="700" fill="var(--accent-violet)" font-family="var(--font-ui)">AB</text>

        <!-- Column headers -->
        ${colLabels.map((lbl, ci) => `<text x="${ox + ci * cellW + cellW/2}" y="${oy - 10}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-mono)">${lbl}</text>`).join('')}

        <!-- Row headers -->
        ${rowLabels.map((lbl, ri) => `<text x="${ox - 16}" y="${oy + ri * cellH + cellH/2}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-mono)">${lbl}</text>`).join('')}

        <!-- Diagonal slash -->
        <line x1="${ox - 38}" y1="${oy - 22}" x2="${ox}" y2="${oy}" stroke="var(--line)" stroke-width="1.5"/>
        <text x="${ox - 24}" y="${oy - 8}" font-size="9" font-weight="600" fill="var(--accent-cyan)" font-family="var(--font-mono)">CD</text>
        <text x="${ox - 12}" y="${oy - 2}" font-size="9" font-weight="600" fill="var(--accent-violet)" font-family="var(--font-mono)">AB</text>

        ${cellSVG}
        ${groupRects}
      </svg>
      ${caption ? `<p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">${caption}</p>` : ''}
    </div>`;
}



/* ══════════════════════════════════════════════════════
   TOPIK 1: PENDAHULUAN KARNAUGH MAP
   ══════════════════════════════════════════════════════ */
function renderWeek4Intro(el) {
  el.innerHTML = `
    <!-- Hero Banner -->
    <div style="background:linear-gradient(135deg,var(--accent-cyan-dim) 0%,var(--accent-violet-dim) 100%);border:1px solid var(--line);border-radius:16px;padding:28px 32px;margin-bottom:32px;position:relative;overflow:hidden">
      <div style="position:absolute;top:-20px;right:-20px;width:130px;height:130px;border-radius:50%;background:var(--accent-cyan-glow);filter:blur(45px)"></div>
      <div style="position:relative">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <span style="background:var(--accent-cyan-dim);color:var(--accent-cyan);border:1px solid var(--accent-cyan);padding:4px 12px;border-radius:99px;font-size:0.75rem;font-weight:700;letter-spacing:.06em">PERTEMUAN 4</span>
          <span style="font-size:0.78rem;color:var(--text-faint)">Sistem Digital</span>
        </div>
        <h2 style="margin:0 0 10px;font-size:1.5rem;font-weight:800">Penyederhanaan Fungsi Boolean Menggunakan Karnaugh Map (K-Map)</h2>
        <p style="margin:0;color:var(--text-secondary);font-size:0.95rem;max-width:620px;line-height:1.6">
          Karnaugh Map (K-Map) adalah metode grafis terstruktur yang memanfaatkan kemampuan pengenalan pola visual manusia untuk menyederhanakan persamaan Boolean menjadi bentuk minimum secara cepat, akurat, dan elegan tanpa rumus aljabar yang rumit.
        </p>
      </div>
    </div>

    <!-- Identitas Mata Kuliah -->
    ${w4Section('Identitas Modul Pembelajaran', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>',
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
        ${[
          ['Mata Kuliah', 'Sistem Digital'],
          ['Pertemuan', '4 dari 14'],
          ['Topik Pembahasan', 'Karnaugh Map (K-Map)'],
          ['Tingkat Kesulitan', 'Dasar ke Menengah']
        ].map(([k,v]) => `
          <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
            <p style="margin:0 0 4px;font-size:0.75rem;color:var(--text-faint);font-weight:600;text-transform:uppercase;letter-spacing:.06em">${k}</p>
            <p style="margin:0;font-weight:700">${v}</p>
          </div>`).join('')}
      </div>`
    )}

    <!-- Capaian Pembelajaran -->
    ${w4Section('Capaian Pembelajaran (CPMK-4)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <p style="margin:0;font-size:0.95rem;line-height:1.6;font-weight:500">Mahasiswa mampu <strong>menerapkan metode grafis Karnaugh Map</strong> untuk menyederhanakan fungsi logika Boolean dan <strong>merancang implementasi rangkaian kombinasi minimum</strong> dalam sistem digital.</p>
      </div>
      <p style="margin:0 0 12px;font-size:0.88rem;font-weight:600;color:var(--text-secondary)">Sub-kemampuan yang akan dicapai:</p>
      ${[
        'Memahami konsep dasar Karnaugh Map sebagai representasi geometris dari tabel kebenaran.',
        'Menganalisis hubungan langsung antara tabel kebenaran, minterm, dan koordinat sel K-Map.',
        'Menyederhanakan fungsi Boolean pada K-Map 2 variabel, 3 variabel, dan 4 variabel.',
        'Menguasai kaidah pengelompokan sel pangkat dua (1, 2, 4, 8, 16) serta sifat wrap-around tepi peta.',
        'Memanfaatkan kondisi don\'t care (X) untuk memaksimalkan ukuran kelompok minterm.',
        'Mengubah persamaan Boolean hasil penyederhanaan menjadi skematik rangkaian logika minimum.'
      ].map((t, i) => w4Step(i + 1, t)).join('')}`
    )}

    <!-- Latar Belakang & Mengapa Diperlukan K-Map -->
    ${w4Section('Mengapa K-Map Sangat Penting dalam Teknik Elektro?', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Pada perancangan sistem digital, spesifikasi fungsional rangkaian awalnya dimodelkan ke dalam tabel kebenaran lalu diekspresikan sebagai bentuk kanonik <strong>Sum of Products (SOP)</strong> atau <strong>Product of Sums (POS)</strong>. Persamaan kanonik ini hampir selalu mengandung redundansi yang sangat besar.
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px">
          <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--accent-amber);display:flex;align-items:center;gap:6px">
            <span>⚙️</span> Keterbatasan Aljabar Manual
          </h4>
          <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Penyederhanaan aljabar memerlukan manipulasi teorema Boolean (hukum De Morgan, distributif, konsensus). Metode ini sangat bergantung pada intuisi/kejelian perancang, tidak memiliki algoritma deterministik visual, serta rawan selip langkah ketika jumlah variabel lebih dari 3.
          </p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px">
          <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--success);display:flex;align-items:center;gap:6px">
            <span>🗺️</span> Keunggulan Metode Karnaugh Map
          </h4>
          <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Ditemukan oleh <strong>Maurice Karnaugh</strong> (insinyur telekomunikasi di Bell Telephone Laboratories pada tahun 1953). K-Map mengelompokkan sel-sel logika secara visual dua dimensi dengan prinsip kedekatan Gray Code, sehingga suku-suku komplementer otomatis berdampingan.
          </p>
        </div>
      </div>
      ${w4Alert('info', '<strong>Tujuan Akhir Perancangan Rangkaian Logika:</strong> Menghasilkan persamaan dengan jumlah literal dan term seminimal mungkin. Rangkaian yang lebih ringkas menghemat jumlah chip IC gerbang logika, mempercepat kecepatan propagasi sinyal (propagation delay lebih kecil), menekan disipasi daya panas, dan memangkas biaya manufaktur perangkat keras.')}`
    )}
  `;
}

/* ══════════════════════════════════════════════════════
   TOPIK 2: KONSEP DASAR K-MAP & KODE GRAY
   ══════════════════════════════════════════════════════ */
function renderWeek4Concepts(el) {
  el.innerHTML = `
    <!-- Section 1: Konsep Dasar -->
    ${w4Section('Konsep Dasar Karnaugh Map', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Secara fisik, <strong>Karnaugh Map</strong> adalah diagram berbentuk tabel matriks yang tersusun atas kisi sel-sel logika. Jika suatu sistem memiliki <em>n</em> variabel masukan, maka K-Map akan memiliki tepat <strong>2ⁿ sel</strong>.
      </p>
      ${w4Table(
        ['Jumlah Variabel (n)', 'Jumlah Sel (2ⁿ)', 'Struktur Matriks K-Map', 'Contoh Variabel'],
        [
          ['2 variabel', '2² = 4 sel', '2 baris × 2 kolom', 'A, B'],
          ['3 variabel', '2³ = 8 sel', '2 baris × 4 kolom', 'A (baris), BC (kolom)'],
          ['4 variabel', '2⁴ = 16 sel', '4 baris × 4 kolom', 'AB (baris), CD (kolom)']
        ]
      )}
      <p style="margin:16px 0 10px;font-size:0.92rem;font-weight:700">Hubungan Sel dengan Representasi Fungsi Logika:</p>
      <ul style="margin:0 0 16px;padding-left:22px;font-size:0.9rem;line-height:1.7;color:var(--text-secondary)">
        <li>Setiap sel tunggal berkorespondensi 1-ke-1 dengan satu baris pada <strong>tabel kebenaran</strong>.</li>
        <li>Pada penyederhanaan <strong>SOP (Sum of Products)</strong>, setiap sel merepresentasikan sebuah <strong>Minterm (m)</strong>.</li>
        <li>Pada penyederhanaan <strong>POS (Product of Sums)</strong>, setiap sel merepresentasikan sebuah <strong>Maxterm (M)</strong>.</li>
      </ul>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:16px 0">
        <div style="background:var(--bg-inset);border-left:3px solid var(--success);border-radius:0 8px 8px 0;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--success);font-size:0.9rem">Simbol "1" (Minterm Aktif)</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.5">Kombinasi input yang menghasilkan nilai output logika 1 pada fungsi SOP.</p>
        </div>
        <div style="background:var(--bg-inset);border-left:3px solid var(--text-faint);border-radius:0 8px 8px 0;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--text-faint);font-size:0.9rem">Simbol "0" (Minterm Inaktif)</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.5">Kombinasi input yang menghasilkan nilai output logika 0 pada fungsi.</p>
        </div>
        <div style="background:var(--bg-inset);border-left:3px solid var(--accent-amber);border-radius:0 8px 8px 0;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--accent-amber);font-size:0.9rem">Simbol "X" (Don't Care)</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.5">Kondisi input yang tidak mungkin terjadi atau keluarannya tidak dipedulikan.</p>
        </div>
      </div>`
    )}

    <!-- Section 2: Kode Gray -->
    ${w4Section('Prinsip Fundamental: Kode Gray (Gray Code)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Kunci keberhasilan metode K-Map terletak pada penomoran baris dan kolom yang <strong>TIDAK menggunakan urutan biner standar</strong>, melainkan menggunakan <strong>Kode Gray</strong>.
      </p>
      ${w4Code([
        'Urutan Biner Standar : 00 → 01 → 10 → 11  (Perhatikan transisi 01 ke 10: 2 BIT BERUBAH SEKALIGUS!)',
        'Urutan Kode Gray     : 00 → 01 → 11 → 10  (Setiap transisi HANYA 1 BIT YANG BERUBAH!)'
      ], 'Perbandingan Urutan 2 Bit')}

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700;color:var(--accent-violet)">Mengapa Harus Kode Gray? (Bukti Matematis Jarak Hamming)</h4>
      <p style="margin:0 0 12px;font-size:0.92rem;line-height:1.7;color:var(--text-secondary)">
        Dalam aljabar Boolean, hukum penyederhanaan fundamental yang memungkinkan penggabungan suku adalah:
      </p>
      ${w4Code([
        'X·Y + X·Y\' = X·(Y + Y\') = X·(1) = X'
      ], 'Teorema Komplemen Distributif')}
      <p style="margin:12px 0;font-size:0.92rem;line-height:1.7;color:var(--text-secondary)">
        Teorema di atas mensyaratkan bahwa <strong>dua suku hanya bisa digabungkan jika dan hanya jika keduanya identik pada semua variabel kecuali TEPAT SATU variabel yang saling berkomplemen</strong> (jarak Hamming = 1).
      </p>
      ${w4Table(
        ['Transisi Antar Kolom', 'Urutan Biner Biasa (00, 01, 10, 11)', 'Urutan Kode Gray (00, 01, 11, 10)', 'Dampak pada K-Map'],
        [
          ['Langkah 1 (00 → 01)', '1 bit berubah (B: 0→1)', '1 bit berubah (B: 0→1)', 'Sel bertetangga valid'],
          ['Langkah 2 (01 → 10 / 11)', '2 bit berubah! (A:0→1 dan B:1→0)', '1 bit berubah (A: 0→1, B tetap 1)', 'Kode Gray menjaga jarak Hamming = 1'],
          ['Langkah 3 (10/11 → 11/10)', '1 bit berubah (B: 0→1)', '1 bit berubah (B: 1→0, A tetap 1)', 'Sel bertetangga valid'],
          ['Ujung ke Ujung (Wrap)', '2 bit berubah (11 vs 00)', '1 bit berubah! (10 vs 00)', 'Kode Gray memungkinkan wrap-around tepi!']
        ]
      )}
      ${w4Alert('warning', '<strong>Peringatan Penting:</strong> Jika Anda menggunakan urutan biner biasa (00, 01, 10, 11) pada K-Map, maka sel berdampingan tidak lagi berjarak 1 bit, sehingga aturan pengelompokan visual menjadi gugur dan menghasilkan persamaan yang SALAH!')}`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 3: ATURAN PENGELOMPOKAN K-MAP (GROUPING RULES)
   ══════════════════════════════════════════════════════ */
function renderWeek4Grouping(el) {
  el.innerHTML = `
    <!-- Aturan Pengelompokan -->
    ${w4Section('10 Kaidah Pengelompokan Sel K-Map (SOP)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>',
      `<p style="margin:0 0 16px;font-size:0.95rem;line-height:1.7">
        Agar menghasilkan persamaan Boolean minimum yang sah dan matematis, pengelompokan sel-sel bernilai 1 pada K-Map wajib mematuhi 10 kaidah berikut:
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;margin-bottom:16px">
        ${[
          ['1. Ukuran Pangkat Dua (2ⁿ)', 'Jumlah sel dalam kelompok HANYA boleh bernilai 1, 2, 4, 8, atau 16 sel. Kelompok beranggotakan 3, 5, 6, 7, atau 12 sel DILARANG KERAS.'],
          ['2. Arah Bersebelahan', 'Sel yang dikelompokkan harus bertetangga secara horizontal atau vertikal. Pengelompokan diagonal TIDAK DIPERBOLEHKAN.'],
          ['3. Bentuk Geometris Teratur', 'Kelompok harus berwujud persegi atau persegi panjang (misal 1×1, 1×2, 2×1, 2×2, 1×4, 4×1, 2×4, 4×2, 4×4). Bentuk L, T, atau zigzag tidak sah.'],
          ['4. Sifat Melipat (Wrap Around)', 'Tepi paling kiri bersambung dengan tepi paling kanan; tepi paling atas bersambung dengan tepi paling bawah (topologi silinder/torus).'],
          ['5. Fokus Suku Minterm (1)', 'Untuk bentuk SOP, setiap kelompok dibuat untuk mencakup sel bernilai logika 1.'],
          ['6. Don\'t Care (X) Oposional', 'Kondisi X boleh disertakan ke dalam kelompok 1 jika membantu memperbesar ukuran kelompok menjadi pangkat dua yang lebih tinggi.'],
          ['7. Don\'t Care Boleh Diabaikan', 'Jika sel X tidak berguna memperbesar kelompok, biarkan sel X tersebut berdiri sendiri tanpa perlu dikelompokkan.'],
          ['8. Prinsip Ukuran Maksimal', 'Buatlah ukuran kelompok sebesar mungkin. Semakin besar kelompok sel, semakin banyak literal variabel yang tereliminasi.'],
          ['9. Cakupan Seluruh Minterm', 'Semua sel bernilai 1 pada peta K-Map harus tercakup setidaknya oleh minimal satu kelompok.'],
          ['10. Tumpang Tindih (Overlap)', 'Satu sel bernilai 1 boleh digunakan bersama oleh lebih dari satu kelompok asalkan kelompok baru tersebut mencakup sel 1 lain yang belum terlindungi.']
        ].map(([title, desc]) => `
          <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
            <p style="margin:0 0 6px;font-size:0.88rem;font-weight:700;color:var(--accent-cyan)">${title}</p>
            <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.6">${desc}</p>
          </div>`).join('')}
      </div>`
    )}

    <!-- Kaidah Eliminasi Variabel -->
    ${w4Section('Prinsip Eliminasi Variabel dalam Kelompok', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
      `<p style="margin:0 0 12px;font-size:0.95rem;line-height:1.7">
        Bagaimana sebuah kelompok K-Map menghasilkan suku aljabar Boolean yang lebih sederhana? Perhatikan hukum matematis berikut:
      </p>
      ${w4Step('A', '<strong>Variabel yang BERUBAH NILAI (0 dan 1):</strong> Mengalami komplementasi (misal A\' + A = 1), sehingga <em>variabel tersebut TERELIMINASI (DIHAPUSKAN)</em>.')}
      ${w4Step('B', '<strong>Variabel yang BERSIFAT TETAP (selalu 0 atau selalu 1):</strong> Dipertahankan dalam suku produk (jika tetap 0 ditulis sebagai komplemen/notasi aksen, jika tetap 1 ditulis tanpa aksen).')}

      ${w4Table(
        ['Ukuran Kelompok Sel', 'Jumlah Literal yang Tereliminasi', 'Jumlah Literal yang Tersisa (Contoh 4 Variabel)'],
        [
          ['1 sel (2⁰)', '0 variabel tereliminasi (0 bit berubah)', '4 literal tetap (misal: A\'B C\'D)'],
          ['2 sel (2¹)', '1 variabel tereliminasi (1 bit berubah)', '3 literal tetap (misal: A\'B D)'],
          ['4 sel (2² = Quad)', '2 variabel tereliminasi (2 bit berubah)', '2 literal tetap (misal: B D)'],
          ['8 sel (2³ = Oktet)', '3 variabel tereliminasi (3 bit berubah)', '1 literal tetap (misal: D)'],
          ['16 sel (2⁴)', '4 variabel tereliminasi (semua bit berubah)', 'Fungsi bernilai konstanta 1 (Q = 1)']
        ]
      )}
      ${w4Alert('success', '<strong>Aturan Emas:</strong> Menggandakan ukuran kelompok (dari 1 ke 2, dari 2 ke 4, atau dari 4 ke 8) SELALU menghilangkan tepat 1 variabel masukan.')}`
    )}

    <!-- Galeri Ilustrasi: Benar vs Salah -->
    ${w4Section('Ilustrasi Visual: Pengelompokan Sah vs Tidak Sah', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px">
        <div style="background:var(--bg-inset);border:1.5px solid var(--success);border-radius:12px;padding:16px">
          <p style="margin:0 0 10px;font-weight:700;color:var(--success);display:flex;align-items:center;gap:6px">
            <span>✅</span> PENGELOMPOKAN SAH (BENAR)
          </p>
          <ul style="margin:0;padding-left:20px;font-size:0.86rem;line-height:1.7;color:var(--text-secondary)">
            <li>Kelompok 2 sel mendatar / menurun (bersebelahan).</li>
            <li>Kelompok 4 sel berbentuk bujur sangkar 2×2.</li>
            <li>Kelompok 4 sel memanjang 1 baris penuh atau 1 kolom penuh.</li>
            <li>Kelompok 4 sel ujung ke ujung (kolom 00 dan 10 wrap-around).</li>
            <li>Kelompok 4 sel di keempat sudut peta (corner grouping 4 variabel).</li>
          </ul>
        </div>
        <div style="background:var(--bg-inset);border:1.5px solid var(--danger);border-radius:12px;padding:16px">
          <p style="margin:0 0 10px;font-weight:700;color:var(--danger);display:flex;align-items:center;gap:6px">
            <span>❌</span> PENGELOMPOKAN TIDAK SAH (SALAH)
          </p>
          <ul style="margin:0;padding-left:20px;font-size:0.86rem;line-height:1.7;color:var(--text-secondary)">
            <li>Kelompok beranggotakan 3 sel (bukan pangkat 2).</li>
            <li>Kelompok beranggotakan 6 sel (bukan pangkat 2).</li>
            <li>Mengelompokkan 2 sel yang posisinya diagonal murni.</li>
            <li>Bentuk huruf \"L\" atau \"T\" (bukan persegi/persegi panjang).</li>
            <li>Membuat kelompok kecil (2 sel) padahal sel tersebut bisa digabung membentuk kelompok 4 sel.</li>
          </ul>
        </div>
      </div>`
    )}
  `;
}

/* ══════════════════════════════════════════════════════
   TOPIK 4: K-MAP 2 VARIABEL
   ══════════════════════════════════════════════════════ */
function renderWeek4KMap2(el) {
  // Example Q = AB + A'B + AB'
  // minterms: m3(AB=11), m1(A'B=01), m2(AB'=10). m0=0.
  const values = ['0', '1', '1', '1'];
  const groups = [
    { cells: [1, 3], color: 'var(--accent-cyan)', label: 'Grup 1 (B)' },
    { cells: [2, 3], color: 'var(--accent-violet)', label: 'Grup 2 (A)' }
  ];

  el.innerHTML = `
    <!-- Section 1: Struktur K-Map 2 Variabel -->
    ${w4Section('Struktur K-Map 2 Variabel (A dan B)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        K-Map 2 variabel terdiri dari <strong>2² = 4 sel</strong> yang disusun dalam matriks 2 baris × 2 kolom:
      </p>
      <ul style="margin:0 0 14px;padding-left:22px;font-size:0.9rem;line-height:1.7;color:var(--text-secondary)">
        <li><strong>Baris A:</strong> Bernilai 0 (baris atas, suku A\') dan bernilai 1 (baris bawah, suku A).</li>
        <li><strong>Kolom B:</strong> Bernilai 0 (kolom kiri, suku B\') dan bernilai 1 (kolom kanan, suku B).</li>
      </ul>
      ${w4Table(
        ['Posisi Sel', 'Kombinasi (A, B)', 'Notasi Minterm (m)', 'Ekspresi Perkalian (SOP)'],
        [
          ['Baris 0, Kolom 0', 'A=0, B=0', 'm₀', 'A\' · B\''],
          ['Baris 0, Kolom 1', 'A=0, B=1', 'm₁', 'A\' · B'],
          ['Baris 1, Kolom 0', 'A=1, B=0', 'm₂', 'A · B\''],
          ['Baris 1, Kolom 1', 'A=1, B=1', 'm₃', 'A · B']
        ]
      )}`
    )}

    <!-- Section 2: Contoh Soal Terbimbing -->
    ${w4Section('Contoh Penyederhanaan Terbimbing K-Map 2 Variabel', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 18px;margin-bottom:16px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-violet);letter-spacing:.04em;text-transform:uppercase">SOAL KASUS</p>
        <p style="margin:0;font-size:1.05rem;font-weight:700;font-family:var(--font-mono)">Sederhanakan fungsi: Q = AB + A\'B + AB\'</p>
      </div>

      <h4 style="margin:16px 0 10px;font-size:0.95rem;font-weight:700">Langkah Pengerjaan Sistematis:</h4>

      ${w4Step('1', '<strong>Identifikasi Minterm:</strong><br>• Suku AB → A=1, B=1 → <code>m₃</code><br>• Suku A\'B → A=0, B=1 → <code>m₁</code><br>• Suku AB\' → A=1, B=0 → <code>m₂</code><br>Bentuk notasi Sigma minterm: <strong>Q = ∑m(1, 2, 3)</strong>')}

      ${w4Step('2', '<strong>Isi Sel K-Map:</strong> Letakkan angka 1 pada sel m₁, m₂, dan m₃. Letakkan angka 0 pada sel m₀.')}

      ${w4Step('3', '<strong>Kelompokkan Sel Bernilai 1:</strong><br>• <strong>Grup 1 (Garis Putus-Putus Cyan):</strong> Menggabungkan sel m₁ dan m₃ (kolom B=1).<br>• <strong>Grup 2 (Garis Putus-Putus Violet):</strong> Menggabungkan sel m₂ dan m₃ (baris A=1).<br><em>Catatan:</em> Sel m₃ digunakan dua kali (overlap), dan ini sah serta dianjurkan!')}

      ${w4KMap2(values, groups, 'Gambar 4.1: K-Map 2 Variabel untuk Q = AB + A\'B + AB\'')}

      ${w4Step('4', '<strong>Analisis Nilai Variabel Setiap Kelompok:</strong><br>• <strong>Pada Grup 1 {m₁, m₃}:</strong> Nilai A berubah dari 0 ke 1 (dieliminasi). Nilai B tetap = 1. Hasil suku: <code>B</code>.<br>• <strong>Pada Grup 2 {m₂, m₃}:</strong> Nilai B berubah dari 0 ke 1 (dieliminasi). Nilai A tetap = 1. Hasil suku: <code>A</code>.')}

      ${w4Step('5', '<strong>Bentuk Persamaan Minimum:</strong> Gabungkan kedua suku hasil grup dengan operasi OR:<br><strong style=\"font-size:1.15rem;color:var(--success);font-family:var(--font-mono);display:inline-block;padding:6px 12px;background:var(--success-dim);border-radius:6px;margin-top:6px\">Q = A + B</strong>')}

      <!-- Pembuktian Aljabar Boolean -->
      <h4 style="margin:22px 0 10px;font-size:0.95rem;font-weight:700;color:var(--accent-cyan)">Pembuktian Matematis dengan Aljabar Boolean:</h4>
      ${w4Code([
        'Q = AB + A\'B + AB\'',
        '  = A(B + B\') + A\'B        [Faktorisasi suku AB dan AB\' menggunakan hukum Distributif]',
        '  = A(1) + A\'B              [Hukum Komplemen: B + B\' = 1]',
        '  = A + A\'B                [Hukum Identitas: A · 1 = A]',
        '  = (A + A\')(A + B)         [Hukum Distributif ke-2: X + YZ = (X+Y)(X+Z)]',
        '  = (1)(A + B)               [Hukum Komplemen: A + A\' = 1]',
        '  = A + B                    [Hukum Identitas: 1 · (A+B) = A + B]  (TERBUKTI IDENTIK!)'
      ], 'Langkah Pembuktian Aljabar')}

      ${w4Alert('info', '<strong>Mengapa Variabel yang Berubah Dihilangkan?</strong> Secara aljabar, m₁ + m₃ = A\'B + AB = (A\' + A)B = 1 · B = B. Karena (A\' + A) selalu bernilai 1 untuk kondisi apapun, masukan A tidak lagi mempengaruhi nilai keluaran kelompok tersebut!')}`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 5: K-MAP 3 VARIABEL
   ══════════════════════════════════════════════════════ */
function renderWeek4KMap3(el) {
  // Contoh 1: Q = ABC' + AB'C' + AB'C + ABC = m6 + m4 + m5 + m7
  // values index 0..7: m0..m7. Ones at 4, 5, 6, 7
  const val1 = ['0', '0', '0', '0', '1', '1', '1', '1'];
  const grp1 = [
    { cells: [4, 5, 7, 6], color: 'var(--accent-cyan)', label: 'Grup Quad (A)' }
  ];

  // Contoh 2: F = sum m(0, 2, 5, 7)
  const val2 = ['1', '0', '1', '0', '0', '1', '0', '1'];
  const grp2 = [
    { cells: [0, 2], color: 'var(--accent-amber)', label: 'Grup 1 Wrap (A\'C\')' },
    { cells: [5, 7], color: 'var(--accent-violet)', label: 'Grup 2 (AC)' }
  ];

  el.innerHTML = `
    <!-- Section 1: Struktur K-Map 3 Variabel -->
    ${w4Section('Struktur K-Map 3 Variabel (A, B, C)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="7" y1="5" x2="7" y2="19"/><line x1="12" y1="5" x2="12" y2="19"/><line x1="17" y1="5" x2="17" y2="19"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        K-Map 3 variabel merepresentasikan <strong>2³ = 8 sel</strong> dalam kisi 2 baris × 4 kolom:
      </p>
      <ul style="margin:0 0 14px;padding-left:22px;font-size:0.9rem;line-height:1.7;color:var(--text-secondary)">
        <li><strong>Baris (Variabel A):</strong> Terdiri dari 2 baris (A=0 dan A=1).</li>
        <li><strong>Kolom (Variabel BC):</strong> Terdiri dari 4 kolom yang <em>wajib berurutan Kode Gray: <strong>00, 01, 11, 10</strong></em>.</li>
      </ul>
      ${w4Table(
        ['Baris A \\ Kolom BC', 'BC = 00', 'BC = 01', 'BC = 11', 'BC = 10'],
        [
          ['A = 0 (A\')', 'm₀ = A\'B\'C\' (000)', 'm₁ = A\'B\'C (001)', 'm₃ = A\'BC (011)', 'm₂ = A\'BC\' (010)'],
          ['A = 1 (A)', 'm₄ = AB\'C\' (100)', 'm₅ = AB\'C (101)', 'm₇ = ABC (111)', 'm₆ = ABC\' (110)']
        ]
      )}
      ${w4Alert('info', '<strong>Perhatikan Pergantian Kolom 11 dan 10:</strong> Kolom ke-3 adalah 11 (m₃ dan m₇), sedangkan kolom ke-4 adalah 10 (m₂ dan m₆). Selalu teliti menempatkan minterm agar tidak tertukar!')}`
    )}

    <!-- Section 2: Contoh 1 -->
    ${w4Section('Contoh 1: Penyederhanaan Kelompok 4 Sel (Quad)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 18px;margin-bottom:16px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-violet);letter-spacing:.04em;text-transform:uppercase">CONTOH 1 (SOAL DARI SILABUS)</p>
        <p style="margin:0;font-size:1.05rem;font-weight:700;font-family:var(--font-mono)">Sederhanakan: Q = ABC\' + AB\'C\' + AB\'C + ABC</p>
      </div>

      ${w4Step('1', '<strong>Identifikasi Minterm:</strong><br>• ABC\' = 110 → <code>m₆</code><br>• AB\'C\' = 100 → <code>m₄</code><br>• AB\'C = 101 → <code>m₅</code><br>• ABC = 111 → <code>m₇</code><br>Fungsi dalam notasi Sigma: <strong>Q = ∑m(4, 5, 6, 7)</strong>')}

      ${w4Step('2', '<strong>Pemetaan pada K-Map:</strong> Masukkan nilai 1 pada seluruh baris A=1 (sel m₄, m₅, m₇, m₆).')}

      ${w4Step('3', '<strong>Pengelompokan Sel:</strong> Keempat sel bernilai 1 membentuk satu kelompok horizontal penuh beranggotakan 4 sel (Quad).')}

      ${w4KMap3(val1, grp1, 'Gambar 4.2: K-Map 3 Variabel untuk Q = ∑m(4, 5, 6, 7)')}

      ${w4Step('4', '<strong>Analisis Eliminasi Variabel:</strong><br>• <strong>Variabel A:</strong> Pada seluruh kelompok ini, A selalu bernilai <strong>1 (tetap)</strong>.<br>• <strong>Variabel B:</strong> Bernilai 0 pada kolom 00 & 01, dan bernilai 1 pada kolom 11 & 10 (berubah → <em>tereliminasi</em>).<br>• <strong>Variabel C:</strong> Bernilai 0 pada kolom 00 & 10, dan bernilai 1 pada kolom 01 & 11 (berubah → <em>tereliminasi</em>).')}

      ${w4Step('5', '<strong>Hasil Akhir Penyederhanaan:</strong><br><strong style=\"font-size:1.2rem;color:var(--success);font-family:var(--font-mono);display:inline-block;padding:6px 14px;background:var(--success-dim);border-radius:6px;margin-top:6px\">Q = A</strong>')}`
    )}

    <!-- Section 3: Contoh 2 (Dua Kelompok & Wrap-around) -->
    ${w4Section('Contoh 2: Dua Kelompok dengan Sifat Melipat (Wrap-Around)', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67"/></svg>',
      `<div style="background:var(--accent-amber-dim);border:1px solid var(--accent-amber);border-radius:10px;padding:14px 18px;margin-bottom:16px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-amber);letter-spacing:.04em;text-transform:uppercase">CONTOH 2</p>
        <p style="margin:0;font-size:1.05rem;font-weight:700;font-family:var(--font-mono)">Sederhanakan fungsi: F(A, B, C) = ∑m(0, 2, 5, 7)</p>
      </div>

      ${w4Step('1', '<strong>Penempatan Nilai 1:</strong> Sel bernilai 1 berada pada m₀ (000), m₂ (010), m₅ (101), dan m₇ (111).')}

      ${w4Step('2', '<strong>Analisis Tetangga & Pengelompokan:</strong><br>• <strong>Grup 1 (Wrap-Around Tepi Kiri-Kanan):</strong> Sel m₀ (kolom 00) dan sel m₂ (kolom 10) pada baris A=0 saling bersebelahan secara logika karena hanya berbeda pada bit B. Ini membentuk kelompok 2 sel tepi.<br>• <strong>Grup 2 (Berdampingan Normal):</strong> Sel m₅ (kolom 01) dan sel m₇ (kolom 11) pada baris A=1 bersebelahan langsung. Membentuk kelompok 2 sel.')}

      ${w4KMap3(val2, grp2, 'Gambar 4.3: Pengelompokan Wrap-Around dan Kelompok Berdampingan')}

      ${w4Step('3', '<strong>Ekstraksi Persamaan Boolean:</strong><br>• <strong>Grup 1 {m₀, m₂}:</strong> A tetap 0 (A\'), C tetap 0 (C\'), B berubah (0 ke 1) → menghasilkan suku <code>A\'C\'</code>.<br>• <strong>Grup 2 {m₅, m₇}:</strong> A tetap 1 (A), C tetap 1 (C), B berubah (0 ke 1) → menghasilkan suku <code>AC</code>.')}

      ${w4Step('4', '<strong>Hasil Minimum:</strong><br><strong style=\"font-size:1.15rem;color:var(--success);font-family:var(--font-mono);display:inline-block;padding:6px 14px;background:var(--success-dim);border-radius:6px;margin-top:6px\">F = A\'C\' + AC</strong><br><span style=\"font-size:0.86rem;color:var(--text-secondary);display:inline-block;margin-top:6px\"><em>Catatan:</em> Persamaan ini juga ekuivalen dengan fungsi gerbang XNOR antara masukan A dan C: <strong>F = (A ⊕ C)\'</strong>.</span>')}`
    )}
  `;
}

/* ══════════════════════════════════════════════════════
   TOPIK 6: K-MAP 4 VARIABEL
   ══════════════════════════════════════════════════════ */
function renderWeek4KMap4(el) {
  // Contoh silabus: Q = A'BC'D + ABC'D + A'BCD + ABCD
  // Minterms:
  // A'BC'D = 0101 = m5
  // ABC'D  = 1101 = m13
  // A'BCD  = 0111 = m7
  // ABCD   = 1111 = m15
  // values index 0..15: ones at 5, 7, 13, 15
  const values = Array(16).fill('0');
  values[5] = '1';
  values[7] = '1';
  values[13] = '1';
  values[15] = '1';

  const groups = [
    { cells: [5, 7, 13, 15], color: 'var(--accent-cyan)', label: 'Quad 4-Sel (B·D)' }
  ];

  el.innerHTML = `
    <!-- Section 1: Struktur K-Map 4 Variabel -->
    ${w4Section('Struktur K-Map 4 Variabel (A, B, C, D)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="7.5" x2="21" y2="7.5"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="16.5" x2="21" y2="16.5"/><line x1="7.5" y1="3" x2="7.5" y2="21"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="16.5" y1="3" x2="16.5" y2="21"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        K-Map 4 variabel memiliki <strong>2⁴ = 16 sel</strong> yang disusun dalam matriks 4 baris × 4 kolom. Baik baris maupun kolom menggunakan urutan Kode Gray (<strong>00, 01, 11, 10</strong>):
      </p>
      ${w4Table(
        ['Baris AB \\ Kolom CD', '00 (C\'D\')', '01 (C\'D)', '11 (CD)', '10 (CD\')'],
        [
          ['00 (A\'B\')', 'm₀ (0000)', 'm₁ (0001)', 'm₃ (0011)', 'm₂ (0010)'],
          ['01 (A\'B)',  'm₄ (0100)', 'm₅ (0101)', 'm₇ (0111)', 'm₆ (0110)'],
          ['11 (AB)',    'm₁₂ (1100)', 'm₁₃ (1101)', 'm₁₅ (1111)', 'm₁₄ (1110)'],
          ['10 (AB\')',  'm₈ (1000)', 'm₉ (1001)', 'm₁₁ (1011)', 'm₁₀ (1010)']
        ]
      )}
      ${w4Alert('warning', '<strong>Ingat Urutan Baris dan Kolom:</strong><br>• Urutan baris: <strong>m₀-m₂ (baris 00) → m₄-m₆ (baris 01) → m₁₂-m₁₄ (baris 11) → m₈-m₁₀ (baris 10)</strong>.<br>Baris ke-3 adalah AB=11 dan baris ke-4 adalah AB=10!')}`
    )}

    <!-- Section 2: Contoh Penyederhanaan 4 Variabel -->
    ${w4Section('Contoh Kasus 4 Variabel: Suku Produk Q = BD', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 18px;margin-bottom:16px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-violet);letter-spacing:.04em;text-transform:uppercase">SOAL SILABUS</p>
        <p style="margin:0;font-size:1.05rem;font-weight:700;font-family:var(--font-mono)">Sederhanakan: Q = A\'BC\'D + ABC\'D + A\'BCD + ABCD</p>
      </div>

      ${w4Step('1', '<strong>Identifikasi Posisi Minterm:</strong><br>• A\'BC\'D = 0101 → <code>m₅</code> (Baris AB=01, Kolom CD=01)<br>• ABC\'D  = 1101 → <code>m₁₃</code> (Baris AB=11, Kolom CD=01)<br>• A\'BCD  = 0111 → <code>m₇</code> (Baris AB=01, Kolom CD=11)<br>• ABCD   = 1111 → <code>m₁₅</code> (Baris AB=11, Kolom CD=11)<br>Notasi Minterm: <strong>Q = ∑m(5, 7, 13, 15)</strong>')}

      ${w4Step('2', '<strong>Plotting Nilai 1 pada Peta:</strong> Masukkan angka 1 pada keempat sel tersebut.')}

      ${w4Step('3', '<strong>Pembentukan Kelompok:</strong> Keempat sel ini berdekatan secara langsung dan membentuk persegi 2×2 (Quad) di tengah peta.')}

      ${w4KMap4(values, groups, 'Gambar 4.4: K-Map 4 Variabel Menghasilkan Quad 4-Sel {m₅, m₇, m₁₃, m₁₅}')}

      ${w4Step('4', '<strong>Analisis Detail Mengapa A dan C Tereliminasi:</strong><br>• <strong>Periksa Variabel Baris (AB):</strong> Kelompok ini menempati baris 01 dan 11. Variabel A berubah 0 ke 1 (tereliminasi), B tetap 1.<br>• <strong>Periksa Variabel Kolom (CD):</strong> Kelompok ini menempati kolom 01 dan 11. Variabel C berubah 0 ke 1 (tereliminasi), D tetap 1.')}

      ${w4Step('5', '<strong>Persamaan Boolean Minimum:</strong><br><strong style=\"font-size:1.2rem;color:var(--success);font-family:var(--font-mono);display:inline-block;padding:6px 14px;background:var(--success-dim);border-radius:6px;margin-top:6px\">Q = BD</strong>')}

      ${w4Alert('success', '<strong>Efisiensi Rangkaian:</strong> Fungsi awal yang membutuhkan 4 gerbang AND 4-masukan dan 1 gerbang OR 4-masukan (total 5 gerbang, 20 pin) berhasil disederhanakan menjadi <strong>HANYA 1 buah gerbang AND 2-masukan</strong>!')}`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 7: STUDI KASUS SISTEM ALARM KEAMANAN GEDUNG
   ══════════════════════════════════════════════════════ */
function renderWeek4CaseStudy(el) {
  // Truth table values for Alarm system Q = AC + BC + D
  // Inputs: A (door), B (window), C (motion), D (smoke)
  // Alarm triggers if: (A & C) | (B & C) | D
  const ttRows = [];
  const kmapVals = Array(16).fill('0');
  for (let m = 0; m < 16; m++) {
    const A = (m >> 3) & 1;
    const B = (m >> 2) & 1;
    const C = (m >> 1) & 1;
    const D = m & 1;
    const Q = ((A && C) || (B && C) || D) ? 1 : 0;
    kmapVals[m] = String(Q);
    const reason = D ? 'Asap Terdeteksi (D=1)' : ((A && C) ? 'Pintu & Gerak (AC=1)' : ((B && C) ? 'Jendela & Gerak (BC=1)' : 'Aman (Normal)'));
    ttRows.push([`m${m}`, String(A), String(B), String(C), String(D), `<strong style="color:${Q ? 'var(--danger)' : 'var(--text-faint)'}">${Q}</strong>`, reason]);
  }

  // Groups for K-Map 4-var
  // Oktet D: cols CD=01 and CD=11 (m1,m3,m5,m7,m9,m11,m13,m15)
  // Quad AC: rows AB=11,10 and cols CD=11,10 (m10,m11,m14,m15)
  // Quad BC: rows AB=01,11 and cols CD=11,10 (m6,m7,m14,m15)
  const alarmGroups = [
    { cells: [1, 3, 5, 7, 9, 11, 13, 15], color: 'var(--danger)', label: 'Oktet 8-Sel (D)' },
    { cells: [10, 11, 14, 15], color: 'var(--accent-cyan)', label: 'Quad (AC)' },
    { cells: [6, 7, 14, 15], color: 'var(--accent-violet)', label: 'Quad (BC)' }
  ];

  el.innerHTML = `
    <!-- Section 1: Deskripsi Sistem -->
    ${w4Section('Studi Kasus: Perancangan Sistem Alarm Keamanan Gedung', '--danger',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Sebuah gedung bertingkat membutuhkan sistem alarm keamanan digital terintegrasi yang memproses data dari 4 sensor independen:
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--accent-cyan);font-size:0.9rem">Sensor A (Pintu)</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary)">A = 1 jika pintu terbuka, A = 0 jika pintu tertutup rapat.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--accent-violet);font-size:0.9rem">Sensor B (Jendela)</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary)">B = 1 jika jendela terbuka, B = 0 jika jendela terkunci.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--accent-amber);font-size:0.9rem">Sensor C (Gerak / PIR)</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary)">C = 1 jika mendeteksi pergerakan di dalam ruangan.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--danger);font-size:0.9rem">Sensor D (Detektor Asap)</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary)">D = 1 jika asap/kebakaran terdeteksi (prioritas darurat).</p>
        </div>
      </div>
      <div style="background:var(--danger-dim);border:1px solid var(--danger);border-radius:10px;padding:14px 18px;margin-bottom:16px">
        <p style="margin:0 0 6px;font-weight:700;color:var(--danger);font-size:0.9rem">SYARAT ALARM AKTIF (Q = 1):</p>
        <ul style="margin:0;padding-left:20px;font-size:0.88rem;line-height:1.7">
          <li>Pintu terbuka dan ada gerakan di dalam ruangan (<code>A · C = 1</code>).</li>
          <li>Jendela terbuka dan ada gerakan di dalam ruangan (<code>B · C = 1</code>).</li>
          <li>Sensor asap aktif mendeteksi kebakaran (<code>D = 1</code>), tanpa memedulikan status sensor lainnya.</li>
        </ul>
      </div>`
    )}

    <!-- Section 2: Tabel Kebenaran Lengkap -->
    ${w4Section('Tabel Kebenaran Sistem Alarm (16 Kombinasi Input)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>',
      `<p style="margin:0 0 12px;font-size:0.92rem;color:var(--text-secondary)">
        Berikut adalah evaluasi status alarm untuk seluruh 16 kombinasi biner sensor:
      </p>
      ${w4Table(
        ['Minterm', 'Pintu (A)', 'Jendela (B)', 'Gerak (C)', 'Asap (D)', 'Alarm (Q)', 'Keterangan Logika'],
        ttRows
      )}`
    )}

    <!-- Section 3: Pemetaan & Pengelompokan K-Map -->
    ${w4Section('Penyederhanaan Menggunakan K-Map 4 Variabel', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Terdapat 11 sel bernilai 1. Kita kelompokkan sel-sel tersebut menggunakan ukuran kelompok sebesar mungkin:
      </p>
      ${w4KMap4(kmapVals, alarmGroups, 'Gambar 4.5: K-Map Sistem Alarm dengan 1 Kelompok Oktet dan 2 Kelompok Quad')}

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700">Analisis Pengelompokan:</h4>
      ${w4Step('1', '<strong>Grup 1 — Oktet 8 Sel (Warna Merah):</strong> Mencakup seluruh kolom CD=01 dan CD=11 ({m₁, m₃, m₅, m₇, m₉, m₁₁, m₁₃, m₁₅}). Pada oktet ini, A, B, dan C berubah antara 0 dan 1. Hanya variabel <strong>D yang tetap bernilai 1</strong>. Menghasilkan suku: <code>D</code>.')}

      ${w4Step('2', '<strong>Grup 2 — Quad 4 Sel (Warna Cyan):</strong> Mencakup sel {m₁₀, m₁₁, m₁₄, m₁₅} (baris AB=11 & 10, kolom CD=11 & 10). Variabel A tetap 1, variabel C tetap 1. B dan D berubah. Menghasilkan suku: <code>AC</code>.')}

      ${w4Step('3', '<strong>Grup 3 — Quad 4 Sel (Warna Violet):</strong> Mencakup sel {m₆, m₇, m₁₄, m₁₅} (baris AB=01 & 11, kolom CD=11 & 10). Variabel B tetap 1, variabel C tetap 1. A dan D berubah. Menghasilkan suku: <code>BC</code>.')}

      ${w4Step('4', '<strong>Persamaan Logika Minimum:</strong><br><strong style=\"font-size:1.2rem;color:var(--success);font-family:var(--font-mono);display:inline-block;padding:8px 16px;background:var(--success-dim);border-radius:8px;margin-top:6px\">Q = AC + BC + D  =  (A + B)C + D</strong>')}

      <!-- Skematik Rangkaian Logika SVG -->
      <h4 style="margin:22px 0 10px;font-size:0.95rem;font-weight:700;color:var(--accent-cyan)">Skematik Rangkaian Logika Hasil Penyederhanaan:</h4>
      <div style="text-align:center;margin:16px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
        <svg width="420" height="200" viewBox="0 0 420 200" style="display:inline-block;max-width:100%">
          <!-- Inputs A, B -->
          <text x="25" y="45" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
          <line x1="40" y1="42" x2="90" y2="42" stroke="var(--line-strong)" stroke-width="2"/>
          <text x="25" y="75" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
          <line x1="40" y1="72" x2="90" y2="72" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- OR Gate 1 (A + B) -->
          <path d="M 90 32 Q 105 57 90 82 Q 125 82 145 57 Q 125 32 90 32 Z" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="108" y="61" font-size="10" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-ui)">OR</text>

          <!-- Line from OR1 to AND -->
          <line x1="145" y1="57" x2="190" y2="57" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- Input C -->
          <text x="25" y="115" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">C</text>
          <line x1="40" y1="112" x2="190" y2="112" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- AND Gate ((A+B) · C) -->
          <path d="M 190 45 L 215 45 A 35 35 0 0 1 215 125 L 190 125 Z" fill="var(--accent-violet-dim)" stroke="var(--accent-violet)" stroke-width="2"/>
          <text x="206" y="89" font-size="10" font-weight="700" fill="var(--accent-violet)" font-family="var(--font-ui)">AND</text>

          <!-- Line from AND to final OR -->
          <line x1="250" y1="85" x2="295" y2="85" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- Input D -->
          <text x="25" y="155" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">D</text>
          <line x1="40" y1="152" x2="295" y2="152" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- Final OR Gate (((A+B)C) + D) -->
          <path d="M 295 70 Q 310 115 295 165 Q 335 165 355 118 Q 335 70 295 70 Z" fill="var(--danger-dim)" stroke="var(--danger)" stroke-width="2"/>
          <text x="313" y="122" font-size="10" font-weight="700" fill="var(--danger)" font-family="var(--font-ui)">OR</text>

          <!-- Output Q -->
          <line x1="355" y1="118" x2="400" y2="118" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="400" cy="118" r="4" fill="var(--danger)"/>
          <text x="385" y="105" font-size="13" font-weight="800" fill="var(--danger)" font-family="var(--font-mono)">Q (Alarm)</text>
        </svg>
        <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary)">Implementasi Gerbang: 1 OR (A+B) + 1 AND (·C) + 1 OR (+D)</p>
      </div>`
    )}
  `;
}

/* ══════════════════════════════════════════════════════
   TOPIK 8: DON'T CARE CONDITION (X)
   ══════════════════════════════════════════════════════ */
function renderWeek4DontCare(el) {
  // Contoh: F = sum m(1, 3, 7, 11, 15) + d(0, 2, 5)
  // Without DC: quad {3, 7, 11, 15} -> CD, pair {1, 3} -> A'B'D. F = CD + A'B'D
  // With DC: quad {3, 7, 11, 15} -> CD, quad {1, 3, 5, 7} using d5! -> A'D. F = CD + A'D
  const valsWithoutDC = Array(16).fill('0');
  [1, 3, 7, 11, 15].forEach(i => valsWithoutDC[i] = '1');
  [0, 2, 5].forEach(i => valsWithoutDC[i] = 'X');

  const grpsWithDC = [
    { cells: [3, 7, 11, 15], color: 'var(--accent-cyan)', label: 'Quad 1 (CD)' },
    { cells: [1, 3, 5, 7], color: 'var(--accent-amber)', label: 'Quad 2 dgn d₅ (A\'D)' }
  ];

  el.innerHTML = `
    <!-- Section 1: Pengertian Don't Care -->
    ${w4Section('Pengertian Kondisi Don\'t Care (Simbol X)', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Dalam sistem digital nyata, ada kombinasi sinyal masukan tertentu yang <strong>tidak akan pernah terjadi</strong> (kondisi terlarang) atau <strong>nilai keluarannya sama sekali tidak mempengaruhi kinerja sistem</strong>. Kondisi semacam ini disebut <strong>Don\'t Care Condition</strong> dan dilambangkan dengan simbol <strong>X</strong> (atau d).
      </p>
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--accent-amber)">Contoh Nyata: Dekoder BCD (Binary Coded Decimal) ke 7-Segment</h4>
        <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
          Sistem desimal hanya menggunakan angka 0 sampai 9 (kombinasi biner 0000 s.d. 1001). Kombinasi masukan 1010 (10) sampai 1111 (15) tidak akan pernah dimasukkan oleh pengguna ke perangkat. Keenam kombinasi ini (m₁₀, m₁₁, m₁₂, m₁₃, m₁₄, m₁₅) adalah minterm <em>Don\'t Care</em>.
        </p>
      </div>
      ${w4Table(
        ['Karakteristik', 'Aturan Perlakuan pada K-Map'],
        [
          ['Boleh Dianggap 1 (High)', 'Jika mengikutsertakan sel X dapat memperbesar ukuran kelompok 1 dari 2 sel menjadi 4 sel, atau dari 4 sel menjadi 8 sel.'],
          ['Boleh Diabaikan (Low = 0)', 'Jika sel X tidak berguna membantu membesarkan kelompok manapun, biarkan sel X tetap bernilai 0 (tidak perlu dikelompokkan).'],
          ['TIDAK WAJIB Dicakup', 'Berbeda dengan angka 1 yang wajib tercover, sel X TIDAK WAJIB masuk ke dalam kelompok.'],
          ['Integritas Fungsi Sistem', 'Pemanfaatan sel X tidak akan mengubah luaran sistem pada kombinasi input yang valid/sah.']
        ]
      )}`
    )}

    <!-- Section 2: Contoh Perbandingan Dengan vs Tanpa Don't Care -->
    ${w4Section('Perbandingan Hasil: Menggunakan X vs Mengabaikan X', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 18px;margin-bottom:16px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-violet);letter-spacing:.04em;text-transform:uppercase">KASUS PEMBANDING</p>
        <p style="margin:0;font-size:1.05rem;font-weight:700;font-family:var(--font-mono)">F(A, B, C, D) = ∑m(1, 3, 7, 11, 15) + ∑d(0, 2, 5)</p>
      </div>

      ${w4KMap4(valsWithoutDC, grpsWithDC, 'Gambar 4.6: Memanfaatkan d₅ untuk membentuk Quad 4-Sel {m₁, m₃, d₅, m₇}')}

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:20px 0">
        <!-- Kasus A -->
        <div style="background:var(--bg-inset);border:1.5px solid var(--text-faint);border-radius:10px;padding:16px">
          <p style="margin:0 0 8px;font-weight:700;color:var(--text-faint)">KASUS A: Jika X Diabaikan (Semua X = 0)</p>
          <ul style="margin:0 0 12px;padding-left:18px;font-size:0.86rem;line-height:1.6;color:var(--text-secondary)">
            <li>Quad 1: {m₃, m₇, m₁₁, m₁₅} → suku <code>CD</code></li>
            <li>Sel m₁ hanya bisa berpasangan dengan m₃ (pair 2-sel) → suku <code>A\'B\'D</code></li>
          </ul>
          <p style="margin:0;font-family:var(--font-mono);font-weight:700;color:var(--accent-amber)">F = CD + A\'B\'D</p>
          <p style="margin:6px 0 0;font-size:0.8rem;color:var(--text-faint)">Total: 2 suku, 5 literal</p>
        </div>

        <!-- Kasus B -->
        <div style="background:var(--bg-inset);border:1.5px solid var(--success);border-radius:10px;padding:16px">
          <p style="margin:0 0 8px;font-weight:700;color:var(--success)">KASUS B: Memanfaatkan d₅ sebagai 1</p>
          <ul style="margin:0 0 12px;padding-left:18px;font-size:0.86rem;line-height:1.6;color:var(--text-secondary)">
            <li>Quad 1: {m₃, m₇, m₁₁, m₁₅} → suku <code>CD</code></li>
            <li>d₅ (0101) digabung dengan {m₁, m₃, m₇} membentuk <strong>Quad 4-sel</strong> → suku <code>A\'D</code>!</li>
            <li>d₀ dan d₂ diabaikan (tetap 0).</li>
          </ul>
          <p style="margin:0;font-family:var(--font-mono);font-weight:700;color:var(--success)">F = CD + A\'D  =  D(A\' + C)</p>
          <p style="margin:6px 0 0;font-size:0.8rem;color:var(--success)">Total: 2 suku, 4 literal (LEBIH RINGKAS & HEMAT GERBANG!)</p>
        </div>
      </div>
      ${w4Alert('success', '<strong>Kesimpulan:</strong> Dengan memperlakukan d₅ sebagai 1, suku perkalian untuk melingkupi m₁ berkurang dari 3 literal (A\'B\'D) menjadi 2 literal (A\'D), sehingga menghemat 1 pin masukan gerbang logika.')}`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 9: LATIHAN DAN EVALUASI TERBIMBING
   ══════════════════════════════════════════════════════ */
function renderWeek4Exercises(el) {
  // Latihan 1: Q = ABCD' + AB'C'D + A'BCD (m14, m9, m7)
  const l1Vals = Array(16).fill('0');
  l1Vals[14] = '1';
  l1Vals[9] = '1';
  l1Vals[7] = '1';
  const l1Groups = [
    { cells: [7], color: 'var(--accent-cyan)', label: 'm₇' },
    { cells: [9], color: 'var(--accent-violet)', label: 'm₉' },
    { cells: [14], color: 'var(--accent-amber)', label: 'm₁₄' }
  ];

  // Latihan 2: F = ABC' + D
  // D=1: m1,m3,m5,m7,m9,m11,m13,m15
  // ABC'=1: AB=11, CD=00 (m12) & CD=01 (m13 already in D)
  const l2Vals = Array(16).fill('0');
  [1, 3, 5, 7, 9, 11, 13, 15, 12].forEach(i => l2Vals[i] = '1');
  const l2Groups = [
    { cells: [1, 3, 5, 7, 9, 11, 13, 15], color: 'var(--accent-cyan)', label: 'Oktet (D)' },
    { cells: [12, 13], color: 'var(--accent-violet)', label: 'Pair (ABC\')' }
  ];

  el.innerHTML = `
    <!-- Latihan 1 -->
    ${w4Section('Latihan 1: Analisis K-Map 4 Variabel (Suku Terisolasi)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      `<div style="background:var(--accent-cyan-dim);border:1px solid var(--accent-cyan);border-radius:10px;padding:14px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-cyan);letter-spacing:.04em;text-transform:uppercase">SOAL LATIHAN 1</p>
        <p style="margin:0;font-size:1.05rem;font-weight:700;font-family:var(--font-mono)">Diberikan fungsi: Q = ABCD\' + AB\'C\'D + A\'BCD</p>
        <p style="margin:8px 0 0;font-size:0.88rem;color:var(--text-secondary)">Instruksi: Tentukan minterm, buat K-Map 4 variabel, lakukan pengelompokan yang sah, dan tentukan persamaan minimumnya.</p>
      </div>

      ${w4Spoiler('📖 Lihat Pembahasan Lengkap Latihan 1', `
        <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--accent-cyan)">1. Identifikasi Minterm:</h4>
        ${w4Code([
          '• ABCD\'   = 1110  → m₁₄ (Baris AB=11, Kolom CD=10)',
          '• AB\'C\'D  = 1001  → m₉  (Baris AB=10, Kolom CD=01)',
          '• A\'BCD   = 0111  → m₇  (Baris AB=01, Kolom CD=11)'
        ])}

        <h4 style="margin:14px 0 8px;font-size:0.92rem;color:var(--accent-cyan)">2. Pemetaan & Analisis Kedekatan (Hamming Distance):</h4>
        ${w4KMap4(l1Vals, l1Groups, 'Gambar 4.7: K-Map Latihan 1 menunjukkan ketiga minterm terisolasi')}

        <p style="margin:8px 0;font-size:0.88rem;line-height:1.6;color:var(--text-secondary)">
          Periksa jarak Hamming antar minterm:<br>
          • <strong>m₁₄ (1110) vs m₉ (1001):</strong> 3 bit berbeda (A sama, B beda, C beda, D beda) → Jarak = 3.<br>
          • <strong>m₁₄ (1110) vs m₇ (0111):</strong> 2 bit berbeda (A beda, B sama, C sama, D beda) → Jarak = 2.<br>
          • <strong>m₉ (1001) vs m₇ (0111):</strong> 3 bit berbeda → Jarak = 3.<br>
          <em>Karena tidak ada pasangan sel yang berjarak 1 bit (tidak ada sel yang bersebelahan), maka tidak ada penggabungan yang sah!</em>
        </p>

        ${w4Alert('info', '<strong>Kesimpulan:</strong> Fungsi tidak dapat disederhanakan lebih lanjut. Persamaan Boolean minimum tetap sama dengan fungsi awal:<br><strong>Q = ABCD\' + AB\'C\'D + A\'BCD</strong>')}`
      )}`
    )}

    <!-- Latihan 2: Gerbang Parkir Otomatis -->
    ${w4Section('Latihan 2: Sistem Gerbang Parkir Otomatis', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-violet);letter-spacing:.04em;text-transform:uppercase">SOAL STUDI KASUS TEKNIK</p>
        <p style="margin:0 0 8px;font-size:0.95rem;line-height:1.6">Sebuah gerbang palang parkir otomatis dikontrol oleh 4 sensor masukan:</p>
        <ul style="margin:0;padding-left:20px;font-size:0.86rem;line-height:1.6">
          <li><strong>A = 1:</strong> Kartu RFID pengguna valid.</li>
          <li><strong>B = 1:</strong> Sensor loop mendeteksi kendaraan di depan palang.</li>
          <li><strong>C = 1:</strong> Indikator kapasitas parkir PENUH (C = 0 jika masih ada slot kosong).</li>
          <li><strong>D = 1:</strong> Tombol override darurat ditekan oleh petugas keamanan.</li>
        </ul>
        <p style="margin:10px 0 0;font-size:0.92rem;font-weight:700;color:var(--accent-violet)">Aturan: Gerbang terbuka jika (Kendaraan ada, Kartu Valid, dan Parkir Belum Penuh) ATAU (Tombol Darurat Ditekan).</p>
        <p style="margin:4px 0 0;font-family:var(--font-mono);font-size:0.95rem;font-weight:700">Persamaan awal: F = ABC\' + D</p>
      </div>

      ${w4Spoiler('📖 Lihat Pembahasan Lengkap Latihan 2', `
        <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--accent-violet)">1. Analisis Logika & Pemetaan Minterm:</h4>
        <ul style="margin:0 0 12px;padding-left:20px;font-size:0.86rem;line-height:1.6;color:var(--text-secondary)">
          <li>Suku <code>D</code> aktif untuk semua minterm berakhiran D=1 (8 minterm): {m₁, m₃, m₅, m₇, m₉, m₁₁, m₁₃, m₁₅}.</li>
          <li>Suku <code>ABC\'</code> aktif saat A=1, B=1, C=0: yaitu m₁₂ (1100, saat D=0) dan m₁₃ (1101, saat D=1).</li>
          <li>Total minterm bernilai 1: <strong>∑m(1, 3, 5, 7, 9, 11, 12, 13, 15)</strong> (9 minterm).</li>
        </ul>

        ${w4KMap4(l2Vals, l2Groups, 'Gambar 4.8: K-Map 4 Variabel Sistem Gerbang Parkir')}

        <h4 style="margin:14px 0 8px;font-size:0.92rem;color:var(--accent-violet)">2. Hasil Pengelompokan:</h4>
        ${w4Step('A', '<strong>Oktet 8 Sel (D):</strong> Mencakup seluruh kolom CD=01 dan CD=11 → menghasilkan suku <code>D</code>.')}
        ${w4Step('B', '<strong>Pair 2 Sel {m₁₂, m₁₃}:</strong> Berada pada baris AB=11 dan kolom CD=00 & CD=01. Pada pair ini, D berubah dari 0 ke 1 (dieliminasi), sedangkan A=1, B=1, C=0 tetap → menghasilkan suku <code>ABC\'</code>.')}

        ${w4Alert('success', '<strong>Persamaan Boolean Minimum:</strong><br><strong style="font-size:1.15rem;font-family:var(--font-mono)">F = ABC\' + D</strong><br>Gerbang dapat diimplementasikan dengan 1 gerbang NOT (C\'), 1 gerbang AND 3-masukan (A·B·C\'), dan 1 gerbang OR 2-masukan (+D).')}`
      )}`
    )}

    <!-- Latihan Tambahan Bergradasi -->
    ${w4Section('Latihan Tambahan Bergradasi (Variasi Soal Lengkap)', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      `<p style="margin:0 0 16px;font-size:0.92rem;color:var(--text-secondary)">
        Uji pemahaman Anda dengan variasi kasus K-Map 2, 3, 4 variabel, teknik 4-sudut (corners), dan kondisi don\'t care berikut:
      </p>

      <!-- 2 Variabel -->
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:12px">
        <p style="margin:0 0 4px;font-weight:700;font-size:0.9rem;color:var(--accent-cyan)">Soal 2V-1: F(A, B) = ∑m(0, 1, 2)</p>
        <p style="margin:0 0 8px;font-size:0.84rem;color:var(--text-secondary)">Sederhanakan minterm m₀(00), m₁(01), dan m₂(10).</p>
        ${w4Spoiler('Lihat Jawaban 2V-1', `
          <p style="margin:0;font-size:0.86rem;line-height:1.6">
            • Grup 1: {m₀, m₁} pada baris A=0 → suku <code>A\'</code><br>
            • Grup 2: {m₀, m₂} pada kolom B=0 → suku <code>B\'</code><br>
            <strong>Hasil Akhir: F = A\' + B\'  (atau (AB)\' lewat hukum De Morgan)</strong>
          </p>
        `)}
      </div>

      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:12px">
        <p style="margin:0 0 4px;font-weight:700;font-size:0.9rem;color:var(--accent-cyan)">Soal 2V-2: F(A, B) = ∑m(1, 3)</p>
        <p style="margin:0 0 8px;font-size:0.84rem;color:var(--text-secondary)">Sederhanakan minterm m₁(01) dan m₃(11).</p>
        ${w4Spoiler('Lihat Jawaban 2V-2', `
          <p style="margin:0;font-size:0.86rem;line-height:1.6">
            • Kelompok 2 sel vertikal pada kolom B=1 {m₁, m₃}.<br>
            • A berubah dari 0 ke 1 (tereliminasi), B tetap 1.<br>
            <strong>Hasil Akhir: F = B</strong>
          </p>
        `)}
      </div>

      <!-- 3 Variabel -->
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:12px">
        <p style="margin:0 0 4px;font-weight:700;font-size:0.9rem;color:var(--accent-violet)">Soal 3V-1: F(A, B, C) = ∑m(0, 2, 4, 6)</p>
        <p style="margin:0 0 8px;font-size:0.84rem;color:var(--text-secondary)">Sederhanakan minterm genap pada K-Map 3 variabel.</p>
        ${w4Spoiler('Lihat Jawaban 3V-1', `
          <p style="margin:0;font-size:0.86rem;line-height:1.6">
            • Minterm m₀ & m₄ berada di kolom BC=00; m₂ & m₆ berada di kolom BC=10.<br>
            • Kolom 00 dan 10 saling wrap-around membentuk <strong>Quad 4 sel</strong> ({m₀, m₂, m₄, m₆}).<br>
            • A berubah (0 & 1), B berubah (0 & 1). C tetap bernilai 0 pada kedua kolom.<br>
            <strong>Hasil Akhir: F = C\'</strong>
          </p>
        `)}
      </div>

      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:12px">
        <p style="margin:0 0 4px;font-weight:700;font-size:0.9rem;color:var(--accent-violet)">Soal 3V-2: F(A, B, C) = ∑m(1, 3, 6, 7)</p>
        <p style="margin:0 0 8px;font-size:0.84rem;color:var(--text-secondary)">Sederhanakan kombinasi 4 minterm 3 variabel.</p>
        ${w4Spoiler('Lihat Jawaban 3V-2', `
          <p style="margin:0;font-size:0.86rem;line-height:1.6">
            • Grup 1: {m₁, m₃} di baris A=0, kolom 01 & 11 → A tetap 0 (A\'), C tetap 1 (C) → <code>A\'C</code><br>
            • Grup 2: {m₆, m₇} di baris A=1, kolom 10 & 11 → A tetap 1 (A), B tetap 1 (B) → <code>AB</code><br>
            <strong>Hasil Akhir: F = A\'C + AB</strong>
          </p>
        `)}
      </div>

      <!-- 4 Variabel -->
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:12px">
        <p style="margin:0 0 4px;font-weight:700;font-size:0.9rem;color:var(--accent-amber)">Soal 4V-1: F(A, B, C, D) = ∑m(0, 2, 8, 10) [Teknik 4 Sudut / Corners]</p>
        <p style="margin:0 0 8px;font-size:0.84rem;color:var(--text-secondary)">Perhatikan keempat minterm yang berada di pojok paling luar K-Map 4x4.</p>
        ${w4Spoiler('Lihat Jawaban 4V-1 (Teknik Corner Quad)', `
          <p style="margin:0;font-size:0.86rem;line-height:1.6">
            • m₀ (0000) = Sudut kiri-atas<br>
            • m₂ (0010) = Sudut kanan-atas<br>
            • m₈ (1000) = Sudut kiri-bawah<br>
            • m₁₀ (1010) = Sudut kanan-bawah<br>
            Keempat sudut saling bertetangga secara topologi silinder ganda (torus) dan membentuk <strong>Quad 4 sel</strong> yang sah!<br>
            - Baris 00 dan 10: B tetap bernilai 0 (<code>B\'</code>), A berubah.<br>
            - Kolom 00 dan 10: D tetap bernilai 0 (<code>D\'</code>), C berubah.<br>
            <strong>Hasil Akhir: F = B\'D\'</strong>
          </p>
        `)}
      </div>

      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:12px">
        <p style="margin:0 0 4px;font-weight:700;font-size:0.9rem;color:var(--accent-amber)">Soal 4V-2: F(A, B, C, D) = ∑m(2, 3, 6, 7, 8, 10, 12, 14)</p>
        <p style="margin:0 0 8px;font-size:0.84rem;color:var(--text-secondary)">Sederhanakan kombinasi 8 minterm pada K-Map 4x4.</p>
        ${w4Spoiler('Lihat Jawaban 4V-2', `
          <p style="margin:0;font-size:0.86rem;line-height:1.6">
            • Quad 1: {m₂, m₃, m₆, m₇} (baris 00 & 01, kolom 11 & 10) → A tetap 0, C tetap 1 → <code>A\'C</code><br>
            • Quad 2: {m₂, m₆, m₁₄, m₁₀} (seluruh kolom CD=10) → C tetap 1, D tetap 0 → <code>CD\'</code><br>
            • Quad 3: {m₈, m₁₀, m₁₂, m₁₄} (baris 11 & 10, kolom 00 & 10 wrap) → A tetap 1, D tetap 0 → <code>AD\'</code><br>
            <strong>Hasil Akhir: F = A\'C + CD\' + AD\'</strong>
          </p>
        `)}
      </div>

      <!-- Don't Care -->
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:12px">
        <p style="margin:0 0 4px;font-weight:700;font-size:0.9rem;color:var(--danger)">Soal DC-1: F(A, B, C, D) = ∑m(1, 5, 12, 13, 14, 15) + ∑d(3, 7)</p>
        <p style="margin:0 0 8px;font-size:0.84rem;color:var(--text-secondary)">Manfaatkan kondisi don\'t care d(3, 7) untuk menyederhanakan fungsi.</p>
        ${w4Spoiler('Lihat Jawaban DC-1', `
          <p style="margin:0;font-size:0.86rem;line-height:1.6">
            • Baris AB=11 terisi penuh {m₁₂, m₁₃, m₁₄, m₁₅} membentuk <strong>Quad 1</strong> → suku <code>AB</code>.<br>
            • Sel m₁ dan m₅ berada di kolom CD=01. Jika kita sertakan d₃ dan d₇ (kolom CD=11), maka terbentuk <strong>Quad 2</strong> {m₁, d₃, d₇, m₅} di baris A=0 (00 dan 01) kolom 01 dan 11!<br>
            - Pada Quad 2 ini: A tetap 0 (A\'), D tetap 1 (D) → suku <code>A\'D</code>.<br>
            <strong>Hasil Akhir: F = AB + A\'D</strong>
          </p>
        `)}
      </div>`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 10: RINGKASAN MATERI, SANDBOX & KUIS EVALUASI AKHIR
   ══════════════════════════════════════════════════════ */
function renderWeek4Summary(el) {
  el.innerHTML = `
    <!-- Ringkasan Komprehensif -->
    ${w4Section('Rangkuman Komprehensif: Karnaugh Map', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--accent-cyan);font-size:0.9rem">1. Hakekat & Fungsi K-Map</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.6">Metode penyederhanaan grafis berbasis pengenalan pola 2 dimensi yang mengubah fungsi SOP/POS kanonik menjadi ekspresi minimum dengan literal paling sedikit.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--accent-violet);font-size:0.9rem">2. Peranan Kode Gray</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.6">Urutan baris dan kolom 00, 01, 11, 10 menjamin jarak Hamming tepat 1 bit antar sel bertetangga, merefleksikan hukum komplemen distributif <code>XY + XY\' = X</code>.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--accent-amber);font-size:0.9rem">3. Kaidah Pengelompokan</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.6">Hanya boleh berukuran 2ⁿ sel (1, 2, 4, 8, 16), berbentuk persegi/persegi panjang, mencakup semua 1, boleh tumpang tindih (overlap), dan mendukung wrap-around tepi.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--danger);font-size:0.9rem">4. Kondisi Don\'t Care (X)</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.6">Kondisi masukan terlarang atau tak relevan. Fleksibel: dapat dianggap bernilai 1 jika membesarkan kelompok, atau diabaikan (bernilai 0) jika tidak membantu.</p>
        </div>
      </div>

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700;color:var(--accent-cyan)">Tabel Rumus & Dampak Ukuran Kelompok terhadap Eliminasi Literal:</h4>
      ${w4Table(
        ['Ukuran Kelompok', 'K-Map 2 Variabel (n=2)', 'K-Map 3 Variabel (n=3)', 'K-Map 4 Variabel (n=4)'],
        [
          ['1 Sel (2⁰)', 'Sisa 2 literal (misal: A\'B)', 'Sisa 3 literal (misal: A\'B\'C)', 'Sisa 4 literal (misal: A\'BC\'D)'],
          ['2 Sel (2¹)', 'Sisa 1 literal (misal: A)', 'Sisa 2 literal (misal: BC)', 'Sisa 3 literal (misal: ABC)'],
          ['4 Sel (2² - Quad)', 'Sisa 0 literal (Q = 1)', 'Sisa 1 literal (misal: A)', 'Sisa 2 literal (misal: BD)'],
          ['8 Sel (2³ - Oktet)', 'Tidak ada', 'Sisa 0 literal (Q = 1)', 'Sisa 1 literal (misal: D)'],
          ['16 Sel (2⁴)', 'Tidak ada', 'Tidak ada', 'Sisa 0 literal (Q = 1)']
        ]
      )}

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700;color:var(--danger)">Tips Menghindari Kesalahan Umum (Common Pitfalls):</h4>
      ${[
        '<strong>Jangan mengelompokkan secara diagonal:</strong> Sel diagonal berjarak Hamming 2 bit (dua variabel berubah sekaligus), sehingga tidak memenuhi hukum penyederhanaan Boolean.',
        '<strong>Jangan membuat kelompok beranggotakan 3 atau 6 sel:</strong> Hanya pangkat dua (1, 2, 4, 8) yang sah secara matematis.',
        '<strong>Jangan lupa memeriksa sifat wrap-around:</strong> Sel di tepi kiri bersebelahan dengan tepi kanan, dan sel di sudut atas bersebelahan dengan sudut bawah (termasuk 4 sudut / corner quad).',
        '<strong>Hindari kelompok redundan (Redundant Prime Implicants):</strong> Jika semua angka 1 dalam suatu kelompok sudah dicakup oleh kelompok-kelompok lain yang lebih besar, maka kelompok tersebut redundan dan wajib dibuang!'
      ].map((tip, i) => w4Step(i + 1, tip)).join('')}`
    )}

    <!-- K-Map Mini Sandbox Interaktif -->
    ${w4Section('Interactive K-Map Sandbox (Eksplorasi Sel Interaktif)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      `<p style="margin:0 0 12px;font-size:0.92rem;color:var(--text-secondary)">
        Klik kotak sel di bawah untuk mengganti nilai (<strong>0 → 1 → X → 0</strong>). Amati koordinat biner masukan dan mintermnya secara langsung:
      </p>
      <div style="display:flex;justify-content:center;margin:16px 0">
        <div id="w4_sandbox_container" style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px;text-align:center">
          <div style="display:grid;grid-template-columns:repeat(2, 70px);gap:8px;margin:0 auto 12px;justify-content:center">
            <button type="button" class="w4-cell-btn" data-m="0" onclick="window.w4ToggleCell(this, 0)" style="width:70px;height:70px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.3rem;font-weight:800;color:var(--text-faint);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px">
              <span>0</span><span style="font-size:0.7rem;font-weight:600;color:var(--text-faint)">m₀ (00)</span>
            </button>
            <button type="button" class="w4-cell-btn" data-m="1" onclick="window.w4ToggleCell(this, 1)" style="width:70px;height:70px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.3rem;font-weight:800;color:var(--text-faint);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px">
              <span>0</span><span style="font-size:0.7rem;font-weight:600;color:var(--text-faint)">m₁ (01)</span>
            </button>
            <button type="button" class="w4-cell-btn" data-m="2" onclick="window.w4ToggleCell(this, 2)" style="width:70px;height:70px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.3rem;font-weight:800;color:var(--text-faint);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px">
              <span>0</span><span style="font-size:0.7rem;font-weight:600;color:var(--text-faint)">m₂ (10)</span>
            </button>
            <button type="button" class="w4-cell-btn" data-m="3" onclick="window.w4ToggleCell(this, 3)" style="width:70px;height:70px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.3rem;font-weight:800;color:var(--text-faint);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px">
              <span>0</span><span style="font-size:0.7rem;font-weight:600;color:var(--text-faint)">m₃ (11)</span>
            </button>
          </div>
          <div id="w4_sandbox_status" style="font-family:var(--font-mono);font-size:0.86rem;color:var(--text-secondary)">
            Klik sel untuk mengubah nilai dan mencoba kombinasi logika Anda sendiri!
          </div>
        </div>
      </div>`
    )}

    <!-- Kuis Pilihan Ganda Interaktif -->
    ${w4Section('Evaluasi Pemahaman: Kuis Pilihan Ganda Interaktif', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      `<p style="margin:0 0 16px;font-size:0.92rem;color:var(--text-secondary)">
        Uji kemampuan analisis K-Map Anda. Klik salah satu opsi pada setiap soal untuk langsung memeriksa kebenaran jawaban:
      </p>
      ${[
        {
          q: "1. Berapakah jumlah sel pada K-Map 4 variabel, dan mengapa urutan kolomnya wajib 00, 01, 11, 10?",
          opts: [
            "A. 8 sel; mengikuti urutan biner alami agar berurutan secara aritmetika",
            "B. 16 sel; menggunakan Kode Gray agar sel bersebelahan hanya berbeda pada 1 bit (jarak Hamming = 1)",
            "C. 16 sel; urutan bebas asalkan minterm terisi lengkap",
            "D. 32 sel; agar menampung kemungkinan kondisi don't care"
          ],
          ans: 1,
          exp: "K-Map 4 variabel memiliki 2⁴ = 16 sel. Urutan kolom menggunakan Kode Gray (00, 01, 11, 10) sehingga sel bertetangga berjarak Hamming 1 bit, memungkinkan penerapan teorema XY + XY' = X."
        },
        {
          q: "2. Manakah ukuran kelompok berikut yang TIDAK SAH dalam aturan penyederhanaan K-Map SOP?",
          opts: [
            "A. Kelompok beranggotakan 1 sel",
            "B. Kelompok beranggotakan 4 sel (Quad)",
            "C. Kelompok beranggotakan 6 sel",
            "D. Kelompok beranggotakan 8 sel (Oktet)"
          ],
          ans: 2,
          exp: "Aturan K-Map menetapkan ukuran kelompok wajib berupa bilangan pangkat dua (2ⁿ yaitu 1, 2, 4, 8, 16). Angka 6 bukan pangkat dua sehingga pengelompokan 6 sel dilarang."
        },
        {
          q: "3. Pada K-Map 3 variabel, jika sebuah kelompok beranggotakan 4 sel (Quad) berhasil dibentuk, berapakah jumlah variabel yang tereliminasi?",
          opts: [
            "A. 1 variabel tereliminasi (tersisa 2 literal)",
            "B. 2 variabel tereliminasi (tersisa 1 literal tunggal)",
            "C. 3 variabel tereliminasi (tersisa konstanta 1)",
            "D. Tidak ada variabel yang tereliminasi"
          ],
          ans: 1,
          exp: "Kelompok berukuran 4 sel (2²) mengeliminasi tepat 2 variabel masukan, sehingga dari 3 variabel masukan awal hanya tersisa 3 - 2 = 1 literal tunggal (misal Q = A)."
        },
        {
          q: "4. Pada K-Map 4 variabel, minterm m₀ (0000), m₂ (0010), m₈ (1000), dan m₁₀ (1010) dapat dikelompokkan menjadi satu Quad karena:",
          opts: [
            "A. Keempat sel menempati 4 sudut luar peta K-Map yang saling bersebelahan secara wrap-around",
            "B. Keempat sel berada pada baris yang sama",
            "C. Keempat sel berada pada kolom yang sama",
            "D. Keempat sel membentuk diagonal murni"
          ],
          ans: 0,
          exp: "Keempat sudut (corner cells) pada K-Map 4x4 saling bersambungan pada lipatan horizontal dan vertikal (topologi torus), membentuk Quad yang sah dan menghasilkan suku B'D'."
        },
        {
          q: "5. Manakah pernyataan yang BENAR mengenai penanganan sel Don't Care (X) pada K-Map?",
          opts: [
            "A. Sel X wajib dimasukkan ke dalam kelompok seperti halnya minterm bernilai 1",
            "B. Sel X harus selalu diubah nilainya menjadi 0 sebelum disederhanakan",
            "C. Sel X boleh diperlakukan sebagai 1 untuk memperbesar kelompok, atau diabaikan (bernilai 0) jika tidak membantu",
            "D. Sel X hanya boleh digunakan jika seluruh sel lain sudah berpasangan"
          ],
          ans: 2,
          exp: "Kondisi Don't Care bersifat fleksibel: dapat dianggap bernilai 1 jika membantu memperbesar kelompok (mengurangi literal), atau diabaikan (tetap 0) jika tidak membawa keuntungan penyederhanaan."
        }
      ].map((item, qi) => `
        <div id="w4_quiz_q${qi}" style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:14px">
          <p style="margin:0 0 12px;font-size:0.92rem;font-weight:700">${item.q}</p>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${item.opts.map((opt, oi) => `
              <button type="button" class="w4-quiz-opt" onclick="window.w4CheckAnswer(this, 'w4_quiz', ${qi}, ${oi}, ${item.ans}, '${item.exp.replace(/'/g, "\\'")}')" style="background:var(--bg-card);border:1.5px solid var(--line);border-radius:8px;padding:10px 14px;text-align:left;font-size:0.86rem;cursor:pointer;color:var(--text-secondary);transition:all .15s ease">
                ${opt}
              </button>`).join('')}
          </div>
          <div id="w4_quiz_fb${qi}" hidden style="margin-top:12px"></div>
        </div>`).join('')}`
    )}

    <!-- Evaluasi Soal Esai Komprehensif -->
    ${w4Section('Evaluasi Esai Komprehensif (Analisis Mandiri)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
      `<div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-weight:700;font-size:0.95rem;color:var(--accent-violet)">Soal Esai 1: Analisis Aljabar terhadap Larangan Pengelompokan Diagonal</p>
        <p style="margin:0 0 10px;font-size:0.88rem;color:var(--text-secondary);line-height:1.6">
          Jelaskan secara matematis mengapa pengelompokan sel secara diagonal dilarang pada K-Map dengan meninjau jarak Hamming dan teorema Boolean <code>XY + XY\' = X</code>!
        </p>
        ${w4Spoiler('📖 Kunci Jawaban & Rubrik Esai 1', `
          <p style="margin:0;font-size:0.86rem;line-height:1.7;color:var(--text-secondary)">
            <strong>Penjelasan:</strong><br>
            1. Teorema penyederhanaan Boolean <code>XY + XY\' = X(Y + Y\') = X(1) = X</code> mensyaratkan bahwa dua suku perkalian hanya dapat digabungkan apabila <em>semua variabel identik KECUALI TEPAT SATU variabel yang saling berkomplemen</em> (jarak Hamming = 1).<br>
            2. Pada sel-sel diagonal (misalnya m₀ = 00 dan m₃ = 11 pada K-Map 2 variabel), terdapat <strong>dua bit yang berubah sekaligus</strong> (A: 0→1 dan B: 0→1).<br>
            3. Jumlah suku: <code>A\'B\' + AB</code>. Bentuk ini tidak dapat difaktorkan untuk mengeliminasi variabel manapun, melainkan merupakan fungsi gerbang XNOR <code>(A ⊕ B)\'</code>.<br>
            4. Oleh karena itu, pengelompokan diagonal tidak sah karena melanggar syarat eliminasi satu literal.
          </p>
        `)}
      </div>

      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:16px 18px">
        <p style="margin:0 0 6px;font-weight:700;font-size:0.95rem;color:var(--accent-violet)">Soal Esai 2: Desain Logika Mesin Vending Otomatis</p>
        <p style="margin:0 0 10px;font-size:0.88rem;color:var(--text-secondary);line-height:1.6">
          Sebuah mesin vending otomatis mengeluarkan minuman (Z = 1) jika uang pas dimasukkan (A = 1) DAN (stok minuman masih ada B = 1 ATAU kunci teknisi perawatan aktif C = 1).<br>
          (a) Tuliskan bentuk kanonik SOP ∑m.<br>
          (b) Masukkan ke K-Map 3 variabel dan sederhanakan.<br>
          (c) Tentukan persamaan Boolean minimum dan jenis gerbang yang dibutuhkan.
        </p>
        ${w4Spoiler('📖 Kunci Jawaban & Rubrik Esai 2', `
          <p style="margin:0;font-size:0.86rem;line-height:1.7;color:var(--text-secondary)">
            <strong>Langkah Penyelesaian:</strong><br>
            (a) Kondisi aktif Z = 1 terjadi saat A=1 dan (B=1 atau C=1):<br>
            • A=1, B=0, C=1 → m₅ (101)<br>
            • A=1, B=1, C=0 → m₆ (110)<br>
            • A=1, B=1, C=1 → m₇ (111)<br>
            Bentuk kanonik: <strong>Z = ∑m(5, 6, 7)</strong><br><br>
            (b) Pada K-Map 3 variabel baris A=1:<br>
            • Kelompok 1: {m₅, m₇} di kolom 01 dan 11 → A tetap 1, C tetap 1 → suku <code>AC</code>.<br>
            • Kelompok 2: {m₆, m₇} di kolom 10 dan 11 → A tetap 1, B tetap 1 → suku <code>AB</code>.<br><br>
            (c) Persamaan minimum: <strong>Z = AB + AC = A(B + C)</strong>.<br>
            Implementasi gerbang: 1 gerbang OR untuk <code>(B + C)</code> dan 1 gerbang AND untuk mengalikan dengan <code>A</code>.
          </p>
        `)}
      </div>`
    )}
  `;

  // Register interactive cell sandbox handler
  window.w4ToggleCell = function(btn, m) {
    const states = ['0', '1', 'X'];
    const textSpan = btn.querySelector('span:first-child');
    const curVal = textSpan.textContent.trim();
    const nextIdx = (states.indexOf(curVal) + 1) % states.length;
    const nextVal = states[nextIdx];
    textSpan.textContent = nextVal;

    if (nextVal === '1') {
      btn.style.borderColor = 'var(--success)';
      btn.style.color = 'var(--success)';
      btn.style.background = 'rgba(34,197,94,0.12)';
    } else if (nextVal === 'X') {
      btn.style.borderColor = 'var(--accent-amber)';
      btn.style.color = 'var(--accent-amber)';
      btn.style.background = 'rgba(245,158,11,0.12)';
    } else {
      btn.style.borderColor = 'var(--line)';
      btn.style.color = 'var(--text-faint)';
      btn.style.background = 'var(--bg-card)';
    }

    const allBtns = document.querySelectorAll('.w4-cell-btn');
    const ones = [];
    const dcs = [];
    allBtns.forEach(b => {
      const v = b.querySelector('span:first-child').textContent.trim();
      const mIdx = b.getAttribute('data-m');
      if (v === '1') ones.push(`m${mIdx}`);
      if (v === 'X') dcs.push(`d${mIdx}`);
    });

    const statusEl = document.getElementById('w4_sandbox_status');
    if (statusEl) {
      statusEl.innerHTML = `Minterm Aktif: <strong>${ones.length > 0 ? ones.join(', ') : 'Tidak ada'}</strong> | Don\'t Care: <strong>${dcs.length > 0 ? dcs.join(', ') : 'Tidak ada'}</strong>`;
    }
  };

  // Register quiz handler
  window.w4CheckAnswer = function(btn, qid, qi, selected, correct, explain) {
    const qDiv = document.getElementById(`${qid}_q${qi}`);
    const fbDiv = document.getElementById(`${qid}_fb${qi}`);
    if (!qDiv || !fbDiv) return;

    qDiv.querySelectorAll('.w4-quiz-opt').forEach(b => {
      b.style.pointerEvents = 'none';
      b.style.opacity = '0.7';
    });

    const isCorrect = selected === correct;
    btn.style.opacity = '1';
    if (isCorrect) {
      btn.style.borderColor = 'var(--success)';
      btn.style.background = 'var(--success-dim)';
    } else {
      btn.style.borderColor = 'var(--danger)';
      btn.style.background = 'var(--danger-dim)';
      const correctBtn = qDiv.querySelectorAll('.w4-quiz-opt')[correct];
      if (correctBtn) {
        correctBtn.style.opacity = '1';
        correctBtn.style.borderColor = 'var(--success)';
        correctBtn.style.background = 'var(--success-dim)';
      }
    }

    fbDiv.hidden = false;
    fbDiv.innerHTML = `
      <div style="display:flex;gap:8px;align-items:flex-start;background:${isCorrect ? 'var(--success-dim)' : 'var(--danger-dim)'};border-left:3px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'};border-radius:0 8px 8px 0;padding:10px 14px;font-size:0.85rem;line-height:1.6">
        <span>${isCorrect ? '✅' : '❌'}</span>
        <span>${isCorrect ? '<strong>Benar!</strong> ' : '<strong>Kurang tepat.</strong> '}${explain}</span>
      </div>`;
  };
}

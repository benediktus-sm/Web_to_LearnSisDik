const fs = require('fs');
const dir = 'c:/Users/BENEDIKTUS MARBUN/Downloads/Web_to_LearnSisDik';

const files = ['week6.js', 'week7.js', 'week2.js', 'week3.js', 'week4.js', 'week5.js'];
files.forEach(f => {
  const code = fs.readFileSync(dir + '/' + f, 'utf8');
  const cardCount = (code.match(/class="card"/g) || []).length;
  const btnCount = (code.match(/class="btn"/g) || []).length;
  const navHeader = (code.match(/content-header/g) || []).length;
  const navCalls = (code.match(/navigateTo/g) || []).length;
  console.log(f, '| .card:', cardCount, '| .btn:', btnCount, '| content-header:', navHeader, '| navigateTo calls:', navCalls);
});

const css = fs.readFileSync(dir + '/style.css', 'utf8');
const cardInCss = css.match(/\.card\s*\{/g);
const btnInCss = css.match(/\.btn\s*\{/g);
const contentHeaderInCss = css.match(/\.content-header/g);
console.log('\n.card in CSS:', cardInCss ? 'YES' : 'NOT FOUND');
console.log('.btn in CSS:', btnInCss ? 'YES' : 'NOT FOUND');
console.log('.content-header in CSS:', contentHeaderInCss ? 'YES' : 'NOT FOUND');

const app = fs.readFileSync(dir + '/app.js', 'utf8');
console.log('\nwindow.navigateTo defined in app.js:', app.includes('window.navigateTo'));
console.log('window.selectWeek defined in app.js:', app.includes('window.selectWeek'));

// Check accent-emerald usage
const w7 = fs.readFileSync(dir + '/week7.js', 'utf8');
const emeraldInW7 = (w7.match(/accent-emerald/g) || []).length;
const emeraldInCss = (css.match(/accent-emerald/g) || []).length;
console.log('\naccent-emerald in week7.js:', emeraldInW7);
console.log('accent-emerald in style.css:', emeraldInCss);

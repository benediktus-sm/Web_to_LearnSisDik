const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/BENEDIKTUS MARBUN/Downloads/Web_to_LearnSisDik';

// Load data.js
const dataCode = fs.readFileSync(path.join(baseDir, 'data.js'), 'utf8');
const vm = require('vm');
const COURSE = eval(dataCode + '; COURSE;');


console.log('Course title:', COURSE.courseTitle);
console.log('Total weeks in data.js:', COURSE.weeks.length);

const availableWeeks = COURSE.weeks.filter(w => w.available);
console.log('Available weeks:', availableWeeks.map(w => `W${w.number}: ${w.title} (${w.topics.length} topics)`));

// Read JS files
const files = ['converter.js', 'week2.js', 'week3.js', 'week4.js', 'week5.js', 'week6.js', 'week7.js'];
const allCode = {};
for (const f of files) {
  allCode[f] = fs.readFileSync(path.join(baseDir, f), 'utf8');
}

// Check render functions
console.log('\n--- Checking render functions ---');
availableWeeks.forEach(w => {
  w.topics.forEach(t => {
    let foundIn = null;
    for (const f of files) {
      if (allCode[f].includes(t.render)) {
        foundIn = f;
        break;
      }
    }
    if (!foundIn) {
      console.error(`[MISSING RENDER FN] Week ${w.number} topic "${t.label}" (${t.id}) expects render function "${t.render}" but NOT found in any file!`);
    } else {
      // console.log(`✓ W${w.number} - ${t.render} in ${foundIn}`);
    }
  });
});

// Check reading time map in app.js
console.log('\n--- Checking readingTime map in app.js ---');
const appCode = fs.readFileSync(path.join(baseDir, 'app.js'), 'utf8');
availableWeeks.forEach(w => {
  w.topics.forEach(t => {
    if (!appCode.includes(t.render)) {
      console.warn(`[MISSING READING TIME] app.js does not have entry for "${t.render}" (W${w.number})`);
    }
  });
});

console.log('\n--- Checking scripts included in index.html ---');
const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
files.forEach(f => {
  if (indexHtml.includes(f)) {
    console.log(`✓ ${f} is included in index.html`);
  } else {
    console.error(`✗ ${f} NOT included in index.html!`);
  }
});

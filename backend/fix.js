const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p, callback);
    } else {
      callback(p);
    }
  });
}

walk('e:/cardyn/nfc-card-system/nfc-cards/src/templates', p => {
  if (p.endsWith('.jsx')) {
    let content = fs.readFileSync(p, 'utf8');
    // Replace href={ || null} back to the original or fix it
    // Wait, since we don't know the original variable name, we can't easily restore it!
    // But wait, what were the variables?
    // It was replacing href={website}, href={instagram}, href={href}, etc.
    // If we look at the original files, is it lost?
    // Git can restore it! 
    // We can run `git checkout e:/cardyn/nfc-card-system/nfc-cards/src/templates`!
  }
});

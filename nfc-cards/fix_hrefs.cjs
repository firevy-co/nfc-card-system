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
    
    // Replace href={someVariable} with href={someVariable || null}
    // We make sure it doesn't already have || null or complex expressions
    let newContent = content.replace(/href=\{([a-zA-Z0-9_\.]+)\}/g, 'href={$1 || null}');
    
    if (content !== newContent) {
      fs.writeFileSync(p, newContent);
      console.log('Fixed:', p);
    }
  }
});

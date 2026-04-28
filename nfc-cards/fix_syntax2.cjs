const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src/templates');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Fix double object syntax: {email && {email && <a ...></a>}}
    // Regex matches: {variable && {variable && <a ...>...</a>}}
    content = content.replace(/\{([a-zA-Z0-9_]+)\s*&&\s*\{([a-zA-Z0-9_]+)\s*&&\s*(<a[^>]+>.*?<\/a>)\}\}/g, '{$1 && $3}');
    
    // Fix double object syntax for <div>
    content = content.replace(/\{([a-zA-Z0-9_]+)\s*&&\s*\{([a-zA-Z0-9_]+)\s*&&\s*(<div[^>]+>.*?<\/div>)\}\}/g, '{$1 && $3}');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed double brackets in', file);
    }
});

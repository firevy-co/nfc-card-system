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

    // Fix map pin href error
    content = content.replace(/href=\{`https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=\$\{encodeURIComponent\(address\)\} target="_blank"/g, 
        'href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank"');

    // Fix website href error
    content = content.replace(/href=\{website\.startsWith\('http'\) \? website : `https:\/\/\$\{website\} target="_blank"/g, 
        'href={website.startsWith(\'http\') ? website : `https://${website}`} target="_blank"');

    // Fix nested website error {website && {website.replace(...) && <a...>}}
    // It looks exactly like: {website && {website.replace(/(^\w+:|^)\/\//, '') && <a ...>...</a>}}
    content = content.replace(/\{website\s*&&\s*\{website\.replace\(\/\(\^\\w\+:\^\\w\+:\\\|\^\)\\\/\\\/\/, ''\)\s*&&\s*(<a[^>]+>.*?<\/a>)\}\}/g, 
        '{website && $1}');

    // Fallback for nested website error, replace exact string:
    content = content.replace("{website && {website.replace(/(^\\w+:|^)\\/\\//, '') && <a", "{website && <a");
    // Wait, the end of that line would have an extra '}'. 
    // Let's just use regex for the whole line:
    content = content.replace(/\{website\s*&&\s*\{website\.replace[^&]+&&\s*<a([^>]+)>(.*?)<\/a>\}\}/g, "{website && <a$1>$2</a>}");

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed more syntax in', file);
    }
});

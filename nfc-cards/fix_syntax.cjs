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

    // Fix malformed href for email
    content = content.replace(/href=\{`mailto:\$\{email\} target="_blank"/g, 'href={`mailto:${email}`} target="_blank"');
    
    // Fix malformed href for phone
    content = content.replace(/href=\{`tel:\$\{phone\} target="_blank"/g, 'href={`tel:${phone}`} target="_blank"');

    // Fix double address check: {address && {address && (<a... />)}}
    content = content.replace(/\{([a-zA-Z0-9_]+)\s*&&\s*\{([a-zA-Z0-9_]+)\s*&&\s*\((<a[^>]+>View on Map<\/a>)\)\}\}/g, '{$1 && $3}');
    
    // Some might not have parentheses: {address && {address && <a... />}}
    content = content.replace(/\{([a-zA-Z0-9_]+)\s*&&\s*\{([a-zA-Z0-9_]+)\s*&&\s*(<a[^>]+>View on Map<\/a>)\}\}/g, '{$1 && $3}');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed syntax in', file);
    }
});

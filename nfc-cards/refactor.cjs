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
    if (file.includes('StandardComponents.jsx')) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Handle imports
    // Regex to match: import { ... } from "../common/StandardComponents";
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"](?:\.\.\/)+common\/StandardComponents['"];?/g;
    
    content = content.replace(importRegex, (match, imports) => {
        let hasVCard = imports.includes('downloadVCard');
        if (hasVCard || content.includes('downloadVCard') || content.includes('StandardSaveContactButton')) {
            return `import { downloadVCard } from '../common/StandardComponents';`;
        }
        return '';
    });

    // Replace StandardSaveContactButton
    content = content.replace(/<StandardSaveContactButton\s+userData=\{([a-zA-Z0-9_]+)\}\s*\/>/g, 
        `<button onClick={() => downloadVCard($1)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>`);

    // Replace StandardMapPreview
    content = content.replace(/<StandardMapPreview\s+address=\{([a-zA-Z0-9_]+)\}\s*\/>/g, 
        `{$1 && (<a href={\`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent($1)}\`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}`);

    // Replace StandardContactLink with href
    content = content.replace(/<StandardContactLink\s+icon=\{([^}]+)\}\s+value=\{([^}]+)\}\s+href=\{([^}]+)\}.*?\/>/g, 
        `{$2 && <a href={$3} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><$1 size={18} /> <span className="text-sm">{$2}</span></a>}`);

    // Replace StandardContactLink without href
    content = content.replace(/<StandardContactLink\s+icon=\{([^}]+)\}\s+value=\{([^}]+)\}\s*\/>/g, 
        `{$2 && <div className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80"><$1 size={18} /> <span className="text-sm">{$2}</span></div>}`);

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated', file);
    }
});

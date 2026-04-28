const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'templates');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.jsx')) {
            // Skip non-template files
            if (['StandardComponents.jsx', 'TemplateRenderer.jsx', 'PoweredBy.jsx'].includes(file)) continue;

            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;

            // Pattern for outer wrapper: <div className="min-h-screen ... flex justify-center...">
            // Pattern for inner wrapper: <div className="w-full max-w-sm min-h-screen ...">
            
            // We can replace the outer wrapper classes:
            const outerRegex = /<div className="([^"]*?min-h-screen[^"]*?flex[^"]*?justify-center[^"]*?)"/g;
            content = content.replace(outerRegex, (match, classes) => {
                let newClasses = classes;
                if (!newClasses.includes('md:bg-neutral-950')) newClasses += ' md:bg-neutral-950';
                if (!newClasses.includes('md:items-center')) newClasses += ' md:items-center';
                if (!newClasses.includes('md:py-12')) newClasses += ' py-0 md:py-12';
                
                if (newClasses !== classes) updated = true;
                return `<div className="${newClasses}"`;
            });

            // We can replace the inner wrapper classes:
            const innerRegex = /<div className="([^"]*?w-full[^"]*?max-w-md[^"]*?min-h-screen[^"]*?)"|<div className="([^"]*?w-full[^"]*?max-w-sm[^"]*?min-h-screen[^"]*?)"/g;
            content = content.replace(innerRegex, (match, classesMd, classesSm) => {
                let classes = classesMd || classesSm;
                let newClasses = classes;
                
                // Add responsive classes
                if (!newClasses.includes('md:min-h-0')) newClasses += ' md:min-h-0';
                if (!newClasses.includes('md:h-auto')) newClasses += ' md:h-auto';
                if (!newClasses.includes('md:rounded-[2.5rem]')) newClasses += ' md:rounded-[2.5rem]';
                // Some optional shadow/border, maybe customize depending on theme?
                // Let's just add a basic subtle border and shadow for all to make it generic
                if (!newClasses.includes('md:border')) newClasses += ' md:border md:border-white/10';
                if (!newClasses.includes('md:shadow-2xl')) newClasses += ' md:shadow-2xl';
                if (!newClasses.includes('pb-10')) newClasses += ' pb-10';

                if (newClasses !== classes) updated = true;
                return `<div className="${newClasses}"`;
            });

            if (updated) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${file}`);
            }
        }
    }
}

processDir(templatesDir);
console.log("Done");

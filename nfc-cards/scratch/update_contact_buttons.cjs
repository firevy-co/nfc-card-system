const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
};

const templates = walk('src/templates');

templates.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<StandardSaveContactButton />')) {
        console.log(`Updating ${file}`);
        content = content.replace('<StandardSaveContactButton />', '<StandardSaveContactButton userData={userData} />');
        fs.writeFileSync(file, content);
    }
});

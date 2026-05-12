const fs = require('fs');
const path = require('path');

const fieldsToRemove = ['tiktok', 'youtube', 'zipCode', 'venmo', 'paypal', 'FaTiktok', 'FaYoutube', 'FiYoutube', 'FaPaypal'];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove imports of specific icons
    content = content.replace(/\b(FaTiktok|FaYoutube|FiYoutube|FaPaypal)\s*,?\s*/g, '');
    
    // Clean up empty imports like `import {  } from 'react-icons/fa';`
    content = content.replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"];?/g, '');

    // Remove destructured variables: `youtube, ` or `, youtube`
    content = content.replace(/\b(tiktok|youtube|zipCode|venmo|paypal)\s*(?::\s*[^,}]+)?\s*,?\s*/g, '');

    // The above might leave trailing commas like `{ a, b, }`. JS allows trailing commas in destructuring, but let's clean if we can
    content = content.replace(/,\s*}/g, ' }');
    content = content.replace(/{\s*,/g, '{ ');

    // Remove array elements like `{ id: 'youtube', ... },` or `{ val: youtube, ... },`
    content = content.replace(/{\s*(id|val)\s*:\s*['"]?(tiktok|youtube|zipCode|venmo|paypal)['"]?[\s\S]*?},?\s*/g, '');
    
    // Remove object properties like `youtube: rawUserData.youtube || "",`
    content = content.replace(/\b(tiktok|youtube|zipCode|venmo|paypal)\s*:\s*[^,\n]+,?\s*/g, '');

    // Remove JSX blocks like `{youtube && (...)}`
    // We can do a simplistic brace matching for these specific fields
    const blockRegex = new RegExp(`{\\s*(?:tiktok|youtube|zipCode|venmo|paypal)\\s*&&\\s*([\\s\\S]*?)}`, 'g');
    let prevContent;
    do {
        prevContent = content;
        content = content.replace(/{\s*(tiktok|youtube|zipCode|venmo|paypal)\s*&&\s*(?:\([^)]*\)|<[^>]*>[\s\S]*?<\/[^>]*>|<[^/>]*\/>)\s*}/g, '');
        // more complex nested matching can be hard with regex, we'll see if the above works.
    } while (content !== prevContent);

    // Fallback block remover for simple multi-line like `{youtube && (\n <a...>\n  <FiYoutube />\n </a>\n)}`
    const advancedRegex = /{\s*(tiktok|youtube|zipCode|venmo|paypal)\s*&&\s*\([\s\S]*?\)\s*}/g;
    content = content.replace(advancedRegex, '');
    
    const singleLineRegex = /{\s*(tiktok|youtube|zipCode|venmo|paypal)\s*&&\s*<[\s\S]*?>\s*}/g;
    content = content.replace(singleLineRegex, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Processed:', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            processFile(fullPath);
        }
    }
}

walkDir(path.join(__dirname, 'nfc-cards', 'src'));
console.log("Done");

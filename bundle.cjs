const fs = require('fs');
const path = require('path');

const rootDir = './dist';
const typesDir = './dist/types';
const importRegex = /import\s*{\s*([^}]*)\s*}\s*from\s*['"]([^'"]*)['"];?/g;
const excludedModules = ['fs', 'path', 'jsdom'];

function replaceImports(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const modifiedContent = fileContent.replace(importRegex, (match, imports, importPath) => {
    if (excludedModules.includes(importPath) || importPath.endsWith('.js')) {
      return match;
    } else {
      const importTarget = importPath === './types/index.js' ? './types/index.cjs' : `${importPath}.js`;
      if (imports.includes('availableWikis')) {
        return `import { ${imports} } from '${importTarget.replace(/\.js$/, '.cjs')}';`;
      } else {
        return `import { ${imports} } from '${importTarget}';`;
      }
    }
  });
  fs.writeFileSync(filePath, modifiedContent);
}

function processFile(file, currentDir) {
  const filePath = path.join(currentDir, file);
  if (fs.statSync(filePath).isDirectory()) {
    processDirectory(filePath);
  } else if (file.endsWith('.js')) {
    replaceImports(filePath);

    if (filePath === `${typesDir}/index.js`) {
      // Replace export statement in types/index.js
      const indexContent = fs.readFileSync(filePath, 'utf8');
      const modifiedIndexContent = indexContent.replace(/export\s*{\s*([^}]*)\s*};?/g, 'module.exports = { $1 };');
      fs.writeFileSync(filePath, modifiedIndexContent);
    }
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  files.forEach(file => processFile(file, directory));
}

processDirectory(rootDir);

// Rename types/index.js to types/index.cjs
fs.renameSync(`${typesDir}/index.js`, `${typesDir}/index.cjs`);

// Edit types/index.cjs
const indexPath = `${typesDir}/index.cjs`;
const indexContent = fs.readFileSync(indexPath, 'utf8');
const modifiedIndexContent = indexContent
  .replace(/import\s+(\*\s+as\s+)?(\w+)\s+from\s+['"]([^'"]+)['"]/g, 'const $2 = require(\'$3\');')
  .replace(/export\s*{\s*([^}]*)\s*};?/g, 'module.exports = { $1 };');
fs.writeFileSync(indexPath, modifiedIndexContent);
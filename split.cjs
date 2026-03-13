const fs = require('fs');
const appPath = 'm:\\Apps\\toolsweb\\src\\App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

const importRegex = /^import\s+\{\s*([A-Za-z0-9_]+)\s*\}\s+from\s+['"](\..*?)['"];?\r?\n/gm;

let modifiedContent = content.replace(importRegex, (match, name, path) => {
  if (['Home', 'ScrollToTop', 'AdminGuard'].includes(name)) {
    return match;
  }
  return `const ${name} = lazy(() => import('${path}').then(module => ({ default: module.${name} })));\n`;
});

if (!modifiedContent.includes("import { Suspense, lazy } from 'react'")) {
  modifiedContent = "import { Suspense, lazy } from 'react'\n" + modifiedContent;
}

modifiedContent = modifiedContent.replace('<Routes>', 
  '<Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin"></div></div>}>\n          <Routes>');
modifiedContent = modifiedContent.replace('</Routes>', '</Routes>\n        </Suspense>');

fs.writeFileSync(appPath, modifiedContent);
console.log('App.jsx modified with React.lazy');

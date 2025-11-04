import { promises as fsPromises, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const { readFile, writeFile, unlink } = fsPromises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function convertTsxToJsx(content) {
  // Conservative regex-based removals. This will need manual inspection afterwards.
  // Remove simple type annotations like: const x: Type =
  content = content.replace(/:\s*[A-Za-z0-9_<>\[\]{}|&.,\s]+(?=\s*[=,);\n])/g, '');

  // Remove interface and type declarations
  content = content.replace(/interface\s+\w+\s*{[\s\S]*?}\n?/g, '');
  content = content.replace(/type\s+\w+\s*=\s*[\s\S]*?;\n?/g, '');

  // Remove 'import type' and type-only imports
  content = content.replace(/import\s+type\s+\{[^}]*\}\s*from\s*['"][^'"]+['"];?/g, '');
  content = content.replace(/import\s+\{\s*type[^}]*\}\s*from\s*['"][^'"]+['"];?/g, '');

  // Remove 'as Type' casts
  content = content.replace(/\s+as\s+[A-Za-z0-9_<>\[\]{}|&.,\s]+/g, '');

  // Remove generic parameters on React components or functions like: Component<Props>
  content = content.replace(/([A-Za-z0-9_]+)\s*<[^>]+>\s*(\(|\{)/g, '$1$2');

  // Update imports that explicitly reference .tsx/.ts -> .jsx/.js
  content = content.replace(/from\s+['"]([^'"]+)\.tsx['"]/g, "from '$1.jsx'");
  content = content.replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1.js'");

  return content;
}

async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const newContent = convertTsxToJsx(content);
    const newPath = filePath.replace(/\.tsx$/, '.jsx');
    await writeFile(newPath, newContent, 'utf8');
    // Remove the old file only after new file is written
    await unlink(filePath);
    console.log(`Converted ${filePath} -> ${newPath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function main() {
  const srcDir = join(__dirname, 'src');

  const tasks = [];

  function walkDir(dir) {
    const files = readdirSync(dir);
    files.forEach(file => {
      const filePath = join(dir, file);
      const stat = statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.tsx')) {
        tasks.push(processFile(filePath));
      }
    });
  }

  walkDir(srcDir);

  // Run conversions in parallel with modest concurrency
  const concurrency = 8;
  for (let i = 0; i < tasks.length; i += concurrency) {
    await Promise.all(tasks.slice(i, i + concurrency));
  }

  console.log(`Conversion complete. Processed ${tasks.length} files.`);
}

main().catch(err => {
  console.error('Conversion script failed:', err);
  process.exit(1);
});
import { readFile, writeFile, readdirSync, statSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function convertTsxToJsx(content) {
  // Remove type annotations
  content = content.replace(/: [A-Za-z<>[\]{}|&,\s]+(?=[,)])/g, '');
  content = content.replace(/: [A-Za-z<>[\]{}|&,\s]+(?=[=])/g, '');
  
  // Remove interface declarations
  content = content.replace(/interface\s+\w+\s*{[^}]*}/g, '');
  
  // Remove type declarations
  content = content.replace(/type\s+\w+\s*=\s*[^;]+;/g, '');
  
  // Remove import type statements
  content = content.replace(/import\s+type\s*{[^}]*}\s*from\s*['"][^'"]+['"]/g, '');
  
  import { promises as fsPromises, readdirSync, statSync } from 'fs';
  import { join, dirname } from 'path';
  import { fileURLToPath } from 'url';

  const { readFile, writeFile, unlink } = fsPromises;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  function convertTsxToJsx(content) {
    // Conservative regex-based removals. This will need manual inspection afterwards.
    // Remove simple type annotations like: const x: Type =
    content = content.replace(/:\s*[A-Za-z0-9_<>\[\]{}|&.,\s]+(?=\s*[=,);\n])/g, '');

    // Remove interface and type declarations
    content = content.replace(/interface\s+\w+\s*{[\s\S]*?}\n?/g, '');
    content = content.replace(/type\s+\w+\s*=\s*[\s\S]*?;\n?/g, '');

    // Remove 'import type' and type-only imports
    content = content.replace(/import\s+type\s+\{[^}]*\}\s*from\s*['"][^'"]+['"];?/g, '');
    content = content.replace(/import\s+\{\s*type[^}]*\}\s*from\s*['"][^'"]+['"];?/g, '');

    // Remove 'as Type' casts
    content = content.replace(/\s+as\s+[A-Za-z0-9_<>\[\]{}|&.,\s]+/g, '');

    // Remove generic parameters on React components or functions like: Component<Props>
    content = content.replace(/([A-Za-z0-9_]+)\s*<[^>]+>\s*(\(|\{)/g, '$1$2');

    // Update imports that explicitly reference .tsx/.ts -> .jsx/.js
    content = content.replace(/from\s+['"]([^'"]+)\.tsx['"]/g, "from '$1.jsx'");
    content = content.replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1.js'");

    return content;
  }

  async function processFile(filePath) {
    try {
      const content = await readFile(filePath, 'utf8');
      const newContent = convertTsxToJsx(content);
      const newPath = filePath.replace(/\.tsx$/, '.jsx');
      await writeFile(newPath, newContent, 'utf8');
      // Remove the old file only after new file is written
      await unlink(filePath);
      console.log(`Converted ${filePath} -> ${newPath}`);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  async function main() {
    const srcDir = join(__dirname, 'src');

    const tasks = [];

    function walkDir(dir) {
      const files = readdirSync(dir);
      files.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);
        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (file.endsWith('.tsx')) {
          tasks.push(processFile(filePath));
        }
      });
    }

    walkDir(srcDir);

    // Run conversions in parallel with modest concurrency
    const concurrency = 8;
    for (let i = 0; i < tasks.length; i += concurrency) {
      await Promise.all(tasks.slice(i, i + concurrency));
    }

    console.log(`Conversion complete. Processed ${tasks.length} files.`);
  }

  main().catch(err => {
    console.error('Conversion script failed:', err);
    process.exit(1);
  });
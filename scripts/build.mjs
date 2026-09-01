import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const serverDir = resolve(projectRoot, 'dist', 'server');
await mkdir(serverDir, { recursive: true });
const workerSource = await readFile(
  resolve(projectRoot, 'worker', 'index.js'),
  'utf8',
);
const hrUiSource = await readFile(
  resolve(projectRoot, 'worker', 'hr-ui.js'),
  'utf8',
);
const builtWorker = workerSource.replace(
  /const HR_UI_SCRIPT\s*=\s*'';/,
  `const HR_UI_SCRIPT=${JSON.stringify(hrUiSource)};`,
);
if (builtWorker === workerSource)
  throw new Error('HR UI injection marker missing');
await writeFile(resolve(serverDir, 'index.js'), builtWorker, 'utf8');
console.log('Static ERP worker build complete.');

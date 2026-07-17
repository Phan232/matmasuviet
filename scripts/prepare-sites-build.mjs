import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');

await mkdir(resolve(distDir, 'server'), { recursive: true });
await mkdir(resolve(distDir, '.openai'), { recursive: true });

await copyFile(
  resolve(root, '.openai', 'hosting.json'),
  resolve(distDir, '.openai', 'hosting.json')
);

await writeFile(
  resolve(distDir, 'server', 'index.js'),
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const indexUrl = new URL("/index.html", request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  }
};
`,
  'utf8'
);

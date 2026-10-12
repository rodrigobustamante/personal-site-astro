/** Helpers shared by the integrations that post-process the built HTML. */
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** The directory static assets are emitted to: `client/` with the Cloudflare adapter. */
export async function clientDirOf(dir: URL): Promise<string> {
  const outDir = fileURLToPath(dir);
  const client = path.join(outDir, 'client');
  return (await exists(client)) ? client : outDir;
}

async function exists(p: string) {
  try {
    await readdir(p);
    return true;
  } catch {
    return false;
  }
}

export async function walkHtml(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walkHtml(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

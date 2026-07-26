import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const FIXTURES_ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'fixtures');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

/**
 * Minimal static file server for fixture HTML pages. Used by tests and CI
 * so fixtures can be exercised over real HTTP navigation (matching how
 * Playwright checks a deployed site) without depending on the Jekyll build.
 *
 * @param {number} [port] - 0 to let the OS choose a free port
 * @returns {Promise<{ server: import('http').Server, port: number, baseUrl: string, close: () => Promise<void> }>}
 */
export function startFixtureServer(port = 0) {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const requestUrl = new URL(req.url ?? '/', 'http://localhost');
        let relativePath = decodeURIComponent(requestUrl.pathname);
        if (relativePath.endsWith('/')) relativePath += 'index.html';

        const safePath = normalize(relativePath).replace(/^(\.\.[/\\])+/, '');
        const filePath = join(FIXTURES_ROOT, safePath);

        if (!filePath.startsWith(FIXTURES_ROOT)) {
          res.writeHead(403);
          res.end('Forbidden');
          return;
        }

        const fileStat = await stat(filePath).catch(() => null);
        if (!fileStat || !fileStat.isFile()) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }

        const contentType = CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream';
        const body = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(body);
      } catch (error) {
        res.writeHead(500);
        res.end(`Internal error: ${error.message}`);
      }
    });

    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => {
      const address = server.address();
      const actualPort = typeof address === 'object' && address ? address.port : port;
      resolve({
        server,
        port: actualPort,
        baseUrl: `http://127.0.0.1:${actualPort}`,
        close: () => new Promise((res) => server.close(() => res())),
      });
    });
  });
}

// Allow running directly: `node lib/serve-fixtures.mjs`
if (import.meta.url === `file://${process.argv[1]}`) {
  const { baseUrl } = await startFixtureServer(4310);
  console.log(`Fixture server running at ${baseUrl}`);
  console.log('Press Ctrl+C to stop.');
}

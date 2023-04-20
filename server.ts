import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);
  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
    template = await vite.transformIndexHtml(url, template);
    const parts: string[] = template.split('<!--ssr-->');
    res.write(parts[0]);
    const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');

    const appHtml = await render(url, {
      bootstrapModules: ['./src/entry-client.tsx'],
      onShellReady() {

        appHtml.pipe(res);


      },
      onAllReady() {
        res.write(parts[1]);
        res.end();
      },
    });
  });



  app.listen(6010);
  console.log(`listening on 6010`);
}

createServer();

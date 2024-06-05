import 'dotenv/config';

import cors from 'cors';
import { join } from 'desm';
import express from 'express';
import { glob } from 'glob';

import DatabasePool from './entities/tools/DatabasePool.js';

DatabasePool.Instance = new DatabasePool();

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.debug(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  return next();
});

const routesPath = join(import.meta.url, 'routes');
const routeFiles = glob.sync(`${routesPath}/**/*.js`);

const modulePromises = routeFiles.map(async (file) => {
  const module = await import(file);
  module.default(app);

  console.debug(`Route ${file} loaded`);
});

await Promise.all(modulePromises);

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, (error) => {
  if (error) {
    throw error;
  }

  console.debug(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});

import 'dotenv/config';

import express from 'express';
import { join } from 'desm';
import { glob } from 'glob';

import DatabasePool from './entities/tools/DatabasePool.js';

DatabasePool.Instance = new DatabasePool();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(req.method + ' ' + req.originalUrl + ' ' + res.statusCode + ' - ' + duration + 'ms');
  });
  next();
});

const routesPath = join(import.meta.url, 'routes');
const routeFiles = glob.sync(`${routesPath}/**/*.js`);

for (const file of routeFiles) {
  const module = await import(file)
  module.default(app);
  console.log(`${file} loaded`);
}

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, (error) => {
  if (error) {
    throw error;
  }
});
import express from 'express';
import path from 'path';

/**
 * The entry point of the application. Starts an Express server that serves
 * the compiled React application.
 */
const startServer = (): void => {
  const app: express.Express = express();
  const pathToBuild = path.join(__dirname);

  app.use('/', express.static(pathToBuild));
  app.get('/*', (_, res) => res.sendFile(`${pathToBuild}/index.html`));

  app.listen(3000, () => {
    console.log(`Running on port 3000.`);
  });
};

startServer();

/**
 * @fileoverview Entry: Server
 * - Entry point of the application in the production environment.

 */

import express from 'express';
import path from 'path';

const app = express();
const pathToBuild = path.join(__dirname, 'dist');

app.use('/', express.static(pathToBuild));
app.get('/*', (req, res) => res.sendFile(`${pathToBuild}/index.html`));
app.listen(3000);

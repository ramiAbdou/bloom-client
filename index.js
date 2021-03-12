// @ts-ignore b/c we don't need this to included in the build.
const express = require('express');
const path = require('path');

const app = express();
const pathToBuild = path.join(__dirname, 'dist');

app.use('/', express.static(pathToBuild));
app.get('/*', (_, res) => res.sendFile(`${pathToBuild}/index.html`));
app.listen(3000);

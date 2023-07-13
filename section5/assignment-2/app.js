const path = require('path');

const express = require('express');

const myRoutes = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(myRoutes);

app.listen(3000);

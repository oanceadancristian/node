const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('First Middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Second Middleware');
//   res.send('<h1>The middlewares have been sent!</h1>');
// });

app.use('/users', (req, res, next) => {
  console.log('/users middleware');
  res.send('<h1>The users middleware!</h1>');
});

app.use('/', (req, res, next) => {
  console.log('/ middleware');
  res.send('<h1>The default middleware!</h1>');
});

app.listen(3000);

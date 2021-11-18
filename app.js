const express = require('express');
const path = require('path');

const app = express();

const myLogger = (req, res, next) => {
  console.log('middleware');
  next();
};

// express static middleware
// ekstra fonk yazdırma, statik dosya çağırma, objelerle işlem yapma
app.use(express.static('public'));

app.use(myLogger);

app.get('/', (req, res) => {
  // res.send('hello world'); // middleware
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

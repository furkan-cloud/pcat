const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();

// önceden tanımlı konfigürsayon değişkeneklri kullanımı için
//TEMPLATE ENGINE
// view klasörüne bakar
app.set('view engine', 'ejs');

const myLogger = (req, res, next) => {
  console.log('middleware');
  next();
};

// express static middleware
// ekstra fonk yazdırma, statik dosya çağırma, objelerle işlem yapma
// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(myLogger);
// ROUTES
app.get('/', (req, res) => {
  // res.send('hello world'); // middleware
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', (req, res) => {
  console.log('req', req.body);
  // res.render('add');
  res.redirect("/")
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

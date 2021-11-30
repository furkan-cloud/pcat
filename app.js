const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const Photo = require('./models/Photo');

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
app.get('/', async (req, res) => {
  // res.send('hello world'); // middleware
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));

  const photos = await Photo.find({});
  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  console.log('req', req.body);
  await Photo.create(req.body);
  // res.render('add');
  res.redirect('/');
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

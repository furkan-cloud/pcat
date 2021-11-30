const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

// önceden tanımlı konfigürsayon değişkeneklri kullanımı için
//TEMPLATE ENGINE
// view klasörüne bakar
app.set('view engine', 'ejs');

const myLogger = (req, res, next) => {
  // console.log('middleware');
  next();
};

// express static middleware
// ekstra fonk yazdırma, statik dosya çağırma, objelerle işlem yapma
// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.use(myLogger);

// ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = 4000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

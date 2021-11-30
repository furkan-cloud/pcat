const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  // res.send('hello world'); // middleware
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));

  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', { photos });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
};

exports.createPhoto = async (req, res) => {
  // console.log(req.files.image);
  // console.log('req', req.body);

  // await Photo.create(req.body);
  // res.render('add');
  // res.redirect('/');

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({ ...req.body, image: '/uploads/' + uploadImage.name });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove({ _id: req.params.id });
  res.redirect('/');
};

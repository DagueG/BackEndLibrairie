const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const convertToWebP = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const webpFilename = `${req.file.fieldname}-${uniqueSuffix}.webp`;
  const outputPath = path.join('uploads', webpFilename);

  sharp(req.file.buffer)
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => {
      req.file.filename = webpFilename;
      req.file.path = outputPath;
      next();
    })
    .catch(error => {
      console.error('Erreur lors de la conversion en WebP:', error);
      res.status(500).json({ error: 'Erreur lors de la conversion de l\'image.' });
    });
};

module.exports = { upload, convertToWebP };

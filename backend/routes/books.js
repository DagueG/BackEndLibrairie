const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');
const { upload, convertToWebP } = require('../middleware/multer-config');

router.post('/', auth, upload.single('image'), convertToWebP, bookController.createBook);

router.get('/', bookController.getAllBooks);

router.get('/bestrating', bookController.getBestRatedBooks);

router.get('/:id', bookController.getBookById);

router.put('/:id', auth, upload.single('image'), convertToWebP, bookController.updateBook);

router.delete('/:id', auth, bookController.deleteBook);

router.post('/:id/rating', auth, bookController.rateBook);


module.exports = router;

const express = require('express');
const ImageRouter = express.Router();
const ImageController = require('../Controllers/ImageController');
// const upload = require('../multer');

ImageRouter.post('/getbyid', ImageController.GetByID);
ImageRouter.post('/getbypost', ImageController.GetByPost);
ImageRouter.post('/create', ImageController.Create);
ImageRouter.post('/updatebyid', ImageController.UpdateByID);
ImageRouter.post('/deletebyid', ImageController.DeleteByID);

module.exports = ImageRouter;
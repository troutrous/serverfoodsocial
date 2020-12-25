const express = require('express');
const ImageRouter = express.Router();
const ImageController = require('../Controllers/ImageController');

ImageRouter.post('/getbyid', ImageController.GetImageByID);
ImageRouter.post('/getbypost', ImageController.GetImageByPost);
ImageRouter.post('/create', ImageController.Create);
ImageRouter.post('/updatebyid', ImageController.UpdateByID);
ImageRouter.post('/deletebyid', ImageController.DeleteByID);

module.exports = ImageRouter;
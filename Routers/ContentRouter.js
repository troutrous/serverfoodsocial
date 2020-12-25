const express = require('express');
const ContentRouter = express.Router();
const ContentController = require('../Controllers/ContentController');

ContentRouter.post('/getbyid', ContentController.GetContentByID);
ContentRouter.post('/getbypost', ContentController.GetContentByPost);
ContentRouter.post('/create', ContentController.Create);
ContentRouter.post('/updatebyid', ContentController.UpdateByID);
ContentRouter.post('/deletebyid', ContentController.DeleteByID);

module.exports = ContentRouter;
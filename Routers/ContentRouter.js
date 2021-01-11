const express = require('express');
const ContentRouter = express.Router();
const ContentController = require('../Controllers/ContentController');

ContentRouter.post('/getbyid', ContentController.GetByID);
ContentRouter.post('/getbypost', ContentController.GetByPost);
ContentRouter.post('/create', ContentController.Create);
ContentRouter.post('/updatebyid', ContentController.UpdateByID);
ContentRouter.post('/deletebyid', ContentController.DeleteByID);

module.exports = ContentRouter;
const express = require('express');
const PostRouter = express.Router();
const PostController = require('../Controllers/PostController');

PostRouter.post('/get', PostController.Get);
PostRouter.post('/getbyuser', PostController.GetByUser);
PostRouter.post('/getbyid', PostController.GetByID);
PostRouter.post('/create', PostController.SaveImage, PostController.Create);
PostRouter.delete('/deletebyid', PostController.DeleteByID);

module.exports = PostRouter;
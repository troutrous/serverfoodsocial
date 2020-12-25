const express = require('express');
const PostRouter = express.Router();
const PostController = require('../Controllers/PostController');

PostRouter.post('/get', PostController.GetPost);
PostRouter.post('/getbyuser', PostController.GetPostByUser);
PostRouter.post('/getbyid', PostController.GetPostByID);

module.exports = PostRouter;
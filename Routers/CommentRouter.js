const express = require('express');
const CommentRouter = express.Router();
const CommentController = require('../Controllers/CommentController');

CommentRouter.post('/getbyid', CommentController.GetByID);
CommentRouter.post('/getbypost', CommentController.GetByPost);
CommentRouter.post('/create', CommentController.Create);
CommentRouter.post('/updatebyid', CommentController.UpdateByID);
CommentRouter.post('/deletebyid', CommentController.DeleteByID);

module.exports = CommentRouter;
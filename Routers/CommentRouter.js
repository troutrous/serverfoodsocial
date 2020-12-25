const express = require('express');
const CommentRouter = express.Router();
const CommentController = require('../Controllers/CommentController');

CommentRouter.post('/getbyid', CommentController.GetCommentByID);
CommentRouter.post('/getbypost', CommentController.GetCommentByPost);
CommentRouter.post('/create', CommentController.Create);
CommentRouter.post('/updatebyid', CommentController.UpdateByID);
CommentRouter.post('/deletebyid', CommentController.DeleteByID);

module.exports = CommentRouter;
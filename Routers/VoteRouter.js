const express = require('express');
const VoteRouter = express.Router();
const VoteController = require('../Controllers/VoteController');

VoteRouter.post('/getbyid', VoteController.GetByID);
VoteRouter.post('/getbypost', VoteController.GetByPost);
VoteRouter.post('/create', VoteController.Create);
VoteRouter.post('/updatebyid', VoteController.UpdateByID);
VoteRouter.post('/deletebyid', VoteController.DeleteByID);

module.exports = VoteRouter;
const express = require('express');
const VoteRouter = express.Router();
const VoteController = require('../Controllers/VoteController');

VoteRouter.post('/getbyid', VoteController.GetVoteByID);
VoteRouter.post('/getbypost', VoteController.GetVoteByPost);
VoteRouter.post('/create', VoteController.Create);
VoteRouter.post('/updatebyid', VoteController.UpdateByID);
VoteRouter.post('/deletebyid', VoteController.DeleteByID);

module.exports = VoteRouter;
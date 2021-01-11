const express = require('express');
const ProfileRouter = express.Router();
const ProfileController = require('../Controllers/ProfileController');

ProfileRouter.post('/getbyid', ProfileController.GetByID);

module.exports = ProfileRouter;
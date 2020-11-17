const express = require('express');
const VerifyTokenRouter = express.Router();

const VerifyTokenController = require('../Controllers/VeryfyTokenController');

VerifyTokenRouter.post('/verify',AuthController.Authentication)

module.exports = VerifyTokenRouter;
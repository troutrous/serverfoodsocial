const express = require('express');
const VerifyTokenRouter = express.Router();

const VerifyTokenController = require('../Controllers/VeryfyTokenController');

VerifyTokenRouter.post('/verify',VerifyTokenController.VerifyToken)

module.exports = VerifyTokenRouter;
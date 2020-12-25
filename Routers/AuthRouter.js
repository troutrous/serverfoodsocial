const express = require('express');
const AuthRouter = express.Router();

const AuthController = require('../Controllers/AuthController');
const VerifyTokenController = require('../Controllers/VeryfyTokenController');

AuthRouter.post('/signin', AuthController.SignIn);
AuthRouter.post('/signinwithgoogle', AuthController.SignInWithGoogle);
AuthRouter.post('/signup', AuthController.SignUp);
AuthRouter.post('/verify', AuthController.VerifyToken);
AuthRouter.post('/checkexistprofilebyemail', AuthController.CheckExistProfileByEmail);

module.exports = AuthRouter;
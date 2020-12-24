const AuthModel = require("../Models/AuthModel");

module.exports.SignIn = (req, res) => {
  AuthModel.SignIn(req.body, (err, data) => {
    if (err) {
      res.status(401).json({
        message: err.message || "Something has been error...",
      });
      return;
    } else {
      res.status(200).header("Authorization", `Bearer ${data.token}`).json({
        ...data.profile
      });
      return;
    }
  });
};


module.exports.SignInWithGoogle = (req, res) => {
  AuthModel.SignInWithGoogle(req.body, (err, data) => {
    if (err) {
      res.status(401).json({
        message: err.message || "Something has been error...",
      });
    } else {
      res.status(200).header("Authorization", `Bearer ${data.token}`).json({
        ...data.profile
      });
    }
  });
};

module.exports.SignUp = (req, res) => {
  AuthModel.SignUp(req.body, (err, data) => {
    if (err) {
      res.status(401).json({
        message: err.message || "Something has been error...",
      });
      return;
    } else {
      res.status(200).header("Authorization", `Bearer ${data.token}`).json({
        ...data.profile
      });
      return;
    }
  });
};

module.exports.CheckExistProfileByEmail = (req, res) => {
  AuthModel.CheckExistProfileByEmail(req.body, (err, data) => {
    if (err) {
      res.status(401).send({
        message: err.message || "Something has been error...",
      });
      return;
    } else {
      res.status(200).send(data);
      return;
    }
  });
};
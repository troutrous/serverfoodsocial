const AuthModel = require("../Models/AuthModel");

module.exports.Authentication = (req, res) => {
  AuthModel.Authentication(req.body, (err, data) => {
    if (err) {
      res.status(401).send({
        message: err.message || "Something has been error...",
      });
      return;
    } else if (data.length) {
      const token = {
        tokenID: data
      }
      res.status(200).header("AuthToken", data).send(token);
      return;
    }
  });
};


module.exports.SignInWithGoogle = (req, res) => {
  AuthModel.SignInWithGoogle(req.body, (err, data) => {
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

module.exports.SignUp = (req, res) => {
  AuthModel.SignUp(req.body, (err, data) => {
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

module.exports.CheckExistProfileByEmail= (req, res) => {
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
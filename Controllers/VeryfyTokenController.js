const VeryfyTokenModel = require('../Models/VerifyTokenModel');

module.exports.VerifyToken = (req, res, next) => {
    VeryfyTokenModel.VerifyToken(req.headers.authorization, (err, data) => {
      if (err) {
        res.status(401).json({
          message: err.message || "Something has been error...",
        });
      } else {
        res.status(200).json(data);
      }
    });
  };


  module.exports.VerifyTokenMiddleware = (req, res, next) => {
    VeryfyTokenModel.VerifyToken(req.headers.authorization, (err, data) => {
      if (err) {
        next();
      } else {
        res.status(200).json(data);
      }
    });
  };
const VeryfyTokenModel = require('../Models/VerifyTokenModel');

module.exports.VerifyToken = (req, res) => {
    VeryfyTokenModel.VerifyToken(req.headers.authtoken, (err, data) => {
      if (err) {
        res.status(401).send({
          message: err.message || "Something has been error...",
        });
      } else {
        res.status(200).send(data);
      }
    });
  };
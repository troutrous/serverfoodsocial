const PostModel = require("../Models/PostModel");
const uploadImage = require('../multer');
module.exports.Get = (req, res) => {
    PostModel.Get(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};
module.exports.GetByUser = (req, res) => {
    PostModel.GetByUser(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};
module.exports.GetByID = (req, res) => {
    PostModel.GetByID(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};
module.exports.Create = (req, res) => {
    PostModel.Create(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};
module.exports.SaveImage = (req, res, next) => {
    console.log("save image");
    uploadImage(req, res, function (err) {
        if (err) {
            // An unknown error occurred when uploading.
            res.send(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            if (req.file && req.file.path) {
                req.body.filepath = req.file.path.split('\\').slice(1).join('/');
            }
            next();
        }
    })
};
module.exports.DeleteByID = (req, res) => {
    PostModel.DeleteByID(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};
const ImageModel = require("../Models/ImageModel");
const uploadImage = require('../multer');

module.exports.GetByID = (req, res) => {
    ImageModel.GetByID(req.body, (err, data) => {
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

module.exports.GetByPost = (req, res) => {
    ImageModel.GetByPost(req.body, (err, data) => {
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
    // uploadImage(req, res, function (err) {
    //     if (err) {
    //         // An unknown error occurred when uploading.
    //         res.send(401).json({
    //             message: err.message || "Something has been error...",
    //         });
    //         return;
    //     } else {
    //         console.log(req.file);
    //         console.log(req.body);
    //         res.status(200).json({
                
    //         })
    //     }
    // })
    // ImageModel.Create(req.body, (err, data) => {
    //     if (err) {
    //         res.status(401).json({
    //             message: err.message || "Something has been error...",
    //         });
    //         return;
    //     } else {
    //         res.status(200).json(
    //             data
    //         );
    //         return;
    //     }
    // });
};

module.exports.UpdateByID = (req, res) => {
    ImageModel.UpdateByID(req.body, (err, data) => {
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

module.exports.DeleteByID = (req, res) => {
    ImageModel.DeleteByID(req.body, (err, data) => {
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
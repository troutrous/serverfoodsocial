const CommentModel = require("../Models/CommentModel");

module.exports.GetCommentByID = (req, res) => {
    CommentModel.GetCommentByID(req.body, (err, data) => {
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
module.exports.GetCommentByPost = (req, res) => {
    CommentModel.GetCommentByPost(req.body, (err, data) => {
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
    CommentModel.Create(req.body, (err, data) => {
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
module.exports.UpdateByID = (req, res) => {
    CommentModel.UpdateByID(req.body, (err, data) => {
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
    CommentModel.DeleteByID(req.body, (err, data) => {
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
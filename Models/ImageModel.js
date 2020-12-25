const sql = require("./ConnectMySQL");
const { GetUUID } = require('./AuthModel');

module.exports.GetImageByID = async (getRequest, result) => {
    sql.query(
        `SELECT tb_image.imageID, tb_image.imageSource, tb_image.postID 
        FROM tb_image
        WHERE tb_image.imageID = ?`,
        [getRequest.imageID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        }
    );
};

module.exports.GetImageByPost = async (getRequest, result) => {
    sql.query(
        `SELECT tb_image.imageID, tb_image.imageSource, tb_image.postID 
        FROM tb_image
        WHERE tb_image.imageID = ?`,
        [getRequest.postID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        }
    );
};

module.exports.Create = async (getRequest, result) => {
    const uuid = await GetUUID();
    sql.query(
        `INSERT INTO tb_image (tb_image.imageID, tb_image.imageSource, tb_image.postID) VALUES (?, ?, ?)`,
        [uuid, getRequest.imageSource, getRequest.postID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { imageID: uuid, ...data });
            }
        }
    );
};
module.exports.UpdateByID = async (getRequest, result) => {
    sql.query(
        `UPDATE tb_image
        SET tb_image.imageSource = ?
        WHERE tb_image.imageID = ?`,
        [getRequest.imageSource, getRequest.imageID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { ...data });
            }
        }
    );
};
module.exports.DeleteByID = async (getRequest, result) => {
    sql.query(
        `DELETE FROM tb_image
        WHERE tb_image.imageID = ?`,
        [getRequest.imageID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { ...data });
            }
        }
    );
};
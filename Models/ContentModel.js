const sql = require("./ConnectMySQL");
const { GetUUID } = require('./AuthModel');

module.exports.GetContentByID = async (getRequest, result) => {
    sql.query(
        `SELECT tb_content.contentID, tb_content.contentText, tb_content.postID 
        FROM tb_content
        WHERE tb_content.contentID = ?`,
        [getRequest.contentID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        }
    );
};
module.exports.GetContentByPost = async (getRequest, result) => {
    sql.query(
        `SELECT tb_content.contentID, tb_content.contentText, tb_content.postID 
        FROM tb_content
        WHERE tb_content.postID = ?`,
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
        `INSERT INTO tb_content (tb_content.contentID, tb_content.contentText, tb_content.postID) VALUES (?, ?, ?)`,
        [uuid, getRequest.contentText, getRequest.postID],
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
        `UPDATE tb_content 
        SET tb_content.contentText = ?
        WHERE tb_content.contentID = ?`,
        [getRequest.contentText, getRequest.contentID],
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
        `DELETE FROM tb_content WHERE tb_content.contentID = ?`,
        [getRequest.contentID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { ...data });
            }
        }
    );
};
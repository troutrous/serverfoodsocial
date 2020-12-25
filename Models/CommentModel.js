const sql = require("./ConnectMySQL");
const { GetUUID } = require('./AuthModel');

module.exports.GetCommentByID = async (getRequest, result) => {
    sql.query(
        `SELECT tb_comment.commentID, tb_comment.postID, tb_comment.commentText, tb_comment.commentCreatedAt, tb_comment.commentParentID, tb_comment.userID
        FROM tb_comment
        WHERE tb_comment.commentID = ?`,
        [getRequest.commentID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        }
    );
};

module.exports.GetCommentByPost = async (getRequest, result) => {
    sql.query(
        `SELECT tb_comment.commentID, tb_comment.postID, tb_comment.commentText, tb_comment.commentCreatedAt, tb_comment.commentParentID, tb_comment.userID
        FROM tb_comment
        WHERE tb_comment.postID = ?
        ORDER BY tb_comment.commentCreatedAt DESC`,
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
    if (getRequest.commentParentID == null) {
        getRequest.commentParentID = uuid;
    }
    if (getRequest.commentCreatedAt == null) {
        getRequest.commentCreatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    sql.query(
        `INSERT INTO tb_comment (tb_comment.commentID, tb_comment.commentText, tb_comment.commentCreatedAt, tb_comment.postID, tb_comment.commentParentID, tb_comment.userID) VALUES (?, ?, ?, ?, ?, ?)`,
        [uuid, getRequest.commentText, getRequest.commentCreatedAt, getRequest.postID, getRequest.commentParentID, getRequest.userID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { commentID: uuid, ...data });
            }
        }
    );
};
module.exports.UpdateByID = async (getRequest, result) => {
    sql.query(
        `UPDATE tb_comment 
        SET tb_comment.commentText = ?
        WHERE tb_comment.commentID = ?`,
        [getRequest.commentText, getRequest.commentID],
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
        `DELETE FROM tb_comment WHERE tb_comment.commentID = ?`,
        [getRequest.commentID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { ...data });
            }
        }
    );
};
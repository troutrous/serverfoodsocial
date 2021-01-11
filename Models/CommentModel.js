const sql = require("./ConnectMySQL");
const { GetUUID } = require('./AuthModel');

module.exports.GetByID = async (getRequest, result) => {
    sql.query(
        `SELECT tb_comment.commentID, tb_comment.postID, tb_comment.commentText, tb_comment.commentCreatedAt, tb_comment.commentParentID, tb_comment.userID
        FROM tb_comment
        WHERE tb_comment.commentID = ?`,
        [getRequest.commentID],
        (err, data) => {
            if (err) {
                result(err, null);
            } else {
                result(null, data);
            }
        }
    );
};

module.exports.GetByPost = async (getRequest, result) => {
    sql.query(
        `SELECT tb_comment.*, tb_profile.userFirstname, tb_profile.userLastname, tb_image.imageSource
        FROM tb_comment, tb_profile, tb_image
        WHERE tb_comment.userID = tb_profile.userID AND tb_profile.imageID = tb_image.imageID AND tb_comment.postID = ?
        ORDER BY tb_comment.commentCreatedAt ASC`,
        [getRequest.postID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                const dataResponse = [];
                data.forEach(comment => {
                    comment.imageSource = process.env.BASE_URL + comment.imageSource;
                    if (comment.commentID == comment.commentParentID) {
                        comment.replys = [];
                        dataResponse.push(comment);
                    } else {
                        dataResponse.find(item => item.commentID == comment.commentParentID).replys.push(comment);
                    }
                })
                result(null, dataResponse);
            }
        }
    );
};
module.exports.GetCommentByPostPromise = async (getRequest) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT tb_comment.commentID, tb_comment.postID, tb_comment.commentText, tb_comment.commentCreatedAt, tb_comment.commentParentID, tb_comment.userID
            FROM tb_comment
            WHERE tb_comment.postID = ?
            ORDER BY tb_comment.commentCreatedAt ASC`,
            [getRequest.postID],
            (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            }
        );
    })
};

module.exports.Create = async (getRequest, result) => {
    const uuid = await GetUUID();
    if (getRequest.commentParentID == null) {
        getRequest.commentParentID = uuid;
    }
    if (getRequest.commentCreatedAt == null) {
        getRequest.commentCreatedAt = new Date();
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
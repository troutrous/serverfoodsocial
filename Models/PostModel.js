const sql = require("./ConnectMySQL");

module.exports.GetPost = async (getRequest, result) => {
    sql.query(
        `SELECT tb_post.postID, tb_post.imageID, tb_post.contentID, tb_post.userID, tb_post.postCreatedAt, tb_image.imageSource, tb_content.contentText 
        FROM tb_post, tb_image, tb_content 
        WHERE tb_post.imageID = tb_image.imageID AND tb_post.contentID = tb_content.contentID 
        ORDER BY tb_post.postCreatedAt DESC 
        LIMIT ?, ?`,
        [getRequest.start, getRequest.limit],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        }
    );
};

module.exports.GetPostByUser = async (getRequest, result) => {
    sql.query(
        `SELECT tb_post.postID, tb_post.imageID, tb_post.contentID, tb_post.userID, tb_post.postCreatedAt, tb_image.imageSource, tb_content.contentText 
        FROM tb_post, tb_image, tb_content 
        WHERE tb_post.imageID = tb_image.imageID AND tb_post.contentID = tb_content.contentID AND tb_post.userID = ?
        ORDER BY tb_post.postCreatedAt DESC 
        LIMIT ?, ?`,
        [getRequest.userID, getRequest.start, getRequest.limit],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        }
    );
};

module.exports.GetPostByID = async (getRequest, result) => {
    sql.query(
        `SELECT tb_post.postID, tb_post.imageID, tb_post.contentID, tb_post.userID, tb_post.postCreatedAt, tb_image.imageSource, tb_content.contentText 
        FROM tb_post, tb_image, tb_content 
        WHERE tb_post.imageID = tb_image.imageID AND tb_post.contentID = tb_content.contentID AND tb_post.postID = ?
        ORDER BY tb_post.postCreatedAt DESC 
        LIMIT ?, ?`,
        [getgetRequest.postID, getRequest.start, getRequest.limit],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        }
    );
};

const sql = require("./ConnectMySQL");
require('dotenv').config();
const { GetUUID, GetProfileById } = require('./AuthModel');
const { CreateContentPromise, GetContentByPostPromise } = require('./ContentModel');
const { CreateImagePromise, GetImageByPostPromise, GetImageByIDPromise } = require('./ImageModel');
const { GetVoteByPostPromise } = require('./VoteModel');
const { GetCommentByPostPromise } = require('./CommentModel');

const GetPostPromise = async (getRequest) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT tb_post.postID, tb_post.userID, tb_post.postCreatedAt
            FROM tb_post
            ORDER BY tb_post.postCreatedAt DESC `,
            [getRequest.start, getRequest.limit],
            (err, data) => {
                if (err) {
                    reject(new Error("Failed to get post"));
                } else {
                    data.forEach(item => {
                        item.postCreatedAt = item.postCreatedAt.toString();
                    });
                    resolve(data);
                }
            }
        );
    })
};

module.exports.Get = async (getRequest, result) => {
    try {
        const postResponse = await GetPostPromise(getRequest);
        for (let i = 0; i < postResponse.length; i++) {
            const item = postResponse[i];
            const [contentResponse, imageResponse, userResponse, voteResponse] = await Promise.all([
                GetContentByPostPromise({ postID: item.postID }),
                GetImageByPostPromise({ postID: item.postID }),
                GetProfileById({ userID: item.userID }),
                GetVoteByPostPromise({ postID: item.postID }),
            ]);
            item.voteAVG = voteResponse.reduce((acc, item) => { return (acc + item.voteValue) }, 0) / voteResponse.length || 0;
            item.content = contentResponse;
            item.vote = voteResponse;
            item.user = userResponse;
            item.image = imageResponse;
        }
        result(null, postResponse);
    } catch (error) {
        result(error, null);
    }
};

const GetPostByUserPromise = async (getRequest) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT tb_post.postID, tb_post.userID, tb_post.postCreatedAt
            FROM tb_post
            WHERE tb_post.userID = ?
            ORDER BY tb_post.postCreatedAt DESC `,
            [getRequest.userID, getRequest.start, getRequest.limit],
            (err, data) => {
                if (err) {
                    reject(new Error("Failed to get post"));
                } else {
                    data.forEach(item => {
                        item.postCreatedAt = item.postCreatedAt.toString();
                    });
                    resolve(data);
                }
            }
        );
    })
};

module.exports.GetByUser = async (getRequest, result) => {
    try {
        const postResponse = await GetPostByUserPromise(getRequest);
        for (let i = 0; i < postResponse.length; i++) {
            const item = postResponse[i];
            const [contentResponse, imageResponse, userResponse, voteResponse] = await Promise.all([
                GetContentByPostPromise({ postID: item.postID }),
                GetImageByPostPromise({ postID: item.postID }),
                GetProfileById({ userID: item.userID }),
                GetVoteByPostPromise({ postID: item.postID }),
            ]);
            item.voteAVG = voteResponse.reduce((acc, item) => { return (acc + item.voteValue) }, 0) / voteResponse.length || 0;
            item.content = contentResponse;
            item.vote = voteResponse;
            item.user = userResponse;
            item.image = imageResponse;
        }
        result(null, postResponse);
    } catch (error) {
        result(error, null);
    }
};

const GetPostByIDPromise = async (getRequest) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT tb_post.postID, tb_post.userID, tb_post.postCreatedAt
            FROM tb_post
            WHERE tb_post.postID = ?`,
            [getRequest.postID],
            (err, data) => {
                if (err) {
                    reject(new Error("Failed to get post"));
                } else {
                    data.forEach(item => {
                        item.postCreatedAt = item.postCreatedAt.toString();
                    });
                    resolve(data);
                }
            }
        );
    })
};

module.exports.GetByID = async (getRequest, result) => {
    try {
        const postResponse = await GetPostByIDPromise(getRequest);
        for (let i = 0; i < postResponse.length; i++) {
            const item = postResponse[i];
            const [contentResponse, imageResponse, userResponse, voteResponse] = await Promise.all([
                GetContentByPostPromise({ postID: item.postID }),
                GetImageByPostPromise({ postID: item.postID }),
                GetProfileById({ userID: item.userID }),
                GetVoteByPostPromise({ postID: item.postID }),
            ]);
            item.voteAVG = voteResponse.reduce((acc, item) => { return (acc + item.voteValue) }, 0) / voteResponse.length;
            item.content = contentResponse;
            item.vote = voteResponse;
            item.user = userResponse;
            item.image = imageResponse;
        }
        result(null, postResponse);
    } catch (error) {
        result(error, null);
    }
};

const CreatePostPromise = async (getRequest) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `INSERT INTO tb_post (tb_post.postID, tb_post.userID, tb_post.postCreatedAt) VALUES (?, ?, ?)`,
            [getRequest.uuid, getRequest.userID, getRequest.postCreatedAt],
            (err, data) => {
                if (err) {
                    reject(new Error("Failed to upload post"));
                } else if (data) {
                    resolve({ postID: getRequest.uuid, ...data });
                }
            }
        );
    })
}

module.exports.Create = async (getRequest, result) => {
    try {
        console.log("tạo", getRequest);
        const uuid = await GetUUID();
        if (!getRequest.postCreatedAt) {
            getRequest.postCreatedAt = new Date();
        }
        const postResponse = await CreatePostPromise({ ...getRequest, uuid });
        if (getRequest.contentText && getRequest.filepath) {
            console.log("đủ ảnh, chữ");
            const [contentResponse, imageResponse] = await Promise.all([
                CreateContentPromise({ ...getRequest, postID: postResponse.postID }),
                CreateImagePromise({ ...getRequest, postID: postResponse.postID }),
            ]);
            result(null, { postResponse, contentResponse });
        } else {
            if (getRequest.contentText) {
                console.log("chỉ chữ");
                const contentResponse = await CreateContentPromise({ ...getRequest, postID: postResponse.postID });
                result(null, { postResponse, contentResponse });
            }
            if (getRequest.filepath) {
                console.log("chỉ ảnh")
                const imageResponse = await CreateImagePromise({ ...getRequest, postID: postResponse.postID });
                result(null, { postResponse, imageResponse });
            }
        }
    } catch (error) {
        result(error, null);
    }
};
module.exports.DeleteByID = async (getRequest, result) => {
    sql.query(
        `DELETE FROM tb_post WHERE tb_post.postID = ?`,
        [getRequest.postID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { ...data });
            }
        }
    );
};




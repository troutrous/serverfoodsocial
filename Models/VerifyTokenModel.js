const jwt = require('jsonwebtoken')

module.exports.VerifyToken = async (tokenRequest, result) => {
    try {
        console.log(tokenRequest);
        const verified = await jwt.verify(tokenRequest,process.env.TOKEN_SECRET);
        result(null,verified);
    } catch (error) {
        result(new Error("Chua dang nhap"),null);
    }
};

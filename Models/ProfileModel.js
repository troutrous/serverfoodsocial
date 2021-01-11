const sql = require("./ConnectMySQL");
const { GetProfileById } = require('./AuthModel');
const { GetImageByIDPromise } = require('./ImageModel');

module.exports.GetByID = async (getRequest, result) => {
    try {
        const profile = await GetProfileById({ userID: getRequest.userID });
        profile.avatar = await GetImageByIDPromise({ imageID: profile.imageID });
        // profile.userBOD = profile.userBOD.toString();
        result(null, profile);
    } catch (error) {
        result(error, null);
    }
};
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.png')
    }
})

const uploadImage = multer({ storage: storage }).single('imageSource');

module.exports = uploadImage;
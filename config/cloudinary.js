var config = require('../config/configapp');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: config.cloudinaryNAME,
    api_key: config.cloudinaryAPI_KEY,
    api_secret: config.cloudinaryAPI_SECRET
});

module.exports = cloudinary
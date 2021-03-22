var config = require('dotenv');

config.config();

module.exports = {
    mongodbURL: process.env.MONGODB_URL || 'mongodb://localhost/BlogJS',
    cloudinaryNAME: process.env.CLOUDINARY_NAME,
    cloudinaryAPI_KEY: process.env.CLOUDINARY_API_KEY,
    cloudinaryAPI_SECRET: process.env.CLOUDINARY_API_SECRET,
    email: process.env.EMAIL,
    refresh_tocken: process.env.REFRESH_TOKEN,
    cliente_secret: process.env.CLIENT_SECRET,
    cliente_id: process.env.CLIENT_ID
}
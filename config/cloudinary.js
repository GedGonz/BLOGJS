var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'yourname', 
  api_key: 'yourapikey', 
  api_secret: 'yourapisecret' 
});

module.exports=cloudinary
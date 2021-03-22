var config = require('../config/configapp');
var mongoose = require('mongoose');


mongoose.connect(config.mongodbURL, {

    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true

});
module.exports = mongoose;
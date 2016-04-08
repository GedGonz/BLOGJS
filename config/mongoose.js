var mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/BlogJS');
module.exports=mongoose;
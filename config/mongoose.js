var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/Blog');

module.exports=mongoose;
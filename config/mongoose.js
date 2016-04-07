var mongoose= require('mongoose');
//mongoose.connect('mongodb://ged:gedgonz791@ds015760.mlab.com:15760/blogjs');
mongoose.connect('mongodb://localhost/BlogJS');
module.exports=mongoose;
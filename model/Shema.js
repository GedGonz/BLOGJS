var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/Blog');

  var UsuarioShema={
  	Nombre:String,
  	Apellido:String,
  	Usuario:String,
  	Password:String

  }

  var Usuario=mongoose.model('Usuario',UsuarioShema);

  module.exports.Usuario=Usuario
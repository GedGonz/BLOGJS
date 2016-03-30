var mongoose= require('mongoose');


  var UsuarioShema={
  	Nombre:String,
  	Apellido:String,
  	Usuario:String,
  	Password:String

  }

  var Usuario=mongoose.model('Usuario',UsuarioShema);

  module.exports.Usuario=Usuario
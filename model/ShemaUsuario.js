var mongoose= require('../config/mongoose');


  var UsuarioShema={
  	Nombre:String,
  	Apellido:String,
  	Usuario:String,
  	Password:String,
  	Photo:String

  }

  var Usuario=mongoose.model('Usuario',UsuarioShema);

  module.exports.Usuario=Usuario
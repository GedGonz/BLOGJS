var mongoose= require('../config/mongoose');


  var UsuarioShema={
  	Nombre:String,
  	Apellido:String,
  	Email:String,
  	Usuario:String,
  	Password:String,
  	Photo:String,
    Estado:Number

  }

  var Usuario=mongoose.model('Usuario',UsuarioShema);

  module.exports.Usuario=Usuario
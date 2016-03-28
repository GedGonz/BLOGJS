var mongoose= require('mongoose');
var shemauser=require('./ShemaUsuario');
var Schema = mongoose.Schema;
var Usuario = mongoose.model('Usuario');

    var ArticuloShema={
  	Titulo:String,
  	Autor:String,
  	Descripcion:String,
  	Cuerpo:String,
  	Date:String,
  	Portada:String,
  	Usuario: { type: Schema.ObjectId, ref: "Usuario" } 

  }
  var Articulo=mongoose.model('Articulo',ArticuloShema);

  module.exports.Articulo=Articulo

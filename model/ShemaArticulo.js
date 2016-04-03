var mongoose= require('../config/mongoose');
var shemauser=require('./ShemaUsuario');
var Schema = mongoose.Schema;
var Usuario = mongoose.model('Usuario');

    var ArticuloShema={
  	Titulo:String,
  	Autor:String,
  	Descripcion:String,
    Clasificacion:Number,
  	Cuerpo:String,
  	Fecha:String,
  	Portada:String,
    Estado:Number,
  	Usuario: { type: Schema.ObjectId, ref: "Usuario" } 

  }
  var Articulo=mongoose.model('Articulo',ArticuloShema);

  module.exports.Articulo=Articulo

var mongoose= require('mongoose');
var shemauser=require('./ShemaUsuario');
var shemauser=require('./ShemaArticulo');
var Schema = mongoose.Schema;
var Articulo = mongoose.model('Articulo');

  var ComentarioShema={
  	Nombre:String,
  	Comentario:String,
  	Fecha:String,
  	Padre:String,
  	Tipo:Number,
  	Articulo: { type: Schema.ObjectId, ref: "Articulo" } 

  }

  var Comentario=mongoose.model('Comentario',ComentarioShema);

  module.exports.Comentario=Comentario
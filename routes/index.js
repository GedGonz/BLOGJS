var express = require('express');
var router = express.Router();
var shema=require('../model/shema');
/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('welcome/index', { title: 'BlogJS' });
});

//Ruta de Login
router.get('/login', function(req, res, next) {
  res.render('usuario/login', { title: 'BlogJS' });
});

//Logeando usuario
router.post('/login/count', function(req, res, next) {


  shema.Usuario.find({Usuario:req.body.user,Password:req.body.pasword},function(err,usuario) {
     if(usuario.length!=0)
     {
     	console.log(usuario);
     	 res.render('articulo/design1', { title: 'BlogJS' });
     }
     else{res.render('usuario/login', { title: 'BlogJS' });}

  });
 
});


//Ruta de LoginUp
router.get('/login/new', function(req, res, next) {
  res.render('usuario/loginup', { title: 'BlogJS' });
});

router.post('/login/save', function(req, res, next) {


  var data={
	Nombre:req.body.nombre,
  	Apellido:req.body.apellido,
  	Usuario:req.body.usuario,
  	Password:req.body.pasword
  }

  var Usariodata=new shema.Usuario(data);


  Usariodata.save(function(err)
  {
  	if(!err)
  	{
		console.log(Usariodata);
  		res.render('usuario/login', { title: 'BlogJS' });
  	}
  	else
  	{
  		res.render('usuario/loginup', { title: 'BlogJS' });
  	}
  		
  });


  
});

//Plantillas
router.get('/articulo/design', function(req, res, next) {
  res.render('articulo/design1', { title: 'BlogJS' });
});


//New Articulo
router.get('/articulo/new', function(req, res, next) {
  res.render('articulo/new', { title: 'BlogJS' });
});

module.exports = router;
